import { NextResponse } from "next/server";
import { getStats, getVerifiedUsers, getFeedback } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const stats = getStats();
  const users = getVerifiedUsers();
  const feedback = getFeedback();

  return NextResponse.json({
    ...stats,
    users,
    feedbackCount: feedback.length,
  });
}
