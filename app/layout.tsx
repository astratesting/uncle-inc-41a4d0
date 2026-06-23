import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Uncle Inc. — Coming Soon",
  description:
    "Uncle Inc. is a software development company building digital products and platforms for businesses and consumers.",
  keywords: ["software development", "digital products", "technology solutions", "Uncle Inc."],
  openGraph: {
    title: "Uncle Inc. — Coming Soon",
    description: "Building digital solutions for modern problems.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-soft-white text-dark-text antialiased font-body">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
