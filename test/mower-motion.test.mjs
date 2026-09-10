import assert from 'node:assert/strict';
import test from 'node:test';
import { getMowerFrame, getMowerMotionState } from '../assets/mower-motion.mjs';

test('keeps the weed eater parked when reduced motion is requested', () => {
  assert.deepEqual(getMowerMotionState({ reducedMotion: true }), { mode: 'parked', durationSeconds: 0 });
});

test('runs a relaxed weed-eating loop for the standard experience', () => {
  assert.deepEqual(getMowerMotionState({ reducedMotion: false }), { mode: 'mowing', durationSeconds: 32 });
});

test('locks the grass cut boundary to the visible weed-eater head', () => {
  assert.deepEqual(getMowerFrame({ progress: 0.24, elapsedSeconds: 8, viewportWidth: 1000, mowerWidth: 200 }), {
    x: 400,
    facing: 'right',
    pose: 'cutting',
    spriteFrame: 'mow-1',
    grassCutProgress: 0.558,
  });
});

test('cycles through four distinct weed-eating frames while the character travels', () => {
  const frames = [[0,'mow-1'],[0.18,'mow-2'],[0.35,'mow-3'],[0.52,'mow-4'],[0.68,'mow-1']];
  for (const [elapsedSeconds, spriteFrame] of frames) {
    assert.equal(getMowerFrame({ progress: 0.2, elapsedSeconds, viewportWidth: 1000, mowerWidth: 200 }).spriteFrame, spriteFrame);
  }
});
