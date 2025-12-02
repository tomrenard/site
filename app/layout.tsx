import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";

// @ts-expect-error
import { ViewTransition } from "react";

import cn from "clsx";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { WavyBackground } from "@/components/wavy-background";
import { CustomCursor } from "@/components/custom-cursor";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s - Tom Renard",
    default: "Tom Renard",
  },
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
        <CustomCursor />
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
        <Analytics />
      </body>
    </html>
  );
}
