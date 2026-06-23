import type { Metadata } from "next";
import { PlausibleScript } from "@/components/PlausibleScript";
import "./globals.css";

export const metadata: Metadata = {
  title: "Uncle Inc. — Build Your Next Digital Platform",
  description:
    "Uncle Inc. is a software development company building digital products and platforms for businesses and consumers.",
  keywords: ["software development", "digital products", "technology solutions", "Uncle Inc."],
  openGraph: {
    title: "Uncle Inc. — Build Your Next Digital Platform",
    description: "Building digital products and platforms for businesses and consumers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink text-white antialiased font-body">
        {children}
        <PlausibleScript />
      </body>
    </html>
  );
}
