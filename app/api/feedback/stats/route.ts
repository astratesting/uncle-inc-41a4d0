import { NextResponse } from "next/server";
import { readJSON } from "@/lib/store";

interface FeedbackEntry {
  id: string;
  frictionPoint: string;
  details: string;
  createdAt: string;
}

export async function GET() {
  try {
    const entries = await readJSON<FeedbackEntry>("feedback.json");

    const counts: Record<string, number> = {
      "Account creation": 0,
      "Understanding the product": 0,
      "Finding features": 0,
      Other: 0,
    };

    for (const entry of entries) {
      if (entry.frictionPoint in counts) {
        counts[entry.frictionPoint]++;
      }
    }

    const total = entries.length;
    const recentEntries = entries
      .slice(-10)
      .reverse()
      .map((e) => ({
        id: e.id,
        frictionPoint: e.frictionPoint,
        details: e.details,
        createdAt: e.createdAt,
      }));

    return NextResponse.json({
      total,
      counts,
      recentEntries,
    });
  } catch (error) {
    console.error("Feedback stats error:", error);
    return NextResponse.json(
      { error: "Failed to compute feedback stats" },
      { status: 500 }
    );
  }
}
