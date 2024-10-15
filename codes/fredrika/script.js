/*
  Johan Karlsson, 2019
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;
let ticker;
let simplex;
let imageBuffer;

function setup() {
  ticker = 0;
  simplex = new SimplexNoise();
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  reset();
  window.addEventListener("resize", reset);
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  storeHeartInBuffer();
}

function draw(now) {
  requestAnimationFrame(draw);
  ctx.fillRect(0, 0, w, h);
  drawHeartLines();
  ticker = now / 1500;
}

function storeHeartInBuffer() {
  ctx.beginPath();
  for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
    let r = Math.min(w, h) * 0.025;
    let x = r * 16 * Math.pow(Math.sin(angle), 3);
    let y = -r * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
    ctx.lineTo(w / 2 + x, h * 0.45 + y);
  }
  ctx.stroke();
  ctx.fill();

  let image = ctx.getImageData(0, 0, w, h);
  imageBuffer = new Uint32Array(image.data.buffer);
}

function drawHeartLines() {
  for (let y = 0; y < h; y += 10) {
    drawLine(y);
  }
}

function drawLine(y) {
  ctx.beginPath();
  let zoom = 80;
  let y1;
  for (let x = 0; x < w; x += 8) {
    if (imageBuffer[y * w + x]) {
      let n = simplex.noise3D(x / zoom, y / zoom, ticker) * 8;
      y1 = y + n;
    } else {
      y1 = y;
    }
    ctx.lineTo(x, y1);
  }
  ctx.stroke();
}

setup();
draw();