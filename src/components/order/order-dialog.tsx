"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, MapPin, Truck, Store, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  DELIVERY_AREAS,
  type DeliveryArea,
  type OrderMethod,
  orderDays,
  nextDateForWeekday,
  formatOrderDate,
  calculateOrderTotal,
  buildWhatsAppOrderLink,
  MEAL_PRICE,
  FREE_DELIVERY_THRESHOLD,
} from "@/lib/order";

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const pillClass = (active: boolean) =>
  cn(
    "flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors",
    active
      ? "border-ember bg-ember/10 text-ember-dark"
      : "border-beige-dark/50 bg-white/40 text-roast-light hover:border-ember/40"
  );

export function OrderDialog({ open, onOpenChange }: OrderDialogProps) {
  const [dayIndex, setDayIndex] = useState<number | null>(null);
  const [plates, setPlates] = useState(1);
  const [method, setMethod] = useState<OrderMethod>("collection");
  const [area, setArea] = useState<DeliveryArea | null>(null);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const days = useMemo(
    () => orderDays.map((d) => ({ ...d, date: nextDateForWeekday(d.weekday) })),
    []
  );

  const isDelivery = method === "delivery";
  const { subtotal, deliveryFee, total } = calculateOrderTotal(plates, method);

  const isValid =
    dayIndex !== null &&
    plates >= 1 &&
    name.trim().length > 1 &&
    whatsapp.replace(/\D/g, "").length >= 9 &&
    (!isDelivery || (area !== null && address.trim().length > 3));

  function reset() {
    setDayIndex(null);
    setPlates(1);
    setMethod("collection");
    setArea(null);
    setAddress("");
    setName("");
    setWhatsapp("");
  }

  function handleSubmit() {
    if (!isValid || dayIndex === null) return;
    const day = days[dayIndex];
    const link = buildWhatsAppOrderLink({
      day: day.label,
      date: day.date,
      plates,
      method,
      area: area ?? undefined,
      address: address || undefined,
      name,
      whatsapp,
    });
    window.open(link, "_blank");
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) reset();
      }}
    >
      <DialogContent
        className="max-h-[88vh] w-full max-w-lg overflow-y-auto border border-gold/20 bg-cream p-0 text-espresso shadow-2xl sm:max-w-lg"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Order a Home Cooked Meal</DialogTitle>

        <div className="relative overflow-hidden border-b border-beige-dark/40 bg-espresso px-6 py-6 text-cream grain sm:px-8">
          <DialogClose
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-cream/70 transition-colors hover:bg-cream/10 hover:text-cream"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </DialogClose>
          <p className="font-display text-lg italic text-gold-light">Home Cooked Meals</p>
          <h2 className="mt-1 font-display text-2xl font-medium sm:text-3xl">Order Your Plate</h2>
          <p className="mt-2 text-sm text-cream/60">Freshly made, Monday to Thursday only.</p>
        </div>

        <div className="flex flex-col gap-7 px-6 py-6 sm:px-8">
          {/* Day picker */}
          <div>
            <label className="text-xs font-medium uppercase tracking-[0.2em] text-roast-light">
              Choose a day
            </label>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {days.map((d, i) => (
                <button
                  key={d.label}
                  type="button"
                  onClick={() => setDayIndex(i)}
                  className={cn("rounded-lg border px-4 py-3 text-left transition-colors", pillClass(dayIndex === i))}
                >
                  <span className="block font-display text-base font-medium">{d.label}</span>
                  <span className="block text-xs">{formatOrderDate(d.date)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Plates */}
          <div>
            <label className="text-xs font-medium uppercase tracking-[0.2em] text-roast-light">
              Plates
            </label>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setPlates((p) => Math.max(1, p - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-beige-dark/50 text-espresso transition-colors hover:border-ember hover:text-ember"
                aria-label="Decrease plates"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-display text-xl font-medium">{plates}</span>
              <button
                type="button"
                onClick={() => setPlates((p) => p + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-beige-dark/50 text-espresso transition-colors hover:border-ember hover:text-ember"
                aria-label="Increase plates"
              >
                <Plus className="h-4 w-4" />
              </button>
              <span className="text-xs text-roast-light">
                R{MEAL_PRICE} each — free delivery on {FREE_DELIVERY_THRESHOLD}+ plates
              </span>
            </div>
          </div>

          {/* Method */}
          <div>
            <label className="text-xs font-medium uppercase tracking-[0.2em] text-roast-light">
              Collection or delivery
            </label>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setMethod("collection")} className={pillClass(method === "collection")}>
                <Store className="h-4 w-4" /> Collection
              </button>
              <button type="button" onClick={() => setMethod("delivery")} className={pillClass(isDelivery)}>
                <Truck className="h-4 w-4" /> Delivery
              </button>
            </div>
          </div>

          {/* Delivery details */}
          <AnimatePresence>
            {isDelivery && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 overflow-hidden"
              >
                <div>
                  <label className="text-xs font-medium uppercase tracking-[0.2em] text-roast-light">
                    Delivery area
                  </label>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {DELIVERY_AREAS.map((a) => (
                      <button key={a} type="button" onClick={() => setArea(a)} className={pillClass(area === a)}>
                        <MapPin className="h-4 w-4" /> {a}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-roast-light/70">
                    We currently only deliver within Three Rivers and Risiville.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-[0.2em] text-roast-light">
                    Street address / complex / unit
                  </label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 12 Nile Drive, Unit 4"
                    className="mt-2 h-11 rounded-lg border-beige-dark/50 bg-white/60 px-3 text-sm"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.2em] text-roast-light">
                Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-2 h-11 rounded-lg border-beige-dark/50 bg-white/60 px-3 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.2em] text-roast-light">
                WhatsApp number
              </label>
              <Input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="082 123 4567"
                className="mt-2 h-11 rounded-lg border-beige-dark/50 bg-white/60 px-3 text-sm"
              />
            </div>
          </div>

          {/* Total */}
          <div className="rounded-xl border border-gold/25 bg-beige/50 p-5">
            <div className="flex justify-between text-sm text-roast-light">
              <span>Subtotal</span>
              <span>R{subtotal}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm text-roast-light">
              <span>Delivery fee</span>
              <span>{isDelivery ? `R${deliveryFee}` : "—"}</span>
            </div>
            <div className="mt-3 flex justify-between border-t border-gold/20 pt-3 font-display text-lg font-medium text-espresso">
              <span>Total</span>
              <span>R{total}</span>
            </div>
          </div>

          <button
            type="button"
            disabled={!isValid}
            onClick={handleSubmit}
            className="w-full rounded-full bg-ember px-6 py-4 text-center text-sm font-medium uppercase tracking-[0.15em] text-cream transition-colors hover:bg-ember-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send Order via WhatsApp
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
