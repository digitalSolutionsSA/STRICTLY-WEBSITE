"use client";

import { useState } from "react";
import { CalendarDays, Truck, UtensilsCrossed } from "lucide-react";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import { GLPhoto } from "@/components/three/gl-photo";
import { GoldButton } from "@/components/ui/gold-button";
import { PlankSign, RusticArt, TornEdge } from "@/components/ui/rustic";
import { OrderDialog } from "@/components/order/order-dialog";
import { DELIVERY_AREAS, MEAL_PRICE, orderDays } from "@/lib/order";

export function HomeCookedMeals() {
  const [orderOpen, setOrderOpen] = useState(false);
  const root = useSectionReveal<HTMLElement>();

  return (
    <section ref={root} id="homecooked" className="paper paper-burnt relative py-24 lg:py-32">
      <TornEdge side="top" />
      <TornEdge side="bottom" />
      <div className="container-edge grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="relative order-2 lg:order-1">
          <div className="relative -rotate-[1.5deg]">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2" />
            <GLPhoto
              src="/shop-images/3.jpeg"
              alt="Two coffees served on a tray"
              cursor="Order"
              base="paper"
              className="old-photo h-[380px] sm:h-[520px]"
            />
          </div>
          <RusticArt name="lantern" className="absolute -top-16 -right-10 hidden w-32 xl:block" />
        </div>

        <div className="order-1 lg:order-2">
          <div data-sr="fade">
            <PlankSign size="md">From Our Kitchen</PlankSign>
          </div>
          <h2 className="mt-7 text-[clamp(2.6rem,5.6vw,5.2rem)] leading-[0.95]">
            <span className="mask-line script-line">
              <span className="font-script text-[1.15em] text-rust">Home cooked</span>
            </span>
            <span className="mask-line">
              <span className="type-heavy letterpress-wood">Meals</span>
            </span>
          </h2>
          <span data-rule className="ink-rule mt-7 max-w-[12rem]" />
          <p data-sr="up" className="mt-7 max-w-md font-serif text-xl leading-relaxed text-ink">
            A fresh homecooked plate, Monday to Thursday — pre-order yours for collection or delivery around{" "}
            {DELIVERY_AREAS.join(" and ")}.
          </p>

          <div data-stagger className="mt-10 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <span className="wood grid h-11 w-11 shrink-0 place-items-center rounded-full shadow-[inset_0_0_0_2px_rgb(30_18_8/0.5)]">
                <CalendarDays className="h-5 w-5 text-ivory" strokeWidth={1.4} />
              </span>
              <span className="text-ink-soft">
                {orderDays[0].label} – {orderDays[orderDays.length - 1].label} only,{" "}
                <span className="font-poster text-lg font-medium tracking-wide text-rust">R{MEAL_PRICE}</span> per plate.
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="wood grid h-11 w-11 shrink-0 place-items-center rounded-full shadow-[inset_0_0_0_2px_rgb(30_18_8/0.5)]">
                <Truck className="h-5 w-5 text-ivory" strokeWidth={1.4} />
              </span>
              <span className="text-ink-soft">Free delivery on 5+ plates, within {DELIVERY_AREAS.join(" & ")}.</span>
            </div>
          </div>

          <div data-sr="up" className="mt-10">
            <GoldButton onClick={() => setOrderOpen(true)} variant="ember" size="lg" magnetic>
              <UtensilsCrossed size={16} />
              Order a meal
            </GoldButton>
          </div>
        </div>
      </div>

      <OrderDialog open={orderOpen} onOpenChange={setOrderOpen} />
    </section>
  );
}
