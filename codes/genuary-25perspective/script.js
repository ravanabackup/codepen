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
    draw();
  });
  canvas.addEventListener("click", draw);
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function drawTexture() {
  ctx.save();
  let nrOfSpots = w * h * 0.006;
  for(let i = 0; i < nrOfSpots; i++) {
    let x = Math.random() * w;
    let y = Math.random() * h;
    
    let dist = Math.hypot(x - w * 0.33, y - h * 0.67) / w;
    
    let blur = dist * 5;
    ctx.filter = `blur(${blur}px)`;
    
    ctx.beginPath();
    let r = (8 - dist * 7);
    ctx.arc(x, y, r, 0, Math.PI * 2);

    let c = (Math.random() * 80 + 120) * dist;
    ctx.fillStyle = `rgb(${c}, ${c}, ${c})`;
    ctx.fill();
  }
  ctx.restore();
}

function draw() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  drawTexture();
}

setup();
draw();