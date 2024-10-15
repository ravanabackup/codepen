/*
  Johan Karlsson, 2021
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
  ctx.fillStyle = "white";
  let type = Math.floor(now / 1000) % 4;
  for (let i = 0; i < 200000; i++) {
    let b = Math.random();
    let x, y;
    if (Math.random() > b) {
      if (type === 0) {
        x = Math.random() * w;
        y = b * h;
      } else if (type === 1) {
        x = Math.random() * w;
        y = h - b * h;
      } else if (type === 2) {
        x = b * w;
        y = Math.random() * h;
      } else if (type === 3) {
        x = w - b * w;
        y = Math.random() * h;
      }
    }
    ctx.fillRect(x, y, 1, 1);
  }
}

setup();
draw(performance.now());