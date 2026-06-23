import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { PostHogProvider } from "@/components/PostHogProvider";
import PostHogPageView from "@/components/PostHogPageView";

export const metadata: Metadata = {
  title: "Uncle Inc. — Data-Driven Marketing for Startup Founders",
  description:
    "Data-driven marketing strategy for early-stage startup founders who struggle with inconsistent customer acquisition and wasted ad spend.",
  keywords: [
    "startup marketing",
    "data-driven marketing",
    "customer acquisition",
    "startup founders",
    "marketing strategy",
  ],
  openGraph: {
    title: "Uncle Inc. — Data-Driven Marketing for Startup Founders",
    description:
      "Data-driven marketing strategy for early-stage startup founders.",
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
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
