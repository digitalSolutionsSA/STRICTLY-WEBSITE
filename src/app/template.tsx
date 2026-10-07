"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Remounts on every navigation, so each new page fades up into place. */
export default function Template({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Opacity only: a transform here would break the position:fixed pins of scroll scenes inside the page
      gsap.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out", clearProps: "opacity" });
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
