// beware: this code is smelly
// started out as a much simpler sketch, followed by liberal cutting and pasting
// 
// welp, enjoy!

// configurable
const PLANET_SIZE = 400;
const SUN_SIZE = 100;
const SUN_FACTOR = 0.1;
const PARALLAX_FACTOR = 1.25;
const DENSITY = 1000;
const LIGHT_COLORS = [
[229, 225, 217],
[0, 132, 173],
[30, 32, 31],
[255, 0, 0],
[0, 33, 252]];

const BG_COLORS = [
[33, 28, 27],
[207, 203, 194],
[232, 225, 210],
[0, 33, 252],
[255, 0, 0]];


// figure out how big the sun should be

// Math aliases
const abs = Math.abs;
const cos = Math.cos;
const ln = Math.log;
const PI2 = Math.PI * 2;
const sin = Math.sin;
const sqrt = Math.sqrt;

// canvas setup
const space = document.querySelector('.space');
const spaceCtx = space.getContext('2d');
space.style.height = space.style.width = 100 * PARALLAX_FACTOR + '%';

const planet = document.querySelector('.planet');
const planetCtx = planet.getContext('2d');
planet.height = planet.width = PLANET_SIZE;
planet.style.height = planet.style.width = PLANET_SIZE / 2 + 'px';

const sun = document.querySelector('.sun');
const sunCtx = sun.getContext('2d');
sun.height = sun.width = SUN_SIZE;
sun.style.height = sun.style.width = SUN_SIZE / 2 + 'px';

// globals:
// keep track of the window size
let width, height;
// index for color pairs
let color = 0;
// x & y center for the planet's incedent light
let shadowX = 0,shadowY = 0;

// create a new typedArray for x and y of each of the 3 elements
const bufferLength = Uint16Array.BYTES_PER_ELEMENT * DENSITY;

const spaceBufferX = new ArrayBuffer(bufferLength);
const spaceValsX = new Uint16Array(spaceBufferX);

const spaceBufferY = new ArrayBuffer(bufferLength);
const spaceValsY = new Uint16Array(spaceBufferY);

const planetBufferX = new ArrayBuffer(bufferLength);
const planetValsX = new Uint16Array(planetBufferX);

const planetBufferY = new ArrayBuffer(bufferLength);
const planetValsY = new Uint16Array(planetBufferY);

const sunBufferX = new ArrayBuffer(bufferLength * SUN_FACTOR);
const sunValsX = new Uint16Array(sunBufferX);

const sunBufferY = new ArrayBuffer(bufferLength * SUN_FACTOR);
const sunValsY = new Uint16Array(sunBufferY);

function draw() {
  spaceCtx.fillStyle = planetCtx.fillStyle = `rgba(${BG_COLORS[color]}, 0.34)`;

  spaceCtx.fillRect(0, 0, width * 2, height * 2);
  planetCtx.fillRect(0, 0, PLANET_SIZE, PLANET_SIZE);
  sunCtx.clearRect(0, 0, SUN_SIZE, SUN_SIZE);

  spaceCtx.fillStyle = planetCtx.fillStyle = sunCtx.fillStyle = `rgb(${LIGHT_COLORS[color]})`;

  for (let i = DENSITY; i--;) {
    let u1 = Math.random();
    let u2 = Math.random();
    let n1 = sqrt(-2 * ln(u1)) * sin(PI2 * u2);
    let n2 = sqrt(-2 * ln(u1)) * cos(PI2 * u2);

    // uniformly distributed
    spaceValsX[i] = u1 * width * 2;
    spaceValsY[i] = u2 * height * 2;

    // normally distributed using Box-Muller transform
    planetValsX[i] = shadowX + PLANET_SIZE / 4 * n1;
    planetValsY[i] = shadowY + PLANET_SIZE / 4 * n2;

    if (i < DENSITY * SUN_FACTOR) {
      // normally distributed around the sun's center
      sunValsX[i] = SUN_SIZE / 4 * (2 + n1);
      sunValsY[i] = SUN_SIZE / 4 * (2 + n2);
    }
  }

  // draw space
  for (let i = DENSITY; i--;) {
    let x = spaceValsX[i],y = spaceValsY[i];
    spaceCtx.fillRect(x, y, 2, 2);
  }

  // draw planet
  for (let i = DENSITY; i--;) {
    let x = planetValsX[i],y = planetValsY[i];
    if (x > 0 && x < PLANET_SIZE && y > 0 && y < PLANET_SIZE) {
      planetCtx.fillRect(x, y, 2, 2);
    }
  }

  // draw sun
  for (let i = DENSITY * SUN_FACTOR; i--;) {
    let x = sunValsX[i],y = sunValsY[i];
    if (x > 0 && x < SUN_SIZE && y > 0 && y < SUN_SIZE) {
      sunCtx.fillRect(x, y, 2, 2);
    }
  }

  requestAnimationFrame(draw);
}

window.addEventListener('mousemove', mousemove);
window.addEventListener('resize', resize);
window.addEventListener('click', function () {
  color = (color + 1) % BG_COLORS.length;
}, false);

function mousemove(e) {
  let x = e.clientX;
  let y = e.clientY;

  let px = x / width;
  let py = y / height;

  space.style.left = 50 + (1 - px * 2) * PARALLAX_FACTOR * 10 + '%';
  space.style.top = 50 + (1 - py * 2) * PARALLAX_FACTOR * 10 + '%';

  shadowX = PLANET_SIZE * px;
  shadowY = PLANET_SIZE * py;

  sun.style.top = y + 'px';
  sun.style.left = x + 'px';
}

function resize() {
  width = window.innerWidth * PARALLAX_FACTOR;
  height = window.innerHeight * PARALLAX_FACTOR;

  space.height = height * 2;
  space.width = width * 2;
}

// set height and width
resize();
// start the animation loop
draw();