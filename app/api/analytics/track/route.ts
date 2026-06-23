import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const ANALYTICS_PATH = path.join(process.cwd(), "data", "analytics.json");

export async function POST(request: NextRequest) {
  try {
    const { event, path: eventPath, data } = await request.json();

    if (!event || typeof event !== "string") {
      return NextResponse.json({ error: "Event name is required" }, { status: 400 });
    }

    const entry = {
      event,
      path: eventPath || "/",
      data: data || {},
      ip: request.headers.get("x-forwarded-for") || "anonymous",
      userAgent: request.headers.get("user-agent") || "",
      timestamp: new Date().toISOString(),
    };

    try {
      const dir = path.dirname(ANALYTICS_PATH);
      await fs.mkdir(dir, { recursive: true });

      let events: typeof entry[] = [];
      try {
        const raw = await fs.readFile(ANALYTICS_PATH, "utf-8");
        events = JSON.parse(raw);
      } catch {
        events = [];
      }

      events.push(entry);
      await fs.writeFile(ANALYTICS_PATH, JSON.stringify(events, null, 2));
    } catch {
      // Silently fail
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}

export async function GET() {
  try {
    const raw = await fs.readFile(ANALYTICS_PATH, "utf-8");
    const events = JSON.parse(raw);
    return NextResponse.json({ events, count: events.length });
  } catch {
    return NextResponse.json({ events: [], count: 0 });
  }
}
