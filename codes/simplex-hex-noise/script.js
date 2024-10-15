/*
  Johan Karlsson, 2020
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/

let config = {};
let canvas;
let ctx;
let w, h;
let hexagons;
let simplex;
let noiseZoom;

class Hexagon {
  constructor(x, y, R) {
    this.x = x;
    this.y = y;
    this.R = R;
  }

  draw() {
    ctx.save();
    let n = Math.round((simplex.noise2D(this.x / config.noiseZoom, this.y / config.noiseZoom) + 1) * 127);
    let color = `rgb(${n}, ${n}, ${n})`;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      let angle = Math.PI / 3 * i + Math.PI / 6;
      let x = Math.cos(angle) * this.R;
      let y = Math.sin(angle) * this.R;
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.fill();
    ctx.restore();
  }}


function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("resize", resize);
  canvas.addEventListener("click", draw);
  resize();
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  draw();
}

function setupHexagons() {
  hexagons = [];
  let r = config.size;
  let R = r / Math.cos(Math.PI / 6);
  let t = r * 2 / Math.sqrt(3);
  let rows = w / (r * 2) + 1;
  let cols = h / R;
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      let xOffset = y % 2 === 0 ? r : 0;
      let xPixel = r * x * 2 + xOffset;
      let yPixel = (t / 2 + R) * y;
      let hexagon = new Hexagon(xPixel, yPixel, R);
      hexagons.push(hexagon);
    }
  }
}

function draw() {
  simplex = new SimplexNoise();
  config.noiseZoom = Math.random() * 400 + 200;
  config.size = Math.random() * 15 + 6;
  setupHexagons();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  hexagons.forEach(h => {
    h.draw();
  });
}

setup();