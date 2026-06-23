import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function handleStats() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const [profilesResult, feedbackResult] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("feedback").select("id", { count: "exact", head: true }),
  ]);

  if (profilesResult.error) {
    return NextResponse.json(
      { error: profilesResult.error.message },
      { status: 500 }
    );
  }

  if (feedbackResult.error) {
    return NextResponse.json(
      { error: feedbackResult.error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    signupCount: profilesResult.count ?? 0,
    feedbackCount: feedbackResult.count ?? 0,
  });
}
