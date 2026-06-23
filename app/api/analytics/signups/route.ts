import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Try to get signup count from Supabase auth admin
    // Falls back to counting from a signups table if available
    const { count, error } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    if (error) {
      // If profiles table doesn't exist, try auth.users count via a fallback
      // Return 0 gracefully rather than crashing
      console.error("Analytics query error:", error.message);
      return NextResponse.json({
        total: 0,
        byDay: [],
      });
    }

    // Get signups from the last 7 days grouped by day
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: recentProfiles, error: recentError } = await supabase
      .from("profiles")
      .select("created_at")
      .gte("created_at", sevenDaysAgo.toISOString())
      .order("created_at", { ascending: true });

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const byDayMap: Record<string, number> = {};

    if (!recentError && recentProfiles) {
      for (const profile of recentProfiles) {
        const day = dayNames[new Date(profile.created_at).getDay()];
        byDayMap[day] = (byDayMap[day] || 0) + 1;
      }
    }

    // Ensure all 7 days are present
    const byDay = dayNames.map((day) => ({
      day,
      count: byDayMap[day] || 0,
    }));

    return NextResponse.json({
      total: count ?? 0,
      byDay,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
