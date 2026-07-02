"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { MapPin, Phone, UtensilsCrossed } from "lucide-react";
import { primaryNavLinks, siteConfig } from "@/lib/site-config";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { OrderDialog } from "@/components/order/order-dialog";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "glass-light py-3 shadow-[0_8px_30px_-15px_rgba(27,20,16,0.3)]"
            : "py-6"
        )}
      >
        <div className="container-edge flex items-center justify-between">
          <Link href="/" className="flex items-center z-50">
            <Image
              src={scrolled || open ? "/graphics/logo-black.png" : "/graphics/logo-white.png"}
              alt={`${siteConfig.name} logo`}
              width={260}
              height={150}
              className="h-14 w-auto transition-all duration-300 sm:h-20"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 lg:flex">
            {primaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium uppercase tracking-[0.18em] transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full",
                  scrolled ? "text-roast hover:text-espresso" : "text-cream/90 hover:text-cream"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton
              onClick={() => setOrderOpen(true)}
              className="border border-transparent bg-ember text-xs text-cream hover:bg-ember-dark"
            >
              <UtensilsCrossed className="h-3.5 w-3.5" />
              Order
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className={cn(
                "block h-[1.5px] w-6 transition-colors duration-300",
                open || scrolled ? "bg-espresso" : "bg-cream"
              )}
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className={cn(
                "block h-[1.5px] w-6 transition-colors duration-300",
                open || scrolled ? "bg-espresso" : "bg-cream"
              )}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className={cn(
                "block h-[1.5px] w-6 transition-colors duration-300",
                open || scrolled ? "bg-espresso" : "bg-cream"
              )}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-espresso text-cream lg:hidden"
          >
            <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-10">
              {primaryNavLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl italic text-cream/90 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setOrderOpen(true);
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + primaryNavLinks.length * 0.07, duration: 0.5, ease: "easeOut" }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-cream transition-colors hover:bg-ember-dark"
              >
                <UtensilsCrossed className="h-4 w-4" />
                Order
              </motion.button>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col gap-3 border-t border-cream/10 px-10 py-8 text-sm text-cream/60"
            >
              <a href={siteConfig.phoneHref} className="flex items-center gap-2 hover:text-gold">
                <Phone className="h-4 w-4" /> {siteConfig.phone}
              </a>
              <a href={siteConfig.mapsHref} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold">
                <MapPin className="h-4 w-4" /> {siteConfig.address}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <OrderDialog open={orderOpen} onOpenChange={setOrderOpen} />
    </>
  );
}
