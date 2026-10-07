import type Lenis from "lenis";

// The one smooth-scroll instance, shared so the preloader can pause it and route changes can reset it.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
