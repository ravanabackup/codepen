// Constants.
const CANVAS_SIZE = 520;
const N_LINES = 13;
const LINE_WIDTH = 6;
const SPEED = 10 / 3;

// Derived constants.
const SIZE = CANVAS_SIZE * devicePixelRatio;
const LINE_SPACING = SIZE / N_LINES;
const CENTER_SPACINGS = Array.from(
{ length: N_LINES },
(_, n) => (n + 0.5) * LINE_SPACING);


// Canvas setup.
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.style.height = canvas.style.width = `${CANVAS_SIZE}px`;
canvas.style.border = `${LINE_WIDTH}px solid #000`;
canvas.style.boxShadow = `0 0 0 ${LINE_WIDTH / 2}px #fff`;
canvas.width = canvas.height = SIZE;
ctx.lineWidth = devicePixelRatio * LINE_WIDTH;
ctx.lineCap = "round";

// Helper function: triangle wave.
function tri(x) {
  return 1 - 2 * Math.abs(Math.round(x / 2) - x / 2);
}

// Main animation loop.
(function tick() {
  // Clear the canvas, leaving a bit behind for motion blur.
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.restore();

  const t = Date.now() / 1000 * SPEED;
  for (let y = 0; y < N_LINES; ++y) {
    const cy = CENTER_SPACINGS[y];
    for (let x = 0; x < N_LINES; ++x) {
      const isOdd = (x + y) % 2;
      const direction = isOdd ? 1 : -1;

      const angle = Math.PI / 2 * (t + isOdd + (x + y * 4) / N_LINES);

      // Other options:
      // const angle = Math.PI / 1.5 * (tri(t / Math.PI * 2) + isOdd);
      // const angle = t;

      const cx = CENTER_SPACINGS[x];
      const dx = Math.cos(angle) * LINE_SPACING / 1.6;
      const dy = Math.sin(angle) * LINE_SPACING / 1.6 * direction;

      ctx.beginPath();
      ctx.moveTo(cx - dx, cy - dy);
      ctx.lineTo(cx + dx, cy + dy);
      ctx.stroke();
    }
  }

  requestAnimationFrame(tick);
})();

document.body.appendChild(canvas);