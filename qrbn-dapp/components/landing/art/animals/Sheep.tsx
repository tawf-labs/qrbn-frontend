"use client";

import React from 'react';
import { Block, Patch, Dot, useProject, useRig, type AnimalProps, type Fills } from './rig';

const FACE: Fills = ['#10261F', '#1F3B31', '#2E5246'];
const LEG: Fills = ['#10261F', '#1F3B31', '#2E5246'];

/* Fleece as overlapping puffs: back to front, each with a shaded underside. [u, w, z, r] */
const PUFFS: [number, number, number, number][] = [
  [46, 28, 27, 12], [30, 30, 28, 13], [12, 29, 27, 12],
  [50, 16, 33, 13], [34, 18, 38, 14], [17, 18, 38, 14], [3, 17, 32, 12],
  [50, 5, 25, 13], [37, 3, 31, 13], [22, 3, 32, 14], [8, 4, 28, 13],
  [42, 0, 20, 11], [27, -1, 20, 12], [12, 0, 19, 11],
];

/* Round and low: cloud of wool, dark face and short dark legs. */
export default function Sheep(props: AnimalProps) {
  const at = useProject();
  const r = useRig({ head: at(2, 15, 34), tail: at(54, 12, 34), ear: at(-5, 4, 42) }, props, 26, 11);
  const [tx, ty] = at(58, 10, 28);
  return (
    <g>
      <g ref={r.legA}>
        <Block u={40} w={20} du={7} dw={7} h={18} fills={LEG} />
        <Block u={8} w={3} du={7} dw={7} h={18} fills={LEG} />
      </g>
      <g ref={r.legB}>
        <Block u={8} w={20} du={7} dw={7} h={18} fills={LEG} />
        <Block u={40} w={3} du={7} dw={7} h={18} fills={LEG} />
      </g>
      <g ref={r.body}>
        <g ref={r.tail}><circle cx={tx} cy={ty} r="7" fill="#E3EAE5" /></g>
        {PUFFS.map(([u, w, z, rad], i) => {
          const [x, y] = at(u, w, z);
          return (
            <g key={i}>
              <circle cx={x} cy={y + 2.6} r={rad} fill="#B7C6BD" />
              <circle cx={x} cy={y} r={rad} fill={i < 7 ? '#FFFFFF' : '#F3F6F3'} />
            </g>
          );
        })}
        <g ref={r.head}>
          <Block u={-6} w={25} z={36} du={5} dw={9} h={5} fills={FACE} />
          <Block u={-15} w={7} z={24} du={18} dw={17} h={19} fills={FACE} />
          <Dot u={-7} w={7} z={36} r={3} fill="#FFFFFF" />
          <Dot u={-7.6} w={7} z={36} r={1.5} fill="#10261F" />
          <Patch p={[[-15, 19, 31], [-15, 12, 31], [-15, 13.5, 28], [-15, 17.5, 28]]} fill="#B7C6BD" />
          <g ref={r.ear}><Block u={-3} w={-4} z={36} du={5} dw={11} h={5} fills={FACE} /></g>
          {([[-4, 20, 45, 7], [2, 16, 47, 8], [-6, 13, 45, 7], [0, 9, 45, 7]] as const).map(([u, w, z, rad], i) => {
            const [x, y] = at(u, w, z);
            return <g key={i}><circle cx={x} cy={y + 1.6} r={rad} fill="#B7C6BD" /><circle cx={x} cy={y} r={rad} fill="#FFFFFF" /></g>;
          })}
        </g>
      </g>
    </g>
  );
}
