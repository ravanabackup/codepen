const { PI: π, sin, random, round, acos, cos } = Math;
const maybeNegative = (x) =>
x * (Math.random() > .5 ? -1 : 1);

let ctx = canvas.getContext('2d');

function onResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext('2d');
}

onResize();
window.addEventListener('resize', onResize);

function clear() {
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, width, height);
}

function wave(pos, lineMaxLength, waveHeight) {
  let x = 0;
  while (x < width) {
    const y = acos(cos(x / waveHeight + pos)) * waveHeight + (height / 2 - waveHeight);
    let vertical = Math.round(random() * -150);
    const rgb = [
    64 + round(random() * 32),
    182 + round(random() * 55),
    144 + round(random() * 32)].
    join(', ');
    ctx.strokeStyle = `rgba(${rgb}, .75)`;
    while ((vertical += random() * 150) < y - height / 3) {
      ctx.beginPath();
      ctx.moveTo(x, vertical);
      ctx.lineTo(
      x + maybeNegative(random() * lineMaxLength),
      vertical + maybeNegative(random() * lineMaxLength));

      ctx.closePath();
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(x, y - height / 3);
    ctx.lineTo(
    x + maybeNegative(random() * lineMaxLength * 2),
    y - height / 3 + maybeNegative(random() * lineMaxLength * 4));

    ctx.closePath();
    ctx.stroke();

    const rgb2 = [
    200 + round(random() * 55),
    64 + round(random() * 32),
    128 + round(random() * 32)].
    join(', ');
    ctx.strokeStyle = `rgba(${rgb2}, .75)`;
    let vertical2 = height + Math.round(random() * 150);
    while ((vertical2 -= random() * 150) > y) {
      ctx.beginPath();
      ctx.moveTo(x, vertical2);
      ctx.lineTo(
      x + maybeNegative(random() * lineMaxLength),
      vertical2 + maybeNegative(random() * lineMaxLength));

      ctx.closePath();
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
    x + maybeNegative(random() * lineMaxLength * 2),
    y + maybeNegative(random() * lineMaxLength * 4));

    ctx.closePath();
    ctx.stroke();
    x += .5;
  }
}

let wavePos = 0;
const waveMovement = 0.1;
function movingWave() {
  clear();
  wave(
  wavePos += waveMovement,
  height / 23,
  height / 6);

  requestAnimationFrame(movingWave);
}

movingWave();