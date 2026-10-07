"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { GLImageOptions } from "./gl-image";

interface GLPhotoProps extends GLImageOptions {
  src: string;
  alt: string;
  className?: string;
  /** Overlay content (text, gradients) drawn above the WebGL canvas */
  children?: ReactNode;
  /** Label shown in the custom cursor disc on hover */
  cursor?: string;
}

/** React wrapper around GLImage: its canvas fills this element; children sit on top. */
export function GLPhoto({ src, alt, className = "", children, cursor, focus, tint, base = "dark" }: GLPhotoProps) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gl: { dispose: () => void } | undefined;
    let alive = true;
    // three.js stays out of the server bundle and the first paint
    import("./gl-image").then(({ GLImage }) => {
      if (!alive || !host.current) return;
      gl = new GLImage(host.current, src, alt, { focus, tint, base });
    });
    return () => {
      alive = false;
      gl?.dispose();
    };
    // alt/focus/tint/base are read once on creation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <div
      ref={host}
      className={`${/\b(absolute|fixed)\b/.test(className) ? "" : "relative"} overflow-hidden ${base === "paper" ? "bg-[#ece0c6]" : "bg-night"} ${className}`}
      data-cursor={cursor}
    >
      {children}
    </div>
  );
}
