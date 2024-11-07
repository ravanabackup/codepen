const { cos, PI, random, sin, sqrt } = Math;
const PI2 = PI * 2;

const N = 600; // Number of particles.
const L = 1000; // Canvas length.
const R = 40; // Radius of inner circle.
const TWIST_FACTOR = 0.98;
const NOISE_MAGNITUDE = 10;
const SPREAD = 1.04;

// Helper constants (vectors are stored as [x, y]).
const X = 0;
const Y = 1;

const unit = (() => {
  const hypot = Math.hypot || ((x, y) => sqrt(x * x, y * y));
  return (x, y) => {
    const l = hypot(x, y) / SPREAD;
    return [x / l, y / l];
  };
})();

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let particles = Array.from({ length: N }, (_, i) => {
  const a = i / N * PI2;
  const v = [sin(a), cos(a)];
  const d = v.map(c => R * c + (random() - 0.5) * NOISE_MAGNITUDE);
  return { d, v };
});

canvas.height = canvas.width = L;
canvas.style.height = canvas.style.width = `${L / 2}px`;
ctx.transform(1, 0, 0, -1, L / 2, L / 2);
ctx.arc(0, 0, R + NOISE_MAGNITUDE, 0, PI2);
ctx.fill();

// Go for it.
!function step() {
  particles = particles.map(({ d: [dX0, dY0], v: [vX0, vY0] }, i) => {
    const { d: [dX1, dY1] } = particles[(i || N) - 1];
    const d = [dX0 + vX0, dY0 + vY0];
    const v = unit(dX1 - dX0 * TWIST_FACTOR, dY1 - dY0 * TWIST_FACTOR);

    // Gross side effect. Draw the particles.
    ctx.beginPath();
    ctx.moveTo(dX0, dY0);
    ctx.lineTo(...d);
    ctx.stroke();

    // Update displacement and velocity for next time around.
    return { d, v };
  });
  window.requestAnimationFrame(step);
}();

document.body.appendChild(canvas);