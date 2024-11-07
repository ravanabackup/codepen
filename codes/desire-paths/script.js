const FG = [8, 0, 0, 0.3];
const BG = [130, 140, 156];
const SMOOTHNESS = 2000;
const R = 40;
const MAX_AGE = 70;
const NUM_AGENTS = 4000;
const LINE_WIDTH = 1;

const { cos, PI, sin } = Math;
const canvas = document.createElement('canvas');
let W, H;
canvas.style.background = `rgb(${BG})`;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

function init() {
  W = canvas.width = window.innerWidth * 2;
  H = canvas.height = window.innerHeight * 2;
  ctx.lineWidth = LINE_WIDTH;
  ctx.strokeStyle = `rgba(${FG})`;
  ctx.globalCompositeOperation = 'lighter';
  draw();
}

function draw() {
  const simplex = new SimplexNoise();
  ctx.clearRect(0, 0, W, H);

  let n = NUM_AGENTS + 1;
  while (--n) {
    let x = Math.random() * W;
    let y = Math.random() * H;
    let age = 0;
    ctx.beginPath();
    ctx.moveTo(x, y);
    while (x > 0 && y > 0 && x < W && y < H && age < MAX_AGE) {
      const theta = simplex.noise2D(x / SMOOTHNESS, y / SMOOTHNESS) * PI;
      x += R * cos(theta);
      y += R * sin(theta);
      ctx.lineTo(x, y);
      ++age;
    }
    ctx.stroke();
  }
}

init();
document.body.addEventListener('click', draw, false);
window.addEventListener('resize', init);