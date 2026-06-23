import { NextResponse } from "next/server";
import { readStore, appendToStore } from "@/lib/file-storage";

interface FeedbackEntry {
  id: string;
  message: string;
  email?: string;
  createdAt: string;
}

export async function GET() {
  try {
    const feedback = await readStore<FeedbackEntry>("feedback");
    return NextResponse.json({ feedback, count: feedback.length });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, email } = body as { message?: string; email?: string };

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Feedback message is required." },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Feedback must be under 2000 characters." },
        { status: 400 }
      );
    }

    const entry: FeedbackEntry = {
      id: crypto.randomUUID(),
      message: message.trim(),
      email: email?.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    await appendToStore<FeedbackEntry>("feedback", entry);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
