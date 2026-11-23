import Image from "next/image";

const LOGO_SRC = "/brand/inspire-college-wordmark.png";
// Intrinsic size of the trimmed wordmark (966×160). `height` is the slot the
// old padded 300×80 logo filled; the trimmed artwork is drawn at 72% of it so
// the letters stay the same size.
const LOGO_ASPECT = 966 / 160;
const INK = 0.72;

export function Logo({ height = 36, light = false }: { height?: number; light?: boolean }) {
  return (
    <Image
      src={LOGO_SRC}
      alt="Inspire College"
      width={Math.round(height * INK * LOGO_ASPECT)}
      height={Math.round(height * INK)}
      style={{ display: "block", filter: light ? "brightness(0) invert(1)" : "none" }}
    />
  );
}
