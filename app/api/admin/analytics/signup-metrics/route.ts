import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getVerifiedUserCount, getTotalUserCount } from "@/lib/store";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const SIGNUPS_PATH = path.join(process.cwd(), "data", "signups.json");

interface WaitlistEntry {
  verified?: boolean;
  createdAt?: string;
  [key: string]: unknown;
}

async function readSignups(): Promise<WaitlistEntry[]> {
  try {
    const data = await fs.readFile(SIGNUPS_PATH, "utf-8");
    const signups = JSON.parse(data);
    return Array.isArray(signups) ? signups : [];
  } catch {
    return [];
  }
}

export async function GET() {
  const admin = await getSessionUser();
  if (!admin || !admin.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const signups = await readSignups();
  const verifiedWaitlist = signups.filter((s) => s.verified).length;
  const totalWaitlist = signups.length;

  const verifiedUsers = getVerifiedUserCount();
  const totalUsers = getTotalUserCount();

  const totalVerified = verifiedUsers + verifiedWaitlist;
  const totalSignups = totalUsers + totalWaitlist;

  // Daily signups (last 30 days)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const dailyMap = new Map<string, { signups: number; verified: number }>();

  // Initialize all 30 days
  for (let i = 0; i < 30; i++) {
    const d = new Date(thirtyDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10);
    dailyMap.set(key, { signups: 0, verified: 0 });
  }

  // Count from store users
  const { getAllUsers } = await import("@/lib/store");
  const users = getAllUsers();
  for (const u of users) {
    const key = new Date(u.createdAt).toISOString().slice(0, 10);
    const entry = dailyMap.get(key);
    if (entry) {
      entry.signups++;
      if (u.verified) entry.verified++;
    }
  }

  // Count from waitlist signups
  for (const s of signups) {
    if (!s.createdAt) continue;
    const key = new Date(s.createdAt).toISOString().slice(0, 10);
    const entry = dailyMap.get(key);
    if (entry) {
      entry.signups++;
      if (s.verified) entry.verified++;
    }
  }

  const daily = Array.from(dailyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, data]) => ({ date, ...data }));

  // Recent signups (last 10, mixed sources)
  const recentUsers = users
    .map((u) => ({
      name: u.name,
      email: u.email,
      company: u.companyName,
      verified: u.verified,
      createdAt: u.createdAt,
      source: "account" as const,
    }));

  const recentWaitlist = signups.map((s) => ({
    name: (s.name as string) || "",
    email: (s.email as string) || "",
    company: (s.company as string) || "",
    verified: !!s.verified,
    createdAt: s.createdAt || "",
    source: "waitlist" as const,
  }));

  const recentSignups = [...recentUsers, ...recentWaitlist]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  return NextResponse.json({
    totalSignups,
    totalVerified,
    verifiedAccountUsers: verifiedUsers,
    verifiedWaitlist: verifiedWaitlist,
    totalAccountUsers: totalUsers,
    totalWaitlist: totalWaitlist,
    conversionRate: totalSignups > 0 ? Math.round((totalVerified / totalSignups) * 100) : 0,
    daily,
    recentSignups,
  });
}
