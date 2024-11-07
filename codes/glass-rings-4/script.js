const DEBOUNCE_MS = 300;
const QUALITY = 0.02; // Range: (0, 1]
const GAP = 180;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let w, h, maxRadiusRounded, nRings, scale;
function setSize() {
  scale = window.devicePixelRatio * QUALITY;
  w = window.innerWidth;
  canvas.width = w * scale;
  h = window.innerHeight;
  canvas.height = h * scale;
  ctx.scale(scale, scale);
  const maxRadius = Math.hypot(h, w) / 2;
  nRings = Math.ceil(maxRadius / GAP);
  maxRadiusRounded = nRings * GAP;
  ctx.lineWidth = GAP / 1.2;
}
setSize();

window.addEventListener('resize', (() => {
  let debounce;
  let lastTrigger = -DEBOUNCE_MS;
  return () => {
    clearTimeout(debounce);
    const now = Date.now();
    const diff = now - lastTrigger - DEBOUNCE_MS;
    if (diff > 0) {
      setSize();
      lastTrigger = now;
    } else {
      debounce = setTimeout(setSize, -diff);
    }
  };
})());

function drawFrame(t) {
  ctx.clearRect(0, 0, w, h);
  const tA = t / 400;
  const tB = t / 220;
  for (let i = 0; i < nRings; ++i) {
    const tOffset = i % 2 ? tA : -tA;
    ctx.strokeStyle = `hsl(${360 * i / nRings}, 50%, 40%)`;
    ctx.beginPath();
    ctx.arc(
    w / 2,
    h / 2,
    (i * GAP + tB * 40) % maxRadiusRounded,
    tOffset + i * 10,
    tOffset + i * 10 + 1.5 * Math.PI);

    ctx.stroke();
  }
}

window.requestAnimationFrame(function drawLoop(t) {
  drawFrame(t);
  window.requestAnimationFrame(drawLoop);
});