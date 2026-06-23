import { NextResponse } from "next/server";
import { readJSONL } from "@/lib/store";
import { getUserCount } from "@/lib/store";

interface AnalyticsEvent {
  event: string;
  distinctId: string;
  properties?: Record<string, unknown>;
  timestamp: string;
}

export async function GET() {
  const events = await readJSONL<AnalyticsEvent>("analytics.jsonl");
  const totalUsers = await getUserCount();

  const signups = events.filter((e) => e.event === "signup").length;
  const verifications = events.filter((e) => e.event === "verification").length;
  const logins = events.filter((e) => e.event === "login").length;

  return NextResponse.json({
    totalUsers,
    signups,
    verifications,
    logins,
    totalEvents: events.length,
  });
}
