"use client";

import { useRef, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { GoldButton } from "@/components/ui/gold-button";
import { Photo } from "@/components/ui/photo";

interface CtaBannerProps {
  title?: string;
  script?: string;
  body?: string;
  image?: string;
  /** Replaces the default buttons */
  actions?: ReactNode;
}

/**
 * Closing call-to-action: an inset gold-framed panel that opens out to full-bleed as you scroll
 * (scrubbed clip-path), photo settling from a zoom, headline lines rising out of masks.
 */
export function CtaBanner({
  title = "Your table is waiting",
  script = "See you soon",
  body = "Hand-crafted coffee, homecooked food and good company — in the heart of Three Rivers.",
  image = "/shop-images/1.jpeg",
  actions,
}: CtaBannerProps) {
  const root = useRef<HTMLElement>(null);
  const words = title.split(" ");
  const half = Math.ceil(words.length / 2);
  const lines = words.length > 3 ? [words.slice(0, half).join(" "), words.slice(half).join(" ")] : [title];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const scrub = { trigger: root.current, start: "top 90%", end: "top 15%", scrub: 1 };
      gsap.fromTo(
        "[data-cta-panel]",
        { clipPath: "inset(12% 9% 12% 9% round 2rem)" },
        { clipPath: "inset(0% 0% 0% 0% round 0rem)", ease: "none", scrollTrigger: scrub },
      );
      gsap.fromTo("[data-cta-photo]", { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: { ...scrub, end: "bottom top" } });
      gsap.from("[data-cta-line] > span", {
        yPercent: 115,
        duration: 1.4,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-cta-copy]", start: "top 80%" },
      });
      gsap.from("[data-cta-fade]", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-cta-copy]", start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative">
      <div
        data-cta-panel
        className="relative isolate flex min-h-[85vh] items-center justify-center overflow-hidden px-5 py-28 text-center sm:px-8"
      >
        <div data-cta-photo className="absolute inset-0 -z-20">
          <Photo src={image} alt="" className="absolute inset-0" />
        </div>
        <div className="absolute inset-0 -z-10 bg-night/70" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,transparent_10%,rgb(18_12_8/0.85)_80%)]" />

        <div data-cta-copy className="max-w-4xl">
          <p data-cta-fade className="font-script text-4xl text-gold sm:text-5xl">
            {script}
          </p>
          <h2 className="mt-5 text-[clamp(2.6rem,7vw,6.4rem)] leading-[0.95]">
            {lines.map((l, i) => (
              <span key={l} data-cta-line className="mask-line">
                <span className={i === 0 && lines.length > 1 ? "type-thin text-ivory" : "type-heavy text-gold-leaf"}>{l}</span>
              </span>
            ))}
          </h2>
          <p data-cta-fade className="mx-auto mt-7 max-w-xl font-serif text-xl text-ivory/80">
            {body}
          </p>
          <div data-cta-fade className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {actions ?? (
              <>
                <GoldButton href="/menu" size="lg" magnetic>
                  View the menu <ArrowRight size={16} />
                </GoldButton>
                <GoldButton href="/#location" variant="outline" size="lg">
                  Plan a visit
                </GoldButton>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
