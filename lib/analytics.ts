"use client";

export function trackEvent(
  event: string,
  data?: Record<string, unknown>
) {
  fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event,
      path: typeof window !== "undefined" ? window.location.pathname : "/",
      data,
    }),
    keepalive: true,
  }).catch(() => {});
}
