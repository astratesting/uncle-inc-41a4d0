import { NextResponse } from "next/server";
import { readStore } from "@/lib/file-storage";

interface AnalyticsEvent {
  name: string;
  url: string;
  timestamp: string;
}

export async function GET() {
  try {
    const events = await readStore<AnalyticsEvent>("analytics");
    const signups = await readStore<{ verified: boolean; createdAt: string }>("signups");

    const totalSignups = signups.length;
    const verifiedSignups = signups.filter((s) => s.verified).length;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const byDayMap: Record<string, number> = {};

    for (const signup of signups) {
      const date = new Date(signup.createdAt);
      if (date >= sevenDaysAgo) {
        const day = dayNames[date.getDay()];
        byDayMap[day] = (byDayMap[day] || 0) + 1;
      }
    }

    const byDay = dayNames.map((day) => ({
      day,
      count: byDayMap[day] || 0,
    }));

    const totalEvents = events.length;
    const uniquePages = new Set(events.map((e) => e.url)).size;

    return NextResponse.json({
      total: totalSignups,
      verified: verifiedSignups,
      byDay,
      totalEvents,
      uniquePages,
    });
  } catch (error) {
    console.error("Analytics stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
