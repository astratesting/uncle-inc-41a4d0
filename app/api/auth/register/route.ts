import { NextResponse } from "next/server";

// Redirect old register endpoint to new signup
export async function POST() {
  return NextResponse.json(
    { error: "This endpoint has moved to /api/auth/signup" },
    { status: 410 }
  );
}
