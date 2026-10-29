import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://iplex-usa.vercel.app"),
  title: {
    default: "iPlex — Software Engineering & AI Development",
    template: "%s · iPlex",
  },
  description:
    "Software engineering and AI development for the startups shaping tomorrow.",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
