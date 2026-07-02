"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

/**
 * Image mask reveal — a clip-path "curtain" slides away to reveal the
 * image as it scrolls into view, with a subtle scale-down settle.
 */
export function RevealImage({ src, alt, className, delay = 0 }: RevealImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full bg-cover bg-center bg-roast"
        style={{ backgroundImage: `url('${src}')` }}
        role="img"
        aria-label={alt}
      />
      <motion.div
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay, ease: [0.83, 0, 0.17, 1] }}
        style={{ originY: 0 }}
        className="absolute inset-0 bg-cream"
      />
    </div>
  );
}
