import assert from 'node:assert/strict';
import test from 'node:test';

import { getMowerFrame, getMowerMotionState } from '../assets/mower-motion.mjs';

test('keeps the weed eater parked when reduced motion is requested', () => {
  assert.deepEqual(getMowerMotionState({ reducedMotion: true }), {
    mode: 'parked',
    durationSeconds: 0,
  });
});

test('runs a relaxed weed-eating loop for the standard experience', () => {
  assert.deepEqual(getMowerMotionState({ reducedMotion: false }), {
    mode: 'mowing',
    durationSeconds: 32,
  });
});

test('locks the grass cut boundary to the weed-eater head', () => {
  assert.deepEqual(getMowerFrame({ progress: 0.24, elapsedSeconds: 8, viewportWidth: 1000, mowerWidth: 200 }), {
    x: 400,
    facing: 'right',
    pose: 'cutting',
    spriteFrame: 'mow-1',
    grassCutProgress: 0.522,
  });
});

test('rides completely off the right edge before turning around', () => {
  assert.deepEqual(getMowerFrame({ progress: 0.43, elapsedSeconds: 13.76, viewportWidth: 1000, mowerWidth: 200 }), {
    x: 1016,
    facing: 'right',
    pose: 'cutting',
    spriteFrame: 'mow-3',
    grassCutProgress: 1,
  });

  assert.deepEqual(getMowerFrame({ progress: 0.49, elapsedSeconds: 15.68, viewportWidth: 1000, mowerWidth: 200 }), {
    x: 1016,
    facing: 'left',
    pose: 'cutting',
    spriteFrame: 'mow-3',
    grassCutProgress: 1,
  });
});

test('cycles through four distinct weed-eating frames while the character travels', () => {
  const frames = [
    [0, 'mow-1'],
    [0.18, 'mow-2'],
    [0.35, 'mow-3'],
    [0.52, 'mow-4'],
    [0.68, 'mow-1'],
  ];

  for (const [elapsedSeconds, spriteFrame] of frames) {
    assert.equal(
      getMowerFrame({ progress: 0.2, elapsedSeconds, viewportWidth: 1000, mowerWidth: 200 }).spriteFrame,
      spriteFrame,
    );
  }
});

test('keeps weed-eating continuously while riding back to the left', () => {
  for (const progress of [0.55, 0.72, 0.74, 0.76, 0.9]) {
    const result = getMowerFrame({ progress, elapsedSeconds: progress * 32, viewportWidth: 1000, mowerWidth: 200 });
    assert.equal(result.facing, 'left');
    assert.equal(result.pose, 'cutting');
    assert.match(result.spriteFrame, /^mow-[1-4]$/);
  }
});

test('keeps the lawn fully cut while the weed eater returns left', () => {
  const result = getMowerFrame({ progress: 0.8, elapsedSeconds: 25.6, viewportWidth: 1000, mowerWidth: 200 });
  assert.equal(result.facing, 'left');
  assert.equal(result.grassCutProgress, 1);
});
