import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getUsers, saveUsers, createSession, setSessionCookie } from "@/lib/auth";
import { generateToken } from "@/lib/password";
import { readJSON, writeJSON } from "@/lib/store";
import { trackServerEvent } from "@/lib/analytics";

interface Signup {
  name?: string;
  email: string;
  company?: string;
  token: string;
  verified: boolean;
  createdAt: string;
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;

  if (!token) {
    return NextResponse.redirect(new URL("/signup?error=missing_token", baseUrl));
  }

  const signups = await readJSON<Signup>("signups.json");
  const signup = signups.find((s) => s.token === token);

  if (!signup) {
    return NextResponse.redirect(new URL("/signup?error=invalid_token", baseUrl));
  }

  // Mark as verified in signups.json
  if (!signup.verified) {
    signup.verified = true;
    await writeJSON("signups.json", signups);
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
      passwordHash: generateToken(32),
      emailVerified: true,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    await saveUsers(users);
  } else if (!user.emailVerified) {
    user.emailVerified = true;
    user.verificationToken = undefined;
    const hasAdmin = users.some((u) => u.isAdmin);
    if (!hasAdmin) {
      user.isAdmin = true;
    }
    await saveUsers(users);
  }

  // Create session and redirect to dashboard
  const sessionToken = await createSession(user.id);
  const response = NextResponse.redirect(new URL("/dashboard", baseUrl));
  response.cookies.set("uncle_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
  return response;
}
