"use client";

import React from 'react';
import { motion, type Variants } from 'motion/react';

/* A flat iso coin: rim, face. (cx, cy) is the centre of the top face. */
export default function Coin({ cx, cy, r = 12, color, face = '#fff', variants }: {
  cx: number; cy: number; r?: number; color: string; face?: string; variants?: Variants; key?: React.Key;
}) {
  const ry = r * 0.577, t = r * 0.4;
  return (
    <motion.g variants={variants}>
      <path d={`M${cx - r} ${cy} v${t} a${r} ${ry} 0 0 0 ${2 * r} 0 v${-t}`} fill={color} />
      <ellipse cx={cx} cy={cy} rx={r} ry={ry} fill={face} stroke={color} strokeWidth="1.4" />
      <ellipse cx={cx} cy={cy} rx={r * 0.45} ry={ry * 0.45} fill={color} />
    </motion.g>
  );
}
