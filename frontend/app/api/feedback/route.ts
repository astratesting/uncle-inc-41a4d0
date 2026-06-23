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
    const { response: feedbackResponse, rating } = body;

    if (!feedbackResponse || !feedbackResponse.trim()) {
      return NextResponse.json({ error: "Response is required" }, { status: 400 });
    }

    const ratingNum = typeof rating === "number" ? rating : parseInt(rating, 10);
    if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    const entry = addFeedback(user.id, user.email, feedbackResponse.trim(), ratingNum);

    return NextResponse.json({ success: true, entry });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  const entries = getFeedback();
  const avgRating = entries.length > 0
    ? Math.round((entries.reduce((sum, e) => sum + (e.rating || 0), 0) / entries.length) * 10) / 10
    : 0;
  return NextResponse.json({
    feedback: entries,
    count: entries.length,
    avgRating,
  });
}
