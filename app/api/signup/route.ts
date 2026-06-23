import { NextRequest, NextResponse } from "next/server";
import {
  createUser,
  getUser,
  storeVerificationCode,
  getUserCount,
} from "@/lib/store";
import { generateVerificationCode } from "@/lib/auth";
import { trackServerEvent } from "@/lib/analytics";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    if (!name || typeof name !== "string" || name.trim().length < 1) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const existing = await getUser(email);
    if (existing && existing.emailVerified) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    if (!existing) {
      await createUser(email, password, name);
    }

    const code = generateVerificationCode();
    await storeVerificationCode(email, code);

    const count = await getUserCount();

    await trackServerEvent("signup", email.toLowerCase().trim(), { name });

    return NextResponse.json({
      success: true,
      message: "Account created. Use the verification code below to verify your email.",
      verificationCode: code,
      signupCount: count,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
