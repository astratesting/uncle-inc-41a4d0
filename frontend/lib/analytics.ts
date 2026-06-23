import { createClient } from "@/lib/supabase/server";

export type AnalyticsEventType =
  | "page_view"
  | "signup_started"
  | "signup_completed"
  | "email_verified"
  | "login";

interface TrackEventParams {
  eventType: AnalyticsEventType;
  userId?: string;
  path?: string;
  referrer?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

export async function trackEvent(params: TrackEventParams) {
  try {
    const supabase = await createClient();

    await supabase.from("analytics_events").insert({
      event_type: params.eventType,
      user_id: params.userId || null,
      path: params.path || null,
      referrer: params.referrer || null,
      user_agent: params.userAgent || null,
      metadata: params.metadata || {},
    });
  } catch {
    // Silently fail — analytics should never break the app
  }
}

export function parseRequestMetadata(request: Request) {
  return {
    userAgent: request.headers.get("user-agent") || undefined,
    referrer: request.headers.get("referer") || undefined,
  };
}
