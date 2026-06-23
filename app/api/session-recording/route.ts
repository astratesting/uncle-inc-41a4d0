import { NextRequest, NextResponse } from "next/server";
import { appendJSONL } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const { events, sessionId } = await request.json();

    if (Array.isArray(events)) {
      for (const event of events) {
        await appendJSONL("events.jsonl", {
          event: event.type || "session_event",
          distinctId: sessionId || "anonymous",
          properties: {
            ...event,
            recordedAt: new Date().toISOString(),
          },
          timestamp: event.timestamp || new Date().toISOString(),
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
