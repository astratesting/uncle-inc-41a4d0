import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { trackServerEvent } from "@/lib/analytics";

const SIGNUPS_PATH = path.join(process.cwd(), "data", "signups.json");

interface Signup {
  name?: string;
  email: string;
  token: string;
  verified: boolean;
  createdAt: string;
}

async function readSignups(): Promise<Signup[]> {
  try {
    const data = await fs.readFile(SIGNUPS_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeSignups(signups: Signup[]) {
  await fs.writeFile(SIGNUPS_PATH, JSON.stringify(signups, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const signups = await readSignups();
    const normalizedEmail = email.toLowerCase().trim();

    const existing = signups.find((s) => s.email === normalizedEmail);
    if (existing) {
      if (existing.verified) {
        return NextResponse.json(
          { error: "This email is already signed up" },
          { status: 409 }
        );
      }
      // Re-send verification
      existing.token = crypto.randomBytes(32).toString("hex");
      existing.createdAt = new Date().toISOString();
      await writeSignups(signups);

      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
      const verifyUrl = `${baseUrl}/verify?token=${existing.token}`;

      console.log(`[VERIFY LINK] ${normalizedEmail}: ${verifyUrl}`);
      await trackServerEvent("signup_verification_resent", normalizedEmail);

      return NextResponse.json({
        message: "Verification email resent. Check your inbox.",
        verifyUrl,
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    signups.push({
      name: typeof name === "string" ? name.trim() : undefined,
      email: normalizedEmail,
      token,
      verified: false,
      createdAt: new Date().toISOString(),
    });
    await writeSignups(signups);

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
    const verifyUrl = `${baseUrl}/verify?token=${token}`;

    console.log(`[VERIFY LINK] ${normalizedEmail}: ${verifyUrl}`);
    await trackServerEvent("signup_submitted", normalizedEmail);

    return NextResponse.json({
      message: "Check your email to verify your signup.",
      verifyUrl,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
