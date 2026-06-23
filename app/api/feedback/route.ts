import { z } from "zod";
import { NextResponse } from "next/server";

const feedbackSchema = z.object({
  rating: z.number().int().min(1).max(5),
  message: z.string().min(1).max(1000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = feedbackSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // In production this would write to a database.
    // For now we acknowledge the submission.
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
