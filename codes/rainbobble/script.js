// Constants.
const BACKGROUND_COLOR = '#fff';
const FOREGROUND_COLOR = '#000';
const PERIOD = 500; // milliseconds per cycle.
const LINE_SPACING_PX = 20;
const MIN_PEAK_HEIGHT_PX = 40;
const MAX_PEAK_HEIGHT_PX = 500;
const MAX_HEIGHT_DISTANCE = 1 / 8; // distance % mouse -> peak for max height.
const SPEED = 1 / 3; // exponential.
const BALL_SIZE = 0.2; // proportion of the smallest dimension.
const IS_SCROLLING = true;

// DOM things.
const container = document.querySelector('.interactive-bg-container');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.className = 'bg-canvas';
container.appendChild(canvas);

const state = {};

// Initialize our state with viewport size, step, etc.
function init() {
  const h = canvas.height = container.offsetHeight;
  const w = canvas.width = container.offsetWidth;
  const mouse = state.mouse = state.mouse ?
  {
    x: state.mouse.x / state.w * w,
    y: state.mouse.y / state.h * h } :

  {
    x: w / 2,
    y: h / 2 };

  const radiusPx = state.radiusPx = Math.min(h, w) * BALL_SIZE;

  state.prevPeak = { ...mouse };
  state.h = h;
  state.w = w;
  state.diagonal =
  Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) * MAX_HEIGHT_DISTANCE;
  state.numLines = ~~((h + MAX_PEAK_HEIGHT_PX) / LINE_SPACING_PX) + 1;
  state.heightFactor = MAX_PEAK_HEIGHT_PX / radiusPx;

  state.resizer = null;
  state.step = null;
  state.step = requestAnimationFrame(step);
}
init();

// Self-executing game loop. Here we go!
function step(t) {
  const { w, h, diagonal, heightFactor, numLines, radiusPx, mouse, prevPeak } =
  state;

  // Exit early if we're not scrolling and the peak hasn't changed.
  if (!IS_SCROLLING && mouse === prevPeak) {
    return state.step = requestAnimationFrame(step);
  }

  const { x: x1, y: y1 } = mouse;
  const { x: x0, y: y0 } = prevPeak;
  const offset = IS_SCROLLING ? t % PERIOD / PERIOD : 0;

  ctx.clearRect(0, 0, w, h);
  const angle = Math.atan2(x1 - x0, y1 - y0);
  // Casting to an int prevents jitter when the mouse is still.
  const d = ~~Math.pow(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2), SPEED);
  const peakX = x0 + Math.sin(angle) * d;
  const peakY = y0 + Math.cos(angle) * d;

  const peakHeightFactor = Math.max(MIN_PEAK_HEIGHT_PX / radiusPx,
  heightFactor * d / diagonal);
  for (let i = 0; i < numLines; ++i) {
    const y = LINE_SPACING_PX * (i - offset);
    const dY = Math.abs(y - peakY);

    ctx.beginPath();
    ctx.moveTo(0, y);

    if (dY < radiusPx) {
      const r = Math.sqrt(radiusPx * radiusPx - dY * dY);
      const height = -Math.min(r * peakHeightFactor, MAX_PEAK_HEIGHT_PX);

      ctx.lineTo(peakX - r, y);
      drawSigmoid(peakX, y, r, height, true);
    }

    const n = i + Math.floor(t / PERIOD);
    ctx.fillStyle = n % 2 ? 'hsl(' + n * 30 % 360 + ', 30%, 60%)' : '#000';
    ctx.lineTo(w, y);
    ctx.lineTo(w, y + LINE_SPACING_PX + 1);
    ctx.lineTo(0, y + LINE_SPACING_PX + 1);
    ctx.fill();
  }

  state.prevPeak = { x: peakX, y: peakY };
  state.step = requestAnimationFrame(step);
}

// Add event listeners *after* we initialize state and start animation.
const handleMove = e => state.mouse = mouseCoords(e);
window.addEventListener('mousemove', handleMove, false);

// TODO(riley): A bit awkward on mobile right now, but gyroscope will fix that.
window.addEventListener(
'touchmove', e => handleMove(e.changedTouches[0]), false);

window.addEventListener('resize', _ => {
  if (!state.resizer) {
    cancelAnimationFrame(state.step);
  }

  clearTimeout(state.resizer);
  state.resizer = setTimeout(init, 600);
});

// Convenience functions:
function mouseCoords({ clientX, clientY }) {
  const { left, top } = canvas.getBoundingClientRect();
  return {
    x: clientX - left,
    y: clientY - top };

}

function drawSigmoid(cX, cY, r, h, skipMove) {
  if (!skipMove) ctx.moveTo(cX - r, cY);
  ctx.bezierCurveTo(cX - r / 2, cY, cX - r / 2, cY + h, cX, cY + h);
  ctx.bezierCurveTo(cX + r / 2, cY + h, cX + r / 2, cY, cX + r, cY);
}

// Exports:
window.bubble = {};

window.bubble.start = function start() {
  if (state.step) {
    return;
  }

  canvas.style.display = 'block';
  init();
};

window.bubble.stop = function stop() {
  if (!state.step) {
    return;
  }

  canvas.style.display = 'none';
  state.step = cancelAnimationFrame(state.step);
};