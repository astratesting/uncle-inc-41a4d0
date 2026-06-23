import { NextResponse } from "next/server";
import { withStoreLock } from "@/lib/file-storage";

interface WaitlistEntry {
  id: string;
  email: string;
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
    let result: "not_found" | "already_verified" | "verified" = "not_found";

    await withStoreLock<WaitlistEntry>("waitlist", (store) => {
      const index = store.findIndex((e) => e.email === normalizedEmail);
      if (index === -1) {
        return store;
      }
      if (store[index].verified) {
        result = "already_verified";
        return store;
      }
      store[index].verified = true;
      result = "verified";
      return store;
    });

    if (result === "not_found") {
      return NextResponse.json(
        { message: "No entry found with this email." },
        { status: 404 }
      );
    }

    if (result === "already_verified") {
      return NextResponse.json({ message: "Email is already verified." });
    }

    return NextResponse.json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
