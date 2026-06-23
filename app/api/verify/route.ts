import { NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/file-storage";

interface SignupEntry {
  id: string;
  email: string;
  passwordHash: string;
  verified: boolean;
  createdAt: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email parameter is required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const store = await readStore<SignupEntry>("signups");
    const index = store.findIndex((e) => e.email === normalizedEmail);

    if (index === -1) {
      return NextResponse.json(
        { message: "No account found with this email." },
        { status: 404 }
      );
    }

    if (store[index].verified) {
      return NextResponse.json({
        message: "Email is already verified.",
      });
    }

    store[index].verified = true;
    await writeStore("signups", store);

    return NextResponse.json({
      message: "Email verified successfully!",
    });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
