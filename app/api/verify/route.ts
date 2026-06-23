import { NextRequest, NextResponse } from "next/server";
import { verifyUser, getUser } from "@/lib/store";
import { createToken } from "@/lib/auth";
import { trackServerEvent } from "@/lib/analytics";

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Verification code is required" },
        { status: 400 }
      );
    }

    const isValid = await verifyUser(email, code);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid or expired verification code" },
        { status: 400 }
      );
    }

    const user = await getUser(email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const token = await createToken({ userId: user.id, email: user.email });

    await trackServerEvent("verification", email.toLowerCase().trim());

    const response = NextResponse.json({
      success: true,
      message: "Email verified successfully",
      user: { id: user.id, name: user.name, email: user.email },
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
