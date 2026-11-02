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
  title: "HAP  -  Human Authorship Protocol",
  description:
    "Document the human decisions behind AI-assisted writing, music, and visual art with the Human Authorship Protocol.",
  keywords: ["human authorship", "AI creativity", "HAP", "authorship protocol", "AI content ownership"],
  openGraph: {
    title: "HAP  -  Human Authorship Protocol",
    description: "Leave a trace of the human.",
    url: "https://haphuman.xyz",
    siteName: "HAP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HAP  -  Human Authorship Protocol",
    description: "Leave a trace of the human.",
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
