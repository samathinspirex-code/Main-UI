import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// Source: scripts/favicon-mark.png (purple Inspire mark on a transparent square).
const source = await readFile(resolve(root, "scripts/favicon-mark.png"));
// Browser icons: the mark on a white rounded square, so it stays visible on
// dark browser tabs and dark-mode search results.
const render = async (size) => {
  const inner = Math.round(size * 0.8);
  const offset = Math.floor((size - inner) / 2);
  const radius = Math.round(size * 0.22);
  const tile = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#ffffff"/></svg>`,
  );
  const mark = await sharp(source).resize(inner, inner).png().toBuffer();
  return sharp(tile).composite([{ input: mark, top: offset, left: offset }]).png().toBuffer();
};
// iOS renders transparency as black, so the Apple icon sits on white with padding.
const renderApple = (size) => {
  const inner = Math.round(size * 0.8);
  const lead = Math.floor((size - inner) / 2);
  const trail = size - inner - lead;
  return sharp(source)
    .resize(inner, inner)
    .extend({ top: lead, bottom: trail, left: lead, right: trail, background: "#ffffff" })
    .flatten({ background: "#ffffff" })
    .png().toBuffer();
};

const [icon, appleIcon, ...icoImages] = await Promise.all([
  render(512), renderApple(180), ...[16, 32, 48, 64, 128, 256].map(render),
]);

await writeFile(resolve(root, "src/app/icon.png"), icon);
await writeFile(resolve(root, "src/app/apple-icon.png"), appleIcon);

const sizes = [16, 32, 48, 64, 128, 256];
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
icoImages.forEach((image, index) => {
  const entry = 6 + index * 16;
  directory[entry] = sizes[index] === 256 ? 0 : sizes[index];
  directory[entry + 1] = sizes[index] === 256 ? 0 : sizes[index];
  directory[entry + 2] = 0;
  directory[entry + 3] = 0;
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(image.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
await writeFile(resolve(root, "src/app/favicon.ico"), Buffer.concat([directory, ...icoImages]));
