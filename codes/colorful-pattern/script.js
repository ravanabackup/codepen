/*
  Johan Karlsson 2019
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
  window.addEventListener("resize", reset);
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  draw();
}

function draw() {
  ctx.fillRect(0, 0, w, h);
  let size = 40;
  for (let x = 0; x < w; x += size) {
    for (let y = 0; y < h; y += size) {
      drawPattern(x, y, size * 0.85);
    }
  }
}

function drawPattern(x, y, size) {
  let colors = getRandomColors();
  ctx.lineWidth = 4;
  ctx.strokeStyle = colors[0];
  ctx.strokeRect(x - size / 2, y - size / 2, size, size);
  ctx.strokeStyle = colors[1];
  ctx.strokeRect(x - size / 3, y - size / 3, size / 1.5, size / 1.5);
  ctx.strokeStyle = colors[2];
  ctx.strokeRect(x - size / 6, y - size / 6, size / 3, size / 3);
}

function random(max) {
  return Math.floor(Math.random() * max);
}

function getRandomColors() {
  let startHue = random(360);
  let color1 = getColorFromHue(startHue);
  let color2 = getColorFromHue(startHue + 120);
  let color3 = getColorFromHue(startHue + 240);
  return [color1, color2, color3];
}

function getColorFromHue(hue) {
  return `hsl(${hue % 360}, 80%, 50%)`;
}

setup();