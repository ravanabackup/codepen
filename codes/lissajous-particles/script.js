/*
  Johan Karlsson, 2021
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
const colors = [
"orange",
"black",
"gray",
"purple"];


class Particle {
  constructor() {
    this.rot = Math.random() * Math.PI * 2;
    this.r = Math.random() * Math.min(w, h) * 0.09;
    this.offset = Math.random() * 0.6;
    this.tail = [];
    let i = Math.floor(Math.random() * colors.length);
    this.color = colors[i];
  }

  move(now) {
    let t = now * curveSpeed + this.offset;
    let xrot = Math.cos(this.rot) * this.r;
    let yrot = Math.sin(this.rot) * this.r;
    let x = A * Math.sin(a * t + δ) + xrot;
    let y = B * Math.sin(b * t) + yrot;

    this.rot += rotationSpeed;
    this.tail.push([x, y]);
    if (this.tail.length > tailLength) {
      this.tail.splice(0, 1);
    }
  }

  draw(ctx, x0, y0) {
    // You want colors? Uncomment below!
    // ctx.strokeStyle = this.color;
    ctx.beginPath();
    this.tail.forEach((point, i) => {
      let rgb = 255 - i / tailLength * 255;
      let [x, y] = point;
      ctx.lineTo(x0 + x, y0 + y);
    });
    ctx.lineTo(x0 + this.x, y0 + this.y);
    ctx.stroke();
  }}


let canvas;
let ctx;
let particles;
let A;
let B;
let a;
let b;
let δ = Math.PI / 2;
let rotationSpeed;
let curveSpeed;
let lineWidth;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  reset();
  window.addEventListener("resize", reset);
  canvas.addEventListener("click", reset);
}

function setupParticles() {
  particles = [];
  let nrOfParticles = Math.random() * w * h * 0.0002 + 100;

  for (let i = 0; i < nrOfParticles; i++) {
    let p = new Particle();
    particles.push(p);
  }
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  A = w * 0.35;
  B = h * 0.35;
  a = randomWithMax(8) + 2;
  b = (a + randomWithMax(8) + 2) % 10;
  setupParticles();
  rotationSpeed = Math.random() * 0.1 + 0.02;
  curveSpeed = Math.random() * 0.0003 + 0.0002;
  lineWidth = Math.random() * 3 + 0.5;
  tailLength = Math.round(Math.random() * 7 + 5);
}

function draw(now) {
  requestAnimationFrame(draw);
  ctx.fillStyle = "#ecf0f1";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "black";
  ctx.lineWidth = lineWidth;
  particles.forEach(p => {
    p.move(now);
    p.draw(ctx, w / 2, h / 2);
  });
}

function randomWithMax(max) {
  return Math.floor(Math.random() * max);
}

setup();
draw(1);