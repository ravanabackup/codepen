/*

A waaaaaay simpler version of https://codepen.io/rileyjshaw/full/GRZGPLQ
with arguably better results. Ah well :)

*/

const minWidth = 100; // Tiling width. Height is calculated dynamically.
const maxWidth = 200;
const minSequenceLength = 20; // Bigger numbers = more complex patterns.
const maxSequenceLength = 200;
const zoom = 6; // I think it looks better a bit chunky like this.
const dark = '#000';
const light = '#fff';
const themeBias = 0.65; // 0: light | 1: dark.

// For these backgrounds to tile properly, each subsequent column needs to be
// shifted up by 1px. CSS doesn't currently support that, so we do it in
// canvas. A max canvas width is set here so we don't go completely out of
// control when there's a tall repeating pattern. "Seamless" mode can be set
// to ensure a height over maxTiles is never reached, so it ensures a
// perfectly tiling pattern.
const maxTiledWidth = 10000;
const seamless = true;

// ~~~~~~~~~~~~~~~~~~~
// Utility functions.
// ~~~~~~~~~~~~~~~~~~~
//
// Returns a random bit array within a specified length range, with
// configurable bias towards 0 or 1.
const randSequence = (minLength, maxLength, bias = 0.5) =>
Array.from(
{
  length: Math.floor(
  Math.random() * (maxLength - minLength + 1) + minLength) },


() => Math.floor(Math.random() + bias));

// Greatest common denominator of all time.
const gcd = (a, b) => {
  if (a < b) [a, b] = [b, a];
  const t = a % b;
  return t ? gcd(b, t) : b;
};
// Lowest common multiple.
const lcm = (a, b) => {
  if (!Math.min(a, b)) return Math.max(a, b);
  return a / gcd(a, b) * b;
};

// ~~~~~~~~~
// Renderer.
// ~~~~~~~~~
//
let current;
const history = [];
function draw(
width = minWidth + Math.floor(Math.random() * (maxWidth - minWidth) + 1),
sequence)
{
  if (current && !sequence) history.push(current);
  const maxTiles = Math.floor(maxTiledWidth / width);
  canvas.width = width;

  let size, height;
  if (sequence) {
    size = lcm(width, sequence.length);
    height = size / width;
  } else {
    do {
      sequence = randSequence(minSequenceLength, maxSequenceLength, themeBias);
      size = lcm(width, sequence.length);
      height = size / width;
    } while (seamless && height > maxTiles);
  }
  canvas.height = height;

  current = [width, sequence];
  console.log(...current);

  // Create a single tile on our canvas.
  for (let i = 0; i < size; ++i) {
    const x = i % width;
    const y = Math.floor(i / width);
    ctx.fillStyle = sequence[i % sequence.length] ? dark : light;
    ctx.fillRect(x, y, 1, 1);
  }

  // Tile the initial canvas onto a wider canvas to ensure x-axis tiling.
  const nTiles = Math.min(maxTiles, height);
  tiledCanvas.width = width * nTiles;
  tiledCanvas.height = height;
  for (let i = 0; i < nTiles; ++i) {
    let offset = -i;
    do {
      tiledCtx.drawImage(canvas, i * width, offset);
      offset += height;
    } while (offset <= height);
  }

  // Apply the wide, tileable canvas as a repeating background.
  document.body.style.background = `${themeBias > 0.5 ? dark : light} left top/${width * nTiles * zoom}px ${height * zoom}px url(${tiledCanvas.toDataURL()}`;
}

// ~~~~~~~~~~~~~~~~
// Document setup.
// ~~~~~~~~~~~~~~~~
//
const canvas = document.createElement('canvas');
const tiledCanvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const tiledCtx = tiledCanvas.getContext('2d');
draw();
document.body.addEventListener('click', () => draw());
document.addEventListener('keydown', ({ key, repeat }) => {
  if (repeat || key !== 'ArrowLeft' || !history.length) return;
  draw(...history.pop());
});
document.body.append(canvas);
document.body.append(tiledCanvas);

// Thanks for stopping by!