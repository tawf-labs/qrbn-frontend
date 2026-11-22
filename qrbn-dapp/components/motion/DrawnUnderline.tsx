"use client";

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

/* The key word of a headline with a stroke drawn under it once, like "account." on tawf.finance. */
export default function DrawnUnderline({ children, color = '#1F6B54', delay = 0.9, className = '' }: {
  children: React.ReactNode; color?: string; delay?: number; className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={`relative inline-block whitespace-nowrap ${className}`} style={{ color }}>
      {children}
      <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-[0.16em] left-0 h-[0.2em] w-full overflow-visible">
        <motion.path
          d="M3 9 C 50 3, 120 3, 197 7"
          fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.01, delay } }}
        />
      </svg>
    </span>
  );
}
