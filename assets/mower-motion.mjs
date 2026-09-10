const installWeedEaterSprite = () => {
  if (typeof document === 'undefined' || document.querySelector('#weed-eater-sprite-style')) return;

  const style = document.createElement('style');
  style.id = 'weed-eater-sprite-style';
  style.textContent = `
    .mower-bob {
      aspect-ratio:180 / 150;
      background-image:url("assets/weed-eater-onewheel-sprites-v2.png");
      background-repeat:no-repeat;
      background-size:400% 100%;
      width:100%;
    }
    .mower-pose { display:none !important; }
    .mower-scene { height:190px; }
    @media (max-width:620px) {
      .mower-scene { height:160px; }
      .mower-runner { width:190px; }
    }
    .mower-runner[data-frame="mow-1"] .mower-bob { background-position:0% center; }
    .mower-runner[data-frame="mow-2"] .mower-bob { background-position:33.333% center; }
    .mower-runner[data-frame="mow-3"] .mower-bob { background-position:66.667% center; }
    .mower-runner[data-frame="mow-4"] .mower-bob { background-position:100% center; }
  `;
  document.head.append(style);
};

installWeedEaterSprite();

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

  // The repacked sprite places the spinning trimmer head at about 72% of its frame width.
  // Keep the tall-to-cut grass transition locked to that point while he rides across the lawn.
  const trimmerHeadX = x + mowerWidth * .72;
  const grassCutProgress = point < .43 ? trimmerHeadX / viewportWidth : 1;
  const spriteFrame = `mow-${Math.floor(Math.max(0, elapsedSeconds) * 6) % 4 + 1}`;
  const round = value => Math.round(Math.min(1, Math.max(0, value)) * 1000) / 1000;

  return {
    x: Math.round(x * 1000) / 1000,
    facing: point < .49 ? 'right' : 'left',
    pose: 'cutting',
    spriteFrame,
    grassCutProgress: round(grassCutProgress),
  };
}
