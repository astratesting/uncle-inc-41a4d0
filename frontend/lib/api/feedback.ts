import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

interface FeedbackBody {
  type: "bug" | "feature" | "general";
  message: string;
  page?: string;
}

export async function handleFeedbackSubmit(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const body = (await request.json()) as FeedbackBody;
  const { type, message, page } = body;

  if (!type || !message) {
    return NextResponse.json(
      { error: "Type and message are required." },
      { status: 400 }
    );
  }

  const validTypes = ["bug", "feature", "general"];
  if (!validTypes.includes(type)) {
    return NextResponse.json(
      { error: "Type must be one of: bug, feature, general." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("feedback")
    .insert({
      user_id: user.id,
      type,
      message,
      page: page ?? null,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}

export async function handleFeedbackRetrieve() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("feedback")
    .select("id, type, message, page, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ feedback: data });
}
