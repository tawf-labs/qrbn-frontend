"use client";

/* Isometric helpers shared by every vignette. The hero art uses the same 30° projection. */
export const PLANE = (tx: number, ty: number) => `matrix(.86604 -.49997 .86604 .49997 ${tx} ${ty})`;

export type Pt = [number, number];
export const pts = (p: Pt[]) => p.map((q) => q.join(',')).join(' ');

/* An isometric box whose front-bottom corner sits at (x, y): `a` runs up-right, `b` up-left, `h` is height.
 * Returns the three visible faces (left, right, top) and the top edge for a highlight line. */
export function isoBox(x: number, y: number, a: number, b: number, h: number) {
  const AX = 0.866 * a, AY = 0.5 * a, BX = 0.866 * b, BY = 0.5 * b;
  const F0: Pt = [x, y], F1: Pt = [x, y - h];
  const L0: Pt = [x - BX, y - BY], L1: Pt = [x - BX, y - BY - h];
  const R0: Pt = [x + AX, y - AY], R1: Pt = [x + AX, y - AY - h];
  const T1: Pt = [x + AX - BX, y - AY - BY - h];
  return {
    left: [F0, L0, L1, F1] as Pt[],
    right: [F0, R0, R1, F1] as Pt[],
    top: [F1, L1, T1, R1] as Pt[],
    edge: [L1, F1, R1] as Pt[],
    F1, L1, R1, T1,
  };
}

/* Point on the iso floor: u along the up-right axis, v along the down-right axis, from origin (ox, oy). */
export const isoAt = (ox: number, oy: number, u: number, v: number): Pt => [ox + 0.866 * (u + v), oy - 0.5 * u + 0.5 * v];
