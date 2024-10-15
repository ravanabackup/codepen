/*
  Johan Karlsson, 2021
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;
let circles;
let nrOfPoints;
let shrinkFactor;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", () => {
    resize();
    draw();
  });
  canvas.addEventListener("click", () => {
    reset();
    draw();
  });
  reset();
}

function reset() {
  nrOfPoints = Math.round(Math.random() * 20 + 5);
  shrinkFactor = Math.random() * 0.8 + 0.2;
  let maxR = Math.min(w, h) * (Math.random() + 0.3);
  let minR = maxR * 0.5;
  let margin = Math.random() - 0.5;
  circles = [];
  let nrOfCircles = Math.round(Math.random() * 20 + 4);
  for (let i = 0; i < nrOfCircles; i++) {
    let r = Math.random() * (maxR - minR) + minR;
    let x = Math.random() * (w - w * margin * 2) + w * margin;
    let y = Math.random() * (h - w * margin * 2) + w * margin;
    let offset = Math.random() * Math.PI * 2;
    let speed = Math.random() * 0.2 + 0.8;
    let sizeFactor = Math.random();
    circles.push([r, x, y, offset, speed, sizeFactor]);
  }
  randomOffset = Math.random() * Math.PI * 2;
}

function getPoint(i, r, xCenter, yCenter, angleOffset, sizeFactor) {
  let angle = Math.PI * i / nrOfPoints + angleOffset;
  let radius = r * ((Math.sin(angleOffset * sizeFactor) + 1) * 0.2 + 0.3);
  let x = Math.cos(angle) * radius + xCenter;
  let y = Math.sin(angle) * radius + yCenter;
  return [x, y];
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  ctx.lineWidth = 1;
}

function drawFrame(angle) {
  for (let circleIndex = 0; circleIndex < circles.length - 1; circleIndex++) {
    for (let i = 0; i < nrOfPoints; i++) {
      let [r1, x1, y1, angleOffset1, speed1, sizeFactor1] = circles[circleIndex];
      let [r2, x2, y2, angleOffset2, speed2, sizeFactor2] = circles[circleIndex + 1];
      ctx.beginPath();

      ctx.moveTo(...getPoint(i, r1 * angle / Math.PI / 2 * shrinkFactor, x1, y1, angle * speed1 + angleOffset1, sizeFactor1));
      ctx.lineTo(...getPoint(i, r2 * angle / Math.PI / 2 * shrinkFactor, x2, y2, angle * speed2 + angleOffset2, sizeFactor2));
      ctx.stroke();
    }
  }
}

function draw() {
  ctx.strokeStyle = "rgba(200, 200, 200, 0.007)";
  ctx.fillRect(0, 0, w, h);
  let nrOfIterations = Math.random() * 300 + 200;
  let rounds = Math.random() * 4 + 0.5;
  for (let i = 0; i < nrOfIterations; i++) {
    let angle = i / nrOfIterations * Math.PI * rounds;
    drawFrame(angle);
  }
}

setup();
draw();