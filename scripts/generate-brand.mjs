// Builds every brand image the site uses from the two official sources:
//   scripts/brand-icon-source.webp     – white "ir" mark on a purple square
//   scripts/brand-wordmark-source.webp – "inspire.college" wordmark on white
// Run: node scripts/generate-brand.mjs
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = (p) => resolve(root, p);
await mkdir(out("public/brand"), { recursive: true });

// ---------- Icon: crop the purple square around the mark so it reads at 16px ----------
const iconSrc = await readFile(out("scripts/brand-icon-source.webp"));
const { data: iconPx, info: iconInfo } = await sharp(iconSrc).raw().toBuffer({ resolveWithObject: true });
let minX = Infinity, minY = Infinity, maxX = -1, maxY = -1;
for (let y = 0; y < iconInfo.height; y++) {
  for (let x = 0; x < iconInfo.width; x++) {
    const i = (y * iconInfo.width + x) * iconInfo.channels;
    if (iconPx[i] > 200 && iconPx[i + 1] > 200 && iconPx[i + 2] > 200) {
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
  }
}
const side = Math.min(iconInfo.width, iconInfo.height, Math.round(Math.max(maxX - minX, maxY - minY) * 1.22));
const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
const left = Math.max(0, Math.min(iconInfo.width - side, Math.round(cx - side / 2)));
const top = Math.max(0, Math.min(iconInfo.height - side, Math.round(cy - side / 2)));
const iconSquare = await sharp(iconSrc).extract({ left, top, width: side, height: side }).png().toBuffer();
const icon = (size) => sharp(iconSquare).resize(size, size).ensureAlpha().png({ palette: false }).toBuffer();

const icoSizes = [16, 32, 48, 64, 128, 256];
const [icon512, apple180, icon192, icon32, ...icoImages] = await Promise.all([
  icon(512), icon(180), icon(192), icon(32), ...icoSizes.map(icon),
]);
await writeFile(out("src/app/icon.png"), icon512);
await writeFile(out("src/app/apple-icon.png"), apple180);
await writeFile(out("public/brand/icon-512.png"), icon512);
await writeFile(out("public/brand/icon-192.png"), icon192);
await writeFile(out("public/brand/apple-touch-icon.png"), apple180);
await writeFile(out("public/brand/favicon-32.png"), icon32);

const directory = Buffer.alloc(6 + icoSizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(icoSizes.length, 4);
let offset = directory.length;
icoImages.forEach((image, index) => {
  const entry = 6 + index * 16;
  const s = icoSizes[index] === 256 ? 0 : icoSizes[index];
  directory[entry] = s;
  directory[entry + 1] = s;
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(image.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
const ico = Buffer.concat([directory, ...icoImages]);
await writeFile(out("src/app/favicon.ico"), ico);
await writeFile(out("public/brand/favicon.ico"), ico);

// ---------- Wordmark: remove the white background, trim, keep a transparent PNG ----------
const { data: wm, info: wmInfo } = await sharp(await readFile(out("scripts/brand-wordmark-source.webp")))
  .flatten({ background: "#ffffff" }).raw().toBuffer({ resolveWithObject: true });
const rgba = Buffer.alloc(wmInfo.width * wmInfo.height * 4);
const GREY = 189; // lightest ink in the artwork ("college")
for (let p = 0; p < wmInfo.width * wmInfo.height; p++) {
  const r = wm[p * 3], g = wm[p * 3 + 1], b = wm[p * 3 + 2];
  const a = Math.max(0, Math.min(1, (255 - Math.min(r, g, b) - 3) / (255 - GREY - 3)));
  // Un-mix the white background out of anti-aliased edge pixels.
  const unmix = (c) => (a > 0 ? Math.max(0, Math.min(255, Math.round((c - (1 - a) * 255) / a))) : 0);
  rgba[p * 4] = unmix(r);
  rgba[p * 4 + 1] = unmix(g);
  rgba[p * 4 + 2] = unmix(b);
  rgba[p * 4 + 3] = Math.round(a * 255);
}
const wordmark = await sharp(rgba, { raw: { width: wmInfo.width, height: wmInfo.height, channels: 4 } })
  .trim({ threshold: 1 })
  .png()
  .toBuffer();
// 160px tall: crisp at 2x for any header height up to 80px.
const logo = await sharp(wordmark).resize({ height: 160 }).png({ compressionLevel: 9 }).toBuffer();
await writeFile(out("public/brand/inspire-college-wordmark.png"), logo);
const meta = await sharp(logo).metadata();
console.log(`icon crop ${side}px at ${left},${top}; logo ${meta.width}x${meta.height} (aspect ${(meta.width / meta.height).toFixed(4)})`);
