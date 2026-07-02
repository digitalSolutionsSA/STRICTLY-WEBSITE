"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { TextReveal } from "@/components/effects/text-reveal";
import { cn } from "@/lib/utils";

const avatarColors = [
  "bg-gold text-espresso",
  "bg-ember text-cream",
  "bg-gold-dark text-cream",
  "bg-roast-light text-cream",
  "bg-ember-light text-espresso",
  "bg-gold-light text-espresso",
];

const reviews = [
  {
    initials: "LM",
    name: "Lerato M.",
    role: "Regular, Three Rivers",
    quote: "Our Saturday morning ritual. The Bon Bon is unreal.",
  },
  {
    initials: "JM",
    name: "Johan & Marié",
    role: "Sunday Brunch Regulars",
    quote: "Best breakfast in Vereeniging, hands down.",
  },
  {
    initials: "AK",
    name: "Aisha K.",
    role: "Local Mom",
    quote: "The kids love the bubble tea. Cosy spot, 10/10 platters.",
  },
  {
    initials: "DP",
    name: "David P.",
    role: "Riversquare Regular",
    quote: "Nails the vibe every single time. Never disappoints.",
  },
  {
    initials: "TN",
    name: "Thabo N.",
    role: "Three Rivers Local",
    quote: "Staff remember your order. It really feels like home.",
  },
  {
    initials: "SV",
    name: "Suzette V.",
    role: "Weekday Regular",
    quote: "My go-to for a quick espresso before work. Never rushed.",
  },
  {
    initials: "KR",
    name: "Karabo R.",
    role: "Family Sunday Lunch",
    quote: "Generous platters, friendly service, great for the whole family.",
  },
  {
    initials: "EB",
    name: "Elmarie B.",
    role: "Coffee Snob, Approved",
    quote: "Finally, coffee in Three Rivers that's actually roasted right.",
  },
];

const desktopSlots: CSSProperties[] = [
  { top: "0%", left: "2%" },
  { top: "4%", left: "38%" },
  { top: "0%", left: "68%" },
  { top: "52%", left: "14%" },
  { top: "56%", left: "48%" },
  { top: "50%", left: "68%" },
];

function ReviewBubble({
  review,
  colorClass,
}: {
  review: (typeof reviews)[number];
  colorClass: string;
}) {
  return (
    <div className="glass w-64 rounded-3xl p-5 shadow-2xl shadow-black/30">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold",
            colorClass
          )}
        >
          {review.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-cream">{review.name}</p>
          <p className="truncate text-xs text-cream/50">{review.role}</p>
        </div>
      </div>
      <div className="mt-3 flex gap-0.5 text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3 w-3" fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="mt-2 text-sm leading-snug text-cream/85">&ldquo;{review.quote}&rdquo;</p>
    </div>
  );
}

/**
 * A single position that continuously cycles through random reviews —
 * pop in, hold, fade out, wait, then swap to a different random review.
 */
function BubbleSlot({
  style,
  className,
  active,
  startDelay,
}: {
  style?: CSSProperties;
  className?: string;
  active: boolean;
  startDelay: number;
}) {
  const [reviewIndex, setReviewIndex] = useState(() => Math.floor(Math.random() * reviews.length));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    function popIn() {
      setVisible(true);
      timers.push(setTimeout(popOut, 3400 + Math.random() * 1600));
    }
    function popOut() {
      setVisible(false);
      timers.push(
        setTimeout(() => {
          setReviewIndex((prev) => {
            let next = Math.floor(Math.random() * reviews.length);
            while (next === prev && reviews.length > 1) {
              next = Math.floor(Math.random() * reviews.length);
            }
            return next;
          });
          popIn();
        }, 500 + Math.random() * 500)
      );
    }

    timers.push(setTimeout(popIn, startDelay));

    return () => timers.forEach(clearTimeout);
  }, [active, startDelay]);

  return (
    <div className={className} style={style}>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={reviewIndex}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ReviewBubble review={reviews[reviewIndex]} colorClass={avatarColors[reviewIndex % avatarColors.length]} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Testimonials() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const fieldInView = useInView(fieldRef, { once: true, amount: 0.15 });

  return (
    <section id="reviews" className="relative overflow-hidden bg-roast py-14 lg:py-18 grain">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, var(--color-gold) 0%, transparent 40%), radial-gradient(circle at 80% 70%, var(--color-gold-dark) 0%, transparent 40%)",
        }}
      />

      <div className="container-edge relative">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-lg italic text-gold"
          >
            What People Say
          </motion.span>

          <TextReveal
            text="Loved By Locals"
            as="h2"
            className="mt-2 justify-center font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl"
          />
        </div>

        {/* Wrapper is always rendered (even when a breakpoint variant below is
            hidden) so useInView has a real box to measure on every screen size. */}
        <div ref={fieldRef} className="mt-10">
          {/* Bubbles randomly pop up and fade, replaced by others — large screens */}
          <div className="relative hidden lg:block lg:h-[380px]">
            {desktopSlots.map((pos, i) => (
              <BubbleSlot
                key={i}
                style={pos}
                className="absolute"
                active={fieldInView}
                startDelay={i * 450}
              />
            ))}
          </div>

          {/* Same pop/fade cycle, laid out in a grid — mobile / tablet */}
          <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <BubbleSlot key={i} active={fieldInView} startDelay={i * 450} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
