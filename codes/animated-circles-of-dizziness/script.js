/*
  Johan Karlsson, 2021
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;
let min;
let nrOfCircles;
let angle;
let nrOfLines;
let speed;

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
  min = Math.min(w, h);
}

function reset() {
  nrOfCircles = Math.round(Math.random() * 8 + 2);
  ctx.lineWidth = min / (Math.random() * 60 + 40);
  angle = Math.PI / Math.random() * 10;
  nrOfLines = Math.round(Math.random() * 30 + 20);
  speed = Math.random() * 0.03;
}

function draw(now) {
  requestAnimationFrame(draw);
  let offset = now * speed;
  ctx.save();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  ctx.translate(w / 2, h / 2);
  for (let i = 0; i < nrOfCircles; i++) {
    ctx.rotate(angle);
    ctx.save();

    let r1 = min * 0.45 * i / nrOfCircles;
    let r2 = min * 0.45 * (i + 1) / nrOfCircles;
    clip(r1, r2);

    drawLines(nrOfLines, min, offset);

    ctx.restore();
  }
  ctx.restore();
}

function clip(r1, r2) {
  let region = new Path2D();
  region.arc(0, 0, r1, 0, Math.PI * 2);
  region.arc(0, 0, r2, 0, Math.PI * 2);
  ctx.clip(region, "evenodd");
}

function drawLines(nrOfLines, min, offset) {
  let step = min / nrOfLines;
  for (let j = 0; j < nrOfLines; j++) {
    ctx.beginPath();
    ctx.moveTo(-min / 2, -min / 2 + j * step + offset % step);
    ctx.lineTo(min / 2, -min / 2 + j * step + offset % step);
    ctx.stroke();
  }
}

setup();
draw(performance.now());