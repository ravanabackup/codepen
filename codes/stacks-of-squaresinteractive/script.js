/*
  Johan Karlsson, 2019
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;
let mouseX, mouseY;
let stacks;

class Stack {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 40 + 60;
  }

  draw(angle, sizeFactor) {
    let deltaX = Math.cos(angle) * sizeFactor * 0.015;
    let deltaY = Math.sin(angle) * sizeFactor * 0.015;
    for (let i = 0; i < 14; i++) {
      drawSquare(this.x - i * deltaX, this.y - i * deltaY, this.size + i * 3);
    }
  }}


function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  reset();
  window.addEventListener("resize", reset);
  canvas.addEventListener("mousemove", mousemove);
  mouseX = w * 0.75;
  mouseY = h * 0.75;
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  setupStacks();
}

function draw() {
  requestAnimationFrame(draw);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  drawStacks();
}

function setupStacks() {
  let nrOfStacks = w * h / 5000;
  stacks = [];
  for (let i = 0; i < nrOfStacks; i++) {
    let x = Math.random() * w;
    let y = Math.random() * h;
    let stack = new Stack(x, y);
    stacks.push(stack);
  }
}

function drawStacks() {
  stacks.forEach(stack => {
    let deltaY = mouseY - stack.y;
    let deltaX = mouseX - stack.x;
    let angle = Math.atan2(deltaY, deltaX);
    let distFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    stack.draw(angle, distFromCenter);
  });
}

function drawSquare(x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 3);
  ctx.strokeRect(-size / 2, -size / 2, size, size);
  ctx.fillRect(-size / 2 + 1, -size / 2 + 1, size - 2, size - 2);
  ctx.restore();
}

function mousemove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

setup();
draw();