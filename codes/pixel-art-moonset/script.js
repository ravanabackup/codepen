const { min, max, round, floor, abs, sqrt } = Math;
const random = (x = 1) => Math.random() * x;
const rgb = (...values) => `rgb(${values.join(',')})`;
const rgba = (...values) => `rgba(${values.join(',')})`;
const distance = (x1, y1, x2, y2) => sqrt(
abs(x1 - x2) ** 2 +
abs(y1 - y2) ** 2);


const Sky = (() => {
  const State = {
    pos: [0, 0],
    stars: [],
    moonPos: [] };


  const speed = 0.05;

  function updatePosition() {
    State.pos[0] -= speed;
    State.pos[1] += speed;
  }

  function reset() {
    State.pos = [0, 0];
    State.stars = [];
    State.moonPos = [];
  }

  function spaceColor(size) {
    const moonAltitude = size / 2 - State.pos[1] + moonSize;
    return rgb(
    min(max(0, moonAltitude), 12.5),
    min(max(5, moonAltitude), 20),
    min(max(10, moonAltitude), 25));

  }

  function drawSpace(ctx, size) {
    ctx.fillStyle = spaceColor(size);
    ctx.fillRect(0, 0, size, size / 2);
    let px = size * -1;
    while (px++ < size * size) {
      let pxX = px % (size * 2);
      let pxY = floor(px / (size * 2));
      const moonX = State.moonPos[0] + moonSize / 2 - 1;
      const moonY = State.moonPos[1] + moonSize / 2;
      const moonDistance = distance(moonX, moonY, pxX, pxY);
      if (moonDistance < moonSize * 1.75) {
        ctx.fillStyle = rgba(255, 255, 255, .05);
        ctx.fillRect(
        State.pos[0] + pxX,
        State.pos[1] + pxY,
        1,
        1);

      }
      if (moonDistance < moonSize) {
        ctx.fillStyle = rgba(255, 255, 255, .1);
        ctx.fillRect(
        State.pos[0] + pxX,
        State.pos[1] + pxY,
        1,
        1);

      }
    }
  }

  const starCount = () => 1000 + round(random(2000));
  const starColor = () => rgba(
  255,
  200 + round(random(55)),
  200 + round(random(20)),
  random());


  function generateStars(size) {
    if (State.stars.length) {
      return;
    }
    let count = starCount();
    while (count-- > 0) {
      State.stars.push([
      round(random(size * 8)),
      round(random(size * 8)) * -1 + size]);

    }
  }

  function drawStars(ctx, size) {
    let star = State.stars.length;
    while (star-- > 0) {
      ctx.fillStyle = starColor();
      ctx.fillRect(
      State.stars[star][0] + State.pos[0],
      State.stars[star][1] + State.pos[1],
      1,
      1);

    }
  }

  const moonSize = 10;
  const moonColors = {
    0: 'transparent',
    1: rgb(210, 210, 210),
    2: rgb(255, 255, 255),
    3: rgb(120, 120, 120) };


  const moonBitmap = [
  0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
  0, 0, 1, 2, 1, 1, 1, 1, 0, 0,
  0, 1, 1, 1, 1, 3, 3, 3, 1, 0,
  0, 1, 3, 3, 1, 1, 3, 3, 1, 0,
  1, 3, 3, 3, 3, 2, 1, 3, 1, 1,
  1, 1, 3, 3, 3, 1, 1, 1, 1, 1,
  0, 1, 1, 3, 1, 2, 1, 1, 1, 0,
  0, 1, 1, 1, 2, 2, 2, 1, 1, 0,
  0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
  0, 0, 0, 0, 1, 1, 0, 0, 0, 0];


  function placeMoon(size) {
    if (State.moonPos.length) {
      return;
    }
    State.moonPos[0] = size / 3 + round(random(size / 2));
    State.moonPos[1] = moonSize + round(random(size / 10));
  }

  function drawMoon(ctx, size) {
    let bit = 0;
    while (bit++ < moonBitmap.length - 1) {
      const bitPos = [
      State.moonPos[0] + State.pos[0] + bit % moonSize,
      State.moonPos[1] + State.pos[1] + floor(bit / moonSize)];

      ctx.fillStyle = moonColors[moonBitmap[bit]];
      ctx.fillRect(bitPos[0], bitPos[1], 1, 1);
    }
  }

  return Object.freeze({
    draw(ctx, size) {
      generateStars(size);
      placeMoon(size);
      drawSpace(ctx, size);
      drawStars(ctx, size);
      drawMoon(ctx, size);
      updatePosition();
      return {
        x: State.pos[0],
        y: State.pos[1],
        moonPos: {
          x: State.pos[0] + State.moonPos[0] + moonSize / 2 - 1,
          y: State.pos[1] + State.moonPos[1] + moonSize / 2 },

        moonSize };

    },
    reset });

})();

const Sea = (() => {
  function seaColor(size, moonAlt) {
    const alt = size / 2 - moonAlt;
    const minGreen = 10 + round(random(10));
    const maxGreen = 10 + round(random(25));
    const minBlue = 20 + round(random(50));
    const maxBlue = 50 + round(random() > .9 ? random(120) : random(50));
    return rgb(
    0,
    max(maxGreen + min(alt * 3, 0), minGreen),
    max(maxBlue + min(alt * 3, 0), minBlue));

  }

  return Object.freeze({
    draw(ctx, size, { x: skyX, y: skyY, moonPos, moonSize, stars }) {
      let x = 0;
      let y = 50;
      while (x * y < size * size) {
        const xSize = round(random(5));
        ctx.fillStyle = seaColor(size, skyY + moonSize);
        ctx.fillRect(x, y, xSize, 1);
        const verticalShine = min(
        1.25,
        size / 2 - moonPos.y + moonSize / 2);

        if (moonPos.x + moonSize >= x && moonPos.x - moonSize <= x) {
          ctx.fillStyle = rgba(
          255,
          255,
          255,
          verticalShine / 10);

          ctx.fillRect(x, y, xSize, 1);
        }

        const verticalNarrowShine = min(
        0.75,
        size / 2 - moonPos.y + moonSize / 2);

        if (moonPos.x + moonSize / 2 >= x && moonPos.x - moonSize / 2 <= x) {
          ctx.fillStyle = rgba(
          255,
          255,
          255,
          verticalNarrowShine / 10);

          ctx.fillRect(x, y, xSize, 1);
        }

        const circularShine = min(
        2.5,
        size / 2 - moonPos.y + moonSize);

        const moonDistance = distance(
        moonPos.x,
        moonPos.y,
        x, y);

        if (moonDistance < moonSize * 2) {
          ctx.fillStyle = rgba(
          255,
          255,
          255,
          circularShine / 10);

          ctx.fillRect(x, y, xSize, 1);
        }

        x += xSize;
        if (x >= size) {
          x = 0;
          y++;
        }
      }
    } });

})();

function draw() {
  ctx.clearRect(0, 0, size, size);
  const skyState = Sky.draw(ctx, size);
  Sea.draw(ctx, size, skyState);
  requestAnimationFrame(draw);
}

function reset() {
  Sky.reset();
}

canvas.addEventListener('click', reset);
const ctx = canvas.getContext('2d');
const size = canvas.width;
draw();