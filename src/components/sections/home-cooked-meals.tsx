"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Truck, UtensilsCrossed } from "lucide-react";
import { TextReveal } from "@/components/effects/text-reveal";
import { RevealImage } from "@/components/effects/reveal-image";
import { OrderDialog } from "@/components/order/order-dialog";
import { MEAL_PRICE } from "@/lib/order";

export function HomeCookedMeals() {
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <section id="homecooked" className="relative bg-cream-dim py-28 lg:py-36">
      <div className="container-edge grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <RevealImage
          src="/shop-images/5.jpeg"
          alt="Home cooked meal"
          className="order-2 h-[340px] rounded-sm shadow-2xl shadow-espresso/15 sm:h-[420px] lg:order-1"
        />

        <div className="order-1 lg:order-2">
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
            text="Home Cooked Meals"
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
            A fresh homecooked plate, Monday to Thursday — pre-order yours for
            collection or delivery around Three Rivers and Risiville.
          </motion.p>

          <div className="mt-8 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-gold-dark" strokeWidth={1.5} />
              <span className="text-sm text-roast-light">
                Monday – Thursday only, R{MEAL_PRICE} per plate.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-gold-dark" strokeWidth={1.5} />
              <span className="text-sm text-roast-light">
                Free delivery on 5+ plates, within Three Rivers & Risiville.
              </span>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => setOrderOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-ember-dark"
            >
              <UtensilsCrossed className="h-4 w-4" />
              Order A Meal
            </button>
          </div>
        </div>
      </div>

      <OrderDialog open={orderOpen} onOpenChange={setOrderOpen} />
    </section>
  );
}
