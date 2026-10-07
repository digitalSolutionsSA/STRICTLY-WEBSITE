"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ink" | "ghost" | "ember";
type Size = "sm" | "md" | "lg";

interface GoldButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  /** Button gently follows the cursor on hover (desktop only) */
  magnetic?: boolean;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  // A walnut plank with painted lettering, like the menu's signs; a soft sheen sweeps across on hover
  primary:
    "wood sign-paint shadow-[0_12px_28px_-12px_rgb(40_24_12/0.85),inset_0_0_0_1px_rgb(30_18_8/0.6),inset_0_1px_0_rgb(255_225_180/0.25)] hover:brightness-115 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0",
  // For dark wood / photo backgrounds
  outline: "border border-ivory/45 text-ivory hover:border-ivory hover:bg-ivory/10",
  // For parchment backgrounds
  ink: "border-[1.5px] border-ink/45 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  ghost: "text-ivory/80 hover:text-ivory",
  // The brand's roasted orange, for ordering
  ember:
    "bg-ember text-cream hover:bg-ember-dark shadow-[0_10px_40px_-12px_rgb(217_98_43/0.8)] before:bg-gradient-to-r before:from-white/0 before:via-white/30 before:to-white/0",
};

const sizes: Record<Size, string> = {
  sm: "text-[0.68rem] px-5 py-2.5 gap-2",
  md: "text-xs px-7 py-3.5 gap-2.5",
  lg: "text-sm px-9 py-4 gap-3",
};

export function GoldButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled,
  magnetic = false,
  className,
  external,
  ariaLabel,
  fullWidth = false,
}: GoldButtonProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      if (!magnetic || !wrap || prefersReducedMotion() || !matchMedia("(pointer: fine)").matches) return;

      const xTo = gsap.quickTo(wrap, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      const yTo = gsap.quickTo(wrap, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      const move = (e: PointerEvent) => {
        const r = wrap.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      wrap.addEventListener("pointermove", move);
      wrap.addEventListener("pointerleave", leave);
      return () => {
        wrap.removeEventListener("pointermove", move);
        wrap.removeEventListener("pointerleave", leave);
      };
    },
    { dependencies: [magnetic] },
  );

  const classes = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold uppercase tracking-[0.2em] whitespace-nowrap",
    "transition-[background-color,border-color,color,box-shadow,opacity,filter] duration-300",
    // light sweep on hover
    "before:absolute before:inset-0 before:-translate-x-full before:transition-transform before:duration-700 before:ease-[var(--ease-luxe)] hover:before:translate-x-full",
    "disabled:pointer-events-none disabled:opacity-40",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  const content = <span className="relative z-10 inline-flex items-center gap-[inherit]">{children}</span>;

  let element: ReactNode;
  if (href && !external && !href.startsWith("tel:") && !href.startsWith("mailto:")) {
    element = (
      <Link href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  } else if (href) {
    element = (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  } else {
    element = (
      <button type={type} className={classes} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
        {content}
      </button>
    );
  }

  return (
    <span ref={wrapRef} className={cn(fullWidth ? "block w-full" : "inline-block", "will-change-transform")}>
      {element}
    </span>
  );
}
