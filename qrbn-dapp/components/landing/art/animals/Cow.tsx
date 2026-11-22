"use client";

import React from 'react';
import { Block, Leg, Patch, Dot, useProject, useRig, type AnimalProps, type Fills } from './rig';

const HIDE: Fills = ['#C3CFC8', '#E3EAE5', '#FFFFFF'];
const INK: Fills = ['#10261F', '#1F3B31', '#2E5246'];
const NOSE: Fills = ['#D9BE79', '#E6D095', '#F2E3B5'];
const LEG: Fills = ['#AEBDB4', '#CFD9D2', '#FFFFFF'];
const HORN: Fills = ['#8A6414', '#A67C22', '#C39A3B'];

/* Body 66 x 34 x 32 on legs 24 high: the biggest of the three, white with dark patches. */
export default function Cow(props: AnimalProps) {
  const at = useProject();
  const r = useRig({ head: at(2, 16, 48), tail: at(66, 6, 50), ear: at(-10, 4, 56) }, props, 24, 10);
  const [tx, ty] = at(66, 6, 50);
  return (
    <g>
      <g ref={r.legA}>
        <Leg u={54} w={23} d={9} h={26} fills={LEG} hoof={INK} />
        <Leg u={4} w={2} d={9} h={26} fills={LEG} hoof={INK} />
      </g>
      <g ref={r.legB}>
        <Leg u={4} w={23} d={9} h={26} fills={LEG} hoof={INK} />
        <Leg u={54} w={2} d={9} h={26} fills={LEG} hoof={INK} />
      </g>
      <g ref={r.body}>
        <g ref={r.tail}>
          <path d={`M${tx} ${ty} q9 5 8 24`} fill="none" stroke="#C3CFC8" strokeWidth="3.4" strokeLinecap="round" />
          <ellipse cx={tx + 8} cy={ty + 27} rx="3.6" ry="6" fill="#10261F" />
        </g>
        <Patch p={[[46, 0, 24], [58, 0, 24], [56, 0, 20], [48, 0, 20]]} fill="#E6D095" />
        <Block u={0} w={0} z={24} du={66} dw={34} h={32} fills={HIDE} />
        {/* patches wrap from the side over the back */}
        <Patch p={[[34, 0, 56], [58, 0, 56], [60, 0, 44], [52, 0, 35], [40, 0, 38], [34, 0, 46]]} fill="#1F3B31" />
        <Patch p={[[34, 0, 56], [58, 0, 56], [56, 13, 56], [44, 18, 56], [36, 10, 56]]} fill="#2E5246" />
        <Patch p={[[8, 0, 44], [18, 0, 47], [23, 0, 38], [17, 0, 29], [9, 0, 33]]} fill="#1F3B31" />
        <Patch p={[[16, 34, 56], [30, 34, 56], [28, 25, 56], [19, 24, 56]]} fill="#2E5246" />
        <g ref={r.head}><g transform="translate(-7 1)">
          <Block u={-8} w={24} z={58} du={5} dw={4} h={8} fills={HORN} />
          <Block u={-8} w={30} z={50} du={5} dw={9} h={5} fills={INK} />
          <Block u={-20} w={6} z={38} du={24} dw={22} h={24} fills={HIDE} />
          <Patch p={[[-20, 28, 62], [4, 28, 62], [4, 18, 62], [-20, 20, 62]]} fill="#2E5246" />
          <Patch p={[[-20, 28, 62], [-20, 20, 62], [-20, 20, 46], [-20, 28, 46]]} fill="#10261F" />
          <Block u={-26} w={8} z={36} du={8} dw={18} h={12} fills={NOSE} />
          <Patch p={[[-26, 13, 44], [-26, 11, 44], [-26, 11, 41], [-26, 13, 41]]} fill="#6E4F10" />
          <Patch p={[[-26, 23, 44], [-26, 21, 44], [-26, 21, 41], [-26, 23, 41]]} fill="#6E4F10" />
          <Dot u={-12} w={6} z={52} r={2.6} fill="#10261F" />
          <Block u={-8} w={8} z={62} du={5} dw={4} h={8} fills={HORN} />
          <g ref={r.ear}><Block u={-5} w={-5} z={52} du={5} dw={11} h={5} fills={INK} /></g>
        </g></g>
      </g>
    </g>
  );
}
