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
  title: "Uncle Inc. — Validate Startup Ideas Without a Technical Co-Founder",
  description:
    "Uncle Inc. helps early-stage founders validate startup ideas and ship working MVPs using AI-assisted prototyping, built-in user testing, and launch analytics — no code required.",
  keywords: [
    "MVP development",
    "startup founders",
    "AI prototyping",
    "user testing",
    "launch analytics",
    "no-code MVP",
    "startup validation",
    "early-stage founders",
  ],
  authors: [{ name: "Uncle Inc." }],
  openGraph: {
    title: "Uncle Inc. — Validate Startup Ideas Without a Technical Co-Founder",
    description:
      "AI-assisted prototyping, built-in user testing, and launch analytics. Go from idea to validated MVP — no code required.",
    type: "website",
    siteName: "Uncle Inc.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uncle Inc. — AI-Assisted MVP Development",
    description:
      "Validate startup ideas and ship MVPs faster. AI prototyping, user testing, and analytics — no technical co-founder needed.",
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
