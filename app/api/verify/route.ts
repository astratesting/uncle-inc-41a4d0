import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

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

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Verification token is required" },
      { status: 400 }
    );
  }

  const signups = await readSignups();
  const signup = signups.find((s) => s.token === token);

  if (!signup) {
    return NextResponse.json(
      { error: "Invalid or expired verification token" },
      { status: 404 }
    );
  }

  if (signup.verified) {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
    return NextResponse.redirect(new URL("/?verified=already", baseUrl));
  }

  signup.verified = true;
  await writeSignups(signups);

  console.log(
    `[ANALYTICS] signup_verified | email=${signup.email} | ${new Date().toISOString()}`
  );

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
  return NextResponse.redirect(new URL("/?verified=true", baseUrl));
}
