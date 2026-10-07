"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis, setLenis } from "@/lib/lenis";
import { introReady } from "@/lib/intro";
import { useScrollRevealPresets } from "@/hooks/use-scroll-reveal-presets";
import "lenis/dist/lenis.css";

/**
 * Lenis smooth scrolling driven by GSAP's ticker (so pinned ScrollTriggers stay in sync),
 * plus the site-wide scroll housekeeping: back to the top (or a #hash) on navigation,
 * ScrollTrigger re-measures once late content lands, and the data-sr ScrollReveal presets.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  useScrollRevealPresets();

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduced,
      anchors: true,
    });
    setLenis(lenis);
    // Hold the page still while the preloader curtain is down
    lenis.stop();
    introReady.then(() => lenis.start());

    lenis.on("scroll", ScrollTrigger.update);
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    const hash = window.location.hash;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      // Let the new page lay out (and pin its scenes) before jumping to the section
      window.setTimeout(() => (lenis ? lenis.scrollTo(target, { offset: -40 }) : target.scrollIntoView()), 350);
    } else if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Lazy pages, fonts and images change the layout after mount.
    const timers = [100, 600, 1500].map((ms) => window.setTimeout(() => ScrollTrigger.refresh(), ms));
    return () => timers.forEach(clearTimeout);
  }, [pathname]);

  return <>{children}</>;
}
