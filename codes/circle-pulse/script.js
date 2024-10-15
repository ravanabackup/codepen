/*
  Johan Karlsson, 2022
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;

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
}

function draw(now) {
  requestAnimationFrame(draw);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;

  const nrOfCircles = 64;
  let R1 = Math.min(w, h) * 0.15;
  let R2 = Math.min(w, h) * 0.22;
  let R3 = Math.min(w, h) * 0.3;
  let R4 = Math.min(w, h) * 0.4;
  for (let i = 0; i < nrOfCircles; i++) {
    let angle = now / 500 + i / nrOfCircles * Math.PI * 2;
    let r = (Math.sin(angle) * 0.5 + 0.5) * R4 * 0.15 + 5;
    let angleOffset = Math.sin(angle) * Math.PI / 8;
    let a = i / nrOfCircles * Math.PI * 2 + angleOffset;
    circle(a, r * 0.4, R1);
    circle(a + Math.PI, r * 0.6, R2);
    circle(a, r * 0.8, R3);
    circle(a + Math.PI, r, R4);
  }
}

function circle(a, r, R) {
  let x = Math.cos(a) * R + w / 2;
  let y = Math.sin(a) * R + h / 2;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
}

setup();
draw(performance.now());