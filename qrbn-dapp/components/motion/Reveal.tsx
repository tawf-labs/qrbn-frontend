"use client";

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE } from './variants';

export const CONTAINER = 'max-w-7xl mx-auto px-6';

export function Reveal({
  children,
  delay = 0,
  className = '',
  style,
  y = 20,
  blur = true
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  key?: React.Key;
  y?: number;
  blur?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: blur ? 'blur(6px)' : 'none' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px', amount: 0.12 }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={`transform-gpu ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}
