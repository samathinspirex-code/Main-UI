// Hand-drawn SVG ornaments that float around images, ported 1:1 from
// design-reference/doodles.jsx. Presentational only — Server Component.

import type { ReactNode } from "react";
import { SK } from "./tokens";

const DOODLE_COLOR = SK.accent;

type DoodleProps = { size?: number; color?: string };

export const Doodles: Record<string, (props: DoodleProps & { stroke?: number; flip?: boolean; width?: number }) => ReactNode> = {
  // Four-point sparkle (small accent at top-right of photos)
  sparkle: ({ size = 36, color }) => (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <path d="M18 4 Q19 14 28 17 Q19 19 18 32 Q17 19 6 17 Q17 14 18 4 Z" fill={color || DOODLE_COLOR} opacity="0.92" />
      <circle cx="6" cy="6" r="1.3" fill={color || DOODLE_COLOR} />
      <circle cx="30" cy="30" r="1.6" fill={color || DOODLE_COLOR} />
    </svg>
  ),

  // Rough hand-drawn circle (highlight around a portrait)
  circle: ({ size = 40, color, stroke = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ overflow: "visible" }}>
      <path
        d="M50 6 C 76 8 94 26 92 52 C 90 78 70 92 46 90 C 22 88 6 70 8 44 C 10 22 28 6 52 8"
        stroke={color || DOODLE_COLOR}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),

  // Squiggly underline
  squiggle: ({ width = 80, color }) => (
    <svg width={width} height={12} viewBox="0 0 80 12" fill="none">
      <path d="M2 6 Q 10 1 18 6 T 34 6 T 50 6 T 66 6 T 78 6" stroke={color || DOODLE_COLOR} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),

  // Curved arrow doodle (points into the image)
  arrow: ({ size = 52, color, flip = false }) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
      <path d="M6 50 C 6 30 18 14 40 12" stroke={color || DOODLE_COLOR} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M32 8 L 42 11 L 38 20" stroke={color || DOODLE_COLOR} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),

  // Asterisk / spark mark
  asterisk: ({ size = 22, color }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M11 3v16M3 11h16M5 5l12 12M5 17L17 5" stroke={color || DOODLE_COLOR} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),

  // Three small dots
  dots: ({ size = 30, color }) => (
    <svg width={size} height={size} viewBox="0 0 30 30" fill={color || DOODLE_COLOR}>
      <circle cx="5" cy="15" r="2" />
      <circle cx="15" cy="15" r="2.2" />
      <circle cx="25" cy="15" r="2" />
    </svg>
  ),

  // Sun rays (radiating short lines)
  rays: ({ size = 42, color }) => (
    <svg width={size} height={size} viewBox="0 0 42 42" fill="none">
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        const x1 = 21 + Math.cos(a) * 10;
        const y1 = 21 + Math.sin(a) * 10;
        const x2 = 21 + Math.cos(a) * 18;
        const y2 = 21 + Math.sin(a) * 18;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color || DOODLE_COLOR} strokeWidth="1.6" strokeLinecap="round" />;
      })}
    </svg>
  ),

  // Tiny heart
  heart: ({ size = 22, color }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M11 19s-7-4-7-10a4 4 0 017-2 4 4 0 017 2c0 6-7 10-7 10z" stroke={color || DOODLE_COLOR} strokeWidth="1.6" strokeLinejoin="round" fill="none" />
    </svg>
  ),
};

export type DoodlePosition = "tl" | "tr" | "bl" | "br" | "t" | "b" | "l" | "r";

// <Doodle kind="sparkle" pos="tr" /> — positions: tl, tr, bl, br, t, b, l, r
// Place inside a position:relative parent.
export function Doodle({
  kind = "sparkle",
  pos = "tr",
  size,
  color,
  offset = 8,
  rotate = 0,
  opacity = 1,
}: {
  kind?: keyof typeof Doodles;
  pos?: DoodlePosition;
  size?: number;
  color?: string;
  offset?: number;
  rotate?: number;
  opacity?: number;
}) {
  const C = Doodles[kind];
  if (!C) return null;
  const off = offset;
  type PosStyle = { top?: number | string; left?: number | string; right?: number | string; bottom?: number | string; transform?: string };
  const map: Record<DoodlePosition, PosStyle> = {
    tl: { top: -off, left: -off },
    tr: { top: -off, right: -off },
    bl: { bottom: -off, left: -off },
    br: { bottom: -off, right: -off },
    t: { top: -off, left: "50%", transform: `translateX(-50%) rotate(${rotate}deg)` },
    b: { bottom: -off, left: "50%", transform: `translateX(-50%) rotate(${rotate}deg)` },
    l: { left: -off, top: "50%", transform: `translateY(-50%) rotate(${rotate}deg)` },
    r: { right: -off, top: "50%", transform: `translateY(-50%) rotate(${rotate}deg)` },
  };
  const base = { ...(map[pos] || map.tr) };
  if (!base.transform && rotate) base.transform = `rotate(${rotate}deg)`;
  return (
    <div className="sk-doodle" style={{ position: "absolute", pointerEvents: "none", zIndex: 3, opacity, ...base }}>
      <C size={size} width={size} color={color} />
    </div>
  );
}

// Wrap an image (or anything) with doodles. Pass `dood={[{kind:'sparkle', pos:'tr'}]}`.
export function Dood({
  children,
  dood = [],
  style = {},
  display = "block",
}: {
  children?: ReactNode;
  dood?: Array<{ kind?: keyof typeof Doodles; pos?: DoodlePosition; size?: number; color?: string; offset?: number; rotate?: number; opacity?: number }>;
  style?: React.CSSProperties;
  display?: string;
}) {
  return (
    <div className="sk-dood-wrap" style={{ position: "relative", display, width: "100%", height: style.height || "auto", ...style }}>
      {children}
      {dood.map((d, i) => (
        <Doodle key={i} {...d} />
      ))}
    </div>
  );
}
