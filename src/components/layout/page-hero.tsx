"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { introReady, registerAsset } from "@/lib/intro";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  /** First line, set in thin italic */
  thin?: string;
  /** Main title, set in heavy gold capitals */
  title: string;
  subtitle?: ReactNode;
  children?: ReactNode;
  /** One or more photos; several cross-fade with the smoky coffee-pour wipe */
  images: string[];
  focusX?: number;
  dim?: number;
}

const SLIDE_SECONDS = 7;

/**
 * Inner-page header on the same WebGL engine as the home hero: warm-graded photo with steam,
 * dust, light sweep and pointer parallax; headline lines rise out of masks; content lifts away on scroll.
 */
export function PageHero({ eyebrow, thin, title, subtitle, children, images, focusX = 0.5, dim }: PageHeroProps) {
  const root = useRef<HTMLElement>(null);
  const canvasHost = useRef<HTMLDivElement>(null);

  // WebGL scene + optional slideshow
  useEffect(() => {
    const ready = registerAsset();
    let alive = true;
    let dispose = () => {};
    import("@/components/three/hero-scene").then(({ HeroScene }) => {
      if (!alive || !canvasHost.current) return;
      const scene = new HeroScene(
        canvasHost.current,
        images.map((src) => ({ src, focusX, dim })),
        ready,
      );
      let i = 0;
      const timer =
        images.length > 1
          ? window.setInterval(() => {
              i = (i + 1) % images.length;
              scene.goTo(i);
            }, SLIDE_SECONDS * 1000)
          : 0;
      introReady.then(() => alive && scene.intro());
      dispose = () => {
        window.clearInterval(timer);
        scene.dispose();
      };
    });
    return () => {
      alive = false;
      ready();
      dispose();
    };
    // images is a static list per page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Intro + scroll parallax
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    let alive = true;
    introReady.then(() => {
      if (!alive) return;
      ctx = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from("[data-hero-eyebrow]", { opacity: 0, x: -30, duration: 1.4 }, 0.1)
          .from("[data-hero-line] > span", { yPercent: 115, duration: 1.5, stagger: 0.12 }, 0.2)
          .from("[data-hero-rule]", { scaleX: 0, duration: 1.4, ease: "expo.inOut" }, 0.6)
          .from("[data-hero-fade]", { opacity: 0, y: 26, duration: 1.3, stagger: 0.1 }, 0.75);

        const scrub = { trigger: el, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-content]", { yPercent: -22, opacity: 0.1, ease: "none", scrollTrigger: scrub });
        gsap.to("[data-hero-canvas]", { yPercent: 18, ease: "none", scrollTrigger: scrub });
      }, el);
    });
    return () => {
      alive = false;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} className="relative isolate flex min-h-[78vh] items-end overflow-hidden bg-night pt-36 pb-20">
      <div data-hero-canvas ref={canvasHost} className="absolute inset-0 -z-20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/85 via-night/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-night to-transparent" />

      <div data-hero-content className="container-edge">
        <p data-hero-eyebrow className="eyebrow mb-7 flex items-center gap-5 text-gold">
          {eyebrow}
          <span className="h-px w-12 bg-current opacity-70" />
        </p>
        <h1 className="max-w-5xl text-[clamp(3rem,8vw,7.4rem)] leading-[0.92]">
          {thin && (
            <span data-hero-line className="mask-line">
              <span className="type-thin text-ivory/90">{thin}</span>
            </span>
          )}
          <span data-hero-line className="mask-line">
            <span className="type-heavy text-gold-leaf">{title}</span>
          </span>
        </h1>
        <span data-hero-rule className="gold-rule mt-8 block max-w-[14rem]" />
        {subtitle && (
          <p data-hero-fade className="mt-7 max-w-xl font-serif text-xl leading-relaxed text-ivory/80 sm:text-2xl">
            {subtitle}
          </p>
        )}
        {children && (
          <div data-hero-fade className="mt-10">
            {children}
          </div>
        )}
      </div>

      <div
        data-hero-fade
        className={cn(
          "absolute bottom-10 right-6 hidden items-center gap-4 text-[0.6rem] uppercase tracking-[0.45em] text-ivory/60 sm:flex md:right-10 lg:right-16",
        )}
      >
        <span className="relative h-14 w-px overflow-hidden bg-ivory/20">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-gold" />
        </span>
        Scroll
      </div>
    </section>
  );
}
