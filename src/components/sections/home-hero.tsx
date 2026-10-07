"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { introReady, registerAsset } from "@/lib/intro";
import { stats } from "@/lib/site-config";
import { DELIVERY_AREAS, MEAL_PRICE, orderDays } from "@/lib/order";
import type { HeroScene } from "@/components/three/hero-scene";
import { GoldButton } from "@/components/ui/gold-button";
import { cn } from "@/lib/utils";

const AUTOPLAY = 8; // seconds per slide

type Line = { text: string; weight: "thin" | "heavy" };

const SLIDES: { media: { src: string; focusX: number; dim?: number; video?: boolean; poster?: string }; lines: Line[] }[] = [
  {
    media: { src: "/graphics/hero.mp4", poster: "/shop-images/1.jpeg", video: true, focusX: 0.62 },
    lines: [
      { text: "Where friends", weight: "thin" },
      { text: "Meet", weight: "heavy" },
    ],
  },
  {
    media: { src: "/shop-images/1.jpeg", focusX: 0.45 },
    lines: [
      { text: "Hand-crafted", weight: "thin" },
      { text: "Coffee", weight: "heavy" },
    ],
  },
  {
    media: { src: "/shop-images/3.jpeg", focusX: 0.5 },
    lines: [
      { text: "Served with", weight: "thin" },
      { text: "Heart", weight: "heavy" },
    ],
  },
  {
    media: { src: "/shop-images/6.jpeg", focusX: 0.5 },
    lines: [
      { text: "Baked fresh,", weight: "thin" },
      { text: "Every day", weight: "heavy" },
    ],
  },
];

/**
 * WebGL hero: a smoky coffee-pour wipe between the café video and photos,
 * headlines that rise per slide, autoplay pager, layered scroll parallax.
 */
export function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const canvasHost = useRef<HTMLDivElement>(null);
  const scene = useRef<HeroScene | null>(null);
  const [slide, setSlide] = useState(0);
  const busy = useRef(false);
  const first = useRef(true);
  const timer = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ready = registerAsset();
    let alive = true;
    // three.js is loaded on demand so it never blocks the first paint
    import("@/components/three/hero-scene").then(({ HeroScene }) => {
      if (!alive || !canvasHost.current) return;
      scene.current = new HeroScene(
        canvasHost.current,
        SLIDES.map((s) => s.media),
        ready,
      );
      introReady.then(() => alive && scene.current?.intro());
    });
    return () => {
      alive = false;
      ready();
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  const go = useCallback((i: number) => {
    if (busy.current || !root.current) return;
    busy.current = true;
    scene.current?.goTo(i);
    gsap.to(root.current.querySelectorAll("[data-hero-line] > span"), {
      yPercent: -115,
      duration: 0.7,
      stagger: 0.06,
      ease: "power3.in",
      onComplete: () => setSlide(i),
    });
  }, []);

  const startTimer = useCallback(
    (from: number) => {
      timer.current?.kill();
      if (!root.current) return;
      root.current.querySelectorAll("[data-pager-bar]").forEach((el) => gsap.set(el, { scaleX: 0 }));
      const bar = root.current.querySelector(`[data-pager="${from}"] [data-pager-bar]`);
      if (!bar) return;
      timer.current = gsap.fromTo(
        bar,
        { scaleX: 0 },
        { scaleX: 1, duration: AUTOPLAY, ease: "none", onComplete: () => go((from + 1) % SLIDES.length) },
      );
    },
    [go],
  );

  // New headline rises in after each slide change
  useLayoutEffect(() => {
    if (first.current || !root.current) return;
    gsap.fromTo(
      root.current.querySelectorAll("[data-hero-line] > span"),
      { yPercent: 115 },
      { yPercent: 0, duration: 1.1, stagger: 0.08, ease: "expo.out", onComplete: () => void (busy.current = false) },
    );
    startTimer(slide);
  }, [slide, startTimer]);

  // Intro after the preloader lifts, then scroll parallax
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let ctx: gsap.Context | undefined;
    let alive = true;
    introReady.then(() => {
      if (!alive) return;
      ctx = gsap.context(() => {
        if (!prefersReducedMotion()) {
          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .from("[data-hero-eyebrow]", { opacity: 0, x: -30, duration: 1.4 }, 0.2)
            .from("[data-hero-line] > span", { yPercent: 115, duration: 1.6, stagger: 0.12 }, 0.3)
            .from("[data-hero-copy]", { opacity: 0, y: 30, duration: 1.4 }, 0.8)
            .from("[data-hero-cta] > *", { opacity: 0, y: 30, duration: 1.4, stagger: 0.1 }, 0.95)
            .from("[data-hero-card]", { opacity: 0, x: 60, duration: 1.8 }, 0.9)
            .from("[data-hero-spot]", { opacity: 0, y: 30, duration: 1.4, stagger: 0.12 }, 1)
            .from("[data-hero-fade]", { opacity: 0, duration: 1.6 }, 1.2);

          const scrub = { trigger: el, start: "top top", end: "bottom top", scrub: true };
          gsap.to("[data-hero-canvas]", { yPercent: 18, ease: "none", scrollTrigger: scrub });
          // Fade the copy and card away only on desktop, where both sit side by side in one screen.
          gsap.matchMedia().add("(min-width: 1024px)", () => {
            gsap.to("[data-hero-content]", { yPercent: -18, opacity: 0.15, ease: "none", scrollTrigger: scrub });
            gsap.to("[data-hero-card]", { yPercent: -10, opacity: 0.2, ease: "none", scrollTrigger: scrub });
          });
        }
        first.current = false;
        startTimer(0);
      }, el);
    });
    return () => {
      alive = false;
      timer.current?.kill();
      ctx?.revert();
    };
  }, [startTimer]);

  const current = SLIDES[slide];

  return (
    <section ref={root} id="home" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-night">
      <div data-hero-canvas ref={canvasHost} className="absolute inset-0 -z-20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-transparent to-night/60" />
      <div className="absolute inset-0 -z-10 bg-night/35 lg:hidden" />

      <div className="container-edge relative grid items-center gap-14 pt-32 pb-40 lg:grid-cols-[1.4fr_1fr]">
        <div data-hero-content>
          <p data-hero-eyebrow className="eyebrow mb-8 flex items-center gap-5 text-gold">
            Coffee House &amp; Eatery · Three Rivers <span className="h-px w-12 bg-current opacity-70" />
          </p>
          <h1
            className="text-[clamp(3rem,8vw,7.4rem)] leading-[0.92]"
            aria-label={current.lines.map((l) => l.text).join(" ")}
          >
            {current.lines.map((l, i) => (
              <span key={`${slide}-${i}`} data-hero-line aria-hidden className="mask-line">
                <span className={l.weight === "thin" ? "type-thin text-ivory/90" : "type-heavy text-gold-leaf"}>{l.text}</span>
              </span>
            ))}
          </h1>
          <p data-hero-copy className="mt-8 max-w-md font-serif text-lg leading-relaxed text-ivory/80 sm:text-xl">
            Hand-crafted coffee, homecooked meals &amp; sharing platters in the heart of Three Rivers.
          </p>
          <div data-hero-cta className="mt-10 flex flex-wrap items-center gap-4">
            <GoldButton href="/menu" size="lg" magnetic>
              View the menu <ArrowRight size={16} />
            </GoldButton>
            <GoldButton href="/#location" variant="outline" size="lg">
              Visit us
            </GoldButton>
          </div>
        </div>

        <div data-hero-card>
          <KitchenSpotlight />
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-hero-fade
        className="absolute bottom-10 left-6 hidden items-center gap-4 text-[0.6rem] uppercase tracking-[0.45em] text-ivory/60 sm:flex md:left-10 lg:left-16"
      >
        <span className="relative h-14 w-px overflow-hidden bg-ivory/20">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-gold" />
        </span>
        Scroll
      </div>

      {/* Slide pager with autoplay progress */}
      <div
        data-hero-fade
        className="absolute bottom-10 right-6 flex gap-5 md:right-10 lg:right-16"
        role="tablist"
        aria-label="Hero slides"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            data-pager={i}
            role="tab"
            aria-selected={slide === i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => i !== slide && go(i)}
            className={cn(
              "group flex flex-col items-start gap-2 text-[0.65rem] font-semibold tracking-[0.3em] transition-colors",
              slide === i ? "text-gold" : "text-ivory/45 hover:text-ivory",
            )}
          >
            0{i + 1}
            <span className="relative block h-px w-12 bg-ivory/20 sm:w-16">
              <span data-pager-bar className="absolute inset-0 origin-left scale-x-0 bg-gold" />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

const SPOTLIGHTS = [
  {
    href: "/home-cooked-meals",
    image: "/shop-images/3.jpeg",
    kicker: `${orderDays[0].label.slice(0, 3)} – ${orderDays[orderDays.length - 1].label.slice(0, 3)} · R${MEAL_PRICE} a plate`,
    title: "Home Cooked Meals",
    text: `A fresh homecooked plate — collect it, or have it delivered around ${DELIVERY_AREAS.join(" & ")}.`,
    cta: "Pre-order",
  },
  {
    href: "/platters",
    image: "/shop-images/6.jpeg",
    kicker: "Made fresh · Built to share",
    title: "Sharing Platters",
    text: "Generous platters for the whole table — catch-ups, family lunches and everything in between.",
    cta: "Discover",
  },
];

/**
 * "From our kitchen" spotlight: no box, just a gold hairline and soft shade that melt into the
 * hero, so the two features read as part of the scene rather than a card laid on top of it.
 */
function KitchenSpotlight() {
  return (
    <div className="relative">
      {/* Soft pool of shade behind the copy, feathered at every edge so it has no visible boundary */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-night/55 backdrop-blur-[6px] [mask-image:radial-gradient(closest-side,black_55%,transparent)]"
      />
      <span aria-hidden className="absolute inset-y-2 left-0 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent" />

      <div className="pl-8">
        <p data-hero-spot className="eyebrow flex items-center gap-4 text-gold">
          From our kitchen <span className="h-px w-10 bg-current opacity-70" />
        </p>

        <ul className="group/list mt-7 space-y-2">
          {SPOTLIGHTS.map((s) => (
            <li key={s.href} data-hero-spot>
              <Link
                href={s.href}
                data-cursor="Taste"
                className="group flex items-center gap-5 py-4 transition-opacity duration-500 group-hover/list:opacity-45 hover:!opacity-100"
              >
                <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-gold/25 sm:h-28 sm:w-24">
                  {/* eslint-disable-next-line @next/next/no-img-element -- small decorative thumb, already served by the hero */}
                  <img
                    src={s.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-luxe)] group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-night/60 to-transparent" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-gold/80">{s.kicker}</span>
                  <span className="type-heavy text-gold-leaf mt-1.5 block text-2xl sm:text-[1.7rem]">{s.title}</span>
                  <span className="mt-1.5 block max-w-xs font-serif text-[0.95rem] leading-snug text-ivory/70">{s.text}</span>
                  <span className="mt-3 inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-ivory/80 transition-colors group-hover:text-gold-light">
                    <span className="h-px w-5 bg-gold transition-[width] duration-500 ease-[var(--ease-luxe)] group-hover:w-9" />
                    {s.cta}
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p data-hero-spot className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-[0.6rem] uppercase tracking-[0.3em] text-mist">
          {stats.slice(0, 2).map((s) => (
            <span key={s.label}>
              <span className="font-poster text-sm tracking-wide text-gold-light">{s.value}</span> {s.label}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
