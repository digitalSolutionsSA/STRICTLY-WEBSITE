"use client";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { Photo } from "@/components/ui/photo";

interface QuoteBannerProps {
  quote?: string[];
  image?: string;
}

/** Full-bleed photo drifting behind a centred gold quote. */
export function QuoteBanner({
  quote = ["Good coffee brings", "good friends together."],
  image = "/shop-images/2.jpeg",
}: QuoteBannerProps) {
  const root = useSectionReveal<HTMLElement>();

  return (
    <section ref={root} className="relative isolate overflow-hidden py-28 sm:py-40">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div data-parallax="10" className="absolute inset-x-0 -inset-y-[12%]">
          <Photo src={image} alt="" className="absolute inset-0" />
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-night/75" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night via-transparent to-night" />

      <div className="container-edge max-w-4xl text-center">
        <span data-sr="zoom" className="block font-serif text-7xl leading-none text-gold">
          “
        </span>
        <blockquote className="type-heavy text-gold-leaf text-[clamp(2rem,5.4vw,4.4rem)] leading-[1.02]">
          {quote.map((line) => (
            <span key={line} className="mask-line">
              <span>{line}</span>
            </span>
          ))}
        </blockquote>
        <div data-sr="fade" data-sr-delay="400" className="ornament mx-auto mt-10 max-w-xs text-xs">
          ✦
        </div>
      </div>
    </section>
  );
}
