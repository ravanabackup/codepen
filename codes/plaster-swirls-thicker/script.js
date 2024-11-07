const R = 96;
const SPACING = 1.1;
const LINE_WIDTH = 8;
const FG = [255, 255, 255];

const { PI, ceil, cos, sin, sqrt } = Math;
const container = document.createElement('div');
container.classList.add('container', 'loading');
const ctxs = Array.from({ length: 2 }, () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  container.appendChild(canvas);
  return ctx;
});

let redraw = null;
function draw() {
  const { innerWidth: w, innerHeight: h } = window;
  const l = sqrt(w * w + h * h) * 2;
  const mid = l / 2;
  const maxRing = ceil(mid / R / SPACING);

  ctxs.forEach(function (ctx, isOdd) {
    const { canvas } = ctx;
    canvas.width = canvas.height = l;
    canvas.style.width = canvas.style.height = `${mid}px`;

    ctx.lineWidth = R;
    ctx.strokeStyle = `rgb(${FG})`;
    ctx.transform(1, 0, 0, -1, mid, mid);

    for (let ring = isOdd; ring < maxRing; ring += 2) {
      const n = 30 + ring * 10;
      const magnitude = R * (ring * SPACING + 1);

      ctx.beginPath();
      ctx.arc(0, 0, magnitude, 0, 2 * PI);
      ctx.stroke();

      ctx.save();
      ctx.lineWidth = LINE_WIDTH;
      ctx.globalCompositeOperation = 'destination-out';
      for (let segment = 0; segment < n; ++segment) {
        const angle = segment / n * 2 * PI;
        const x = cos(angle) * magnitude;
        const y = sin(angle) * magnitude;

        ctx.beginPath();
        ctx.arc(x, y, R, angle - PI, angle, isOdd);
        ctx.stroke();
      }
      ctx.restore();
    }
  });

  container.classList.remove('loading');
  redraw = null;
}

function handleResize() {
  if (!redraw) container.classList.add('loading');
  window.clearTimeout(redraw);
  redraw = window.setTimeout(draw, 100);
}

draw();
window.addEventListener('resize', handleResize);
document.body.appendChild(container);