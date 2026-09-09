import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('wires both generated in-between poses into the mower frame stack', () => {
  assert.match(html, /mower-sprite-thumb-start-v1\.png/);
  assert.match(html, /mower-sprite-thumb-mid-v1\.png/);
  assert.match(html, /data-frame="thumb-start"/);
  assert.match(html, /data-frame="thumb-mid"/);
});

test('uses tall and cut grass sprites with one shared cut boundary', () => {
  assert.match(html, /grass-uncut-sprite-v1\.png/);
  assert.match(html, /grass-cut-sprite-v1\.png/);
  assert.match(html, /const cutBoundary = frame\.grassCutProgress \* window\.innerWidth/);
  assert.doesNotMatch(html, /outboundGrassProgress|returnGrassProgress|mower-cut-outbound|mower-cut-return/);
});

test('keeps the grass layer behind the mower while it is cutting', () => {
  assert.match(html, /\.mower-grass\s*\{[^}]*z-index:1/);
  assert.match(html, /\.mower-runner\s*\{[^}]*z-index:2/);
});
