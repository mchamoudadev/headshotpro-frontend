import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// Base URL for your site - update this with your actual domain
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mchamouda.store";


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Headshot Pro Build - Professional AI Headshot Generator",
    template: "%s | Headshot Pro Build"
  },
  description: "Create stunning professional headshots with AI-powered technology. Perfect for LinkedIn, resumes, and professional profiles. Fast, easy, and studio-quality results.",
  keywords: ["AI headshots", "professional headshots", "headshot generator", "LinkedIn photo", "profile picture", "AI photography", "professional photos"],
  authors: [{ name: "Headshot Pro Build" }],
  creator: "Headshot Pro Build",
  publisher: "Headshot Pro Build",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Headshot Pro Build",
    title: "Headshot Pro Build - Professional AI Headshot Generator",
    description: "Create stunning professional headshots with AI-powered technology. Perfect for LinkedIn, resumes, and professional profiles.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Headshot Pro Build - Professional AI Headshot Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Headshot Pro Build - Professional AI Headshot Generator",
    description: "Create stunning professional headshots with AI-powered technology. Perfect for LinkedIn, resumes, and professional profiles.",
    images: ["/twitter-image.png"],
    creator: "@headshotprobuild",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google-site-verification=T8UO4X758lL94T4IBuIYA1NETzsysBT1ELAn_wnClSo", // Add your Google Search Console verification code
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
         attribute="class"
         defaultTheme="system"
         storageKey="headshot-pro-build-theme"
         enableSystem
         disableTransitionOnChange
        >
          <QueryProvider>
            <Toaster />
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
