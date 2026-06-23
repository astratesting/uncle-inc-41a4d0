import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

interface SignupBody {
  email: string;
  password: string;
  fullName?: string;
}

export async function handleSignup(request: Request) {
  const body = (await request.json()) as SignupBody;
  const { email, password, fullName } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: fullName ? { full_name: fullName } : undefined,
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Create profile row if user was created and session exists (email confirmations off)
  if (data.user && data.session) {
    const { error: profileError } = await supabase.from("profiles").upsert(
      {
        id: data.user.id,
        email: data.user.email!,
        full_name: fullName ?? null,
      },
      { onConflict: "id" }
    );

    if (profileError) {
      console.error("Failed to create profile:", profileError.message);
    }
  }

  return NextResponse.json({
    user: data.user
      ? { id: data.user.id, email: data.user.email }
      : null,
    session: data.session
      ? { access_token: data.session.access_token }
      : null,
    needsEmailConfirmation: !data.session,
  });
}
