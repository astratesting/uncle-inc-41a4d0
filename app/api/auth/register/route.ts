import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password, name, company } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { message: "Please provide your name." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existing = await findUserByEmail(normalizedEmail);
    if (existing) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await createUser({
      email: normalizedEmail,
      name: name.trim(),
      company: company?.trim() ?? "",
      passwordHash,
    });

    return NextResponse.json({
      message: "Account created! Check your email to verify your account.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
