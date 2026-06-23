import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as Parameters<typeof cookieStore.set>[2])
            );
          },
        },
      }
    );

    // Get total signups (from profiles table)
    const { count: totalSignups } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    // Get verified signups
    const { count: verifiedSignups } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("email_verified", true);

    // Get analytics event counts
    const eventTypes = [
      "page_view",
      "signup_started",
      "signup_completed",
      "email_verified",
      "login",
    ];

    const eventCounts: Record<string, number> = {};

    for (const eventType of eventTypes) {
      const { count } = await supabase
        .from("analytics_events")
        .select("*", { count: "exact", head: true })
        .eq("event_type", eventType);

      eventCounts[eventType] = count || 0;
    }

    // Get recent page views (last 7 days)
    const sevenDaysAgo = new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000
    ).toISOString();

    const { count: recentPageViews } = await supabase
      .from("analytics_events")
      .select("*", { count: "exact", head: true })
      .eq("event_type", "page_view")
      .gte("created_at", sevenDaysAgo);

    // Signup funnel: started -> completed -> verified
    const conversionRate =
      eventCounts.signup_started > 0
        ? Math.round(
            (eventCounts.signup_completed / eventCounts.signup_started) * 100
          )
        : 0;

    const verificationRate =
      eventCounts.signup_completed > 0
        ? Math.round(
            (eventCounts.email_verified / eventCounts.signup_completed) * 100
          )
        : 0;

    return NextResponse.json({
      signups: {
        total: totalSignups || 0,
        verified: verifiedSignups || 0,
      },
      events: eventCounts,
      funnel: {
        started: eventCounts.signup_started,
        completed: eventCounts.signup_completed,
        verified: eventCounts.email_verified,
        conversionRate,
        verificationRate,
      },
      recentPageViews: recentPageViews || 0,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
