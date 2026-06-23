import { NextResponse } from "next/server";

// Redirect old verify-email endpoint to new verify
export async function GET() {
  return NextResponse.json(
    { error: "This endpoint has moved to /api/auth/verify" },
    { status: 410 }
  );
}
