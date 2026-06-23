import { NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/store";
import { hashPassword } from "@/lib/password";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const existing = getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const { code } = createUser(name, email, "", passwordHash);

    // In production, send code via email (Resend/SendGrid).
    // For now, return it in the response so the user can enter it.
    return NextResponse.json({ ok: true, verificationCode: code });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Signup failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
