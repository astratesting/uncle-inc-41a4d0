import type { Metadata } from "next";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "Uncle Inc. — Where Ideas Meet Execution",
  description:
    "Uncle Inc. is a software development company building digital products and platforms that solve modern problems for businesses and consumers.",
  keywords: ["software development", "digital products", "technology solutions", "Uncle Inc."],
  openGraph: {
    title: "Uncle Inc. — Where Ideas Meet Execution",
    description: "Building digital products and platforms that solve modern problems.",
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
      <body className="min-h-screen bg-ivory text-charcoal antialiased font-body">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
