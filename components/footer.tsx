"use client";

import React, { useState } from "react";
import { Check, Copy, Download, ExternalLink } from "lucide-react";
import { Scramble } from "@/components/motion";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "renard.tom35@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-rule pt-[11px] text-sm leading-5">
      <div className="grid-page gap-y-2">
        <p className="col-span-4 text-mute">Contact</p>
        <div className="col-span-4 flex flex-wrap gap-x-6 gap-y-2 lg:col-span-8">
          <button
            onClick={handleCopyEmail}
            data-cursor="Copy"
            data-magnetic
            className="link flex w-fit items-center gap-1.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink cursor-pointer"
          >
            <Scramble key={copied ? "c" : "e"}>{copied ? "Copied" : "Copy email"}</Scramble>
            <span key={copied ? "check" : "copy"} className="icon-pop">
              {copied ? (
                <Check className="w-3 h-3 text-accent" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </span>
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Email copied" : ""}
          </span>
          <a
            href="https://www.linkedin.com/in/tom-renard-2021/"
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="link flex w-fit items-center gap-1.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <Scramble>LinkedIn</Scramble>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="/Tom_Renard_Resume.pdf"
            download
            data-magnetic
            className="link flex w-fit items-center gap-1.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <Scramble>Resume</Scramble>
            <Download className="w-3 h-3" />
          </a>
        </div>
      </div>
      <p aria-hidden className="wordmark font-medium">
        <span>
          {[..."Tom Renard"].map((ch, i) => (
            <span
              key={i}
              className="ch"
              style={{ "--i": i } as React.CSSProperties}
            >
              {ch === " " ? "\u00a0" : ch}
            </span>
          ))}
        </span>
      </p>
    </footer>
  );
}
