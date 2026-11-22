"use client";

import React, { createContext, useContext, useRef } from 'react';
import { pts, useLoopClock, type Pt } from '../../../motion';

/* Every animal is drawn in one local frame: u runs up-right (head at -u, facing the viewer's lower left), w runs
 * up-left (the far side) and z is up. The origin is the near front corner of the body, on the ground. */
export type Fills = readonly [string, string, string]; // left, right, top
type Project = (u: number, w: number, z?: number) => Pt;
const iso: Project = (u, w, z = 0) => [0.866 * (u - w), -0.5 * (u + w) - z];
/* From the side, for animals that walk across the page on level ground. */
const side: Project = (u, w, z = 0) => [u - 0.36 * w, -0.26 * w - z];

const View = createContext<'iso' | 'side'>('iso');
export const SideView = ({ children }: { children: React.ReactNode }) => <View.Provider value="side">{children}</View.Provider>;
export const useProject = (): Project => (useContext(View) === 'side' ? side : iso);

export function Block({ u, w, z = 0, du, dw, h, fills }: { u: number; w: number; z?: number; du: number; dw: number; h: number; fills: Fills }) {
  const at = useProject();
  const u1 = u + du, w1 = w + dw, z1 = z + h;
  return (
    <>
      <polygon points={pts([at(u, w, z), at(u, w1, z), at(u, w1, z1), at(u, w, z1)])} fill={fills[0]} />
      <polygon points={pts([at(u, w, z), at(u1, w, z), at(u1, w, z1), at(u, w, z1)])} fill={fills[1]} />
      <polygon points={pts([at(u, w, z1), at(u, w1, z1), at(u1, w1, z1), at(u1, w, z1)])} fill={fills[2]} />
    </>
  );
}

/* A leg: hoof first, then the leg standing on it. */
export function Leg({ u, w, d, h, fills, hoof, hh = 5 }: { u: number; w: number; d: number; h: number; fills: Fills; hoof: Fills; hh?: number }) {
  return (
    <>
      <Block u={u} w={w} du={d} dw={d} h={hh} fills={hoof} />
      <Block u={u} w={w} z={hh} du={d} dw={d} h={h - hh} fills={fills} />
    </>
  );
}

/* A flat patch in a plane: list of [u, w, z] corners. */
export function Patch({ p, fill }: { p: [number, number, number][]; fill: string }) {
  const at = useProject();
  return <polygon points={pts(p.map(([u, w, z]) => at(u, w, z)))} fill={fill} />;
}

/* A round detail lying on the near side of the body. */
export function Dot({ u, w, z, r, fill }: { u: number; w: number; z: number; r: number; fill: string }) {
  const flat = useContext(View) === 'side';
  const [x, y] = useProject()(u, w, z);
  return <circle transform={flat ? `translate(${x} ${y})` : `matrix(.866 -.5 0 1 ${x} ${y})`} r={r} fill={fill} />;
}

export interface AnimalProps {
  /** Loops run only while this is true. */
  live: boolean;
  /** Seconds before this animal starts moving, so a group never moves in step. */
  delay?: number;
  /** Walk in place: the legs swing and the body bobs. The parent moves the group. */
  walk?: boolean;
}

export interface Pivot { head: Pt; tail: Pt; ear: Pt }

const bump = (p: number, a: number, b: number) => (p < a || p > b ? 0 : Math.sin(((p - a) / (b - a)) * Math.PI));
const hold = (p: number, a: number, b: number, e: number) => {
  const s = (t: number) => { const c = Math.min(1, Math.max(0, t)); return c * c * (3 - 2 * c); };
  return p < (a + b) / 2 ? s((p - a) / e) : 1 - s((p - b + e) / e);
};
const turn = ([x, y]: Pt, deg: number) => `translate(${x}px, ${y}px) rotate(${deg.toFixed(2)}deg) translate(${-x}px, ${-y}px)`;

/* Grazing, a nod, an ear twitch and a tail flick on one clock. Only transforms move. */
export function useRig(pivot: Pivot, { live, delay = 0, walk = false }: AnimalProps, dip = 22, period = 9) {
  const body = useRef<SVGGElement>(null), head = useRef<SVGGElement>(null), tail = useRef<SVGGElement>(null), ear = useRef<SVGGElement>(null);
  const legA = useRef<SVGGElement>(null), legB = useRef<SVGGElement>(null);
  useLoopClock(live, (p) => {
    const graze = walk ? 0 : hold(p, 0.12, 0.5, 0.09);
    const munch = graze > 0.98 ? Math.sin(p * Math.PI * 60) * 1.4 : 0;
    const nod = walk ? Math.sin(p * Math.PI * 2 * period) * 2 : bump(p, 0.62, 0.7) * 5;
    if (head.current) head.current.style.transform = turn(pivot.head, -(graze * dip + munch + nod));
    if (tail.current) tail.current.style.transform = turn(pivot.tail, Math.sin(p * Math.PI * 14) * (4 + 14 * bump(p, 0.55, 0.85)));
    if (ear.current) ear.current.style.transform = turn(pivot.ear, (bump(p, 0.72, 0.755) + bump(p, 0.77, 0.805)) * 24);
    if (walk) {
      const s = Math.sin(p * Math.PI * 2 * period);
      if (body.current) body.current.style.transform = `translateY(${(-1.2 * Math.abs(s)).toFixed(2)}px)`;
      if (legA.current) legA.current.style.transform = `translate(${(2.4 * s).toFixed(2)}px, ${(-1.6 * Math.max(0, s)).toFixed(2)}px)`;
      if (legB.current) legB.current.style.transform = `translate(${(-2.4 * s).toFixed(2)}px, ${(-1.6 * Math.max(0, -s)).toFixed(2)}px)`;
    }
  }, period, delay);
  return { body, head, tail, ear, legA, legB };
}
