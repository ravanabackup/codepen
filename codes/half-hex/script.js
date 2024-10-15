/*
  Johan Karlsson, 2020
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/

class Hexagon {
  constructor(x, y, R) {
    this.x = x;
    this.y = y;
    this.R = R;
    this.r = R * Math.cos(Math.PI / 6);
    this.angle = Math.floor(Math.random() * 6) * Math.PI / 3;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
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


let canvas;
let ctx;
let w, h;
let hexagons;

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

function getRandomColorCombo() {
  // color combos from https://www.designwizard.com/blog/design-trends/colour-combination
  let colors = [
  ["#D7C49E", "#343148"],
  ["#DF6589", "#3C1053"],
  ["#4B878B", "#D01C1F"],
  ["#1C1C1B", "#CE4A7E"],
  ["#5F4B8B", "#E69A8D"],
  ["#42EADD", "#CDB599"],
  ["#00A4CC", "#F95700"],
  ["#00203F", "#ADEFD1"]];

  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function setupHexagons() {
  hexagons = [];
  let r = Math.random() * 50 + 10;
  let R = r / Math.cos(Math.PI / 6);
  let t = r * 2 / Math.sqrt(3);
  let rows = w / (r * 2) + 1;
  let cols = h / R;
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      let xOffset = y % 2 === 0 ? r : 0;
      let hexagon = new Hexagon(r * x * 2 + xOffset, (t / 2 + R) * y, R);
      hexagons.push(hexagon);
    }
  }
}

function draw() {
  setupHexagons();
  let [color1, color2] = getRandomColorCombo();
  ctx.fillStyle = color1;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = color2;
  ctx.strokeStyle = color2;
  hexagons.forEach(h => {
    h.draw();
  });
}

setup();
draw();