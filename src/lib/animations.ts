// Shared GSAP animation constants — used across every page for consistency

export const EASE = {
  out: "power2.out",
  inOut: "power2.inOut",
  back: "back.out(1.4)",
} as const;

export const DUR = {
  fast: 0.4,
  base: 0.6,
  slow: 0.9,
} as const;

export const SCROLL_TRIGGER_DEFAULTS = {
  start: "top 78%",
  toggleActions: "play none none reverse" as const,
};

export const fadeUp = (delay = 0) => ({
  from: { opacity: 0, y: 40 },
  to: { opacity: 1, y: 0, duration: DUR.base, ease: EASE.out, delay },
});

export const fadeIn = (delay = 0) => ({
  from: { opacity: 0 },
  to: { opacity: 1, duration: DUR.base, ease: EASE.out, delay },
});

export const scaleIn = (delay = 0) => ({
  from: { opacity: 0, scale: 0.92 },
  to: { opacity: 1, scale: 1, duration: DUR.slow, ease: EASE.out, delay },
});
