"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Download, ExternalLink } from "lucide-react";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "renard.tom35@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-rule pt-3 pb-4 text-sm leading-5 lg:pb-6">
      <div className="grid-page gap-y-2">
        <p className="col-span-4 text-mute">Contact</p>
        <div className="col-span-4 flex flex-wrap gap-x-6 gap-y-2 lg:col-span-8">
          <button
            onClick={handleCopyEmail}
            className="link flex w-fit items-center gap-1.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink cursor-pointer"
          >
            <span>{copied ? "Copied" : "Copy email"}</span>
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="text-accent"
                >
                  <Check className="w-3 h-3" />
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  <Copy className="w-3 h-3" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <a
            href="https://www.linkedin.com/in/tom-renard-2021/"
            target="_blank"
            rel="noopener noreferrer"
            className="link flex w-fit items-center gap-1.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            LinkedIn
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="/Tom_Renard_Resume.pdf"
            download
            className="link flex w-fit items-center gap-1.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Resume
            <Download className="w-3 h-3" />
          </a>
        </div>
      </div>
      <p aria-hidden className="wordmark mt-16 font-medium lg:mt-24">
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
