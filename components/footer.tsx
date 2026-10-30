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
    <footer className="border-t border-rule pt-3 pb-8 text-sm">
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:grid-cols-4">
        <p className="text-mute">Contact</p>
        <button
          onClick={handleCopyEmail}
          className="group relative cursor-pointer flex w-fit items-center gap-1.5 underline decoration-1 underline-offset-4 hover:decoration-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
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
          className="flex w-fit items-center gap-1.5 underline decoration-1 underline-offset-4 hover:decoration-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          LinkedIn
          <ExternalLink className="w-3 h-3" />
        </a>
        <a
          href="/Tom_Renard_Resume.pdf"
          download
          className="flex w-fit items-center gap-1.5 underline decoration-1 underline-offset-4 hover:decoration-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Resume
          <Download className="w-3 h-3" />
        </a>
      </div>
    </footer>
  );
}
