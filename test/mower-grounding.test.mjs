import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const motion = await readFile(new URL('../assets/mower-motion.mjs', import.meta.url), 'utf8');

test('seats the OneWheel into the grass and keeps the weed-eater rider prominent', () => {
  assert.match(motion, /\.mower-runner\s*\{[^}]*bottom:-8px;[^}]*width:280px;/s);
  assert.match(motion, /@media \(max-width:620px\)[\s\S]*?\.mower-runner\s*\{[^}]*bottom:-8px;[^}]*width:245px;/s);
});
