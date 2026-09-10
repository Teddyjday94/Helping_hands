import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const motion = await readFile(new URL('../assets/mower-motion.mjs', import.meta.url), 'utf8');

test('uses the tightly cropped sprite sheet so the OneWheel sits in the grass', () => {
  assert.match(motion, /weed-eater-onewheel-sprites-v3\.png/);
  assert.match(motion, /aspect-ratio:180 \/ 150/);
  assert.match(motion, /\.mower-runner\s*\{[^}]*bottom:0;[^}]*width:280px;/s);
  assert.match(motion, /@media \(max-width:620px\)[\s\S]*?\.mower-runner\s*\{[^}]*bottom:0;[^}]*width:245px;/s);
});
