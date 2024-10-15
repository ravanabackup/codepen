/*
  Johan Karlsson, 2020
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;
let simplex;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", () => {
    resize();
    draw();
  });
  canvas.addEventListener("click", draw);
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function fillTriangle(x1, y1, x2, y2, x3, y3) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.fill();
}

function drawSquare(x, y, size) {
  let zoom = 600;
  let angle = simplex.noise2D(x / zoom, y / zoom) * Math.PI * 2;
  let xc = Math.cos(angle) * size / 2 + x + size / 2;
  let yc = Math.sin(angle) * size / 2 + y + size / 2;
  ctx.fillStyle = "darkgray";
  fillTriangle(x, y, x, y + size, xc, yc);
  ctx.fillStyle = "gray";
  fillTriangle(x, y + size, x + size, y + size, xc, yc);
  ctx.fillStyle = "black";
  fillTriangle(x + size, y + size, x + size, y, xc, yc);
  ctx.fillStyle = "beige";
  fillTriangle(x + size, y, x, y, xc, yc);
  ctx.strokeRect(x, y, size, size);
}

function drawPattern() {
  let min = Math.min(w, h) * 0.75;
  let steps = 16;
  let size = Math.round(min / steps);
  let x0 = Math.round((w - min) / 2);
  let y0 = Math.round((h - min) / 2);

  ctx.shadowColor = "black";
  ctx.shadowBlur = 15;
  ctx.fillStyle = "black";
  ctx.fillRect(x0 - 2, y0 - 2, size * steps + 4, size * steps + 4);
  ctx.shadowBlur = 0;
  
  for(let col = 0; col < steps; col++) {
    for(let row = 0; row < steps; row++) {
      let x = size * col + x0;
      let y = size * row + y0;
      drawSquare(x, y, size);
    }
  }
}

function draw() {
  console.clear();
  simplex = new SimplexNoise();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "black";
  let max = Math.max(w, h);
  drawSquare(0, 0, max);
  drawPattern();
}

setup();
draw();