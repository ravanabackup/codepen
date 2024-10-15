/*
  Johan Karlsson, 2021
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;
let angleOffset;
let r;
let nrOfSquares;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", () => {
    resize();
  });
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  ctx.lineWidth = 2;
}

function draw(now) {
  requestAnimationFrame(draw);
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "white";
  angleOffset = now / 1000;
  let width = Math.min(w, h) * 0.8;
  r = width * 0.12;
  nrOfSquares = 14;
  square(w / 2, h / 2, width, width, nrOfSquares);
}

function square(x, y, width, height, level) {
  if (level <= 0) {
    return;
  }
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.rect(-width / 2, -height / 2, width, height);
  ctx.stroke();
  ctx.clip();

  let angle = Math.PI * 8 * level / nrOfSquares + angleOffset;
  let x1 = Math.cos(angle) * r;
  let y1 = Math.sin(angle) * r;
  square(x1, y1, width * 0.9, height * 0.9, level - 1);
  ctx.restore();
}

setup();
draw(1);