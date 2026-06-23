import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { readJSONL } from "@/lib/store";

interface AnalyticsEvent {
  event: string;
  distinctId: string;
  properties?: Record<string, unknown>;
  timestamp: string;
}

export async function GET() {
  const admin = await getSessionUser();
  if (!admin || !admin.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Read from both analytics files
  const analyticsEvents = await readJSONL<AnalyticsEvent>("analytics.jsonl");
  const sessionEvents = await readJSONL<AnalyticsEvent>("events.jsonl");
  const allEvents = [...analyticsEvents, ...sessionEvents].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return NextResponse.json({
    events: allEvents,
    count: allEvents.length,
  });
}
