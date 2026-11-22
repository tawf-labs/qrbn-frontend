"use client";

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { IsoBox, Float, FILLS, PAL, isoAt, draw, drop, fade, VIEW, type Pt } from '../../motion';

/* Waqf: a permanent block that stays put while produce tiles rise from it. The base is a two-step plinth that
 * never moves; tiles rise out of the top face on the hero spring, then each one lifts and settles on its own slow
 * float. Everything derives from one frame (the base's front corner F). No text. Loops pause offscreen and stop
 * under reduced motion (tiles then sit still above the block). */
const F: Pt = [180, 212];
const A = 150, B = 96;
const TOP = 30 + 22;                       // height of the plinth + block
const TILE = 34;
// tile spots on the top face (floor coords of the block: u up-right, v down-right, measured from F)
const SPOTS: { u: number; v: number; lift: number; fills: [string, string, string]; h: number }[] = [
  { u: 100, v: -62, lift: 46, fills: [...FILLS.qard], h: 12 },
  { u: 62, v: -40, lift: 30, fills: [...FILLS.zakat], h: 12 },
  { u: 28, v: -64, lift: 54, fills: [...FILLS.waqf], h: 12 },
  { u: 108, v: -26, lift: 24, fills: [...FILLS.sadaqah], h: 12 },
];
const IDLE = 2.4;

export default function WaqfVignette({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();
  const topY = F[1] - TOP;
  return (
    <motion.svg
      viewBox="0 -44 360 304"
      className={`h-auto w-full overflow-visible ${className}`}
      aria-hidden="true"
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={VIEW}
    >
      <motion.ellipse variants={fade(0.1, 0.6)} cx={F[0] + 30} cy={F[1] + 8} rx={140} ry={34} fill="rgba(16,38,31,.08)" />
      {/* the permanent block: plinth + body */}
      <IsoBox x={F[0]} y={F[1]} a={A + 16} b={B + 16} h={22} fills={[...FILLS.ledger]} variants={drop(0, 0.15, 0.2, -50)} />
      <IsoBox x={F[0]} y={F[1] - 22} a={A} b={B} h={30} fills={[...FILLS.waqf]} variants={drop(1, 0.15, 0.2, -50)} />

      {/* produce tiles: grow out of the top face, drawn back to front */}
      {[...SPOTS].sort((p, q) => q.u - p.u || p.v - q.v).map((s, i) => {
        const [x, y] = isoAt(F[0], topY, s.u, s.v);
        const rise = {
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: -s.lift, transition: { opacity: { duration: 0.3, delay: 1.0 + i * 0.2 }, y: { type: 'spring' as const, stiffness: 110, damping: 14, delay: 1.0 + i * 0.2 } } },
        };
        return (
          <g key={i}>
            <motion.path variants={draw(0.9 + i * 0.2, 0.6)} d={`M${x} ${y} V${y - s.lift}`} stroke={PAL.deep} strokeOpacity=".35" strokeWidth="1.4" strokeDasharray="2 4" fill="none" />
            <motion.g variants={rise}>
              <Float as="g" amplitude={3} duration={5.5 + i * 0.9} delay={IDLE + i * 0.7}>
                <IsoBox x={x} y={y} a={TILE} b={TILE} h={s.h} fills={s.fills} />
              </Float>
            </motion.g>
          </g>
        );
      })}
    </motion.svg>
  );
}
