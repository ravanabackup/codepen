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
  ctx.lineWidth = 3;
  let nrOfSteps = 80;
  let nrOfLines = 40;
  let xStep = Math.floor(w / nrOfSteps);
  let yStep = Math.floor(h / nrOfLines);
  let xExtra = Math.ceil((w - xStep * nrOfSteps) / xStep);
  let yExtra = Math.ceil((h - yStep * nrOfLines) / yStep);
  for (let col = 0; col < nrOfSteps + xExtra; col++) {
    for (let row = -1; row < nrOfLines + yExtra; row++) {
      let speed = col * 2 + 10;
      let yOffset = now / speed % yStep;
      let x = col * xStep;
      let y = row * yStep + yOffset;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + xStep, y);
      ctx.stroke();
    }
  }
}

setup();
draw(1);