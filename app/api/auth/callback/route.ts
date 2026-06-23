import { NextResponse } from "next/server";

// Supabase auth callback is no longer needed — NextAuth handles sessions.
// This route redirects to login for backwards compatibility.
export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/login`);
}
