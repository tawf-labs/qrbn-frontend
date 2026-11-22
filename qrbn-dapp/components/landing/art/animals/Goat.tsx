"use client";

import React from 'react';
import { Block, Leg, Patch, Dot, useProject, useRig, type AnimalProps, type Fills } from './rig';

const COAT: Fills = ['#A8802F', '#C9A355', '#E3C684'];
const LEG: Fills = ['#7C5A18', '#98732A', '#E3C684'];
const HOOF: Fills = ['#10261F', '#1F3B31', '#2E5246'];
const DARK: Fills = ['#6E4F10', '#8A6414', '#A67C22'];

/* Slim and upright: long neck, swept-back horns, a beard and a short raised tail. */
export default function Goat(props: AnimalProps) {
  const at = useProject();
  const r = useRig({ head: at(6, 10, 40), tail: at(45, 10, 40), ear: at(-1, 4, 62) }, props, 30, 8);
  const horn = (w: number) => { const [x, y] = at(-4, w, 68); return `M${x} ${y} q3 -15 18 -17`; };
  const [bx, by] = at(-16, 8, 52);
  const [tx, ty] = at(45, 9, 40);
  return (
    <g>
      <g ref={r.legA}>
        <Leg u={38} w={15} d={6} h={24} fills={LEG} hoof={HOOF} />
        <Leg u={3} w={2} d={6} h={24} fills={LEG} hoof={HOOF} />
      </g>
      <g ref={r.legB}>
        <Leg u={3} w={15} d={6} h={24} fills={LEG} hoof={HOOF} />
        <Leg u={38} w={2} d={6} h={24} fills={LEG} hoof={HOOF} />
      </g>
      <g ref={r.body}>
        <g ref={r.tail}><path d={`M${tx - 2} ${ty + 2} q6 -4 8 -13`} fill="none" stroke="#8A6414" strokeWidth="5" strokeLinecap="round" /></g>
        <Block u={0} w={0} z={22} du={46} dw={22} h={22} fills={COAT} />
        <Patch p={[[0, 8, 44], [46, 8, 44], [46, 14, 44], [0, 14, 44]]} fill="#8A6414" />
        <g ref={r.head}>
          <Block u={-4} w={5} z={34} du={13} dw={12} h={27} fills={COAT} />
          <path d={horn(16)} fill="none" stroke="#10261F" strokeWidth="4.6" strokeLinecap="round" />
          <Block u={-8} w={19} z={60} du={4} dw={9} h={4} fills={DARK} />
          <Block u={-16} w={4} z={54} du={22} dw={14} h={15} fills={COAT} />
          <path d={`M${bx - 1} ${by - 4} l-4 5 l1 13 l6 -10 z`} fill="#6E4F10" />
          <Patch p={[[-16, 18, 69], [-16, 4, 69], [-16, 4, 54], [-16, 18, 54]]} fill="#8A6414" />
          <Patch p={[[-16, 14, 61], [-16, 8, 61], [-16, 9, 57], [-16, 13, 57]]} fill="#10261F" />
          <Dot u={-7} w={4} z={63.5} r={2.2} fill="#10261F" />
          <path d={horn(7)} fill="none" stroke="#1F3B31" strokeWidth="5" strokeLinecap="round" />
          <g ref={r.ear}><Block u={-1} w={-6} z={60} du={5} dw={10} h={4} fills={DARK} /></g>
        </g>
      </g>
    </g>
  );
}
