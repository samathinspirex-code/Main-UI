// Hand-drawn wireframe primitives (Box, Line, Scribble, Image, Button, ...),
// ported 1:1 from design-reference/sketch-primitives.jsx (SkBtn extended with
// real href/onClick support so it can actually navigate/act).
import { useId, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { SK, pickImage } from "./tokens";

// Hand-drawn SVG rect using a rough path
export function SkBox({
  w = "100%",
  h = 40,
  radius = 4,
  fill = "transparent",
  stroke,
  sw = 1.5,
  style = {},
  children,
  dashed = false,
  accent = false,
}: {
  w?: number | string;
  h?: number | string;
  radius?: number;
  fill?: string;
  stroke?: string;
  sw?: number;
  style?: CSSProperties;
  children?: ReactNode;
  dashed?: boolean;
  accent?: boolean;
}) {
  const strokeColor = stroke || (accent ? SK.accent : SK.ink);
  return (
    <div style={{ position: "relative", width: w, height: h, ...style }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <rect
          x="1"
          y="1.5"
          width="98"
          height="97"
          rx={radius}
          ry={radius}
          fill={fill}
          stroke={strokeColor}
          strokeWidth={sw}
          strokeDasharray={dashed ? "3 2" : "none"}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>{children}</div>
    </div>
  );
}

// Wobbly horizontal line
export function SkLine({
  w = "100%",
  thickness = 1.5,
  color,
  style = {},
}: {
  w?: number | string;
  thickness?: number;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <svg width={w} height={6} viewBox="0 0 200 6" preserveAspectRatio="none" style={{ display: "block", ...style }}>
      <path d="M1 3 Q 50 1, 100 3 T 199 3" fill="none" stroke={color || SK.ink} strokeWidth={thickness} strokeLinecap="round" />
    </svg>
  );
}

// Scribble lines to indicate text
export function Scribble({
  lines = 3,
  width = "100%",
  lineGap = 8,
  lastShort = true,
  color,
  style = {},
}: {
  lines?: number;
  width?: number | string;
  lineGap?: number;
  lastShort?: boolean;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: lineGap, width, ...style }}>
      {Array.from({ length: lines }).map((_, i) => {
        // Deterministic per-line jitter (not Math.random): a Server Component
        // renders once on the server and once on the client, and true
        // randomness there would produce a hydration mismatch.
        const w = lastShort && i === lines - 1 ? 60 : 90 + ((i * 53) % 8);
        return <SkLine key={i} w={`${w}%`} color={color} thickness={1.4} />;
      })}
    </div>
  );
}

// Placeholder image block — uses a real photo if the label matches the image
// bank, otherwise falls back to the diagonal-stripe sketch placeholder.
export function SkImage({
  w = "100%",
  h = 140,
  label = "image",
  radius = 4,
  style = {},
  accent = false,
  src,
}: {
  w?: number | string;
  h?: number | string;
  label?: string;
  radius?: number;
  style?: CSSProperties;
  accent?: boolean;
  src?: string;
}) {
  const stripeColor = accent ? "rgba(63,0,124,0.18)" : "rgba(29,26,20,0.12)";
  const id = useId();
  const photo = src || pickImage(label);

  if (photo) {
    return (
      <div
        style={{
          position: "relative",
          width: w,
          height: h,
          borderRadius: radius,
          overflow: "hidden",
          border: `1.3px solid ${SK.ink}`,
          ...style,
        }}
      >
        <Image src={photo} alt={label} fill sizes="100vw" style={{ objectFit: "cover" }} />
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: w, height: h, ...style }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id={`stripes-${id}`} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke={stripeColor} strokeWidth="2" />
          </pattern>
        </defs>
        <rect x="1" y="1" width="98" height="98" rx={radius} fill={`url(#stripes-${id})`} stroke={SK.ink} strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--sk-mono)",
          fontSize: 11,
          color: SK.inkSoft,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          pointerEvents: "none",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// Sketchy button. Renders as a real next/link when `href` is given, a real
// <button> when `onClick`/`type="submit"` is given, or a plain decorative
// <span> otherwise (for spots with no wired-up destination yet).
export function SkBtn({
  children,
  primary = false,
  small = false,
  style = {},
  fullWidth = false,
  arrow = false,
  href,
  onClick,
  type = "button",
  disabled = false,
}: {
  children?: ReactNode;
  primary?: boolean;
  small?: boolean;
  style?: CSSProperties;
  fullWidth?: boolean;
  arrow?: boolean;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const h = small ? 28 : 36;
  const bg = primary ? SK.accent : "transparent";
  const color = primary ? "#fff" : SK.ink;

  const wrapperStyle: CSSProperties = {
    display: "inline-flex",
    position: "relative",
    width: fullWidth ? "100%" : "auto",
    cursor: disabled ? "default" : href || onClick || type === "submit" ? "pointer" : "default",
    opacity: disabled ? 0.5 : 1,
    ...style,
  };

  const content = (
    <>
      <svg width="100%" height={h} viewBox="0 0 200 40" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <path d="M 4 3 Q 100 1 196 4 Q 198 20 196 37 Q 100 39 4 36 Q 2 20 4 3 Z" fill={bg} stroke={SK.ink} strokeWidth="1.5" />
      </svg>
      <span
        style={{
          position: "relative",
          padding: small ? "4px 14px" : "8px 18px",
          fontFamily: "var(--sk-hand)",
          fontSize: small ? 12 : 14,
          color,
          fontWeight: primary ? 700 : 600,
          zIndex: 1,
          width: fullWidth ? "100%" : "auto",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {children}
        {arrow && " →"}
      </span>
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} style={wrapperStyle}>
        {content}
      </Link>
    );
  }
  if (onClick || type === "submit") {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        style={{ ...wrapperStyle, border: "none", background: "none", padding: 0, font: "inherit" }}
      >
        {content}
      </button>
    );
  }
  return <span style={wrapperStyle}>{content}</span>;
}

// Circle avatar placeholder
export function SkAvatar({ size = 36, label = "" }: { size?: number; label?: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(29,26,20,0.1)",
        border: `1.3px solid ${SK.ink}`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--sk-hand)",
        fontSize: size * 0.38,
        color: SK.inkSoft,
        flexShrink: 0,
      }}
    >
      {label}
    </div>
  );
}

// Hand-lettered heading
export function Heading({
  children,
  size = 28,
  style = {},
  underline = false,
  accent = false,
}: {
  children?: ReactNode;
  size?: number;
  style?: CSSProperties;
  underline?: boolean;
  accent?: boolean;
}) {
  return (
    <div style={{ fontFamily: "var(--sk-hand)", fontWeight: 700, fontSize: size, color: accent ? SK.accent : SK.ink, lineHeight: 1.1, letterSpacing: -0.3, ...style }}>
      {children}
      {underline && <SkLine w="60%" thickness={2} color={accent ? SK.accent : SK.ink} style={{ marginTop: 4 }} />}
    </div>
  );
}

// Small tag / chip
export function SkTag({ children, filled = false, accent = false }: { children?: ReactNode; filled?: boolean; accent?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 10px",
        border: `1.2px solid ${accent ? SK.accent : SK.ink}`,
        borderRadius: 12,
        fontFamily: "var(--sk-hand)",
        fontSize: 11,
        color: filled ? "#fff" : accent ? SK.accent : SK.ink,
        background: filled ? SK.ink : "transparent",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

// Annotation with arrow
export function Annotation({ children, style = {}, rotate = -2 }: { children?: ReactNode; style?: CSSProperties; rotate?: number }) {
  return (
    <div style={{ fontFamily: "var(--sk-hand)", fontSize: 12, color: SK.accent, fontStyle: "italic", transform: `rotate(${rotate}deg)`, ...style }}>
      {children}
    </div>
  );
}

// Icon — simple sketchy geometric placeholder
export function SkIcon({ kind = "square", size = 20, color }: { kind?: string; size?: number; color?: string }) {
  const c = color || SK.ink;
  const common = { fill: "none", stroke: c, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, ReactNode> = {
    search: (
      <g {...common}>
        <circle cx="9" cy="9" r="6" />
        <path d="M14 14l5 5" />
      </g>
    ),
    menu: (
      <g {...common}>
        <path d="M3 6h18M3 12h18M3 18h18" />
      </g>
    ),
    arrow: (
      <g {...common}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </g>
    ),
    user: (
      <g {...common}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c1-4 5-6 8-6s7 2 8 6" />
      </g>
    ),
    cal: (
      <g {...common}>
        <rect x="3" y="5" width="18" height="16" rx="1" />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </g>
    ),
    book: (
      <g {...common}>
        <path d="M4 5c3-1 6-1 8 0v14c-2-1-5-1-8 0V5zM20 5c-3-1-6-1-8 0v14c2-1 5-1 8 0V5z" />
      </g>
    ),
    pin: (
      <g {...common}>
        <path d="M12 21s-6-6-6-11a6 6 0 1112 0c0 5-6 11-6 11z" />
        <circle cx="12" cy="10" r="2" />
      </g>
    ),
    mail: (
      <g {...common}>
        <rect x="3" y="6" width="18" height="13" rx="1" />
        <path d="M3 8l9 6 9-6" />
      </g>
    ),
    play: (
      <g {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8l6 4-6 4V8z" fill={c} />
      </g>
    ),
    star: (
      <g {...common}>
        <path d="M12 3l2.5 6 6.5.5-5 4.5 1.5 6.5L12 17l-5.5 3.5L8 14l-5-4.5L9.5 9 12 3z" />
      </g>
    ),
    check: (
      <g {...common}>
        <path d="M4 12l5 5L20 6" />
      </g>
    ),
    dot: (
      <g>
        <circle cx="12" cy="12" r="3" fill={c} />
      </g>
    ),
    square: (
      <g {...common}>
        <rect x="4" y="4" width="16" height="16" rx="1" />
      </g>
    ),
    globe: (
      <g {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </g>
    ),
    chat: (
      <g {...common}>
        <path d="M4 6h16v10H9l-4 4V6z" />
      </g>
    ),
    heart: (
      <g {...common}>
        <path d="M12 20s-7-5-7-10a4 4 0 017-2 4 4 0 017 2c0 5-7 10-7 10z" />
      </g>
    ),
    grad: (
      <g {...common}>
        <path d="M3 9l9-4 9 4-9 4-9-4z" />
        <path d="M7 11v5c0 1 3 2 5 2s5-1 5-2v-5" />
      </g>
    ),
    flask: (
      <g {...common}>
        <path d="M9 3h6M10 3v6l-5 10c-.5 1 .3 2 1.5 2h11c1.2 0 2-1 1.5-2l-5-10V3" />
      </g>
    ),
    brush: (
      <g {...common}>
        <path d="M4 20c2 0 3-1 3-3 0-1-1-2-2-2s-2 1-2 2c0 1-1 3-1 3h2zM7 15l9-9 3 3-9 9" />
      </g>
    ),
    code: (
      <g {...common}>
        <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
      </g>
    ),
    building: (
      <g {...common}>
        <rect x="4" y="4" width="16" height="17" />
        <path d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2M10 21v-3h4v3" />
      </g>
    ),
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {paths[kind] || paths.square}
    </svg>
  );
}

// Spacer
export function Sp({ h = 12, w }: { h?: number; w?: number | string }) {
  return <div style={{ height: h, width: w }} />;
}

// Section divider — wobbly
export function SkDivider({ style = {} }: { style?: CSSProperties }) {
  return (
    <svg width="100%" height="4" viewBox="0 0 400 4" preserveAspectRatio="none" style={{ display: "block", ...style }}>
      <path d="M0 2 Q 50 0 100 2 T 200 2 T 300 2 T 400 2" fill="none" stroke={SK.muted} strokeWidth="1" />
    </svg>
  );
}
