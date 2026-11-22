"use client";

/* The hero's palette, for art. Flat fills only. */
export const PAL = {
  ink: '#10261F', muted: '#4A5F57', stone: '#EEF1EC', paper: '#FBFCFA', glaze: '#DCE8E1', mint: '#D3ECDD',
  line: '#CED8D1', accent: '#1F6B54', deep: '#175545', art: '#0E8A5F', honey: '#8A6414', butter: '#F2E3B5',
} as const;

/* [left, right, top] fills for the hero's stack layers. */
export const FILLS = {
  ledger: ['#1F3B31', '#10261F', '#2E5246'],
  zakat: ['#1F6B54', '#175545', '#2E8068'],
  waqf: ['#d8eee5', '#c1e3d4', '#f0f9f5'],
  sadaqah: ['#CED8D1', '#B8C7BE', '#FBFCFA'],
  qard: ['#cfeee0', '#b3e2cf', '#e9f8f1'],
  honey: ['#8A6414', '#6E4F10', '#B58A2A'],
  paper: ['#CED8D1', '#B8C7BE', '#FBFCFA'],
} as const satisfies Record<string, readonly [string, string, string]>;
