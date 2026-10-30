/// <reference types="react/canary" />
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";

import { ViewTransition } from "react";

import cn from "clsx";
import { Inter_Tight } from "next/font/google";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smooth-scroll";
import { Cursor } from "@/components/motion";
import { SITE_URL, SITE_DESCRIPTION as DESCRIPTION } from "@/content/site";
import "./globals.css";


const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s - Tom Renard",
    default: "Tom Renard, Senior Product Engineer",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Tom Renard",
    title: "Tom Renard, Senior Product Engineer",
    description: DESCRIPTION,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tom Renard, Senior Product Engineer",
    description: DESCRIPTION,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tom Renard",
  jobTitle: "Senior Product Engineer",
  url: SITE_URL,
  email: "renard.tom35@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Berlin",
    addressCountry: "DE",
  },
  worksFor: { "@type": "Organization", name: "Aroundhome" },
  alumniOf: [
    { "@type": "Organization", name: "EM Normandie" },
    { "@type": "Organization", name: "Le Wagon" },
  ],
  knowsAbout: [
    "React",
    "TypeScript",
    "Next.js",
    "Astro",
    "Go",
    "Product engineering",
    "Web performance",
    "Web accessibility",
    "AI-assisted software engineering",
    "Claude Code",
  ],
  sameAs: [
    "https://github.com/tomrenard",
    "https://www.linkedin.com/in/tom-renard-2021/",
  ],
};

export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#e8e6e1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={cn(sans.variable, "overflow-x-hidden touch-manipulation")}
    >
      <body
        className={cn(
          "w-full",
          "text-[15px] leading-6 md:text-base md:leading-7",
          "text-ink antialiased"
        )}
      >
        <div className="px-(--gutter)">
          <div className="mx-auto max-w-[1440px]">
            <Navbar />
            <main>
              <ViewTransition name="crossfade">
                <article>{children}</article>
              </ViewTransition>
            </main>
            <Footer />
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <SmoothScroll />
        <Cursor />
        <Analytics />
      </body>
    </html>
  );
}
