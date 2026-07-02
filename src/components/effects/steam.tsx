"use client";

import { motion } from "framer-motion";

interface SteamProps {
  className?: string;
  count?: number;
}

/**
 * Floating coffee steam wisps — looping vertical drift + sway + fade,
 * staggered per wisp for an organic feel.
 */
export function Steam({ className, count = 3 }: SteamProps) {
  const wisps = Array.from({ length: count });

  return (
    <div className={className} aria-hidden="true">
      {wisps.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cream/30 blur-xl"
          style={{
            width: 40 + i * 14,
            height: 100 + i * 30,
            left: `${i * 22}px`,
            bottom: 0,
          }}
          initial={{ opacity: 0, y: 0, x: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.35, 0],
            y: [-20, -160, -260],
            x: [0, i % 2 === 0 ? 24 : -24, 0],
            scale: [0.8, 1.1, 1.4],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2,
          }}
        />
      ))}
    </div>
  );
}
