"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  stagger?: number;
  /** Animate immediately on mount instead of waiting for scroll-into-view — use for above-the-fold content like hero headlines. */
  animateOnMount?: boolean;
}

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Splits text into words, each clipped inside an overflow-hidden mask,
 * and reveals them with a staggered upward slide — a signature
 * "cinematic headline" animation.
 *
 * A single motion element on the parent drives the reveal (via variants
 * propagating to each word) rather than giving every word its own
 * whileInView observer — one parent-level trigger is far more reliable
 * than many simultaneous per-word observers.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  as = "span",
  stagger = 0.08,
  animateOnMount = false,
}: TextRevealProps) {
  const words = text.split(" ");
  const MotionTag = motionTags[as];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { delayChildren: delay, staggerChildren: stagger },
    },
  };

  return (
    <MotionTag
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      variants={containerVariants}
      {...(animateOnMount
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once: true, amount: 0.3 } })}
    >
      {words.map((word, i) => (
        <span key={i} className="reveal-mask mr-[0.3em] inline-block">
          <motion.span className="inline-block" variants={wordVariants}>
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
