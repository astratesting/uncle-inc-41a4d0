import { NextRequest, NextResponse } from "next/server";
import { trackServerEvent } from "@/lib/analytics";

export async function POST(request: NextRequest) {
  try {
    const { event, properties } = await request.json();

    if (!event || typeof event !== "string") {
      return NextResponse.json({ error: "Event name is required" }, { status: 400 });
    }

    await trackServerEvent(event, "client", properties);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics track error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
