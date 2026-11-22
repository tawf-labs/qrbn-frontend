"use client";

import React from 'react';
import { motion, useReducedMotion, useTransform, type MotionValue } from 'motion/react';
import { ScrollSpine, useStepLit, isoBox, pts, rise, PAL } from '../../motion';

export interface TimelineStep { step: string; title: string; desc: string; icon: React.ReactNode }

/* One iso block per step. It sits grey until the spine reaches it, then the lit copy fades in over it. */
function Node({ icon, i, n, p }: { icon: React.ReactNode; i: number; n: number; p: MotionValue<number> }) {
  const lit = useStepLit(p, i, n);
  const ink = useTransform(lit, [0, 1], ['#33473F', '#FFFFFF']);
  const g = isoBox(32, 52, 30, 30, 16);
  const face = (fills: readonly string[]) => (
    <>
      <polygon points={pts(g.left)} fill={fills[0]} />
      <polygon points={pts(g.right)} fill={fills[1]} />
      <polygon points={pts(g.top)} fill={fills[2]} />
    </>
  );
  return (
    <div className="relative z-10 size-12 shrink-0 md:size-16">
      <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <ellipse cx="32" cy="50" rx="30" ry="9" fill="rgba(16,38,31,.07)" />
        {face(['#9FB3A8', '#9FB3A8', PAL.glaze])}
        <motion.g style={{ opacity: lit }}>{face([PAL.deep, PAL.ink, PAL.accent])}</motion.g>
      </svg>
      <motion.span className="absolute left-1/2 top-[34%] flex -translate-x-1/2 -translate-y-1/2 [&_svg]:size-3.5 md:[&_svg]:size-4" style={{ color: ink }}>
        {icon}
      </motion.span>
    </div>
  );
}

/* The "How it works" steps on a scroll-driven spine: the line fills down the page and each iso block lights as it arrives. */
export default function StepTimeline({ steps }: { steps: readonly TimelineStep[] }) {
  const reduce = useReducedMotion();
  return (
    <ScrollSpine className="mx-auto max-w-4xl" lineClassName="left-6 md:left-8 top-6 md:top-8 bottom-6 md:bottom-8 !w-0.5 -translate-x-1/2" offset={['start 70%', 'end 60%']}>
      {(p) => (
        <>
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              variants={rise(0, 18)}
              initial={reduce ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="relative mb-10 flex gap-5 transform-gpu last:mb-0 md:mb-12 md:gap-8"
            >
              <Node icon={s.icon} i={i} n={steps.length} p={p} />
              <div className="min-w-0 flex-1 pt-1 md:pt-3">
                <span className="text-sm font-semibold uppercase tracking-wider text-[#1F6B54]">{s.step}</span>
                <h3 className="mb-2 font-sans text-xl font-medium leading-[1.1] tracking-[-0.03em] text-[#10261F] md:text-2xl">{s.title}</h3>
                <p className="text-base text-[#33473F] md:text-lg">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </>
      )}
    </ScrollSpine>
  );
}
