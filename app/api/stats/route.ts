import { NextResponse } from "next/server";
import { readStore } from "@/lib/file-storage";

interface WaitlistEntry {
  id: string;
  email: string;
  verified: boolean;
  createdAt: string;
}

export async function GET() {
  try {
    const store = await readStore<WaitlistEntry>("waitlist");
    const total = store.length;
    const verified = store.filter((e) => e.verified === true).length;
    const goal = 10;

    return NextResponse.json({ total, verified, goal });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
