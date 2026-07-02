"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "scc-intro-shown";

/**
 * Full-screen entrance animation: a coffee bean scales in, then the
 * screen splits in two and slides apart to reveal the page underneath.
 * Plays once per browser session and is skipped entirely for
 * prefers-reduced-motion, since both server and client must render the
 * same markup on first paint (guard lives in the effect, not render).
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<"bean" | "split" | "done">("bean");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY);

    if (reduced || alreadyShown) {
      const raf = requestAnimationFrame(() => setPhase("done"));
      return () => cancelAnimationFrame(raf);
    }

    sessionStorage.setItem(STORAGE_KEY, "1");

    const splitTimer = setTimeout(() => setPhase("split"), 750);
    const doneTimer = setTimeout(() => setPhase("done"), 1650);

    return () => {
      clearTimeout(splitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <div className="fixed inset-0 z-[100] overflow-hidden grain" aria-hidden="true">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: phase === "split" ? "-100%" : 0 }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-espresso via-roast to-espresso-light"
          />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: phase === "split" ? "100%" : 0 }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-espresso via-roast to-espresso-light"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
            animate={
              phase === "bean"
                ? { opacity: 1, scale: 1, rotate: 0 }
                : { opacity: 0, scale: 1.3 }
            }
            transition={{
              duration: phase === "bean" ? 0.7 : 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          >
            <BeanIcon className="h-14 w-14 text-gold sm:h-20 sm:w-20" />
            <span className="font-display text-sm italic tracking-[0.3em] text-cream/70 sm:text-base">
              Strictly Come Coffee
            </span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function BeanIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path
        d="M32 4C18 4 6 16 6 32c0 16 12 28 26 28s26-12 26-28C58 16 46 4 32 4Z"
        fill="currentColor"
      />
      <path
        d="M32 8C24 16 24 24 32 32C40 40 40 48 32 56"
        stroke="var(--color-espresso)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
