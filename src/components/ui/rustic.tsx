import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Uneven, slightly warped board outline so no two edges are dead straight
const BOARD_EDGE =
  "polygon(1% 10%, 5% 1%, 32% 5%, 61% 0, 88% 4%, 98.5% 2%, 100% 34%, 98.6% 68%, 100% 92%, 94% 100%, 63% 96%, 30% 100%, 4% 97%, 0 78%, 1.6% 46%)";

const plankSizes = {
  sm: "text-[0.95rem] px-10 py-1.5 tracking-[0.06em]",
  md: "text-xl px-12 py-2 tracking-[0.05em]",
  lg: "text-2xl sm:text-[2rem] px-14 sm:px-16 py-2.5 tracking-[0.04em]",
};

interface PlankSignProps {
  children: ReactNode;
  size?: keyof typeof plankSizes;
  as?: ElementType;
  className?: string;
}

/** Hand-painted wooden sign lashed with rope at both ends — the headings on the printed menu. */
export function PlankSign({ children, size = "md", as: Tag = "span", className }: PlankSignProps) {
  return (
    <Tag
      className={cn("relative inline-flex items-center justify-center font-poster font-medium uppercase", plankSizes[size], className)}
      style={{ filter: "drop-shadow(0 6px 7px rgb(40 24 12 / 0.45))" }}
    >
      <span
        aria-hidden
        className="wood absolute inset-0 shadow-[inset_0_0_0_2px_rgb(30_18_8/0.55),inset_0_3px_5px_rgb(255_220_170/0.18),inset_0_-7px_12px_rgb(0_0_0/0.4)]"
        style={{ clipPath: BOARD_EDGE }}
      />
      <span aria-hidden className="rope left-[0.85em]" />
      <span aria-hidden className="rope right-[0.85em]" />
      <span className="sign-paint relative whitespace-nowrap">{children}</span>
    </Tag>
  );
}

// Deterministic ragged line: a torn-paper silhouette that looks hand-ripped but never changes between renders
const tornPath = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 100; i += 1.25) {
    const y = 6 + Math.sin(i * 1.7) * 3 + Math.sin(i * 0.43) * 4 + Math.sin(i * 5.3) * 1.6;
    pts.push(`${i},${y.toFixed(2)}`);
  }
  return `M0,20 L${pts.join(" L")} L100,20 Z`;
})();

interface TornEdgeProps {
  /** Which edge of the parchment section this sits on */
  side?: "top" | "bottom";
  className?: string;
}

/** Ragged torn-paper edge where a parchment section meets a dark one. Place inside a `relative` section. */
export function TornEdge({ side = "top", className }: TornEdgeProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-x-0 z-10 h-5 w-full sm:h-7",
        side === "top" ? "top-0 -translate-y-[calc(100%-1px)]" : "bottom-0 translate-y-[calc(100%-1px)] rotate-180",
        className,
      )}
      style={{ filter: "drop-shadow(0 -3px 3px rgb(40 24 12 / 0.25))" }}
    >
      <path d={tornPath} fill="var(--color-paper)" />
    </svg>
  );
}

const art = {
  lantern: { src: "/rustic/lantern.webp", w: 430, h: 690 },
  daisies: { src: "/rustic/daisies.webp", w: 650, h: 640 },
  mug: { src: "/rustic/mug.webp", w: 500, h: 320 },
};

interface RusticArtProps {
  name: keyof typeof art;
  className?: string;
  style?: CSSProperties;
  /** Load straight away (above the fold, e.g. the preloader) */
  eager?: boolean;
}

/**
 * Artwork cut from the printed menu (lantern, daisy jug, coffee mug). Multiply-blended so the old
 * paper behind each piece disappears into the page's parchment.
 */
export function RusticArt({ name, className, style, eager }: RusticArtProps) {
  const a = art[name];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- decorative cut-out, blended with CSS
    <img
      src={a.src}
      alt=""
      aria-hidden
      width={a.w}
      height={a.h}
      loading={eager ? "eager" : "lazy"}
      className={cn(
        "pointer-events-none h-auto select-none mix-blend-multiply brightness-[1.12] [mask-image:radial-gradient(closest-side,black_35%,transparent)]",
        className,
      )}
      style={style}
    />
  );
}

/** Strip of green gingham cloth, used as a border between wood and paper. */
export function GinghamStrip({ className }: { className?: string }) {
  return <div aria-hidden className={cn("gingham h-4 w-full shadow-[inset_0_-2px_3px_rgb(0_0_0/0.25)]", className)} />;
}
