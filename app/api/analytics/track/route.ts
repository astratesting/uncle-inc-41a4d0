import { NextResponse } from "next/server";
import { appendToStore } from "@/lib/file-storage";

interface AnalyticsEvent {
  name: string;
  url: string;
  timestamp: string;
  props?: Record<string, string>;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, url, ...props } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Event name is required." },
        { status: 400 }
      );
    }

    const event: AnalyticsEvent = {
      name,
      url: url || "/",
      timestamp: new Date().toISOString(),
      props: Object.keys(props).length > 0 ? props : undefined,
    };

    await appendToStore("analytics", event);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Analytics track error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
