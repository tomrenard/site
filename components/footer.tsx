"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy } from "lucide-react";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "renard.tom35@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="w-full mx-auto py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-neutral-500 font-[family-name:var(--font-family-sans)] tracking-[-0.006em]">
      <div className="w-full h-px opacity-50 bg-neutral-200 mix-blend-multiply absolute top-0 left-0" />
      <div className="flex items-center gap-4">
        <p className="text-sm font-normal">© {new Date().getFullYear()}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleCopyEmail}
          className="group relative flex items-center gap-2 px-3 py-1.5 text-xs font-medium hover:bg-neutral-100 border border-neutral-200 rounded-full transition-colors cursor-pointer font-[family-name:var(--font-family-sans)] tracking-[-0.006em]"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="text-green-600"
              >
                <Check className="w-3.5 h-3.5" />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <Copy className="w-3.5 h-3.5" />
              </motion.span>
            )}
          </AnimatePresence>
          <span>{copied ? "Copied!" : "Email me"}</span>
        </button>
      </div>
    </footer>
  );
}
