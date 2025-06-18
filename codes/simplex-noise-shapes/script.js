var _window$initFullscree, _window;import { createNoise2D, createNoise3D } from "https://cdn.skypack.dev/simplex-noise@4.0.0";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const map = (value, pmin, pmax, nmin, nmax) => {
  return (value - pmin) / (pmax - pmin) * (nmax - nmin) + nmin;
};

/* Visualization part */

const TWO_PI = Math.PI * 2;
const deg = 180 / Math.PI;

class Particle {
  constructor(x, y, color, size, edge) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.maxSize = size;
    this.size = size;
    this.edge = edge;
    this.opacity = 1;
  }

  draw(ctx) {
    if (this.opacity < 0.01) {
      return;
    }

    const center = (this.edge - this.maxSize * 0.5) * 0.5;

    ctx.fillStyle = `hsla(${Math.floor(this.color[0])} ${this.color[1]} ${this.color[2]}% / ${this.opacity})`;

    ctx.beginPath();
    ctx.arc(
    this.x + center,
    this.y + center,
    this.size,
    0,
    TWO_PI);

    ctx.fill();
    ctx.closePath();
  }}


const ctx = canvas.getContext('2d');

const state = {
  width: 0,
  height: 0,
  particles: [],
  request: 0,
  gap: 8,
  pixelSize: 5,
  lastUpdate: 0,
  interval: 1000 / 60,
  mouseX: 0,
  mouseY: 0,
  timer: 0 };


const seed = 50;
const pnrd = () => Math.random();

const xNoise = createNoise3D(pnrd);
const yNoise = createNoise3D(pnrd);

const init = () => {
  state.particles = [];

  const cellsX = Math.floor(state.width / state.gap);
  const cellsY = Math.floor(state.height / state.gap);

  let offsetX = state.width - cellsX * state.gap;
  let offsetY = state.height - cellsY * state.gap;

  offsetX *= 0.5;
  offsetY *= 0.5;

  for (let x = 0; x < cellsX; x++) {
    for (let y = 0; y < cellsY; y++) {
      const px = x * state.gap + offsetX;
      const py = y * state.gap + offsetY;
      const rate = (Math.abs(cellsX * 0.5 - x) + Math.abs(cellsY * 0.5 - y)) * Math.PI;
      const color = [rate ** 0.9 % 360, 100, 50];

      state.particles.push(new Particle(px, py, color, state.pixelSize, state.gap));
    }
  }
};

const animate = () => {
  state.request = requestAnimationFrame(animate);

  const now = performance.now();
  const diff = now - (state.lastUpdate || 0);

  if (diff < state.interval) {
    return;
  }

  state.lastUpdate = now - diff % state.interval;

  const viewport = {
    x: state.width,
    y: state.height };


  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, state.width, state.height);

  ctx.globalCompositeOperation = "screen";

  state.timer += 0.002;

  let prevG;
  state.particles.forEach((particle, index) => {
    const mx = map(state.mouseX, 0, 1, 1, 2);
    const my = map(state.mouseY, 0, 1, 1, 2);
    const nx = particle.x * mx / state.width;
    const ny = particle.y * my / state.height;
    const rz = Math.sin(state.timer) ** 2;

    const x = map(xNoise(nx, ny, rz), -1, 1, 0, 1.2);
    const y = map(yNoise(nx, ny, rz), -1, 1, 0, 1.2);
    const angle = (x + y) * TWO_PI * deg;

    let g = Math.sin(angle * 0.2);

    particle.color = [angle % 360, 100, 50];
    if (g < 0) {
      g = prevG || 1;
      particle.color = [angle % 360, 100, 30];
    }
    prevG = g;

    particle.opacity = clamp(g ** 0.6, 0.1, 1);


    // particle.opacity = map(Math.sin(angle * 0.05), -1, 1, 0.1, 1);
    // particle.size = map(particle.opacity, 0, 1, 0, particle.maxSize * 1.5);


    particle.draw(ctx);
  });
};

const resize = () => {var _state$mouseX, _state$mouseY;
  cancelAnimationFrame(state.request);

  const rect = container.getBoundingClientRect();

  const width = Math.floor(rect.width);
  const height = Math.floor(rect.height);

  canvas.width = width;
  canvas.height = height;

  state.width = width;
  state.height = height;

  state.gap = clamp(Math.max(width, height) * 0.005 | 0, 2, 16);
  state.pixelSize = clamp(state.gap * 0.5 | 0, 1, 8);

  state.mouseX = (_state$mouseX = state.mouseX) !== null && _state$mouseX !== void 0 ? _state$mouseX : 0;
  state.mouseY = (_state$mouseY = state.mouseY) !== null && _state$mouseY !== void 0 ? _state$mouseY : 0;

  init();
  animate();
};

new ResizeObserver(resize).observe(container);

document.addEventListener('mousemove', event => {
  state.mouseX = event.clientX / state.width;
  state.mouseY = event.clientY / state.height;
});

window.onFullscreenClick = () => {
  container.requestFullscreen();
};

(_window$initFullscree = (_window = window).initFullscreenButton) === null || _window$initFullscree === void 0 ? void 0 : _window$initFullscree.call(_window);