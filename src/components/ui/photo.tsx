"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface PhotoProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Load immediately (above-the-fold images) */
  priority?: boolean;
  /** Vertical parallax drift in % while the photo scrolls through the viewport (GSAP) */
  parallax?: number;
}

/** Image that fades in once loaded, with optional GSAP parallax. */
export function Photo({ src, alt, className, imgClassName, priority, parallax = 0 }: PhotoProps) {
  const root = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useGSAP(
    () => {
      if (!parallax || prefersReducedMotion()) return;
      const img = root.current?.querySelector("img");
      if (!img) return;
      gsap.fromTo(
        img,
        { yPercent: -parallax },
        {
          yPercent: parallax,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: root, dependencies: [src] },
  );

  // Parallax needs a little extra image above and below so the edges never show
  const bleed = parallax ? { top: `-${parallax}%`, bottom: `-${parallax}%`, height: "auto" } : undefined;

  return (
    <div ref={root} className={cn(!/\b(absolute|fixed)\b/.test(className ?? "") && "relative", "overflow-hidden bg-night-3", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- GSAP drives transforms on this element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        ref={(img) => {
          if (img?.complete) setLoaded(true);
        }}
        style={bleed}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
          loaded ? "opacity-100" : "opacity-0",
          imgClassName,
        )}
      />
    </div>
  );
}
