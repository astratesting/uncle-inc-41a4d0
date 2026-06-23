import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Total signups count
    const { count: totalSignups, error: totalError } = await supabase
      .from("signups")
      .select("*", { count: "exact", head: true });

    if (totalError) {
      console.error("Analytics query error:", totalError.message);
      return NextResponse.json({ total: 0, verified: 0, byDay: [] });
    }

    // Verified signups count
    const { count: verifiedSignups } = await supabase
      .from("signups")
      .select("*", { count: "exact", head: true })
      .eq("verified", true);

    // Signups from the last 7 days grouped by day
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: recentSignups, error: recentError } = await supabase
      .from("signups")
      .select("created_at")
      .gte("created_at", sevenDaysAgo.toISOString())
      .order("created_at", { ascending: true });

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const byDayMap: Record<string, number> = {};

    if (!recentError && recentSignups) {
      for (const signup of recentSignups) {
        const day = dayNames[new Date(signup.created_at).getDay()];
        byDayMap[day] = (byDayMap[day] || 0) + 1;
      }
    }

    // Ensure all 7 days are present
    const byDay = dayNames.map((day) => ({
      day,
      count: byDayMap[day] || 0,
    }));

    return NextResponse.json({
      total: totalSignups ?? 0,
      verified: verifiedSignups ?? 0,
      byDay,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
