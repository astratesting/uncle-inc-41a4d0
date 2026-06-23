"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import posthog from "posthog-js";

export function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

    let url = window.origin + pathname;
    if (searchParams.toString()) {
      url += `?${searchParams.toString()}`;
    }

    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}
