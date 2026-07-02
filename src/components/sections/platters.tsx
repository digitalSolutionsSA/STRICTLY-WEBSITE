"use client";

import { motion } from "framer-motion";
import { Salad } from "lucide-react";
import { TextReveal } from "@/components/effects/text-reveal";
import { RevealImage } from "@/components/effects/reveal-image";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Platters() {
  return (
    <section id="platters" className="relative bg-cream py-28 lg:py-36">
      <div className="container-edge grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-lg italic text-gold-dark"
          >
            From Our Kitchen
          </motion.span>

          <TextReveal
            text="Sharing Platters"
            as="h2"
            className="mt-2 font-display text-4xl font-medium leading-[1.05] tracking-tight text-espresso sm:text-5xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-md text-balance text-base leading-relaxed text-roast-light sm:text-lg"
          >
            Generous, shareable platters built for the whole table — perfect for
            catching up with friends, family lunches, or feeding a group without
            the fuss.
          </motion.p>

          <div className="mt-8 flex items-center gap-3">
            <Salad className="h-5 w-5 text-gold-dark" strokeWidth={1.5} />
            <span className="text-sm text-roast-light">
              Fresh ingredients, prepared daily — ask about our platter sizes for groups.
            </span>
          </div>

          <div className="mt-8">
            <MagneticButton
              href="#menu"
              className="inline-flex items-center rounded-full bg-ember px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-ember-dark"
            >
              Explore The Menu
            </MagneticButton>
          </div>
        </div>

        <RevealImage
          src="/shop-images/6.jpeg"
          alt="Sharing platters"
          className="h-[340px] rounded-sm shadow-2xl shadow-espresso/15 sm:h-[420px]"
        />
      </div>
    </section>
  );
}
