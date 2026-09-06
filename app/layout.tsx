import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";

import { ViewTransition } from "react";

import cn from "clsx";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { WavyBackground } from "@/components/wavy-background";
import "./globals.css";

const SITE_URL = "https://tomrenard.site";
const DESCRIPTION =
  "Senior product engineer in Berlin. Frontend deep, ships across the stack, owns the outcome after the ship.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s - Tom Renard",
    default: "Tom Renard, Senior Product Engineer",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
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
  email: "mailto:renard.tom35@gmail.com",
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
  ],
  sameAs: [
    "https://github.com/tomrenard",
    "https://www.linkedin.com/in/tom-renard-2021/",
  ],
};

export const viewport: Viewport = {
  maximumScale: 1,
  colorScheme: "only light",
  themeColor: "#fcfcfc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden touch-manipulation">
      <body
        className={cn(
          "w-full p-6 sm:p-10 md:p-14",
          "text-sm leading-6 sm:text-[15px] sm:leading-7 md:text-base md:leading-7",
          "text-neutral-900",
          "antialiased"
        )}
      >
        <WavyBackground
          containerClassName="fixed inset-0 z-0 pointer-events-none opacity-50"
          backgroundFill="#fff8f5"
        />
        <div className="fixed h-6 sm:h-10 md:h-14 w-full top-0 left-0 z-30 pointer-events-none content-fade-out" />
        <div className="flex flex-col items-center relative z-10">
          <Navbar />
          <main className="relative flex-1 w-full max-w-2xl [contain:inline-size]">
            <div className="absolute w-full h-px opacity-50 bg-neutral-200 right-0 mix-blend-multiply" />
            <ViewTransition name="crossfade">
              <article className="pl-0 pt-10">{children}</article>
            </ViewTransition>
            <Footer />
          </main>
        </div>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
