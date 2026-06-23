"use client";

/**
 * Track a custom event via the local analytics API.
 * This replaces the Google Analytics approach with privacy-compliant Plausible-style tracking.
 */
export function trackEvent(name: string, props?: Record<string, string>) {
  fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, url: window.location.pathname, ...props }),
  }).catch(() => {
    // Silently fail — analytics should never block user actions
  });
}
