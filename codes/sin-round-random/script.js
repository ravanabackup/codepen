const { PI: π, sin, random, round } = Math;
const maybeNegative = (x) =>
x * (Math.random() > .5 ? -1 : 1);

const { innerWidth, innerHeight } = window;
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext('2d');

function clear() {
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, innerWidth, innerHeight);
}

function wave(pos, lineMaxLength, waveHeight) {
  let x = 0;
  while (x < innerWidth) {
    const y = sin(x / innerWidth * 6 + pos) * waveHeight + innerHeight / 2;
    let vertical = Math.round(random() * -150);
    const rgb = [
    64 + round(random() * 128),
    0,
    64 + round(random() * 64)].
    join(', ');
    ctx.strokeStyle = `rgba(${rgb}, .75)`;
    while ((vertical += random() * 150) < y) {
      ctx.beginPath();
      ctx.moveTo(x, vertical);
      ctx.lineTo(
      x + maybeNegative(random() * lineMaxLength),
      vertical + maybeNegative(random() * lineMaxLength));

      ctx.closePath();
      ctx.stroke();
    }
    x += .5;
  }
}

let wavePos = 0;
const waveMovement = 0.03;
let lineMaxLength = 10;
let lineLengthGrow = 1;
let waveHeight = innerHeight / 2;
let waveHeightGrow = -1;
function movingWave() {
  if (lineMaxLength > 200) {
    lineLengthGrow = -1;
  } else if (lineMaxLength < 10) {
    lineLengthGrow = 1;
  }
  if (waveHeight > innerHeight / 1.5) {
    waveHeightGrow = -1;
  } else if (waveHeight < -innerHeight / 1.5) {
    waveHeightGrow = 1;
  }
  clear();
  wave(
  wavePos += waveMovement,
  lineMaxLength += 1 * lineLengthGrow,
  waveHeight += 5 * waveHeightGrow);

  requestAnimationFrame(movingWave);
}

movingWave();