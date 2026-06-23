type OnboardingEvent =
  | 'signup_started'
  | 'signup_completed'
  | 'verification_sent'
  | 'verification_completed'
  | 'first_login'
  | 'wizard_started'
  | 'wizard_completed'
  | 'prototype_requested'
  | 'prototype_generated'
  | 'dashboard_explored'
  | 'friction_encountered';

export async function trackOnboarding(event: OnboardingEvent, metadata?: Record<string, unknown>) {
  try {
    await fetch('/api/onboarding/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, metadata }),
    });
  } catch {
    console.debug('[Analytics] Failed to track event:', event);
  }
}

export function trackPageView(page: string) {
  if (typeof window !== 'undefined') {
    try {
      fetch('/api/analytics/pageview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, timestamp: Date.now() }),
      }).catch(() => {});
    } catch {
      // silent
    }
  }
}

export async function trackServerEvent(
  event: string,
  distinctId: string,
  properties?: Record<string, unknown>
) {
  try {
    const token = process.env.POSTHOG_API_TOKEN;
    if (!token) return;

    await fetch('https://us.i.posthog.com/capture/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: token,
        event,
        distinct_id: distinctId,
        properties: properties || {},
      }),
    });
  } catch {
    // silent
  }
}
