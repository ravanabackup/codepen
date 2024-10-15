/*
  Johan Karlsson, 2021
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/

class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  vertices() {
    return [
    [this.x, this.y],
    [this.x + this.width, this.y],
    [this.x + this.width, this.y + this.height],
    [this.x, this.y + this.height]];

  }

  intersectsWith(otherRect) {
    let m = margin;
    if (otherRect.x + otherRect.width + m < this.x || // to the left 
    otherRect.x - m > this.x + this.width || // to the right
    otherRect.y + otherRect.height + m < this.y || // above
    otherRect.y - m > this.y + this.height) {// below
      return false;
    }

    return true;
  }

  draw() {
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    setRandomColor();
    ctx.fill();
    ctx.stroke();

    let s = 7;
    line(this.x, this.y, this.x + s, this.y - s);
    line(this.x + this.width, this.y, this.x + this.width + s, this.y - s);
    line(this.x + this.width, this.y + this.height, this.x + this.width + s, this.y + this.height - s);
    line(this.x + s, this.y - s, this.x + this.width + s, this.y - s);
    line(this.x + this.width + s, this.y - s, this.x + this.width + s, this.y + this.height - s);

    ctx.lineWidth = 1;
    if (this.width > 100 || this.height > 100) {
      for (let y = this.y; y < this.y + this.height; y += 3) {
        line(this.x, y, this.x + this.width, y);
      }
    }
  }}


function setRandomColor() {
  let hue = Math.random() * 45;
  let l = Math.random() * 10 + 45;
  let color = `hsl(${hue}, 50%, ${l}%)`;
  ctx.fillStyle = color;
}

function line(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

let canvas;
let ctx;
let w, h;
let rects;
let margin;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", () => {
    resize();
    draw();
  });
  canvas.addEventListener("click", draw);
  margin = 10;
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function add() {
  let width = Math.random() * 200 + 3;
  let height = Math.random() * 200 + 3;
  let x = Math.random() * (w - width - margin * 3) + margin;
  let y = Math.random() * (h - height - margin * 3) + margin * 2;

  let rect = new Rect(x, y, width, height);
  if (!intersectsWithAnother(rect)) {
    rects.push(rect);
  }
}

function intersectsWithAnother(rect) {
  for (let i = 0; i < rects.length; i++) {
    let other = rects[i];

    if (rect.intersectsWith(other)) {
      return true;
    }
  }
  return false;
}

function draw() {
  setRandomColor();
  ctx.fillRect(0, 0, w, h);

  rects = [];
  // Brute force, yay!!
  for (let i = 0; i < 1900000; i++) {
    add();
  }
  ctx.strokeStyle = "white";
  //rects.sort((a, b) => (b.y - a.y) + (b.x - a.x));
  rects.forEach(r => {
    r.draw();
  });
}

setup();
draw();