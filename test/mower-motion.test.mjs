import assert from 'node:assert/strict';
import test from 'node:test';

import { getMowerFrame, getMowerMotionState } from '../assets/mower-motion.mjs';

test('keeps the mower parked when reduced motion is requested', () => {
  assert.deepEqual(getMowerMotionState({ reducedMotion: true }), {
    mode: 'parked',
    durationSeconds: 0,
  });
});

test('runs a relaxed mowing loop for the standard experience', () => {
  assert.deepEqual(getMowerMotionState({ reducedMotion: false }), {
    mode: 'mowing',
    durationSeconds: 32,
  });
});

test('locks the grass cut boundary between the mower deck sections', () => {
  assert.deepEqual(getMowerFrame({ progress: 0.24, elapsedSeconds: 8, viewportWidth: 1000, mowerWidth: 200 }), {
    x: 400,
    facing: 'right',
    pose: 'cutting',
    spriteFrame: 'mow-1',
    grassCutProgress: 0.564,
  });
});

test('drives completely off the right edge before turning around', () => {
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

test('cycles through four distinct mowing frames while the character travels', () => {
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

test('plays a quick nine-step thumbs-up while moving back to the left', () => {
  const frames = [
    [0.722, 'thumb-start'],
    [0.7265, 'thumb-1'],
    [0.731, 'thumb-mid'],
    [0.7355, 'thumb-2'],
    [0.74, 'thumb-full'],
    [0.7445, 'thumb-2'],
    [0.749, 'thumb-mid'],
    [0.7535, 'thumb-1'],
    [0.758, 'thumb-start'],
  ];

  for (const [progress, spriteFrame] of frames) {
    const result = getMowerFrame({ progress, elapsedSeconds: 0, viewportWidth: 1000, mowerWidth: 200 });
    assert.equal(result.facing, 'left');
    assert.equal(result.pose, 'thumbs-up');
    assert.equal(result.spriteFrame, spriteFrame);
  }

  assert.equal(getMowerFrame({ progress: 0.715, elapsedSeconds: 0, viewportWidth: 1000, mowerWidth: 200 }).pose, 'cutting');
  assert.equal(getMowerFrame({ progress: 0.765, elapsedSeconds: 0, viewportWidth: 1000, mowerWidth: 200 }).pose, 'cutting');
});

test('keeps the lawn fully cut while the mower returns left', () => {
  const result = getMowerFrame({ progress: 0.8, elapsedSeconds: 25.6, viewportWidth: 1000, mowerWidth: 200 });
  assert.equal(result.facing, 'left');
  assert.equal(result.grassCutProgress, 1);
});
