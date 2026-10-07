"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  /** seconds for one full loop */
  speed?: number;
  reverse?: boolean;
  className?: string;
}

/** Endless ticker that speeds up with scroll velocity (GSAP + ScrollTrigger). */
export function Marquee({ items, speed = 40, reverse = false, className }: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!track.current || prefersReducedMotion()) return;

      const loop = gsap.fromTo(
        track.current,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration: speed, ease: "none", repeat: -1 },
      );

      // Kick the ticker forward when the page scrolls fast, then ease back to cruising speed.
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 5);
          gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true });
          gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2, ease: "power2.out" });
        },
      });
    },
    { scope: root, dependencies: [speed, reverse] },
  );

  const row = (hidden: boolean) =>
    items.map((item, i) => (
      <span key={`${hidden}-${i}`} aria-hidden={hidden || undefined} className="flex items-center gap-10 pr-10">
        <span className={cn("whitespace-nowrap text-3xl sm:text-5xl", i % 2 ? "type-thin text-ivory/85" : "type-heavy")}>
          {item}
        </span>
        <span className="text-xl text-gold">✦</span>
      </span>
    ));

  return (
    <div ref={root} className={cn("relative select-none overflow-hidden py-8", className)}>
      <div ref={track} className="flex w-max will-change-transform">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
