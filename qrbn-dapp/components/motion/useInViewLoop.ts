"use client";

import { useEffect, useRef, type RefObject } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

/* Whether an ambient loop should run right now: the element is on screen and the visitor has not asked for
 * reduced motion. Every idle loop in the kit (Float, FlowLine, the waves) is gated by this, so nothing keeps
 * animating offscreen or under prefers-reduced-motion. */
export function useInViewLoop(ref: RefObject<Element | null>, opts: { amount?: number | 'some' | 'all'; margin?: string } = {}): boolean {
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: opts.amount ?? 'some', margin: opts.margin as never });
  return inView && !reduce;
}

/* A looping clock for transform / opacity / stroke-dashoffset loops. `onUpdate` gets the phase 0..1 of the
 * current cycle; the clock pauses (holds its place) while `run` is false and resumes from there. */
export function useLoopClock(run: boolean, onUpdate: (phase: number) => void, duration: number, delay = 0): void {
  const cb = useRef(onUpdate);
  cb.current = onUpdate;
  const ctl = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    if (!run) {
      ctl.current?.pause();
      return;
    }
    if (ctl.current) {
      ctl.current.play();
      return;
    }
    ctl.current = animate(0, 1, {
      duration,
      delay,
      ease: 'linear',
      repeat: Infinity,
      onUpdate: (v) => cb.current(v),
    });
  }, [run, duration, delay]);

  useEffect(() => () => { ctl.current?.stop(); ctl.current = null; }, []);
}
