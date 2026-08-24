import Image from "next/image";

const LOGO_SRC = "https://inspirecollege.lk/wp-content/uploads/2025/09/LeadHype-300-x-80-px-1.png";
// Intrinsic size of the source asset (300×80) — next/image needs explicit
// width/height, so the render width is derived from this aspect ratio to
// reproduce the original's `height: X, width: auto` behavior exactly.
const LOGO_ASPECT = 300 / 80;

export function Logo({ height = 36, light = false }: { height?: number; light?: boolean }) {
  return (
    <Image
      src={LOGO_SRC}
      alt="Inspire College"
      width={Math.round(height * LOGO_ASPECT)}
      height={height}
      style={{ display: "block", filter: light ? "brightness(0) invert(1)" : "none" }}
    />
  );
}
