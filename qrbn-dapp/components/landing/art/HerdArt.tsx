"use client";

import React, { useRef } from 'react';
import { useInViewLoop, useLoopClock } from '../../motion';
import { Cow, Goat, Sheep, SideView } from './animals';

/* A herd crossing the bottom of a section. SideView draws them on level ground.
 * One period is drawn three times and slides by exactly one period, so the loop has no seam. */
const PERIOD = 660;
const HERD = [
  { A: Cow, x: 56, d: 0 }, { A: Sheep, x: 184, d: 0.7 }, { A: Sheep, x: 302, d: 0.3 },
  { A: Goat, x: 412, d: 0.5 }, { A: Sheep, x: 496, d: 0.9 }, { A: Goat, x: 588, d: 0.2 },
] as const;

export default function HerdArt({ className = '' }: { className?: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const row = useRef<SVGGElement>(null);
  const live = useInViewLoop(svg);
  useLoopClock(live, (p) => { if (row.current) row.current.style.transform = `translateX(${(-PERIOD * p).toFixed(2)}px)`; }, 46);
  return (
    <svg ref={svg} viewBox="0 0 1320 120" preserveAspectRatio="xMinYMax slice" className={`block h-28 w-full md:h-32 ${className}`} aria-hidden="true">
      <rect x="0" y="108" width="1980" height="12" fill="#1F6B54" />
      <SideView><g ref={row}>
        {[0, 1, 2].map((n) => HERD.map(({ A, x, d }) => (
          <g key={`${n}-${x}`} transform={`translate(${n * PERIOD + x} 111) scale(1.12)`}><A live={live} delay={d} walk /></g>
        )))}
      </g></SideView>
    </svg>
  );
}
