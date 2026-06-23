import { NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/posthog";

export async function POST(request: Request) {
  try {
    const { event, distinctId, properties } = await request.json();

    if (!event || !distinctId) {
      return NextResponse.json(
        { error: "event and distinctId are required" },
        { status: 400 }
      );
    }

    await trackServerEvent(event, distinctId, properties);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}
