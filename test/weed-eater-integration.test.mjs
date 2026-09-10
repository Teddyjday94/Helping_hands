import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const motionSource = await readFile(new URL('../assets/mower-motion.mjs', import.meta.url), 'utf8');

test('loads the four-frame one-wheel weed-eater sprite sheet', async () => {
  assert.match(motionSource, /weed-eater-onewheel-sprites-v2\.png/);
  await access(new URL('../assets/weed-eater-onewheel-sprites-v2.png', import.meta.url));
});

test('maps each mowing frame to a distinct quarter of the weed-eater sprite sheet', () => {
  for (const offset of ['0%', '33.333%', '66.667%', '100%']) {
    assert.ok(motionSource.includes(`background-position:${offset} center`));
  }
});

test('uses tight frame geometry and a larger grounded mobile footprint', () => {
  assert.match(motionSource, /aspect-ratio:180 \/ 150/);
  assert.match(motionSource, /\.mower-scene \{ height:190px; \}/);
  assert.match(motionSource, /@media \(max-width:620px\)[\s\S]*\.mower-scene \{ height:160px; \}[\s\S]*\.mower-runner \{ width:190px; \}/);
});
