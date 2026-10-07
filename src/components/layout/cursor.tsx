"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Custom cursor: a small gold dot plus a trailing ring that grows over links and turns into a
 * labelled gold disc over anything with data-cursor="Label" (e.g. "Explore", "Taste", "Drag").
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.body.classList.add("has-cursor");
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3" });

    const move = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const t = e.target as HTMLElement;
      const control = t.closest("a, button, input, textarea, select, label");
      const labelEl = t.closest<HTMLElement>("[data-cursor]");
      // Show the label disc unless the pointer is on a separate control (e.g. a button) inside the labelled area
      const hasLabel = !!labelEl?.dataset.cursor && (!control || control === labelEl || control.contains(labelEl));
      const el = ring.current;
      if (!el) return;
      el.classList.toggle("is-hot", !!control || hasLabel);
      el.classList.toggle("has-label", hasLabel);
      el.dataset.label = hasLabel ? labelEl!.dataset.cursor! : "";
    };
    const down = () => ring.current?.classList.add("is-down");
    const up = () => ring.current?.classList.remove("is-down");

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden />
    </>
  );
}

/** Soft warm light that trails the cursor on desktop. */
export function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glow.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(pointer: fine)").matches) return;

    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { opacity: 1, duration: 1 });
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const leave = () => {
      gsap.to(el, { opacity: 0, duration: 0.6 });
      shown = false;
    };

    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={glow}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[34rem] w-[34rem] rounded-full opacity-0 mix-blend-screen [@media(pointer:fine)]:block"
      style={{ background: "radial-gradient(closest-side, rgb(205 168 106 / 0.12), transparent)" }}
    />
  );
}
