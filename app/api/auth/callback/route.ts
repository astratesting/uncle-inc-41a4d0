import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const next = searchParams.get("next") ?? "/dashboard";

  // In production this would exchange an OAuth code for a session.
  // Redirect to sign-in with error since we have no real OAuth backend.
  return NextResponse.redirect(`${origin}/sign-in?error=auth_callback_error`);
}
