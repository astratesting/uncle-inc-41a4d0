import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Uncle Inc. — Validate Before You Build",
  description:
    "AI-assisted MVP platform that helps founders test ideas with real users before writing a single line of code.",
  keywords: ["MVP", "startup", "validation", "AI", "prototyping", "user testing"],
  openGraph: {
    title: "Uncle Inc. — Validate Before You Build",
    description:
      "AI-assisted MVP platform that helps founders test ideas with real users before writing code.",
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
      <body className="min-h-screen bg-ink text-gray-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
