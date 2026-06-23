import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { readStore, writeStore } from "@/lib/file-storage";

interface SignupEntry {
  id: string;
  email: string;
  passwordHash: string;
  verified: boolean;
  createdAt: string;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

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

    const normalizedEmail = email.toLowerCase().trim();
    const store = await readStore<SignupEntry>("signups");

    const existing = store.find((e) => e.email === normalizedEmail);
    if (existing) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const entry: SignupEntry = {
      id: crypto.randomUUID(),
      email: normalizedEmail,
      passwordHash,
      verified: false,
      createdAt: new Date().toISOString(),
    };

    store.push(entry);
    await writeStore("signups", store);

    return NextResponse.json({
      message: "Account created! Check your email to verify your account.",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
