import { promises as fs } from "fs";
import path from "path";

const ANALYTICS_PATH = path.join(process.cwd(), "data", "analytics.jsonl");

export async function trackServerEvent(
  event: string,
  distinctId: string,
  properties?: Record<string, unknown>
) {
  // Console logging (always)
  console.log(
    `[ANALYTICS] ${event} | id=${distinctId} | ${JSON.stringify(properties || {})} | ${new Date().toISOString()}`
  );

  // File-based logging (append JSONL)
  try {
    const entry = JSON.stringify({
      event,
      distinctId,
      properties,
      timestamp: new Date().toISOString(),
    });
    await fs.appendFile(ANALYTICS_PATH, entry + "\n");
  } catch {
    // File may not exist yet — try creating it
    try {
      const dir = path.dirname(ANALYTICS_PATH);
      await fs.mkdir(dir, { recursive: true });
      const entry = JSON.stringify({
        event,
        distinctId,
        properties,
        timestamp: new Date().toISOString(),
      });
      await fs.writeFile(ANALYTICS_PATH, entry + "\n");
    } catch {
      // Silently fail — analytics should never break the app
    }
  }
}
