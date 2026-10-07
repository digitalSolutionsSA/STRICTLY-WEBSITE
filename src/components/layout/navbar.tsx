"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Menu, Phone, UtensilsCrossed, X } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { primaryNavLinks, siteConfig } from "@/lib/site-config";
import { GoldButton } from "@/components/ui/gold-button";
import { Logo } from "@/components/ui/logo";
import { OrderDialog } from "@/components/order/order-dialog";
import { cn } from "@/lib/utils";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export function Navbar() {
  const header = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const pathname = usePathname();

  useGSAP(
    () => {
      // Slide away while scrolling down, come back on the slightest scroll up.
      const hide = gsap.to(header.current, { yPercent: -110, duration: 0.45, ease: "power3.inOut", paused: true });
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          setScrolled(self.scroll() > 40);
          if (self.scroll() < 120 || self.direction === -1) hide.reverse();
          else hide.play();
        },
      });
    },
    { scope: header },
  );

  return (
    <>
      <header
        ref={header}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,padding,border-color] duration-500",
          // Once scrolled, the bar becomes a walnut shelf plank
          scrolled
            ? "wood-dark border-b border-black/40 py-3 shadow-[0_8px_18px_-8px_rgb(20_12_6/0.7)]"
            : "border-b border-transparent bg-transparent py-5",
        )}
      >
        <div className="container-edge flex items-center justify-between">
          <Link href="/" aria-label={`${siteConfig.name} — home`} className="shrink-0">
            <Logo eager className={cn("transition-[width] duration-500", scrolled ? "w-24 sm:w-28" : "w-28 sm:w-36")} />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
            {primaryNavLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative py-2 text-[0.7rem] font-semibold uppercase tracking-[0.25em] transition-colors",
                    active ? "text-ivory" : "text-ivory/60 hover:text-ivory",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gold transition-transform duration-500 ease-[var(--ease-luxe)]",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <GoldButton onClick={() => setOrderOpen(true)} size="sm" variant="outline" magnetic>
                <UtensilsCrossed size={13} />
                Order a Meal
              </GoldButton>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-ivory hover:bg-white/5 lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOrder={() => {
          setMenuOpen(false);
          setOrderOpen(true);
        }}
      />
      <OrderDialog open={orderOpen} onOpenChange={setOrderOpen} />
    </>
  );
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onOrder: () => void;
}

function MobileMenu({ open, onClose, onOrder }: MobileMenuProps) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(root.current, { visibility: "visible" })
        .fromTo(
          root.current,
          { clipPath: "circle(0% at 100% 0%)" },
          { clipPath: "circle(150% at 100% 0%)", duration: 0.8, ease: "power4.inOut" },
        )
        .from("[data-menu-item]", { yPercent: 110, opacity: 0, stagger: 0.06, duration: 0.7 }, "-=0.35")
        .from("[data-menu-foot]", { opacity: 0, y: 20, duration: 0.5 }, "-=0.4");
    },
    { scope: root },
  );

  useEffect(() => {
    if (open) tl.current?.timeScale(1).play();
    else tl.current?.timeScale(1.6).reverse();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      ref={root}
      className="wood-dark invisible fixed inset-0 z-[60] flex flex-col lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 80% 10%, rgb(205 168 106 / 0.3), transparent 55%)" }}
      />
      <div className="relative flex items-center justify-between px-6 py-5">
        <Logo className="w-28" />
        <button
          type="button"
          onClick={onClose}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-ivory"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="relative flex flex-1 flex-col justify-center gap-2 px-6 sm:px-10" aria-label="Mobile">
        {primaryNavLinks.map((link, i) => (
          <div key={link.href} className="overflow-hidden">
            <Link
              data-menu-item
              href={link.href}
              onClick={onClose}
              className={cn(
                "flex items-baseline gap-4 font-poster text-4xl uppercase leading-tight sm:text-5xl",
                isActive(pathname, link.href) ? "text-ivory" : "text-ivory/50",
              )}
            >
              <span className="font-sans text-xs tracking-widest text-gold">0{i + 1}</span>
              {link.label}
            </Link>
          </div>
        ))}
      </nav>

      <div data-menu-foot className="relative space-y-6 px-6 pb-10 sm:px-10">
        <GoldButton onClick={onOrder} fullWidth size="lg" variant="ember">
          <UtensilsCrossed size={16} />
          Order a Meal
        </GoldButton>
        <div className="flex flex-col gap-3 text-sm text-mist">
          <a href={siteConfig.phoneHref} className="flex items-center gap-2 hover:text-gold">
            <Phone size={15} className="text-gold" /> {siteConfig.phone}
          </a>
          <a href={siteConfig.mapsHref} target="_blank" rel="noreferrer" className="flex items-start gap-2 hover:text-gold">
            <MapPin size={15} className="mt-0.5 shrink-0 text-gold" /> {siteConfig.address}
          </a>
        </div>
      </div>
    </div>
  );
}
