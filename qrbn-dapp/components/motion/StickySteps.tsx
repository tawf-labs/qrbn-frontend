"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { isoBox, pts } from './iso';

export interface StickyStep { step: string; title: string; desc: string; icon: React.ReactNode }

const LIT = ['#1F6B54', '#175545', '#2E8068'], DIM = ['#CED8D1', '#B8C7BE', '#FBFCFA'];

/* The steps as blocks that stack up while you scroll. */
function Tower({ n, active }: { n: number; active: number }) {
  const h = Math.min(34, 150 / n), gap = 5;
  return (
    <svg viewBox="0 0 240 280" className="h-full w-full overflow-visible" aria-hidden="true">
      <ellipse cx="120" cy="252" rx="104" ry="24" fill="rgba(16,38,31,.08)" />
      {Array.from({ length: n }, (_, i) => {
        const g = isoBox(120, 250 - i * (h + gap), 92, 92, h), on = i <= active;
        const faces = (f: string[]) => [g.left, g.right, g.top].map((p, k) => <polygon key={k} points={pts(p)} fill={f[k]} />);
        return (
          <motion.g key={i} initial={false} animate={{ y: on ? 0 : -10, opacity: on ? 1 : 0.55 }} transition={{ type: 'spring', stiffness: 150, damping: 17 }}>
            <g>{faces(DIM)}</g>
            <motion.g initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.35 }}>{faces(LIT)}</motion.g>
          </motion.g>
        );
      })}
    </svg>
  );
}

/* Desktop: a pinned panel that advances with the scroll, like the lifecycle on tawf.finance.
 * Phones and reduced motion get `fallback` (the StepTimeline), chosen in CSS so the server render always matches. */
export default function StickySteps({ steps, fallback, panel = '#DCE8E1' }: { steps: readonly StickyStep[]; fallback: React.ReactNode; panel?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 55%', 'end 55%'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.max(0, Math.min(steps.length - 1, Math.floor(v * steps.length)));
    setActive((a) => (a === i ? a : i));
  });
  return (
    <>
      <div className="hidden gap-14 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] motion-reduce:lg:hidden">
        <div className="sticky top-28 flex h-[460px] flex-col justify-between overflow-hidden rounded-3xl p-8 self-start" style={{ background: panel }}>
          <div className="flex justify-between text-sm font-medium" style={{ color: '#10261F' }} aria-hidden="true">
            <motion.span key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>{steps[active].title}</motion.span>
            <span className="tabular-nums">{active + 1} / {steps.length}</span>
          </div>
          <div className="mx-auto h-[290px] w-full max-w-[280px]"><Tower n={steps.length} active={active} /></div>
          <div className="flex gap-2" aria-hidden="true">
            {steps.map((s, i) => (
              <span key={s.step} className="h-1 flex-1 overflow-hidden rounded-full" style={{ background: 'rgba(16,38,31,.14)' }}>
                <motion.span className="block h-full origin-left" style={{ background: '#10261F' }} initial={false} animate={{ scaleX: i <= active ? 1 : 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} />
              </span>
            ))}
          </div>
        </div>
        <div ref={track}>
          {steps.map((s, i) => (
            <motion.div key={s.step} className="flex min-h-[52vh] flex-col justify-center border-b last:border-0" style={{ borderColor: '#CED8D1' }} initial={false} animate={{ opacity: i === active ? 1 : 0.42, x: i === active ? 0 : -6 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              <span className="mb-3 text-sm font-semibold" style={{ color: '#1F6B54' }}>{s.step}</span>
              <h3 className="mb-3 font-sans text-3xl font-medium leading-[1.1] tracking-[-0.03em]" style={{ color: '#10261F' }}>{s.title}</h3>
              <p className="max-w-[34em] text-lg leading-relaxed" style={{ color: '#4A5F57' }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="lg:hidden motion-reduce:lg:block">{fallback}</div>
    </>
  );
}
