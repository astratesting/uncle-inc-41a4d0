"use client";

import { useEffect, useRef } from "react";

interface RecordedEvent {
  type: string;
  target?: string;
  value?: string;
  x?: number;
  y?: number;
  timestamp: string;
}

export function SessionRecorder() {
  const eventsRef = useRef<RecordedEvent[]>([]);
  const sessionIdRef = useRef<string>(
    typeof window !== "undefined"
      ? `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
      : ""
  );
  const flushTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    function record(type: string, e: Event) {
      const target = e.target as HTMLElement | null;
      const ev: RecordedEvent = {
        type,
        target: target
          ? `${target.tagName}${target.id ? "#" + target.id : ""}${target.className ? "." + target.className.split(" ")[0] : ""}`
          : undefined,
        timestamp: new Date().toISOString(),
      };
      if (type === "click" && "clientX" in e) {
        const me = e as MouseEvent;
        ev.x = me.clientX;
        ev.y = me.clientY;
      }
      if (type === "input" && target && "value" in target) {
        ev.value = "(captured)";
      }
      eventsRef.current.push(ev);
    }

    const handleClick = (e: Event) => record("click", e);
    const handleInput = (e: Event) => record("input", e);

    document.addEventListener("click", handleClick, { passive: true });
    document.addEventListener("input", handleInput, { passive: true });

    // Flush events periodically
    flushTimerRef.current = setInterval(() => {
      if (eventsRef.current.length > 0) {
        const batch = eventsRef.current.splice(0, eventsRef.current.length);
        // Send to both endpoints for compatibility
        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "session_recording",
            path: window.location.pathname,
            data: { sessionId: sessionIdRef.current, events: batch },
          }),
          keepalive: true,
        }).catch(() => {});
        fetch("/api/session-recording", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sessionIdRef.current, events: batch }),
          keepalive: true,
        }).catch(() => {});
      }
    }, 10_000);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("input", handleInput);
      if (flushTimerRef.current) clearInterval(flushTimerRef.current);
      // Final flush
      if (eventsRef.current.length > 0) {
        const batch = eventsRef.current.splice(0, eventsRef.current.length);
        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "session_recording",
            path: window.location.pathname,
            data: { sessionId: sessionIdRef.current, events: batch },
          }),
          keepalive: true,
        }).catch(() => {});
      }
    };
  }, []);

  return null;
}
