import { NextRequest, NextResponse } from "next/server";
import { addFeedback, getFeedback, getUserByEmail } from "@/lib/store";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = getUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const body = await request.json();
    const { response: feedbackResponse } = body;

    if (!feedbackResponse || !feedbackResponse.trim()) {
      return NextResponse.json({ error: "Response is required" }, { status: 400 });
    }

    const entry = addFeedback(user.id, user.email, feedbackResponse.trim());

    return NextResponse.json({ success: true, entry });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  const entries = getFeedback();
  return NextResponse.json({ feedback: entries, count: entries.length });
}
