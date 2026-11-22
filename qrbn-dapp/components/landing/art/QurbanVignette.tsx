"use client";

import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { IsoBox, FILLS, PAL, isoAt, drop, fade, VIEW, useInViewLoop, useLoopClock, type Pt } from '../../motion';

/* Qurban: one block split into seven equal shares (a cow share is 1/7). The shares sit together, slide apart along
 * the block's long axis, one of them lifts, then they rejoin. Slices run along u, so a share is A/7 long; the
 * back-most (largest u) is drawn first. No text. The loop pauses offscreen; under reduced motion the shares sit
 * together with one lifted. */
const N = 7;
const A = 154, B = 76, H = 34;
const W = A / N;
const O: Pt = [140, 196];
const MARK = 2;                           // the highlighted share
const GAP = 13;                           // extra distance per share index when apart
const IDLE = 2.4;
const GREEN: [string, string, string] = [...FILLS.zakat];
const MINT: [string, string, string] = [...FILLS.qard];

const sm = (t: number) => { const c = Math.min(1, Math.max(0, t)); return c * c * (3 - 2 * c); };
/* loop phase -> how far apart (0..1) and how lifted the marked share is (0..1) */
const apart = (p: number) => (p < 0.18 ? 0 : p < 0.38 ? sm((p - 0.18) / 0.2) : p < 0.64 ? 1 : p < 0.84 ? 1 - sm((p - 0.64) / 0.2) : 0);
const lift = (p: number) => (p < 0.4 ? 0 : p < 0.48 ? sm((p - 0.4) / 0.08) : p < 0.58 ? 1 : p < 0.66 ? 1 - sm((p - 0.58) / 0.08) : 0);

export default function QurbanVignette({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();
  const svg = useRef<SVGSVGElement>(null);
  const live = useInViewLoop(svg);
  const parts = useRef<(SVGGElement | null)[]>([]);

  useLoopClock(live, (p) => {
    const a = apart(p), l = lift(p);
    parts.current.forEach((el, i) => {
      if (!el) return;
      const d = (i - (N - 1) / 2) * GAP * a;
      const y = i === MARK ? -12 * l : 0;
      el.style.transform = `translate(${(0.866 * d).toFixed(2)}px, ${(-0.5 * d + y).toFixed(2)}px)`;
    });
  }, 9, IDLE);

  const order = Array.from({ length: N }, (_, i) => N - 1 - i); // back (large u) first
  return (
    <motion.svg
      ref={svg}
      viewBox="0 0 360 250"
      className={`h-auto w-full overflow-visible ${className}`}
      aria-hidden="true"
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={VIEW}
    >
      <motion.ellipse variants={fade(0.1, 0.6)} cx={O[0] + 36} cy={O[1] + 4} rx={140} ry={32} fill="rgba(16,38,31,.08)" />
      {order.map((i) => {
        const [x, y] = isoAt(O[0], O[1], i * W, 0);
        const marked = i === MARK;
        return (
          // the outer motion.g plays the intro drop; the inner g is moved by the loop
          <motion.g key={i} variants={drop(N - 1 - i, 0.2, 0.1, -52)}>
            <g ref={(el) => { parts.current[i] = el; }} style={reduce && marked ? { transform: 'translateY(-12px)' } : undefined}>
              <IsoBox x={x} y={y} a={W} b={B} h={H} fills={marked ? GREEN : MINT} />
            </g>
          </motion.g>
        );
      })}
    </motion.svg>
  );
}
