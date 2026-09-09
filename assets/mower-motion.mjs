export function getMowerMotionState({ reducedMotion }) {
  return reducedMotion
    ? { mode: 'parked', durationSeconds: 0 }
    : { mode: 'mowing', durationSeconds: 32 };
}

export function getMowerFrame({ progress, elapsedSeconds = 0, viewportWidth, mowerWidth }) {
  const point = Math.min(1, Math.max(0, progress));
  const start = -mowerWidth - 16;
  const rightExit = viewportWidth + 16;
  let x = start;

  if (point >= .05 && point < .43) {
    x = start + (rightExit - start) * ((point - .05) / .38);
  } else if (point >= .43 && point < .49) {
    x = rightExit;
  } else if (point >= .49 && point < .95) {
    x = rightExit + (start - rightExit) * ((point - .49) / .46);
  }

  const mowerDeckCenter = x + mowerWidth * .82;
  const grassCutProgress = point < .43 ? mowerDeckCenter / viewportWidth : 1;
  const mowingFrame = `mow-${Math.floor(Math.max(0, elapsedSeconds) * 6) % 4 + 1}`;
  const thumbFrames = ['thumb-start', 'thumb-1', 'thumb-mid', 'thumb-2', 'thumb-full', 'thumb-2', 'thumb-mid', 'thumb-1', 'thumb-start'];
  const isThumbsUp = point >= .72 && point < .76;
  let spriteFrame = mowingFrame;

  if (isThumbsUp) {
    const thumbProgress = (point - .72) / .04;
    spriteFrame = thumbFrames[Math.min(thumbFrames.length - 1, Math.floor(thumbProgress * thumbFrames.length))];
  }

  const round = value => Math.round(Math.min(1, Math.max(0, value)) * 1000) / 1000;

  return {
    x: Math.round(x * 1000) / 1000,
    facing: point < .49 ? 'right' : 'left',
    pose: isThumbsUp ? 'thumbs-up' : 'cutting',
    spriteFrame,
    grassCutProgress: round(grassCutProgress),
  };
}
