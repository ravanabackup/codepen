/*
  Johan Karlsson (DonKarlssonSan)
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/

let canvas;
let ctx;
let w, h;
let simplex;
let ticker;

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
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
}

function draw() {
  requestAnimationFrame(draw);
  for (let x = 0; x < w; x += 5) {
    for (let y = 0; y < h; y += 5) {
      let noise = simplex.noise3D(x / 200, y / 100, ticker);
      let hue = noise * 360;
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  ticker += 0.01;
}

setup();
draw();