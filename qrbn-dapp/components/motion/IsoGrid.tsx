"use client";

import React, { useId } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/* The hero's isometric floor as a backdrop: hairline grid, faded out at the edges with an opacity mask
 * (white-to-transparent mask, not a colour gradient). It drifts very slowly so a section never feels static. */
export default function IsoGrid({
  className = '', color = '#CED8D1', opacity = 1, cx = '50%', cy = '60%', r = '55%', drift = true,
}: {
  className?: string; color?: string; opacity?: number; cx?: string; cy?: string; r?: string; drift?: boolean;
}) {
  const id = useId().replace(/:/g, '');
  const reduce = useReducedMotion();
  const animate = drift && !reduce;
  return (
    <svg aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} style={{ opacity }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`f${id}`} cx={cx} cy={cy} r={r}>
          <stop offset="0" stopColor="#fff" />
          <stop offset=".6" stopColor="#fff" stopOpacity=".6" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`m${id}`}><rect width="100%" height="100%" fill={`url(#f${id})`} /></mask>
        <pattern id={`p${id}`} width="44" height="25.4" patternUnits="userSpaceOnUse" patternTransform="skewX(-60)">
          <path d="M0 0H44M0 0V25.4" fill="none" stroke={color} strokeWidth="1" />
        </pattern>
      </defs>
      <g mask={`url(#m${id})`}>
        <motion.rect
          x="-88" y="-50.8" width="140%" height="140%"
          fill={`url(#p${id})`}
          animate={animate ? { x: [-88, -44], y: [-50.8, -25.4] } : undefined}
          transition={animate ? { duration: 18, repeat: Infinity, ease: 'linear' } : undefined}
        />
      </g>
    </svg>
  );
}
