"use client";

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

const SQ = 'M50 14 L86 50 L50 86 L14 50 Z';

/* An eight-point pattern behind a closing section that turns with the scroll, like the end of tawf.finance. Place inside a relative, overflow-hidden section. */
export default function TurningPattern({ color = '#1F6B54', opacity = 0.14, className = '' }: { color?: string; opacity?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const turn = useTransform(scrollYProgress, [0, 1], [-35, 35]);
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden ${className}`} style={{ opacity }}>
      <motion.svg viewBox="0 0 100 100" className="h-[44rem] w-[44rem] shrink-0" style={reduce ? undefined : { rotate: turn }} fill="none" stroke={color} strokeWidth=".35">
        {[1, 0.78, 0.56, 0.34].map((s) => (
          <g key={s} transform={`translate(50 50) scale(${s}) translate(-50 -50)`}>
            <path d={SQ} /><path d={SQ} transform="rotate(45 50 50)" /><circle cx="50" cy="50" r="36" />
          </g>
        ))}
      </motion.svg>
    </div>
  );
}
