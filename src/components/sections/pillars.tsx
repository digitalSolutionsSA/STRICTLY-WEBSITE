"use client";

import Link from "next/link";
import { ArrowUpRight, Coffee, MapPin, Salad, UtensilsCrossed } from "lucide-react";
import { GLPhoto } from "@/components/three/gl-photo";

const PILLARS = [
  {
    no: "01",
    title: "The Menu",
    text: "Traditional and speciality coffee, freezo's, bubble tea, breakfast and lunch.",
    icon: Coffee,
    image: "/shop-images/3.jpeg",
    href: "/menu",
    focus: [0.5, 0.55] as [number, number],
  },
  {
    no: "02",
    title: "Platters",
    text: "Generous sharing platters, built for the whole table.",
    icon: Salad,
    image: "/shop-images/6.jpeg",
    href: "/platters",
    focus: [0.5, 0.5] as [number, number],
  },
  {
    no: "03",
    title: "Home Cooked",
    text: "A fresh homecooked plate, Monday to Thursday — collect or have it delivered.",
    icon: UtensilsCrossed,
    image: "/shop-images/5.jpeg",
    href: "/home-cooked-meals",
    focus: [0.5, 0.6] as [number, number],
  },
  {
    no: "04",
    title: "Visit Us",
    text: "Riversquare Mall, Three Rivers — a warm welcome and a table waiting.",
    icon: MapPin,
    image: "/shop-images/2.jpeg",
    href: "/#location",
    focus: [0.5, 0.5] as [number, number],
  },
];

/** Four full-height WebGL photo pillars; the hovered one widens (desktop). */
export function Pillars() {
  return (
    <section aria-label="What we offer" className="flex flex-col border-y border-gold/20 lg:h-[78vh] lg:min-h-[34rem] lg:flex-row">
      {/* No data-sr fade here: ScrollReveal's inline transition would override the flex-grow hover
          transition. Each photo's own WebGL wipe-in is the reveal. */}
      {PILLARS.map(({ no, title, text, icon: Icon, image, href, focus }) => (
        <Link
          key={no}
          href={href}
          className="group relative h-[62vh] min-h-[22rem] border-gold/15 transition-[flex-grow] duration-[900ms] ease-[var(--ease-luxe)] lg:h-auto lg:flex-1 lg:border-l lg:first:border-l-0 lg:hover:flex-[1.9]"
        >
          <GLPhoto src={image} alt={title} focus={focus} cursor="Explore" className="absolute inset-0">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/10" />
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-7 sm:p-9">
              <div className="flex items-start justify-between">
                <Icon
                  size={30}
                  strokeWidth={1.1}
                  className="text-gold transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110"
                />
                <span className="font-poster text-sm tracking-[0.3em] text-ivory/60">{no}</span>
              </div>
              <div>
                <span className="mb-5 block h-px w-8 bg-gold transition-[width] duration-700 ease-[var(--ease-luxe)] group-hover:w-20" />
                <h3 className="type-heavy text-gold-leaf text-4xl sm:text-5xl">{title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/75 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-700 lg:group-hover:max-h-24 lg:group-hover:opacity-100">
                  {text}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-gold">
                  Discover{" "}
                  <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </GLPhoto>
        </Link>
      ))}
    </section>
  );
}
