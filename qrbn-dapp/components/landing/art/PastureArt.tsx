"use client";

import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { IsoBox, drop, fade, isoAt, VIEW, useInViewLoop, useLoopClock } from '../../motion';
import { Cow, Goat, Sheep } from './animals';

export const GRASS: [string, string, string] = ['#175545', '#1F6B54', '#A9D8BE'];
const SHARE: [string, string, string] = ['#8FA89B', '#7C978A', '#D5E2DA'];
const SHARE_ON: [string, string, string] = ['#8A6414', '#6E4F10', '#D9B45A'];
const KIND = { goat: Goat, sheep: Sheep, cow: Cow } as const;
export type AnimalKind = keyof typeof KIND;

/* Where each animal stands on the tile, in floor units from its front corner. */
const SPOT: Record<AnimalKind, { u: number; w: number; s: number }> = {
  goat: { u: 54, w: 50, s: 1.5 },
  sheep: { u: 48, w: 44, s: 1.45 },
  cow: { u: 52, w: 44, s: 1.25 },
};
const A = 160, B = 132, H = 14, X = 168, Y = 226;

export const Tuft = ({ x, y }: { x: number; y: number }) => (
  <path d={`M${x} ${y}l-3 -7M${x} ${y}v-9M${x} ${y}l4 -6`} stroke="#175545" strokeWidth="1.6" strokeLinecap="round" fill="none" />
);

/* One animal on a square of pasture. `shares` adds the seven shares of a cow, lit one after another. */
export default function PastureArt({ kind, shares = false, delay = 0, className = '' }: { kind: AnimalKind; shares?: boolean; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  const svg = useRef<SVGSVGElement>(null);
  const live = useInViewLoop(svg);
  const lit = useRef<(SVGGElement | null)[]>([]);
  const Animal = KIND[kind];
  const spot = SPOT[kind];
  const [ax, ay] = isoAt(X, Y - H, spot.u, -spot.w);

  useLoopClock(live && shares, (p) => {
    lit.current.forEach((el, i) => {
      if (!el) return;
      const on = p * 9 >= i && p * 9 < 8.2;
      el.style.opacity = on ? '1' : '0';
    });
  }, 8, 1.4);

  return (
    <motion.svg ref={svg} viewBox="0 0 340 280" className={`h-auto w-full overflow-visible ${className}`} aria-hidden="true" initial={reduce ? false : 'hidden'} whileInView="show" viewport={VIEW}>
      <motion.ellipse variants={fade(0.1, 0.6)} cx="180" cy="178" rx="138" ry="66" fill="rgba(16,38,31,.07)" />
      <motion.g variants={drop(0, 0, 0.1, -30)}>
        <IsoBox x={X} y={Y} a={A} b={B} h={H} fills={GRASS} edge={false} />
        {([[20, 100], [140, 108], [132, 24], [26, 20], [100, 116]] as const).map(([u, w]) => {
          const [x, y] = isoAt(X, Y - H, u, -w);
          return <Tuft key={`${u}-${w}`} x={x} y={y} />;
        })}
      </motion.g>
      <motion.g variants={drop(1, 0.15, 0.15, -46)}>
        <g transform={`translate(${ax} ${ay}) scale(${spot.s})`}>
          <ellipse cx="14" cy="-18" rx="54" ry="20" fill="rgba(16,38,31,.16)" />
          <Animal live={live} delay={1.2 + delay} />
        </g>
      </motion.g>
      {shares && (
        <motion.g variants={fade(0.7, 0.5)}>
          {Array.from({ length: 7 }, (_, k) => {
            const i = 6 - k; // back first
            const [x, y] = isoAt(X + 22, Y + 26, 12 + i * 21, 0);
            return (
              <g key={i}>
                <IsoBox x={x} y={y} a={14} b={14} h={10} fills={SHARE} edge={false} />
                <g ref={(el) => { lit.current[i] = el; }} style={{ opacity: reduce ? (i === 0 ? 1 : 0) : 0, transition: 'opacity .35s' }}>
                  <IsoBox x={x} y={y} a={14} b={14} h={10} fills={SHARE_ON} edge={false} />
                </g>
              </g>
            );
          })}
        </motion.g>
      )}
    </motion.svg>
  );
}
