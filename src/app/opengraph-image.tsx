// The 1200x630 picture shown when a site link is shared (WhatsApp, Facebook,
// LinkedIn, X). Pages without their own image inherit this one.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Inspire College – Online UK Qualifications in Sri Lanka";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const mark = await readFile(join(process.cwd(), "scripts/favicon-mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#ffffff", padding: "0 90px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} width={260} height={260} alt="" />
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 48 }}>
          <div style={{ fontSize: 84, fontWeight: 800, color: "#4E018F", letterSpacing: -2 }}>Inspire College</div>
          <div style={{ fontSize: 40, color: "#2a2a2a", marginTop: 18 }}>Online UK Qualifications in Sri Lanka</div>
          <div style={{ fontSize: 30, color: "#6b6b6b", marginTop: 26 }}>Foundation · HND · Degrees · AI · Business</div>
        </div>
      </div>
    ),
    size,
  );
}
