/*
  Johan Karlsson, 2021
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;

class Walker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tail = [];
  }

  walk(maxStep, tailLength) {
    this.tail.push([this.x, this.y]);
    let step = Math.random() * maxStep;
    let angle = Math.random() * Math.PI * 2;
    let x = Math.cos(angle) * step;
    let y = Math.sin(angle) * step;
    this.x += x;
    this.y += y;
    this.tail = this.tail.slice(-tailLength);
  }

  draw() {
    ctx.beginPath();
    for (let i = 0; i < this.tail.length - 1; i++) {
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.tail[i][0], this.tail[i][1]);
    }
    ctx.stroke();
  }}


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

function draw() {
  ctx.lineWidth = Math.random() > 0.5 ? 2 : 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
  let hue = Math.random() * 40 + 350;
  ctx.strokeStyle = `hsla(${hue}, 80%, 55%, 0.2)`;
  ctx.globalCompositeOperation = "lighter";
  let walkers = [];
  let nrOfWalkers = Math.round(Math.random() * 40 + 10);
  for (let i = 0; i < nrOfWalkers; i++) {
    let walker = new Walker(w * Math.random(), h * Math.random());
    walkers.push(walker);
  }

  let nrOfSteps = Math.random() * 300 + 40;
  let maxStep = Math.random() * 30 + 10;
  let tailLength = Math.round(Math.random() * 8 + 2);
  for (let i = 0; i < nrOfSteps; i++) {
    walkers.forEach(w => {
      w.walk(maxStep, tailLength);
      w.draw();
    });
  }
}

setup();
draw();