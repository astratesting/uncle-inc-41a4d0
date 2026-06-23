import { NextRequest, NextResponse } from "next/server";
import { getUsers, saveUsers, createSession, setSessionCookie } from "@/lib/auth";
import { trackServerEvent } from "@/lib/analytics-server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=missing_token", baseUrl));
  }

  const users = await getUsers();
  const user = users.find((u) => u.verificationToken === token);

  if (!user) {
    return NextResponse.redirect(new URL("/login?error=invalid_token", baseUrl));
  }

  if (user.emailVerified) {
    // Already verified — just create session and redirect to dashboard
    const sessionToken = await createSession(user.id);
    await setSessionCookie(sessionToken);
    return NextResponse.redirect(new URL("/dashboard", baseUrl));
  }

  user.emailVerified = true;
  user.verificationToken = undefined;

  // First verified user becomes admin
  const hasAdmin = users.some((u) => u.isAdmin);
  if (!hasAdmin) {
    user.isAdmin = true;
  }
  await saveUsers(users);

  await trackServerEvent("email_verified", user.email);

  // Create session cookie and redirect to dashboard
  const sessionToken = await createSession(user.id);
  await setSessionCookie(sessionToken);

  return NextResponse.redirect(new URL("/dashboard", baseUrl));
}
