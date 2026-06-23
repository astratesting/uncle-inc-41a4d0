import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { getUsers, saveUsers, createSession, setSessionCookie } from "@/lib/auth";
import { generateToken } from "@/lib/password";
import { trackServerEvent } from "@/lib/analytics";
import type { User } from "@/lib/store";

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
      companyName: "",
      verified: true,
      verificationToken: "",
      createdAt: new Date().toISOString(),
      verifiedAt: new Date().toISOString(),
    };
    users.push(user as User);
    await saveUsers(users);
    await trackServerEvent("user_created_from_signup", signup.email);
  } else if (!user.verified) {
    user.verified = true;
    await saveUsers(users);
  }

  // Create session and set cookie
  const session = await createSession(user.id);
  await setSessionCookie(session.token);

  return NextResponse.redirect(new URL("/dashboard", baseUrl));
}
