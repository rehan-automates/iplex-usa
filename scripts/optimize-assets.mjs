// Re-runnable asset optimiser. Writes WebP / WebM siblings next to the originals in public/assets
// (originals are never modified or deleted) and records old -> new names in lib/asset-manifest.json.
//
//   node scripts/optimize-assets.mjs            images + footer animation + hero video
//   node scripts/optimize-assets.mjs --no-video skip the (slow) video encodes
//
// To revert: empty lib/asset-manifest.json ({}) — every path falls back to the original file.
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, parse } from "node:path";
import sharp from "sharp";

const dir = join(process.cwd(), "public", "assets");
const manifestPath = join(process.cwd(), "lib", "asset-manifest.json");
const skipVideo = process.argv.includes("--no-video");

const MIN_BYTES = 100 * 1024; // smaller files are not worth a new request path
const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

/** Files that are displayed far smaller than their stored size: cap the width, never upscale. */
const maxWidth = {
  "79ccd6a9922709ac5bb6df4c9e199004cf7f8631.jpg": 2560, // 24% opacity, darkened background
  "fda8e4c4e1e5d2e2962f1ab6fc3d934dd3464c3e.png": 1600, // 2000px portrait shown at ~350px
};

/** UI / text-heavy screenshots: keep edges crisp. Everything else is photographic. */
const screenshots = new Set([
  "274b8a74bd7eebb23398c9719b7084007b6c63a3.png",
  "514bd391c78774431623894e0dbb489a4561cb41.png",
  "05f9c70846494e19c5524a8248247a0f69a13ee3.png",
  "work-ai-product-desktop.png",
  "d0b98b006c2260cf1b6a61ee3865ed982bece85c.png",
  "018a63791229b8dfc051915224638934c4ff21de.png",
  "1c5e30447e7e4179eacc8e0f6264a7aed7d62a42.png",
  "e5f3713631911c5b33de2289fca072f1c32de503.png",
]);

const MIN_PSNR = 38;

/** PSNR (dB) of `candidate` against `original`, scaled to the same size; colour error is weighted by opacity. */
async function measurePsnr(original, candidate) {
  const b = await sharp(candidate).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = b.info;
  const a = await sharp(original).resize({ width, height, fit: "fill" }).ensureAlpha().raw().toBuffer();
  let squared = 0;
  for (let i = 0; i < a.length; i += 4) {
    const alpha = a[i + 3] / 255;
    for (let c = 0; c < 3; c++) {
      const d = (a[i + c] - b.data[i + c]) * alpha;
      squared += d * d;
    }
    const da = a[i + 3] - b.data[i + 3];
    squared += da * da;
  }
  const mse = squared / a.length;
  return mse === 0 ? 99 : 10 * Math.log10((255 * 255) / mse);
}

const manifest = {};
let before = 0;
let after = 0;

for (const file of readdirSync(dir).sort()) {
  const { name, ext } = parse(file);
  if (![".png", ".jpg", ".jpeg"].includes(ext.toLowerCase())) continue;
  const source = join(dir, file);
  const size = statSync(source).size;
  if (size < MIN_BYTES) continue;

  const input = sharp(source);
  const meta = await input.metadata();
  const width = maxWidth[file] && meta.width > maxWidth[file] ? maxWidth[file] : meta.width;
  const target = join(dir, `${name}.webp`);

  // Encode, then measure against the original; step quality up until the result is visually clean (>= MIN_PSNR dB).
  const ladder = screenshots.has(file)
    ? [{ nearLossless: true, quality: 92 }, { nearLossless: true, quality: 100 }]
    : [{ quality: 88 }, { quality: 94 }, { quality: 98 }];
  let info;
  let buffer;
  let psnr = 0;
  for (const step of ladder) {
    const encoded = await sharp(source).resize({ width, withoutEnlargement: true }).webp({ ...step, effort: 6 }).toBuffer({ resolveWithObject: true });
    buffer = encoded.data;
    info = encoded.info;
    psnr = await measurePsnr(source, buffer);
    if (psnr >= MIN_PSNR) break;
  }

  // Never ship a "optimised" file that is not smaller.
  if (info.size >= size) {
    console.log(`keep   ${file}  (webp ${kb(info.size)} >= ${kb(size)})`);
    continue;
  }
  writeFileSync(target, buffer);
  manifest[file] = `${name}.webp`;
  before += size;
  after += info.size;
  console.log(`webp   ${file}  ${meta.width}x${meta.height} -> ${info.width}x${info.height}  ${kb(size)} -> ${kb(info.size)}  ${psnr.toFixed(1)} dB`);
}

// Footer animation: same 800x450, same frames and delays, as animated WebP.
{
  const file = "347c615881b659a74d52e560d6c00089e2b701d4.gif";
  const source = join(dir, file);
  const target = join(dir, "347c615881b659a74d52e560d6c00089e2b701d4.webp");
  const original = await sharp(source, { animated: true }).metadata();
  const encoded = await sharp(source, { animated: true }).webp({ quality: 90, effort: 6, loop: 0 }).toBuffer({ resolveWithObject: true });
  const info = encoded.info;
  const result = await sharp(encoded.data, { animated: true }).metadata();
  const size = statSync(source).size;
  const same =
    result.pages === original.pages &&
    result.width === original.width &&
    result.pageHeight === original.pageHeight &&
    JSON.stringify(result.delay) === JSON.stringify(original.delay);
  if (same && info.size < size) {
    writeFileSync(target, encoded.data);
    manifest[file] = "347c615881b659a74d52e560d6c00089e2b701d4.webp";
    before += size;
    after += info.size;
    console.log(`anim   ${file}  ${original.pages} frames ${original.width}x${original.pageHeight}  ${kb(size)} -> ${kb(info.size)}`);
  } else {
    console.log(`keep   ${file}  (frames/delays differ or not smaller: ${original.pages}->${result.pages})`);
  }
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`\nimages: ${kb(before)} -> ${kb(after)}  (${manifest ? Object.keys(manifest).length : 0} files in manifest)`);

// Hero video: same 2560x1440 / 24 fps / duration. A WebM source goes first; the original mp4 stays as the fallback.
if (!skipVideo) {
  const input = join(dir, "home-hero-loop.mp4");
  const run = (args) => {
    const result = spawnSync("ffmpeg", ["-y", "-v", "error", "-i", input, ...args], { stdio: "inherit" });
    if (result.status !== 0) throw new Error(`ffmpeg failed: ${args.join(" ")}`);
  };
  if (!existsSync(join(dir, "home-hero-loop.webm"))) {
    run(["-an", "-c:v", "libvpx-vp9", "-crf", "33", "-b:v", "0", "-row-mt", "1", "-pix_fmt", "yuv420p", "-deadline", "good", "-cpu-used", "1", join(dir, "home-hero-loop.webm")]);
  }
  console.log(`video  home-hero-loop.mp4 ${kb(statSync(input).size)} -> webm ${kb(statSync(join(dir, "home-hero-loop.webm")).size)}`);
}
