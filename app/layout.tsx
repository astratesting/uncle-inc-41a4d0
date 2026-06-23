import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Uncle Inc. — Building Digital Solutions for Modern Problems",
  description:
    "Uncle Inc. is a software development company building digital products and platforms that solve real problems for businesses and consumers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-warm-offwhite text-gray-800 antialiased font-body">
        {children}
      </body>
    </html>
  );
}
