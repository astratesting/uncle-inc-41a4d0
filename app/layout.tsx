import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { PostHogProvider } from "@/components/PostHogProvider";
import PostHogPageView from "@/components/PostHogPageView";
import { SessionRecorder } from "@/components/SessionRecorder";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://uncle-inc.com"
  ),
  title: "Uncle Inc. — Data-Driven Growth for Startup Founders",
  description:
    "Uncle Inc. helps early-stage founders acquire users, optimize funnels, and scale what works through data-driven growth marketing consulting.",
  keywords: [
    "growth marketing",
    "startup founders",
    "user acquisition",
    "startup growth",
    "growth consulting",
    "first users",
    "startup marketing",
    "early-stage founders",
  ],
  authors: [{ name: "Uncle Inc." }],
  openGraph: {
    title: "Uncle Inc. — Data-Driven Growth for Startup Founders",
    description:
      "Growth marketing consulting for startup founders. Acquire users, optimize funnels, and scale what works — powered by data.",
    type: "website",
    siteName: "Uncle Inc.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uncle Inc. — Data-Driven Growth for Startup Founders",
    description:
      "Growth marketing consulting for startup founders. Acquire users, optimize funnels, and scale what works.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-cream text-gray-800 antialiased font-sans">
        <PostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <SessionRecorder />
          {children}
          <Analytics />
        </PostHogProvider>
      </body>
    </html>
  );
}
