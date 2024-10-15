/*
  Johan Karlsson, 2021
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;
let direction;
let frequency;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  resize();
  reset();
  window.addEventListener("resize", () => {
    resize();
  });
  canvas.addEventListener("click", reset);
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function reset() {
  direction = Math.random() > 0.5 ? -1 : 1;
  frequency = Math.random() / 10;
}

function draw(now) {
  requestAnimationFrame(draw);
  let offset = now / 200;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "black";
  for (let i = 0; i < 200000; i++) {
    let x = Math.random() * w;
    let y = Math.random() * h;
    let d = Math.hypot(w / 2 - x, h / 2 - y) * direction;
    let threshold = Math.sin(offset + d * frequency) * 0.5 + 0.5;
    if (Math.random() > threshold) {
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

setup();
draw(performance.now());