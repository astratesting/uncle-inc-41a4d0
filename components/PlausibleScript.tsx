"use client";

import Script from "next/script";

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "uncle-inc.com";
const PLAUSIBLE_SRC = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "";

export function PlausibleScript() {
  // In test/dev mode, use a self-hosted or local plausible instance
  // In production, use the configured plausible source
  if (!PLAUSIBLE_SRC && process.env.NODE_ENV !== "production") {
    return null;
  }

  const src = PLAUSIBLE_SRC || `https://plausible.io/js/script.js`;

  return (
    <Script
      defer
      data-domain={PLAUSIBLE_DOMAIN}
      src={src}
      strategy="afterInteractive"
    />
  );
}
