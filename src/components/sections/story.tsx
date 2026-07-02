"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Heart, Leaf, Sprout, Users } from "lucide-react";
import { TextReveal } from "@/components/effects/text-reveal";
import { RevealImage } from "@/components/effects/reveal-image";

const milestones = [
  {
    icon: Sprout,
    title: "Sourced With Care",
    text: "We hand-select quality beans and fresh local ingredients, chosen for character and consistency in every cup and plate.",
  },
  {
    icon: Heart,
    title: "Made With Heart",
    text: "Every coffee is crafted to order and every meal is homecooked fresh — nothing rushed, nothing pre-packaged.",
  },
  {
    icon: Users,
    title: "Where Friends Meet",
    text: "Our coffee house in Riversquare Mall has become a gathering place — for catch-ups, quiet mornings and shared platters.",
  },
  {
    icon: Leaf,
    title: "A Space To Belong",
    text: "Warm, welcoming and unhurried — Strictly Come Coffee is designed to feel like a second home in Three Rivers.",
  },
];

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Tracked on an untransformed wrapper — the beans graphic itself is
  // scaled/faded via transform, so its own bounding box wouldn't reliably
  // report intersection. once: false so it replays every time the section
  // scrolls into view, not just the first time.
  const beansRef = useRef<HTMLDivElement>(null);
  const beansInView = useInView(beansRef, { once: false, amount: 0.3 });

  return (
    <section id="story" className="relative bg-cream py-28 lg:py-36">
      {/* Beans exploding out from the center to fill the section */}
      <div
        ref={beansRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <motion.img
          src="/graphics/beans.png"
          alt=""
          initial={{ opacity: 0, scale: 0.05 }}
          animate={
            beansInView
              ? { opacity: 0.32, scale: 1 }
              : { opacity: 0, scale: 0.05 }
          }
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="container-edge relative z-10 grid gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Image stack */}
        <div className="relative h-[420px] sm:h-[520px] lg:h-auto">
          <RevealImage
            src="/shop-images/2.jpeg"
            alt="Strictly Come Coffee interior"
            className="absolute left-0 top-0 h-[78%] w-[78%] rounded-sm shadow-2xl shadow-espresso/20"
          />
          <RevealImage
            src="/shop-images/3.jpeg"
            alt="Freshly brewed coffee"
            delay={0.25}
            className="absolute bottom-0 right-0 h-[55%] w-[55%] rounded-sm border-8 border-cream shadow-2xl shadow-espresso/30"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-6 left-4 flex h-28 w-28 flex-col items-center justify-center rounded-full border border-gold/30 bg-espresso text-center text-cream shadow-xl sm:h-32 sm:w-32"
          >
            <span className="font-display text-3xl font-semibold text-gold">98%</span>
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-cream/70">
              Recommended
            </span>
          </motion.div>
        </div>

        {/* Text + timeline */}
        <div ref={ref} className="flex flex-col">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-lg italic text-gold-dark"
          >
            Our Story
          </motion.span>

          <TextReveal
            text="A Cup Made With Heart"
            as="h2"
            className="mt-2 font-display text-4xl font-medium leading-[1.05] tracking-tight text-espresso sm:text-5xl lg:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-balance text-base leading-relaxed text-roast-light sm:text-lg"
          >
            Strictly Come Coffee began with a simple idea — bring people together
            over great coffee and honest, homecooked food. Tucked away in
            Riversquare Mall, Three Rivers, it&apos;s become a favourite spot for
            locals to slow down, catch up and treat themselves.
          </motion.p>

          {/* Timeline */}
          <div className="relative mt-14 pl-10">
            <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-beige-dark/60" />
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-[7px] top-2 w-px bg-gold"
            />

            <div className="flex flex-col gap-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <span className="absolute -left-10 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-gold bg-cream" />
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-beige text-gold-dark">
                      <m.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-medium text-espresso">
                        {m.title}
                      </h3>
                      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-roast-light">
                        {m.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
