"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { assetsSettled, markIntroDone } from "@/lib/intro";
import { Logo } from "@/components/ui/logo";
import { RusticArt } from "@/components/ui/rustic";

/**
 * Opening curtain, styled as the cover of the printed menu: a double-ruled frame, the lantern,
 * daisy jug and mug around the brown logo, and a hand-ruled line that fills as the counter runs
 * to 100 once the hero's pictures are loaded. Then the three panels of the "folded menu" lift away.
 * Rendered on the server too, so the page never flashes before the curtain is up.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    (_, contextSafe) => {
      if (prefersReducedMotion()) {
        markIntroDone();
        setDone(true);
        return;
      }
      // Smooth scroll holds itself until markIntroDone(); this covers touch/native scrolling
      document.documentElement.style.overflow = "hidden";
      const progress = { v: 0 };
      const paint = () => {
        if (count.current) count.current.textContent = String(Math.round(progress.v)).padStart(3, "0");
        if (fill.current) gsap.set(fill.current, { scaleX: progress.v / 100 });
      };

      // The from() tweens below set their hidden starting states immediately, so revealing now can't flash
      const intro = gsap
        .timeline({ onStart: () => gsap.set("[data-pre-inner]", { visibility: "visible" }) })
        .from("[data-pre-frame]", { opacity: 0, scale: 1.03, duration: 1.4, ease: "power3.out" })
        .from("[data-pre-art]", { opacity: 0, y: 30, duration: 1.6, stagger: 0.15, ease: "power3.out" }, 0.1)
        .from("[data-pre-script]", { opacity: 0, y: 16, duration: 1.1, ease: "power3.out" }, 0.25)
        .from("[data-pre-logo]", { clipPath: "inset(0 100% 0 0)", duration: 1.6, ease: "expo.inOut" }, 0.35)
        .from("[data-pre-line]", { scaleX: 0, duration: 1.2, ease: "expo.inOut" }, 1.05)
        .from("[data-pre-meta]", { opacity: 0, y: 10, duration: 0.8 }, 1.3)
        .to(progress, { v: 90, duration: 1.8, ease: "power1.inOut", onUpdate: paint }, 0.5);

      const release = () => {
        document.documentElement.style.overflow = "";
      };

      const finish = contextSafe!(() => {
        gsap
          .timeline({
            onComplete: () => {
              release();
              setDone(true);
            },
          })
          .to(progress, { v: 100, duration: 0.5, onUpdate: paint })
          .to("[data-pre-inner]", { opacity: 0, y: -30, duration: 0.7, ease: "power3.in" })
          .add(markIntroDone)
          .to("[data-pre-panel]", { yPercent: -100, duration: 1.15, stagger: 0.08, ease: "expo.inOut" }, "-=0.2");
      });

      let alive = true;
      // Check for loading assets only after the intro: the page has mounted and registered by then
      new Promise((r) => intro.eventCallback("onComplete", r))
        .then(() => assetsSettled())
        .then(() => alive && finish());
      return () => {
        alive = false;
        release();
      };
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[300]" aria-hidden>
      {/* Three panels of a folded menu, with soft shading along the folds */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          data-pre-panel
          className="paper absolute inset-y-0 w-[34%]"
          style={{
            left: `${i * 33.33}%`,
            boxShadow:
              i === 1
                ? "inset 18px 0 30px -22px rgb(92 58 28 / 0.35), inset -18px 0 30px -22px rgb(92 58 28 / 0.35)"
                : undefined,
          }}
        />
      ))}

      {/* Starts hidden so the server-rendered markup doesn't flash before the intro takes over */}
      <div data-pre-inner className="invisible absolute inset-0">
        {/* Age-burnt edges over the whole sheet */}
        <div className="absolute inset-0 shadow-[inset_0_0_180px_rgb(92_58_28/0.35),inset_0_0_40px_rgb(60_36_16/0.3)]" />

        {/* Double-ruled frame, like the border of the printed menu */}
        <div data-pre-frame className="absolute inset-3 border border-ink/30 sm:inset-6 lg:inset-10">
          <div className="absolute inset-[5px] border border-ink/15" />
          {["left-0 top-0", "right-0 top-0", "left-0 bottom-0", "right-0 bottom-0"].map((pos) => (
            <span key={pos} className={`absolute ${pos} grid h-6 w-6 place-items-center text-[0.7rem] text-rust/70`}>
              ✦
            </span>
          ))}
        </div>

        {/* The menu's own artwork framing the logo (larger screens) */}
        <div data-pre-art className="absolute left-[7%] top-10 hidden w-[clamp(9rem,13vw,15rem)] md:block lg:top-10">
          <RusticArt name="lantern" eager className="w-full" />
        </div>
        <div data-pre-art className="absolute bottom-[7%] right-[6%] hidden w-[clamp(11rem,18vw,20rem)] md:block">
          <RusticArt name="daisies" eager className="w-full" />
        </div>

        <div className="relative grid h-full place-items-center px-8">
          <div className="flex w-[min(640px,80vw)] flex-col items-center gap-5 lg:gap-7">
            <p data-pre-script className="font-script text-[clamp(2.2rem,4.2vw,4.4rem)] leading-none text-rust">
              Where Friends Meet
            </p>
            <div data-pre-logo className="w-full">
              <Logo eager tone="brown" className="w-full" />
            </div>
            <div className="mt-2 w-full">
              <span data-pre-line className="relative block h-px w-full origin-left bg-ink/25">
                <span ref={fill} className="absolute inset-x-0 -top-px block h-[3px] origin-left scale-x-0 bg-rust/80" />
              </span>
              <div
                data-pre-meta
                className="mt-4 flex w-full items-baseline justify-between gap-4 font-poster uppercase text-ink-soft"
              >
                <span className="text-[11px] tracking-[0.25em] sm:text-xs sm:tracking-[0.35em] lg:text-sm">
                  Riversquare Mall · Three Rivers
                </span>
                <span ref={count} className="text-lg tabular-nums tracking-[0.15em] text-rust lg:text-2xl">
                  000
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
