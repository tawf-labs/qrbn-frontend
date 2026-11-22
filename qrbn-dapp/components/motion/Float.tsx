"use client";

import React, { useRef } from 'react';
import { useInViewLoop, useLoopClock } from './useInViewLoop';

/* A slow ambient float: the child eases up and back down on a sine, only transform is animated.
 * Works for html (`as="div"`) and inside an svg (`as="g"`). Pauses offscreen, stays still under reduced motion.
 * `run` lets a parent gate it further (for example until an intro has finished); `delay` is in seconds. */
export default function Float({
  as = 'div', amplitude = 6, duration = 8, delay = 0, rotate = 0, run = true, className, style, children,
}: {
  as?: 'div' | 'span' | 'g';
  amplitude?: number;
  duration?: number;
  delay?: number;
  /** Degrees of gentle tilt that ride along with the float. */
  rotate?: number;
  run?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement & SVGGElement>(null);
  const live = useInViewLoop(ref) && run;

  useLoopClock(live, (p) => {
    const el = ref.current;
    if (!el) return;
    const s = 0.5 - 0.5 * Math.cos(p * Math.PI * 2);
    const y = (-amplitude * s).toFixed(2);
    el.style.transform = rotate ? `translateY(${y}px) rotate(${(rotate * Math.sin(p * Math.PI * 2)).toFixed(3)}deg)` : `translateY(${y}px)`;
  }, duration, delay);

  const svg = as === 'g';
  return React.createElement(
    as,
    { ref, className, style: { ...(svg && rotate ? { transformBox: 'fill-box', transformOrigin: 'center' } : null), ...style } },
    children,
  );
}
