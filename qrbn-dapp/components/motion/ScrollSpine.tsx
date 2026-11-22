"use client";

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';

/* A thin line that fills as you scroll through its container — the "drawn path" of the hero, tied to scroll.
 * `children` receives the progress MotionValue (0..1) so steps can light up as the line reaches them. */
export default function ScrollSpine({
  children, className = '', color = '#1F6B54', track = '#CED8D1', orientation = 'vertical', lineClassName = '',
  offset = ['start 75%', 'end 55%'],
}: {
  children: (progress: MotionValue<number>) => React.ReactNode;
  className?: string; color?: string; track?: string; orientation?: 'vertical' | 'horizontal'; lineClassName?: string;
  offset?: [string, string];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as any });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const p = useTransform(smooth, (v) => (reduce ? 1 : v));
  const vertical = orientation === 'vertical';
  return (
    <div ref={ref} className={`relative ${className}`}>
      <div aria-hidden="true" className={`pointer-events-none absolute ${vertical ? 'w-px' : 'h-px'} ${lineClassName}`} style={{ background: track }}>
        <motion.div
          className={vertical ? 'h-full w-full origin-top' : 'h-full w-full origin-left'}
          style={{ background: color, ...(vertical ? { scaleY: p } : { scaleX: p }) }}
        />
      </div>
      {children(p)}
    </div>
  );
}

/* Helper: 0 → 1 as the spine passes the i-th of n steps. */
export function useStepLit(p: MotionValue<number>, i: number, n: number) {
  const at = (i + 0.5) / n;
  return useTransform(p, [Math.max(0, at - 0.12), at], [0, 1], { clamp: true });
}
