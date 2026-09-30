import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = await readFile(resolve(root, "scripts/favicon-i.svg"));
const render = (size) => sharp(source).resize(size, size).png().toBuffer();

const [icon, appleIcon, ...icoImages] = await Promise.all([
  render(512), render(180), ...[16, 32, 48, 64, 128, 256].map(render),
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
