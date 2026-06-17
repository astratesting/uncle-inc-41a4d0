import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Uncle Inc. — AI-Assisted MVP Development",
  description:
    "Validate and launch your startup MVP in days, not months. Uncle Inc. provides AI-powered prototyping, user testing, and launch analytics for early-stage founders.",
  keywords: ["MVP", "startup", "prototyping", "AI", "no-code", "founder", "Uncle Inc."],
  openGraph: {
    title: "Uncle Inc. — AI-Assisted MVP Development",
    description:
      "Validate and launch your startup MVP in days, not months.",
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
      <body className="min-h-screen bg-ink text-[#e4e4ec] antialiased">
        {children}
      </body>
    </html>
  );
}
