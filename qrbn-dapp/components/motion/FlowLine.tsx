"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { useInViewLoop, useLoopClock } from './useInViewLoop';

/* An svg path whose dashes flow along it (stroke-dashoffset only), like the dashed connectors on tawf.foundation.
 * The path is normalised to length 100, so `dash` is in percent of the line: "2 6" is short dashes, and a
 * pattern such as "0.01 49.99" with a round cap is a single bead per half line, a record travelling.
 * One cycle moves the pattern by exactly its own length, so the loop is seamless.
 * Offscreen it holds its place; under reduced motion it is a still dashed line, or nothing for beads
 * (`hideWhenStill`). `startAfter` (seconds) keeps it invisible until an intro has finished. */
export default function FlowLine({
  d, stroke, strokeWidth = 2, dash = '2 6', duration = 3, reverse = false, opacity = 1, linecap = 'round',
  startAfter = 0, hideWhenStill = false, className, style,
}: {
  d: string;
  stroke: string;
  strokeWidth?: number;
  dash?: string;
  /** Seconds for the pattern to travel one pattern length; larger is calmer. */
  duration?: number;
  reverse?: boolean;
  opacity?: number;
  linecap?: 'round' | 'butt' | 'square';
  startAfter?: number;
  hideWhenStill?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<SVGPathElement>(null);
  const live = useInViewLoop(ref);
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(startAfter <= 0);
  const period = dash.split(/[\s,]+/).reduce((n, v) => n + (parseFloat(v) || 0), 0) * (dash.split(/[\s,]+/).length % 2 ? 2 : 1);

  useEffect(() => {
    if (startAfter <= 0) return;
    const t = window.setTimeout(() => setArmed(true), startAfter * 1000);
    return () => window.clearTimeout(t);
  }, [startAfter]);

  useLoopClock(live && armed, (p) => {
    const el = ref.current;
    if (el) el.style.strokeDashoffset = String((reverse ? 1 : -1) * period * p);
  }, duration);

  const hidden = hideWhenStill && !!reduce;
  return (
    <path
      ref={ref}
      d={d}
      pathLength={100}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={linecap}
      strokeDasharray={dash}
      className={className}
      style={{ opacity: armed && !hidden ? opacity : 0, transition: 'opacity .9s ease', ...style }}
    />
  );
}
