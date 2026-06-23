import { NextRequest, NextResponse } from "next/server";

// Delegate to /verify?token=... which handles the full flow
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;

  if (!token) {
    return NextResponse.redirect(new URL("/signup?error=missing_token", baseUrl));
  }

  return NextResponse.redirect(new URL(`/verify?token=${token}`, baseUrl));
}
