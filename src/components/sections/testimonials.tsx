"use client";

import { useRef } from "react";
import { Star } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { TornEdge } from "@/components/ui/rustic";

const reviews = [
  { initials: "LM", name: "Lerato M.", role: "Regular, Three Rivers", quote: "Our Saturday morning ritual. The Bon Bon is unreal." },
  { initials: "JM", name: "Johan & Marié", role: "Sunday Brunch Regulars", quote: "Best breakfast in Vereeniging, hands down." },
  { initials: "AK", name: "Aisha K.", role: "Local Mom", quote: "The kids love the bubble tea. Cosy spot, 10/10 platters." },
  { initials: "DP", name: "David P.", role: "Riversquare Regular", quote: "Nails the vibe every single time. Never disappoints." },
  { initials: "TN", name: "Thabo N.", role: "Three Rivers Local", quote: "Staff remember your order. It really feels like home." },
  { initials: "SV", name: "Suzette V.", role: "Weekday Regular", quote: "My go-to for a quick espresso before work. Never rushed." },
  { initials: "KR", name: "Karabo R.", role: "Family Sunday Lunch", quote: "Generous platters, friendly service, great for the whole family." },
  { initials: "EB", name: "Elmarie B.", role: "Coffee Snob, Approved", quote: "Finally, coffee in Three Rivers that's actually roasted right." },
];

/**
 * Pinned horizontal track of reviews (desktop): vertical scroll drives the cards sideways while a
 * gold progress line fills and each card tilts upright as it enters. Phones get a native swipe row.
 */
export function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el || prefersReducedMotion()) return;
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 75%" } })
        .from("[data-head-line] > span", { yPercent: 115, rotate: 2, duration: 1.4, stagger: 0.11, ease: "expo.out" })
        .from("[data-head-stars]", { opacity: 0, x: 40, duration: 1.2, ease: "expo.out" }, 0.3);

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 80);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.5}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to(el, { x: () => -distance(), ease: "none" }, 0).fromTo(
          "[data-track-progress]",
          { scaleX: 0 },
          { scaleX: 1, ease: "none" },
          0,
        );

        gsap.utils.toArray<HTMLElement>("[data-track-card]").forEach((card, i) => {
          gsap.fromTo(
            card,
            { rotate: 5, scale: 0.9 },
            {
              // settle a little askew, like notes pinned up by hand
              rotate: i % 2 ? -1.2 : 1,
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: card, containerAnimation: tl, start: "left right", end: "center center", scrub: true },
            },
          );
        });
      });
      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="reviews" className="paper paper-burnt relative overflow-x-clip lg:h-[100svh]">
      <TornEdge side="top" />
      <TornEdge side="bottom" />
      <div className="relative flex h-full flex-col justify-center py-24 lg:py-0">
        <div className="container-edge flex items-end justify-between gap-6">
          {/* GSAP (not data-sr) reveals here: ScrollReveal loses track of elements inside pinned sections */}
          <h2 className="text-[clamp(2.6rem,5.6vw,5.4rem)] leading-[0.95]">
            <span className="mask-line script-line" data-head-line>
              <span className="font-script text-[1.15em] text-rust">Loved by</span>
            </span>
            <span className="mask-line" data-head-line>
              <span className="type-heavy letterpress-wood">Locals</span>
            </span>
          </h2>
          <div data-head-stars className="mb-3 hidden items-center gap-1 text-rust sm:flex" aria-label="Rated five stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
            ))}
            <span className="ml-3 font-poster text-sm uppercase tracking-[0.15em] text-ink-soft">98% recommend us</span>
          </div>
        </div>

        <div className="mt-10 overflow-x-auto pt-4 pb-4[scrollbar-width:none] lg:mt-14 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
          <div
            ref={track}
            className="flex w-max snap-x snap-mandatory gap-6 px-6 md:px-10 lg:snap-none lg:gap-10 lg:px-16"
          >
            {reviews.map((r, i) => (
              <figure
                key={r.name}
                data-track-card
                className="paper-card relative flex w-[78vw] shrink-0 snap-start flex-col justify-between p-8 pt-10 sm:w-[24rem] lg:h-[clamp(20rem,46vh,26rem)] lg:w-[clamp(20rem,26vw,26rem)]"
              >
                <span className={`tape -top-3 left-1/2 -translate-x-1/2 ${i % 2 ? "rotate-2" : "-rotate-3"}`} />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-fell text-7xl leading-none text-rust">“</span>
                    <span className="font-poster text-xs tracking-[0.2em] text-ink/40">No. {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <blockquote className="mt-1 font-fell text-[1.6rem] italic leading-snug text-ink">{r.quote}</blockquote>
                </div>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-dashed border-ink/25 pt-6">
                  <span className="wood grid h-11 w-11 shrink-0 place-items-center rounded-full font-poster text-sm shadow-[inset_0_0_0_2px_rgb(30_18_8/0.5)]">
                    <span className="sign-paint">{r.initials}</span>
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-poster text-base font-medium uppercase tracking-wide text-ink">{r.name}</p>
                    <p className="truncate font-serif text-xs italic text-ink-soft">{r.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5 text-rust">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3 w-3" fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="container-edge mt-12 hidden lg:block">
          <div className="relative h-px bg-ink/15">
            <span data-track-progress className="absolute inset-0 origin-left scale-x-0 bg-rust" />
          </div>
        </div>
      </div>
    </section>
  );
}
