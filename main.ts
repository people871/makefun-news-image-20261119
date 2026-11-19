// news-image-20261119 — "Sum up 19 November's world news in one image".
//
// The entry is one picture: a newspaper front page for Thursday
// 19 November 2026. The lead story is GTA VI opening Vice City after
// thirteen years; below it, three panels cover the first-ever
// Trump–Xi–Putin trilateral in Shenzhen, the US–Iran exchange of fire
// in the Gulf, and Cyclone Akvan bearing down on India's east coast.
// The date and one short caption per story are printed on the image
// itself, so the picture editor judging it needs no news feed.
//
// This program does nothing creative at run time. It takes the image
// stored beside it (entry.png — JPEG bytes under that name, which the
// rules allow) and writes it to the grader's output directory. The
// copy is deterministic: the same input bytes go out on every run,
// and the program proves it by hashing both sides before exiting.
//
// Run it outside the grader's container with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

function sha256(bytes: Buffer): string {
  return createHash('sha256').update(bytes).digest('hex');
}

const here = dirname(fileURLToPath(import.meta.url));
const imagePath = resolve(here, 'entry.png');
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outputPath = resolve(outputDir, 'entry.png');

const image = readFileSync(imagePath);

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, image);

const writtenBack = readFileSync(outputPath);
if (sha256(writtenBack) !== sha256(image)) {
  throw new Error('output entry.png differs from the repository image');
}

console.log(`wrote ${outputPath} (${image.length} bytes, sha256 ${sha256(image)})`);
