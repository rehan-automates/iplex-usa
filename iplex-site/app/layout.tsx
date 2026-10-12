import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@/components/analytics";
import { CookieBanner } from "@/components/cookie-consent";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted variable font: no request to Google at runtime, no layout shift (size-adjusted fallback).
const jakarta = localFont({
  src: [
    { path: "./fonts/PlusJakartaSans-Variable.woff2", weight: "200 800", style: "normal" },
    { path: "./fonts/PlusJakartaSans-Italic-Variable.woff2", weight: "200 800", style: "italic" },
  ],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#F3FAF5",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
