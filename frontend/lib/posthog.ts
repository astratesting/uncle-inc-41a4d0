let posthog: { capture: (args: Record<string, unknown>) => void } | null =
  null;

function getClient() {
  if (posthog) return posthog;

  const apiKey = process.env.POSTHOG_API_KEY;
  if (!apiKey) return null;

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PostHog } = require("posthog-node");
    posthog = new PostHog(apiKey, {
      host: process.env.POSTHOG_HOST || "https://app.posthog.com",
    });
    return posthog;
  } catch {
    return null;
  }
}

export async function trackServerEvent(
  event: string,
  distinctId: string,
  properties?: Record<string, unknown>
) {
  const client = getClient();
  if (!client) return;
  client.capture({ event, distinctId, properties });
}
