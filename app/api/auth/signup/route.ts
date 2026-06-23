import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getUsers, saveUsers, type StoredUser } from "@/lib/auth";
import { hashPassword } from "@/lib/password";
import { trackServerEvent } from "@/lib/analytics-server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const users = await getUsers();
    const normalizedEmail = email.toLowerCase().trim();

    if (users.find((u) => u.email === normalizedEmail)) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name: "",
      email: normalizedEmail,
      passwordHash: hashPassword(password),
      emailVerified: false,
      verificationToken,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await saveUsers(users);

    await trackServerEvent("user_registered", normalizedEmail);

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
    const verifyUrl = `${baseUrl}/api/auth/verify?token=${verificationToken}`;

    return NextResponse.json({
      message: "Account created. Check your email for a verification link.",
      _dev_verifyUrl: verifyUrl,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
