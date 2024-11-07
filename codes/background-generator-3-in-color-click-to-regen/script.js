/*

A waaaaaay simpler version of https://codepen.io/rileyjshaw/full/GRZGPLQ
with arguably better results. Ah well :)

Now in full  T E C H N I C O L O R .

*/

const minWidth = 100; // Tiling width. Height is calculated dynamically.
const maxWidth = 200;
const minSequenceLength = 20; // Bigger numbers = more complex patterns.
const maxSequenceLength = 200;
const zoom = 6; // I think it looks better a bit chunky like this.

// For these backgrounds to tile properly, each subsequent column needs to be
// shifted up by 1px. CSS doesn't currently support that, so we do it in
// canvas. A max canvas width is set here so we don't go completely out of
// control when there's a tall repeating pattern. "Seamless" mode can be set
// to ensure a height over maxTiles is never reached, so it ensures a
// perfectly tiling pattern.
const maxTiledWidth = 10000;
const seamless = true;

// PICO-8 palette.
const colors = [
'#000',
'#ffccaa',
'#1d2b53',
'#7e2553',
'#008751',
'#ab5236',
'#5f574f',
'#c2c3c7',
'#fff1e8',
'#ff004d',
'#ffa300',
'#ffec27',
'#00e436',
'#29adff',
'#83769c',
'#ff77a8'];


// ~~~~~~~~~~~~~~~~~~~
// Utility functions.
// ~~~~~~~~~~~~~~~~~~~
//
// Returns a random array within a specified length range, with values from
// [0, nValues)
const randSequence = (minLength, maxLength, nValues) =>
Array.from(
{
  length: Math.floor(
  Math.random() * (maxLength - minLength + 1) + minLength) },


() => Math.floor(Math.random() * nValues));

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
palette = [],
sequence)
{
  if (current && !sequence) history.push(current);
  const maxTiles = Math.floor(maxTiledWidth / width);
  canvas.width = width;

  while (palette.length < 2) palette = colors.filter(() => Math.random() < 0.2);
  let size, height;
  if (sequence) {
    size = lcm(width, sequence.length);
    height = size / width;
  } else {
    do {
      sequence = randSequence(minSequenceLength, maxSequenceLength, palette.length);
      size = lcm(width, sequence.length);
      height = size / width;
    } while (seamless && height > maxTiles);
  }
  canvas.height = height;

  current = [width, palette, sequence];
  console.log(...current);

  // Create a single tile on our canvas.
  for (let i = 0; i < size; ++i) {
    const x = i % width;
    const y = Math.floor(i / width);
    ctx.fillStyle = palette[sequence[i % sequence.length]];
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
  document.body.style.background = `left top/${width * nTiles * zoom}px ${height * zoom}px url(${tiledCanvas.toDataURL()}`;
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
  if (repeat || !history.length) return;
  switch (key) {
    case 'ArrowLeft':return draw(...history.pop());
    case 'ArrowRight':return draw();}

});
document.body.append(canvas);
document.body.append(tiledCanvas);

// Thanks for stopping by!