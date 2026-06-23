import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { Resend } from "resend";
import { trackServerEvent } from "@/lib/analytics";

const SIGNUPS_PATH = path.join(process.cwd(), "data", "signups.json");

interface Signup {
  name?: string;
  email: string;
  company?: string;
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

async function sendVerificationEmail(email: string, verifyUrl: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`[VERIFY LINK - no RESEND_API_KEY] ${email}: ${verifyUrl}`);
    return;
  }
  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Uncle Inc. <onboarding@resend.dev>",
      to: email,
      subject: "Verify your Uncle Inc. signup",
      html: `<p>Welcome to Uncle Inc.!</p><p>Click the link below to verify your email:</p><p><a href="${verifyUrl}">Verify my email</a></p><p>If you didn't sign up, you can ignore this email.</p>`,
    });
  } catch (err) {
    console.error("Failed to send verification email:", err);
    console.log(`[VERIFY LINK - email send failed] ${email}: ${verifyUrl}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, name, company } = await request.json();

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
      if (typeof company === "string") existing.company = company.trim();
      await writeSignups(signups);

      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
      const verifyUrl = `${baseUrl}/verify?token=${existing.token}`;

      await sendVerificationEmail(normalizedEmail, verifyUrl);
      await trackServerEvent("signup_verification_resent", normalizedEmail);

      return NextResponse.json({
        message: "Verification email resent. Check your inbox.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    signups.push({
      name: typeof name === "string" ? name.trim() : undefined,
      email: normalizedEmail,
      company: typeof company === "string" ? company.trim() : undefined,
      token,
      verified: false,
      createdAt: new Date().toISOString(),
    });
    await writeSignups(signups);

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
    const verifyUrl = `${baseUrl}/verify?token=${token}`;

    await sendVerificationEmail(normalizedEmail, verifyUrl);
    await trackServerEvent("signup_submitted", normalizedEmail);

    return NextResponse.json({
      message: "Check your email to verify your signup.",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
