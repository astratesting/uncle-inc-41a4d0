import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { getUsers, saveUsers, createSession, setSessionCookie } from "@/lib/auth";
import { generateToken } from "@/lib/password";
import { trackServerEvent } from "@/lib/analytics";

const SIGNUPS_PATH = path.join(process.cwd(), "data", "signups.json");

interface Signup {
  name?: string;
  email: string;
  token: string;
  verified: boolean;
  createdAt: string;
}

async function readSignups(): Promise<Signup[]> {
  try {
    const data = await fs.readFile(SIGNUPS_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeSignups(signups: Signup[]) {
  await fs.writeFile(SIGNUPS_PATH, JSON.stringify(signups, null, 2));
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;

  if (!token) {
    return NextResponse.redirect(new URL("/signup?error=missing_token", baseUrl));
  }

  const signups = await readSignups();
  const signup = signups.find((s) => s.token === token);

  if (!signup) {
    return NextResponse.redirect(new URL("/signup?error=invalid_token", baseUrl));
  }

  // Mark as verified in signups.json
  if (!signup.verified) {
    signup.verified = true;
    await writeSignups(signups);
    await trackServerEvent("signup_verified", signup.email);
  }

  // Ensure user exists in users.json
  const users = await getUsers();
  let user = users.find((u) => u.email === signup.email);

  if (!user) {
    user = {
      id: crypto.randomUUID(),
      name: signup.name || "",
      email: signup.email,
      passwordHash: generateToken(32), // random placeholder — no password for waitlist signups
      emailVerified: true,
      createdAt: new Date().toISOString(),
    };
    // First verified user becomes admin
    const hasAdmin = users.some((u) => u.isAdmin);
    if (!hasAdmin) {
      user.isAdmin = true;
    }
    users.push(user);
    await saveUsers(users);
    await trackServerEvent("user_created_from_signup", signup.email);
  } else if (!user.emailVerified) {
    user.emailVerified = true;
    user.verificationToken = undefined;
    const hasAdmin = users.some((u) => u.isAdmin);
    if (!hasAdmin) {
      user.isAdmin = true;
    }
    await saveUsers(users);
  }

  // Create session and set cookie
  const sessionToken = await createSession(user.id);
  await setSessionCookie(sessionToken);

  return NextResponse.redirect(new URL("/dashboard", baseUrl));
}
