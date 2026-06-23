import { NextResponse } from "next/server";
import { getUserCount } from "@/lib/store";

export async function GET() {
  const count = await getUserCount();
  const target = 10;
  return NextResponse.json({
    count,
    target,
    percentage: Math.min(Math.round((count / target) * 100), 100),
  });
}
