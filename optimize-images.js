#!/usr/bin/env node
/**
 * optimize-images.js — resize + convert site photos to WebP.
 *
 *   npm i -D sharp
 *   node optimize-images.js <inputDir> <outputDir>
 *
 * Keeps the original basename and appends a width suffix:
 *   DSC_4089.jpg      ->  DSC_4089-600.webp
 *                         DSC_4089-1200.webp
 *                         DSC_4089-2000.webp
 *   DSC_9269copy.JPG  ->  DSC_9269copy-600.webp   (etc.)
 *
 * Case and spelling are preserved exactly, so the paths already in
 * your HTML/JS still resolve with a simple extension swap.
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const [, , inDir, outDir] = process.argv;

if (!inDir || !outDir) {
  console.error("Usage: node optimize-images.js <inputDir> <outputDir>");
  process.exit(1);
}

const WIDTHS = [600, 1200, 2000];
const QUALITY = 78; // visually lossless for photography

fs.mkdirSync(outDir, { recursive: true });

const files = fs
  .readdirSync(inDir)
  .filter((f) => /\.(jpe?g|png|tiff?|webp)$/i.test(f));

if (!files.length) {
  console.error(`No images found in ${inDir}`);
  process.exit(1);
}

let bytesIn = 0;
let bytesOut = 0;

(async () => {
  for (const file of files) {
    const src = path.join(inDir, file);
    const base = file.replace(/\.[^.]+$/, ""); // strip extension, keep case

    const meta = await sharp(src).metadata();
    bytesIn += fs.statSync(src).size;

    for (const w of WIDTHS) {
      const dest = path.join(outDir, `${base}-${w}.webp`);

      await sharp(src)
        .rotate() // honour EXIF orientation
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(dest);

      const size = fs.statSync(dest).size;
      bytesOut += size;
      console.log(`  ${path.basename(dest)}  ${(size / 1024).toFixed(0)} KB`);
    }
  }

  console.log(
    `\n${files.length} source images: ` +
      `${(bytesIn / 1024 / 1024).toFixed(1)} MB  ->  ` +
      `${(bytesOut / 1024 / 1024).toFixed(1)} MB across ${WIDTHS.length} sizes`,
  );
})();
