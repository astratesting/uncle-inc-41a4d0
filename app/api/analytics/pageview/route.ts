import { NextRequest, NextResponse } from "next/server";
import { appendJSONL } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const { path, referrer, userAgent } = await request.json();

    await appendJSONL("events.jsonl", {
      event: "pageview",
      distinctId: request.headers.get("x-forwarded-for") || "anonymous",
      properties: {
        path: path || "/",
        referrer: referrer || "",
        userAgent: userAgent || "",
      },
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true }); // never block on analytics
  }
}
