import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { trackEvent } from "@/lib/analytics";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const tokenHash = url.searchParams.get("token_hash");
    const type = url.searchParams.get("type");

    if (!tokenHash) {
      return NextResponse.redirect(new URL("/sign-in?error=missing_token", url.origin));
    }

    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

    // Verify the email token
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: (type as "signup" | "email" | "recovery" | "invite") || "signup",
    });

    if (error || !data.user) {
      return NextResponse.redirect(new URL("/sign-in?error=verification_failed", url.origin));
    }

    // Track email verified event
    await trackEvent({
      eventType: "email_verified",
      userId: data.user.id,
      path: "/verify",
    });

    // Redirect to dashboard on successful verification
    return NextResponse.redirect(new URL("/dashboard", url.origin));
  } catch {
    return NextResponse.redirect(new URL("/sign-in?error=verification_failed", new URL(request.url).origin));
  }
}
