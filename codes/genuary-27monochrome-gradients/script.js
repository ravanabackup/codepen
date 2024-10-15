/*
  Johan Karlsson, 2021
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;
let simplex;

function setup() {
  simplex = new SimplexNoise();
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", resize);
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function drawPattern(now) {
  let size = Math.min(w, h) * 0.04;
  let zoom = 700;
  let angle = now * 0.001;
  let r = 0.6;
  let xOffset = Math.cos(angle) * r;
  let yOffset = Math.sin(angle) * r;
  for (let x = 0; x < w + size; x += size) {
    for (let y = 0; y < h + size; y += size) {
      let n = (simplex.noise2D(x / zoom + xOffset, y / zoom + yOffset) + 1) * 0.5;
      let r = n * size / 2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function draw(now) {
  requestAnimationFrame(draw);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "black";
  drawPattern(now);
}

setup();
draw(1);