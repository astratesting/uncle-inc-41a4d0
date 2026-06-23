import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/store";

interface FeedbackEntry {
  id: string;
  frictionPoint: string;
  details: string;
  createdAt: string;
}

export async function POST(request: NextRequest) {
  try {
    const { frictionPoint, details } = await request.json();

    if (!frictionPoint || typeof frictionPoint !== "string") {
      return NextResponse.json(
        { error: "Friction point is required" },
        { status: 400 }
      );
    }

    const validOptions = [
      "Account creation",
      "Understanding the product",
      "Finding features",
      "Other",
    ];
    if (!validOptions.includes(frictionPoint)) {
      return NextResponse.json(
        { error: "Invalid friction point option" },
        { status: 400 }
      );
    }

    const entries = await readJSON<FeedbackEntry>("feedback.json");

    const entry: FeedbackEntry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      frictionPoint,
      details: typeof details === "string" ? details.trim() : "",
      createdAt: new Date().toISOString(),
    };

    entries.push(entry);
    await writeJSON("feedback.json", entries);

    return NextResponse.json({ message: "Feedback submitted. Thank you!" });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const entries = await readJSON<FeedbackEntry>("feedback.json");
    return NextResponse.json(entries);
  } catch (error) {
    console.error("Feedback read error:", error);
    return NextResponse.json(
      { error: "Failed to read feedback" },
      { status: 500 }
    );
  }
}
