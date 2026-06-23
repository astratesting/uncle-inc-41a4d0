import { promises as fs } from "fs";
import path from "path";

const ANALYTICS_PATH = path.join(process.cwd(), "data", "analytics.jsonl");

export async function trackServerEvent(
  event: string,
  distinctId: string,
  properties?: Record<string, unknown>
) {
  console.log(
    `[ANALYTICS] ${event} | id=${distinctId} | ${JSON.stringify(properties || {})} | ${new Date().toISOString()}`
  );

  try {
    const dir = path.dirname(ANALYTICS_PATH);
    await fs.mkdir(dir, { recursive: true });
    const entry = JSON.stringify({
      event,
      distinctId,
      properties,
      timestamp: new Date().toISOString(),
    });
    await fs.appendFile(ANALYTICS_PATH, entry + "\n");
  } catch {
    // Silently fail — analytics should never break the app
  }
}
