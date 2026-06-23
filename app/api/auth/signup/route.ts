import { NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/auth";
import { signIn } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, company } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 }
      );
    }

    await createUser({
      email,
      password,
      name: name ?? email.split("@")[0],
      company: company ?? "",
    });

    // Sign the user in immediately after signup
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Signup failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
