import { NextResponse } from "next/server";
import { getAllUsers } from "@/lib/db";

export async function GET() {
  try {
    const users = await getAllUsers();

    const total = users.length;
    const verified = users.filter((u) => u.verifiedAt !== null).length;

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const byDayMap: Record<string, number> = {};

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    for (const user of users) {
      const created = new Date(user.createdAt);
      if (created >= sevenDaysAgo) {
        const day = dayNames[created.getDay()];
        byDayMap[day] = (byDayMap[day] || 0) + 1;
      }
    }

    const byDay = dayNames.map((day) => ({
      day,
      count: byDayMap[day] || 0,
    }));

    return NextResponse.json({ total, verified, byDay });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
