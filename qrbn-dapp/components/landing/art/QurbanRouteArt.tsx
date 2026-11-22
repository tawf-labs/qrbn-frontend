"use client";

import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { IsoBox, FlowLine, FILLS, PAL, isoAt, draw, drop, fade, pop, useInViewLoop, useLoopClock, type Pt } from '../../motion';
import Coin from './Coin';

/* One qurban's route: five iso blocks on one drawn path (Choose, Pay, Sacrifice, Distribute, Proof).
 * Everything derives from the floor frame (O, u up-right, v down-right): block centres are floor points, the path
 * is drawn on the floor through them, and the bead rides the same polyline, so lines really land on blocks.
 * Intro about 2.7s (grid, path draws, blocks drop on the hero spring), then a calm loop: a coin travels the route
 * and each block lights as it arrives; the last one carries a proof tick. Loops pause offscreen; under reduced
 * motion everything is visible, lit and still. Text is 16.5 units in a 476 wide view, so about 11px on a phone. */
const IDLE = 2.8;
const A = 46;                       // block footprint (square), floor units
const STEP = 110;                   // floor distance between block centres
const O = { x: 58, y: 186 };        // floor origin = centre of the first block
const floorXY = (u: number, v: number): Pt => isoAt(O.x, O.y, u, v);
const iso = `matrix(.86604 -.49997 .86604 .49997 ${O.x} ${O.y})`;

const NODES: { u: number; v: number; label: string; h: number }[] = [
  { u: 0, v: 0, label: 'Choose', h: 24 },
  { u: STEP, v: 0, label: 'Pay', h: 30 },
  { u: STEP, v: STEP, label: 'Sacrifice', h: 40 },
  { u: 2 * STEP, v: STEP, label: 'Distribute', h: 30 },
  { u: 2 * STEP, v: 2 * STEP, label: 'Proof', h: 46 },
];
const ROUTE: Pt[] = NODES.map((n) => [n.u, n.v]);
const PATH_D = `M${ROUTE.map((p) => p.join(' ')).join(' L')}`;
const SCREEN: Pt[] = ROUTE.map(([u, v]) => floorXY(u, v));
const UNLIT: [string, string, string] = ['#CED8D1', '#B8C7BE', '#FBFCFA'];
const LIT: [string, string, string][] = [
  [...FILLS.zakat], [...FILLS.zakat], [...FILLS.zakat], [...FILLS.zakat], [...FILLS.zakat],
];
const UP = [false, true, false, true, false]; // zig-zag: label above on the raised blocks, below on the low ones

/* block corner (front-bottom) so that the footprint centre is the floor point */
const corner = (u: number, v: number): Pt => floorXY(u - A / 2, v + A / 2);

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/* loop timeline (phase 0..1): the coin leaves block k at S[k], arrives at ARR[k+1] */
const S0 = 0.07, SEG = 0.18, MOVE = 0.13;
const arrive = (k: number) => (k === 0 ? 0.03 : S0 + (k - 1) * SEG + MOVE);
const END_HOLD = 0.93, RESET = 0.985;

function beadAt(p: number): { pos: Pt; on: number } {
  if (p >= RESET) return { pos: SCREEN[4], on: 0 };
  let k = 0;
  while (k < 4 && p >= S0 + k * SEG) k++;
  // k = number of departures so far; the coin is on segment k-1 (moving) or resting at node k
  if (k === 0) return { pos: [SCREEN[0][0], SCREEN[0][1] - NODES[0].h], on: clamp01(p / 0.03) };
  const s = S0 + (k - 1) * SEG;
  const t = clamp01((p - s) / MOVE);
  const a = SCREEN[k - 1], b = SCREEN[k];
  const e = easeInOut(t);
  const on = clamp01((arrive(4) + 0.025 - p) / 0.025);
  const ha = NODES[k - 1].h, hb = NODES[k].h;
  return { pos: [a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e - (ha + (hb - ha) * e)], on };
}

/* A block turns green when the coin reaches it and then stays green: the first pass lights them, later passes
 * leave them lit (a reached block never goes pale again). */
function litAt(p: number, k: number): number {
  return clamp01((p - arrive(k)) / 0.04);
}

const shadowOf = (k: number) => {
  const [x, y] = SCREEN[k];
  return <motion.ellipse key={`sh${k}`} variants={fade(0.9 + k * 0.05, 0.6)} cx={x + 6} cy={y + 30} rx={44} ry={13} fill="rgba(16,38,31,.07)" />;
};

export default function QurbanRouteArt({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();
  const svg = useRef<SVGSVGElement>(null);
  const live = useInViewLoop(svg);
  const lit = useRef<(SVGGElement | null)[]>([]);
  const bead = useRef<SVGGElement>(null);
  const badge = useRef<SVGGElement>(null);
  const passed = useRef(false);

  useLoopClock(live, (p) => {
    if (p > END_HOLD) passed.current = true;
    NODES.forEach((_, k) => { const el = lit.current[k]; if (el) el.style.opacity = (passed.current ? 1 : litAt(p, k)).toFixed(3); });
    const b = beadAt(p);
    const el = bead.current;
    if (el) { el.style.opacity = b.on.toFixed(3); el.style.transform = `translate(${b.pos[0].toFixed(2)}px, ${b.pos[1].toFixed(2)}px)`; }
    const bd = badge.current;
    if (bd) {
      const q = clamp01((p - arrive(4)) / 0.05);
      bd.style.transform = `scale(${(1 + 0.18 * Math.sin(Math.PI * q) * (p < END_HOLD ? 1 : 0)).toFixed(3)})`;
    }
  }, 11, IDLE);

  const [bx, by] = corner(NODES[4].u, NODES[4].v);
  const topC: Pt = [bx, by - NODES[4].h - A / 2]; // centre of the proof block's top face (a = b, so x is the corner x)

  return (
    <motion.svg
      ref={svg}
      viewBox="10 20 476 240"
      className={`h-auto w-full overflow-visible ${className}`}
      aria-hidden="true"
      initial={reduce ? false : 'hidden'}
      animate="show"
    >
      {/* 1: floor grid, faded at the edges with an opacity mask */}
      <defs>
        <radialGradient id="qr-fade" cx="248" cy="140" r="250" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".6" stopColor="#fff" stopOpacity=".6" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="qr-floor"><rect x="10" y="20" width="476" height="240" fill="url(#qr-fade)" /></mask>
        <pattern id="qr-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M0 0H30M0 0V30" fill="none" stroke={PAL.line} strokeWidth="1" /></pattern>
      </defs>
      <motion.g variants={fade(0, 0.9)} mask="url(#qr-floor)">
        <g transform={iso}><rect x="-120" y="-120" width="520" height="520" fill="url(#qr-grid)" /></g>
      </motion.g>

      {SCREEN.map((_, k) => shadowOf(k))}

      {/* 2: the route, drawn on the floor */}
      <g transform={iso}>
        <motion.path variants={draw(0.25, 1.4)} d={PATH_D} stroke={PAL.deep} strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      </g>
      <g transform={iso}>
        <FlowLine d={PATH_D} stroke="#fff" strokeWidth={1.6} dash="1.2 3.8" duration={3} startAfter={IDLE} opacity={0.7} linecap="round" />
      </g>

      {/* 3: blocks drop in order along the route; each has a lit twin that fades in as the coin arrives */}
      {NODES.map((n, k) => {
        const [x, y] = corner(n.u, n.v);
        return (
          <motion.g key={n.label} variants={drop(k, 1.2, 0.2, -56)}>
            <IsoBox x={x} y={y} a={A} b={A} h={n.h} fills={UNLIT} />
            <g ref={(el) => { lit.current[k] = el; }} style={{ opacity: reduce ? 1 : 0 }}>
              <IsoBox x={x} y={y} a={A} b={A} h={n.h} fills={LIT[k]} />
            </g>
          </motion.g>
        );
      })}

      {/* Pay: a coin rests on its block */}
      <Coin cx={corner(STEP, 0)[0]} cy={corner(STEP, 0)[1] - NODES[1].h - A / 2} r={13} color={PAL.accent} variants={pop(2.1)} />

      {/* labels: pills above the raised blocks, below the low ones */}
      {NODES.map((n, k) => {
        const [x, y] = SCREEN[k];
        const w = n.label.length * 9.4 + 26;
        const yy = UP[k] ? y - A / 2 - n.h - 50 : y + A / 2 + 18;
        return (
          <motion.g key={`l${k}`} variants={fade(1.9 + k * 0.12, 0.5)}>
            <rect x={x - w / 2} y={yy} width={w} height={26} rx={13} fill={PAL.paper} stroke={PAL.line} strokeWidth="1.2" />
            <text x={x} y={yy + 18} textAnchor="middle" fontSize="16.5" fontWeight="500" fill={PAL.ink}>{n.label}</text>
          </motion.g>
        );
      })}

      {/* the proof badge: a seal with a tick, popped onto the last block */}
      <motion.g variants={pop(2.3)}>
        <g ref={badge} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <Coin cx={topC[0]} cy={topC[1] - 22} r={19} color={PAL.accent} face={PAL.accent} />
          <motion.path variants={draw(2.6, 0.5)} d={`M${topC[0] - 8} ${topC[1] - 23} L${topC[0] - 2} ${topC[1] - 18} L${topC[0] + 9} ${topC[1] - 29}`} stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </motion.g>

      {/* the travelling coin: stays hidden until the loop starts, and under reduced motion */}
      <g ref={bead} style={{ opacity: 0 }}>
        <Coin cx={0} cy={-14} r={9} color={PAL.deep} face={PAL.mint} />
      </g>
    </motion.svg>
  );
}
