import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Uncle Inc. — Validate Before You Build",
  description:
    "AI-assisted platform that helps founders test startup ideas with real users before writing a single line of code.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-charcoal-900 text-charcoal-200 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}