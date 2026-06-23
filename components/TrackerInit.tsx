"use client";

import { useEffect } from "react";
import { initTracker } from "@/lib/tracker";

export function TrackerInit() {
  useEffect(() => {
    initTracker();
  }, []);

  return null;
}