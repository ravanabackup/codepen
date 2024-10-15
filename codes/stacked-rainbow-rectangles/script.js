/*
  Johan Karlsson, 2020
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  reset();
  window.addEventListener("resize", () => {
    reset();
    draw();
  });
  canvas.addEventListener("click", draw);
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function draw() {
  ctx.shadowColor = "#333";
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  drawRectangles();
}

function drawRectangles() {
  let baseSize = w * h / 15000;
  let size = Math.random() * baseSize + baseSize;
  let baseHueOffset = Math.random() * 360;
  for (let x = w + size; x > -size; x -= size) {
    for (let y = h + size; y > -size; y -= size) {
      drawRectangle(x, y, size, baseHueOffset);
    }
  }
}

function drawRectangle(x, y, size, baseHueOffset) {
  ctx.save();
  let shadow = Math.random() * 25 + 3;
  ctx.shadowBlur = shadow;
  ctx.shadowOffsetX = shadow / 2;
  ctx.shadowOffsetY = shadow / 2;
  ctx.translate(x, y);
  ctx.rotate((Math.random() - 0.5) * 0.08);
  let randomHueOffset = Math.random() * 20;
  let p = (x + y) / 8;
  let hue = p + randomHueOffset + baseHueOffset;
  let l = Math.random() * 20 + 40;
  let color = `hsl(${hue}, 80%, ${l}%)`;
  ctx.fillStyle = color;
  let widthModification = Math.random() * 2 + 1;
  let heightModification = Math.random() * 2 + 1;
  let width = size * widthModification;
  let height = size * heightModification;
  ctx.beginPath();
  ctx.rect(
  -width / 2,
  -height / 2,
  width,
  height);
  ctx.fill();
  ctx.restore();
}

setup();
draw();