"use client";

import React from 'react';
import { motion, type Variants } from 'motion/react';
import { isoBox, pts } from './iso';

/* One flat-coloured isometric block. fills = [left, right, top]. */
export default function IsoBox({
  x, y, a, b, h, fills, variants, label, labelInk = '#fff', labelSize = 12, edge = true,
}: {
  x: number; y: number; a: number; b: number; h: number;
  fills: [string, string, string];
  variants?: Variants;
  label?: string; labelInk?: string; labelSize?: number; edge?: boolean;
}) {
  const g = isoBox(x, y, a, b, h);
  return (
    <motion.g variants={variants}>
      <polygon points={pts(g.left)} fill={fills[0]} />
      <polygon points={pts(g.right)} fill={fills[1]} />
      <polygon points={pts(g.top)} fill={fills[2]} />
      {edge && <polyline points={pts(g.edge)} fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1" />}
      {label && (
        <g transform={`matrix(.866 -.5 0 1 ${g.F1[0]} ${g.F1[1]})`}>
          <text x={10} y={h / 2 + labelSize * 0.35} fontSize={labelSize} fontWeight="600" fill={labelInk} letterSpacing="-.01em">{label}</text>
        </g>
      )}
    </motion.g>
  );
}
