import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { PostHogProvider } from "@/components/PostHogProvider";
import PostHogPageView from "@/components/PostHogPageView";
import { SessionRecorder } from "@/components/SessionRecorder";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Uncle Inc. — AI-Assisted MVP Development for Startup Founders",
  description:
    "Validate startup ideas and build MVPs faster using AI-assisted prototyping, built-in user testing, and launch analytics — no technical co-founder required.",
  keywords: [
    "MVP development",
    "startup founders",
    "AI prototyping",
    "user testing",
    "launch analytics",
    "no-code MVP",
  ],
  openGraph: {
    title: "Uncle Inc. — AI-Assisted MVP Development for Startup Founders",
    description:
      "Validate startup ideas and build MVPs faster — no technical co-founder required.",
    type: "website",
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
