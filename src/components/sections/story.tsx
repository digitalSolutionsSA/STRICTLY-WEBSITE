"use client";

import { ArrowRight, Heart, Leaf, Sprout, Users } from "lucide-react";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import { GLPhoto } from "@/components/three/gl-photo";
import { GoldButton } from "@/components/ui/gold-button";
import { PlankSign, RusticArt, TornEdge } from "@/components/ui/rustic";

const features = [
  { icon: Sprout, title: "Sourced With Care", sub: "Quality beans" },
  { icon: Heart, title: "Made With Heart", sub: "Crafted to order" },
  { icon: Users, title: "Where Friends Meet", sub: "Good company" },
  { icon: Leaf, title: "A Space To Belong", sub: "Your second home" },
];

/** "More Than Just Coffee" — a parchment page with a calligraphy heading and old taped-in photographs. */
export function Story() {
  const root = useSectionReveal<HTMLElement>();

  return (
    <section ref={root} id="story" className="paper paper-burnt relative py-24 sm:py-32">
      <TornEdge side="top" />
      <TornEdge side="bottom" />
      <RusticArt name="lantern" className="absolute -top-2 right-[3%] hidden w-36 opacity-90 xl:block" />

      <div className="container-edge relative grid items-center gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <div data-sr="fade">
            <PlankSign size="md">Our Story</PlankSign>
          </div>
          <h2 className="mt-6 origin-left -rotate-2 font-script text-[clamp(3.8rem,7.5vw,6.6rem)] leading-[1] text-wood">
            <span className="mask-line script-line">
              <span>More Than</span>
            </span>
            <span className="mask-line script-line" style={{ "--indent": "2.5rem" } as React.CSSProperties}>
              <span>Just Coffee</span>
            </span>
          </h2>
          <span data-rule className="ink-rule mt-6 max-w-sm" />
          <p data-sr="up" className="mt-8 max-w-lg font-serif text-xl leading-relaxed text-ink sm:text-2xl">
            Strictly Come Coffee began with a simple idea — bring people together over great coffee and honest, homecooked
            food.
          </p>
          <p data-sr="up" data-sr-delay="100" className="mt-5 max-w-lg leading-relaxed text-ink-soft">
            Tucked away in Riversquare Mall, Three Rivers, it&apos;s become a favourite spot for locals to slow down, catch up and
            treat themselves — warm, welcoming and unhurried.
          </p>
          <div data-sr="up" data-sr-delay="200" className="mt-10">
            <GoldButton href="/menu" variant="ink">
              See what&apos;s brewing <ArrowRight size={14} />
            </GoldButton>
          </div>
        </div>

        <div className="relative h-[28rem] sm:h-[34rem]">
          <div className="absolute inset-y-0 right-0 w-[74%] rotate-[1.5deg]">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" />
            <GLPhoto
              src="/shop-images/2.jpeg"
              alt="The Strictly Come Coffee dining room, with its floral mural and hanging greenery"
              cursor="Ripple"
              focus={[0.5, 0.45]}
              base="paper"
                className="old-photo h-full w-full"
            />
          </div>
          <div data-parallax="14" className="absolute bottom-[-1.5rem] left-0 h-[56%] w-[50%]">
            <div className="relative h-full w-full -rotate-3">
              <span className="tape -top-3 left-6 rotate-[-8deg]" />
              <GLPhoto
                src="/shop-images/4.jpeg"
                alt="A framed watercolour sketch of the coffee shop counter"
                focus={[0.5, 0.5]}
                base="paper"
                className="old-photo h-full w-full"
              />
            </div>
          </div>
          <div
            data-sr="zoom"
            data-sr-delay="400"
            className="wood absolute right-4 -bottom-8 grid h-28 w-28 place-items-center rounded-full text-center shadow-[0_14px_30px_-10px_rgb(40_24_12/0.8),inset_0_0_0_2px_rgb(30_18_8/0.6),inset_0_0_0_6px_rgb(255_225_180/0.12)] sm:h-32 sm:w-32"
          >
            <div>
              <span className="sign-paint block font-poster text-3xl font-semibold">98%</span>
              <span className="text-[0.55rem] uppercase tracking-[0.25em] text-ivory/80">Recommended</span>
            </div>
          </div>
        </div>
      </div>

      <div data-stagger className="container-edge relative mt-28 grid grid-cols-2 gap-y-10 border-y border-ink/20 py-10 md:grid-cols-4">
        {features.map(({ icon: Icon, title, sub }) => (
          <div key={title} className="group flex flex-col items-center text-center">
            <Icon
              size={34}
              strokeWidth={1.2}
              className="text-rust transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
            />
            <h3 className="mt-4 font-poster text-base font-medium uppercase tracking-[0.12em] text-ink">{title}</h3>
            <p className="mt-1 font-serif text-sm italic text-ink-soft">{sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
