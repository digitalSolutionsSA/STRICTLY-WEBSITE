"use client";

import { ArrowRight, Salad, Users, UtensilsCrossed } from "lucide-react";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import { GLPhoto } from "@/components/three/gl-photo";
import { GoldButton } from "@/components/ui/gold-button";
import { PlankSign, RusticArt, TornEdge } from "@/components/ui/rustic";
import { siteConfig } from "@/lib/site-config";
import { menuCategories } from "@/lib/menu-data";

const perks = [
  { icon: Salad, title: "Fresh Daily", sub: "Prepared in-house" },
  { icon: Users, title: "Built To Share", sub: "Groups & families" },
  { icon: UtensilsCrossed, title: "Ask About Sizes", sub: "For any table" },
];

const basket = menuCategories.find((c) => c.id === "lunch")?.items.find((i) => i.name === "Basket for 2");

export function Platters() {
  const root = useSectionReveal<HTMLElement>();

  return (
    <section ref={root} id="platters" className="paper paper-burnt relative py-24 lg:py-32">
      <TornEdge side="top" />
      <TornEdge side="bottom" />
      <div className="container-edge grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <div data-sr="fade">
            <PlankSign size="md">From Our Kitchen</PlankSign>
          </div>
          <h2 className="mt-7 text-[clamp(2.6rem,5.6vw,5.2rem)] leading-[0.95]">
            <span className="mask-line script-line">
              <span className="font-script text-[1.15em] text-rust">Sharing</span>
            </span>
            <span className="mask-line">
              <span className="type-heavy letterpress-wood">Platters</span>
            </span>
          </h2>
          <span data-rule className="ink-rule mt-7 max-w-[12rem]" />
          <p data-sr="up" className="mt-7 max-w-md font-serif text-xl leading-relaxed text-ink">
            Generous, shareable platters built for the whole table — perfect for catching up with friends, family lunches, or
            feeding a group without the fuss.
          </p>

          {basket && (
            <div data-sr="up" className="paper-card relative mt-9 max-w-md -rotate-1 p-6">
              <span className="tape -top-3 left-8 -rotate-6" />
              <p className="font-script text-3xl text-rust">Menu favourite</p>
              <div className="mt-1 flex items-baseline gap-2 font-poster uppercase text-ink">
                <span className="text-xl font-medium tracking-[0.03em]">{basket.name}</span>
                <span className="leader" />
                <span className="text-xl text-rust">R{basket.price}</span>
              </div>
              <p className="mt-1 font-serif text-sm italic text-ink-soft">{basket.description}</p>
            </div>
          )}

          <div data-stagger className="mt-10 grid grid-cols-3 gap-4 border-y border-ink/20 py-8">
            {perks.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex flex-col items-center text-center">
                <Icon size={28} strokeWidth={1.2} className="text-rust" />
                <h3 className="mt-3 font-poster text-sm font-medium uppercase tracking-[0.1em] text-ink">{title}</h3>
                <p className="mt-1 font-serif text-xs italic text-ink-soft">{sub}</p>
              </div>
            ))}
          </div>

          <div data-sr="up" className="mt-10 flex flex-wrap gap-4">
            <GoldButton href={siteConfig.phoneHref} magnetic>
              Book a platter <ArrowRight size={14} />
            </GoldButton>
            <GoldButton href="/menu" variant="ink">
              Explore the menu
            </GoldButton>
          </div>
        </div>

        <div className="relative">
          <div className="relative rotate-[1.5deg]">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />
            <GLPhoto
              src="/shop-images/6.jpeg"
              alt="A tray of golden meringue tarts"
              cursor="Taste"
              base="paper"
              className="old-photo h-[380px] sm:h-[520px]"
            />
          </div>
          <RusticArt name="mug" className="absolute -bottom-14 -left-10 hidden w-44 lg:block" />
        </div>
      </div>
    </section>
  );
}
