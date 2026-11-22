"use client";

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE } from './variants';

/* Word-by-word blur-in, the hero headline treatment for any heading.
 * Pass a plain string; `as` picks the tag. Plays once when scrolled into view (or on mount with `onMount`). */
export default function RevealText({
  text, as = 'h2', className = '', delay = 0, step = 0.045, onMount = false, style,
}: {
  text: string; as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'; className?: string; delay?: number; step?: number; onMount?: boolean;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const lines = text.split('\n');
  const flat = text.replace(/\n/g, ' ');
  const trigger = onMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.6 } };
  return (
    <Tag className={className} style={style} aria-label={flat} initial={reduce ? false : 'hidden'} {...trigger}>
      {lines.map((line, li) => {
        const words = line.split(' ');
        const offset = lines.slice(0, li).join(' ').split(' ').length;
        return (
          <React.Fragment key={li}>
            {li > 0 && <br />}
            {words.map((w, i) => (
              <React.Fragment key={i}>
                <motion.span
                  aria-hidden="true"
                  className="inline-block transform-gpu"
                  variants={{
                    hidden: { opacity: 0, y: '0.35em', filter: 'blur(8px)' },
                    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, delay: delay + (offset * (li > 0 ? 1 : 0) + i) * step, ease: EASE } },
                  }}
                >
                  {w}
                </motion.span>
                {i < words.length - 1 && ' '}
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}
