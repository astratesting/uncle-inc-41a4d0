"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

let initialized = false;

function initPostHog() {
  if (typeof window !== "undefined" && !initialized) {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (key) {
      posthog.init(key, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
        capture_pageview: false,
        person_profiles: "identified_only",
      });
      initialized = true;
    }
  }
}

export function trackPageview(url: string) {
  if (typeof window !== "undefined" && initialized) {
    posthog.capture("$pageview", { $current_url: url });
  }
}

export function trackSignup(email: string) {
  if (typeof window !== "undefined") {
    if (initialized) {
      posthog.capture("waitlist_signup", { email });
    }
    // Also track via local analytics
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "waitlist_signup", url: window.location.pathname, email }),
    }).catch(() => {});
  }
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    initPostHog();
  }, []);

  useEffect(() => {
    if (initialized) {
      trackPageview(pathname);
    }
  }, [pathname]);

  return <>{children}</>;
}
