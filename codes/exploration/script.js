const { min, max, floor, sin, abs, pow, PI: π } = Math;
const random = (max = 1) => Math.random() * max;
const randomFrom = arr => arr[floor(random(arr.length))];
const maybeNegative = num => random() >= .5 ? num : -num;
const $ = document.querySelector.bind(document);

const canvas = $('canvas');
const ctx = canvas.getContext('2d');
const framesUntilDaytimeChange = 640;
let frame = 0;
let drawing;
let canvasWidth, canvasHeight;

const getBaseColor = daytime => {
  return `hsl(0, 0%, 0%)`;
};

const getMeteorColors = meteor => {
  const alpha = meteor.y / canvasHeight;
  return [
  `hsla(340, 70%, 80%, ${alpha})`,
  `hsla(300, 70%, 70%, ${alpha})`,
  `hsla(260, 70%, 60%, ${alpha})`,
  `hsla(220, 70%, 50%, ${alpha})`];

};

const getSkyColors = daytime => {
  if (random() > .2) {
    return [`hsl(0, 0%, 0%)`];
  }
  if (random() > .1) {
    return [
    `hsl(0, 0%, 1%)`,
    `hsl(0, 0%, 2%)`,
    `hsl(0, 0%, 3%)`,
    `hsl(0, 0%, 4%)`,
    `hsl(0, 0%, 5%)`,
    `hsl(0, 0%, 6%)`,
    `hsl(0, 0%, 7%)`,
    `hsl(0, 0%, 8%)`,
    `hsl(0, 0%, 9%)`,
    `hsl(0, 0%, 10%)`];

  }
  if (random() > .1) {
    return [
    `hsl(0, 0%, 29%)`,
    `hsl(0, 0%, 30%)`,
    `hsl(0, 0%, 31%)`];

  }
  return [
  `hsl(0, 50%, 35%)`,
  `hsl(30, 50%, 50%)`,
  `hsl(220, 50%, 60%)`];

};

const adjustSize = ({ initial }) => {
  const bodyPaddingRatio = 1.05;
  const aspectRatio = 1.2;
  const minWidth = 240;
  const maxWidth = 960;
  const bodySize = min(window.innerWidth, window.innerHeight);
  const width = bodySize / bodyPaddingRatio;
  const clampedWidth = max(min(width, maxWidth), minWidth);
  const clampedHeight = clampedWidth / aspectRatio;
  canvas.width = clampedWidth;
  canvas.height = clampedHeight;
  canvasWidth = clampedWidth;
  canvasHeight = clampedHeight;
  if (!initial && typeof drawing === 'undefined') {
    draw();
  }
};

const togglePlayState = () => {
  if (typeof drawing === 'undefined') {
    draw();
  } else {
    cancelAnimationFrame(drawing);
    drawing = undefined;
  }
};

const listenEvents = () => {
  window.addEventListener('resize', _.debounce(adjustSize, 100));
  canvas.addEventListener('click', togglePlayState);
};

const clear = daytime => {
  ctx.fillStyle = getBaseColor(daytime);
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

const createMeteor = () => ({
  x: random(canvasWidth / 2),
  y: canvasHeight / 2 + random(canvasHeight / 2),
  dirX: canvasWidth / 120 + random(canvasWidth / 10),
  dirY: 0 - (canvasHeight / 120 + random(canvasHeight / 10)) });


const drawMeteor = meteor => {
  if (meteor.x > canvasWidth || !drawing) {
    return;
  }
  ctx.lineWidth = canvasHeight / (100 + random(30));
  ctx.fillStyle = randomFrom(getMeteorColors(meteor));
  ctx.beginPath();
  ctx.moveTo(meteor.x, meteor.y);
  ctx.lineTo(meteor.x + meteor.dirX / 1.5, meteor.y + meteor.dirY);
  ctx.lineTo(meteor.x + meteor.dirX / 3, meteor.y);
  ctx.closePath();
  ctx.fill();
  meteor.x += meteor.dirX / 6;
  meteor.y += meteor.dirY / 6;
  requestAnimationFrame(() => drawMeteor(meteor));
};

const drawSky = daytime => {
  const time = pow(daytime, 4);
  ctx.lineWidth = canvasWidth / (12 + 90 * time);
  const warpX = 2 + 30 * time - 33 * (time / 1.125);
  const warpY = 3 + 45 * time + 240 * (time / 1.125);
  const amount = 360 + 4800 * time;
  for (let i = 0; i < amount; i++) {
    ctx.strokeStyle = randomFrom(getSkyColors(daytime));
    ctx.beginPath();
    const startX = random(canvasWidth);
    const startY = random(canvasHeight);
    const diffX = maybeNegative(random(canvasWidth / warpX));
    const diffY = maybeNegative(random(canvasHeight / warpY));
    const endX = startX + diffX;
    const endY = startY + diffY;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.closePath();
    ctx.stroke();
  }
  if (daytime > 0.8 && random() > 0.96) {
    const meteor = createMeteor();
    setTimeout(() => drawMeteor(meteor));
  }
  if (daytime > 0.9 && random() > 0.9) {
    const meteor = createMeteor();
    setTimeout(() => drawMeteor(meteor));
  }
};

const draw = () => {
  frame++;
  const daytime = abs(sin(frame / framesUntilDaytimeChange * π));
  clear(daytime);
  drawSky(daytime);
  drawing = requestAnimationFrame(draw);
};

const init = () => {
  draw();
  listenEvents();
  requestAnimationFrame(() => {
    adjustSize({ initial: true });
  });
};

init();