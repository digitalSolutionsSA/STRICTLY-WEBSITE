"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Photo } from "@/components/ui/photo";

interface SpotlightProps {
  image?: string;
  heavy?: string;
  thin?: string;
  eyebrow?: string;
  copy?: string;
}

/**
 * Pinned scroll set-piece: while the section is held in place, a circle of light opens over the
 * photo, the two big words split apart, and the closing line rises in.
 */
export function Spotlight({
  image = "/shop-images/1.jpeg",
  heavy = "Freshly",
  thin = "brewed.",
  eyebrow = "Strictly Come Coffee · Three Rivers",
  copy = "Pendant lights, brick and timber, the hiss of the machine — and a cup made the way you like it.",
}: SpotlightProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=180%", scrub: 1, pin: true, anticipatePin: 1 },
      });
      tl.fromTo("[data-spot-photo]", { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", duration: 1 }, 0)
        .fromTo("[data-spot-photo] img", { scale: 1.35 }, { scale: 1, duration: 1 }, 0)
        .fromTo("[data-spot-left]", { xPercent: 0 }, { xPercent: -60, opacity: 0.12, duration: 0.8 }, 0.1)
        .fromTo("[data-spot-right]", { xPercent: 0 }, { xPercent: 60, opacity: 0.12, duration: 0.8 }, 0.1)
        .fromTo("[data-spot-ring]", { opacity: 1 }, { opacity: 0, duration: 0.25 }, 0)
        .from("[data-spot-copy] > *", { yPercent: 60, opacity: 0, stagger: 0.08, duration: 0.35 }, 0.62);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[100svh] overflow-hidden bg-night" aria-label={`${heavy} ${thin}`}>
      <div data-spot-photo className="absolute inset-0" style={{ clipPath: "circle(75% at 50% 50%)" }}>
        <Photo src={image} alt="" className="absolute inset-0" />
        <div className="absolute inset-0 bg-night/45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgb(18_12_8/0.85)_75%)]" />
      </div>

      {/* Warm pinhole of light that marks where the spotlight will open */}
      <span
        data-spot-ring
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-light shadow-[0_0_40px_12px_rgb(205_168_106/0.55)]"
      />

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-[4vmin] px-5">
        <p data-spot-left className="type-heavy text-gold-leaf text-[clamp(3.4rem,14vw,13rem)] leading-none">
          {heavy}
        </p>
        <p data-spot-right className="type-thin text-[clamp(3rem,12vw,11rem)] leading-none text-ivory">
          {thin}
        </p>
      </div>

      <div data-spot-copy className="absolute inset-x-0 bottom-[12vh] mx-auto max-w-2xl px-5 text-center">
        <p className="eyebrow text-gold">{eyebrow}</p>
        <p className="mt-5 font-serif text-2xl leading-snug text-ivory sm:text-3xl">{copy}</p>
      </div>
    </section>
  );
}
