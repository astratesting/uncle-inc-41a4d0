import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { promises as fs } from "fs";
import path from "path";
import { readJSONL } from "@/lib/store";

interface AnalyticsEvent {
  event: string;
  distinctId?: string;
  path?: string;
  data?: Record<string, unknown>;
  properties?: Record<string, unknown>;
  timestamp: string;
}

export async function GET() {
  const admin = await getSessionUser();
  if (!admin || !admin.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const analyticsPath = path.join(process.cwd(), "data", "analytics.json");

  // Read structured JSON analytics
  let jsonEvents: AnalyticsEvent[] = [];
  try {
    const raw = await fs.readFile(analyticsPath, "utf-8");
    jsonEvents = JSON.parse(raw);
  } catch {
    jsonEvents = [];
  }

  // Read JSONL analytics
  const jsonlEvents = await readJSONL<AnalyticsEvent>("analytics.jsonl");
  const sessionEvents = await readJSONL<AnalyticsEvent>("events.jsonl");

  const allEvents = [...jsonEvents, ...jsonlEvents, ...sessionEvents].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return NextResponse.json({
    events: allEvents,
    count: allEvents.length,
  });
}
