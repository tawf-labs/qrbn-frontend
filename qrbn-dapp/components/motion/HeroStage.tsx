"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';

/* Wraps hero art: it leans a little toward the pointer and lifts as the page scrolls away, like the tawf.finance hero. */
export default function HeroStage({ children, className = '', tilt = 7, lift = 90 }: {
  children: React.ReactNode; className?: string; tilt?: number; lift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // Only where the art sits beside the text: stacked on a phone it would slide over the buttons.
  const y = useTransform(scrollYProgress, (v) => (window.innerWidth >= 1024 ? -lift * v : 0));
  const px = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 });
  const py = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 });
  const rotateY = useTransform(px, [-0.5, 0.5], [-tilt, tilt]);
  const rotateX = useTransform(py, [-0.5, 0.5], [tilt, -tilt]);
  const move = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => { px.set(0); py.set(0); };
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={className}>
      <motion.div style={reduce ? undefined : { y, rotateX, rotateY, transformPerspective: 1000 }}>{children}</motion.div>
    </div>
  );
}
