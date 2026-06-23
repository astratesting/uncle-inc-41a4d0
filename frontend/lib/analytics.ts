"use client";

export async function trackEvent(
  event: string,
  properties?: Record<string, unknown>
) {
  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        distinctId: "anonymous",
        properties,
      }),
    });
  } catch {
    // Silently fail — analytics should never block the UI
  }
}
