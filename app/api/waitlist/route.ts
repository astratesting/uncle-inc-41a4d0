import { NextResponse } from "next/server";
import { withStoreLock } from "@/lib/file-storage";

interface WaitlistEntry {
  id: string;
  email: string;
  verified: boolean;
  createdAt: string;
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    let alreadyExists = false;

    await withStoreLock<WaitlistEntry>("waitlist", (store) => {
      const existing = store.find((e) => e.email === normalizedEmail);
      if (existing) {
        alreadyExists = true;
        return store;
      }

      store.push({
        id: crypto.randomUUID(),
        email: normalizedEmail,
        verified: false,
        createdAt: new Date().toISOString(),
      });
      return store;
    });

    if (alreadyExists) {
      return NextResponse.json({
        message: "You're already on the list! We'll be in touch soon.",
      });
    }

    return NextResponse.json({
      message: "You're on the list! Please check your email to verify.",
      verifyUrl: `/api/verify?email=${encodeURIComponent(normalizedEmail)}`,
    });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
