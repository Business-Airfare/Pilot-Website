"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroMercuryContent() {
  const [email, setEmail] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to waitlist / quote flow
    console.log("Hero email submitted:", email);
  };

  return (
    <div className="flex w-full max-w-4xl flex-col items-center text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="mb-6 text-[clamp(2rem,6.5vw,4.25rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white"
      >
        Radically different <br />
        booking experience
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className="mb-8 w-full max-w-[95vw] text-center"
      >
        <p className="whitespace-nowrap text-[clamp(0.6875rem,2.35vw,1.125rem)] font-normal leading-relaxed text-white/80">
          Premium flights, hotels, and transfers - all arranged in one place.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        className="pointer-events-auto relative w-full max-w-[300px]"
        data-hero-interactive
      >
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <div
              className={cn(
                "relative flex h-9 min-h-[36px] w-full flex-1 items-center gap-1.5 rounded-full border px-1 transition-all duration-300",
                "border-white/30 bg-white/50 backdrop-blur-md",
                isFocused
                  ? "border-white/60 bg-white/70 shadow-sm ring-1 ring-white/30"
                  : "hover:border-white/45 hover:bg-white/60",
              )}
            >
              <label htmlFor="hero-email-input" className="sr-only">
                Enter your email
              </label>
              <input
                id="hero-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter your email"
                className="h-full min-w-0 flex-1 bg-transparent px-3 text-xs font-medium text-slate-900 outline-none placeholder:text-slate-400"
                autoComplete="email"
                required
              />

              <button
                type="submit"
                className="hidden h-7 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-slate-950 px-3.5 text-[11px] font-bold text-white transition-all duration-200 hover:bg-slate-800 active:scale-[0.98] sm:inline-flex"
              >
                Request a quote
              </button>
            </div>

            <button
              type="submit"
              className="flex h-9 w-full items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white transition-all duration-200 hover:bg-slate-800 active:scale-[0.98] sm:hidden"
            >
              Request a quote
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
