"use client";

import type { Transition, Variants } from 'motion/react';

/* One motion language for the whole site, lifted from the hero art.
 * EASE is the hero's expo-out; every reveal, draw and drop uses it or the hero spring. */
export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const;
export const SPRING: Transition = { type: 'spring', stiffness: 150, damping: 17 };

/* Viewport settings for scroll-triggered art: play once, a little before fully in view. */
export const VIEW = { once: true, amount: 0.35 } as const;

export const fade = (delay = 0, duration = 0.8): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration, delay } },
});

export const draw = (delay: number, duration = 1.2): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration, delay, ease: 'easeInOut' },
      opacity: { duration: 0.01, delay },
    },
  },
});

export const pop = (delay: number): Variants => ({
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE_SOFT } },
});

/* A block falling into place on the hero spring. `base` offsets the whole sequence, `step` staggers it. */
export const drop = (i: number, base = 0, step = 0.16, from = -56): Variants => ({
  hidden: { opacity: 0, y: from },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.25, delay: base + i * step },
      y: { ...SPRING, delay: base + i * step },
    },
  },
});

/* Rise from below with the hero's blur-in, for HTML content. */
export const rise = (delay = 0, y = 20): Variants => ({
  hidden: { opacity: 0, y, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, delay, ease: EASE } },
});
