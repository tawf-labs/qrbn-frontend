"use client";

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { rise } from './variants';

/* A container whose children rise in one after another when it scrolls into view. */
export function Stagger({
  children, className = '', step = 0.08, delay = 0, amount = 0.2, as = 'div', style,
}: {
  children: React.ReactNode; className?: string; step?: number; delay?: number; amount?: number;
  as?: 'div' | 'ul' | 'ol' | 'section'; style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      style={style}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step, delayChildren: delay } } }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children, className = '', y = 22, as = 'div', style,
}: {
  children: React.ReactNode; className?: string; y?: number; as?: 'div' | 'li' | 'article'; style?: React.CSSProperties;
  key?: React.Key;
}) {
  const Tag = motion[as];
  const v = rise(0, y);
  return (
    <Tag className={`transform-gpu ${className}`} style={style} variants={v}>
      {children}
    </Tag>
  );
}
