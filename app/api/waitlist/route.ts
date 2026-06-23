import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return Response.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase.from("signups").upsert(
      {
        email: email.toLowerCase().trim(),
        signup_source: "waitlist",
        verified: false,
      },
      { onConflict: "email" }
    );

    if (error) {
      console.error("Waitlist insert error:", error.message);
      // Still return success to the user — don't leak DB errors
    }

    return Response.json({
      message: "You're on the list! We'll be in touch soon.",
    });
  } catch {
    return Response.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
