"use client";

const OPENREPLAY_PROJECT_KEY =
  process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY || "";

let started = false;

/**
 * Lazily initialise OpenReplay session recording.
 * Only runs in the browser and only when NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY is set.
 */
export async function initTracker() {
  if (started || typeof window === "undefined" || !OPENREPLAY_PROJECT_KEY) {
    return;
  }

  try {
    // Use a variable path so TypeScript doesn't try to resolve the module at compile time.
    // The package is optional — only needed when NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY is set.
    const pkg = "@openreplay/tracker";
    const { default: Tracker } = await import(pkg);
    const tracker = new Tracker({
      projectKey: OPENREPLAY_PROJECT_KEY,
    });
    tracker.start();
    started = true;
  } catch {
    // OpenReplay not installed or failed to load — degrade gracefully
    console.warn("[tracker] OpenReplay unavailable, session recording disabled.");
  }
}