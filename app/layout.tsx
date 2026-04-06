import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HAP — Human Authorship Protocol",
  description:
    "The Human Authorship Protocol is a framework for identifying, structuring, and verifying human creative contribution within AI-generated works.",
  keywords: ["human authorship", "AI creativity", "HAP", "authorship protocol", "AI content ownership"],
  openGraph: {
    title: "HAP — Human Authorship Protocol",
    description: "Proving Human Creativity in the Age of AI",
    url: "https://haphuman.xyz",
    siteName: "HAP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HAP — Human Authorship Protocol",
    description: "Proving Human Creativity in the Age of AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
