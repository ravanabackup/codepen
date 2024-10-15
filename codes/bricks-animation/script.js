/*
  Johan Karlsson, 2022
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;
let columns;
let xstep;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", () => {
    resize();
  });
  canvas.addEventListener("click", resize);
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  columns = [];

  xstep = Math.random() * w * 0.02 + w * 0.005;
  for (let x = 0; x < w * 1.2; x += xstep) {
    let ystep = Math.random() * h * 0.05 + h * 0.02;
    let speed = Math.random() * 0.5 - 0.25;
    columns.push([ystep, speed]);
  }
}

function draw(now) {
  requestAnimationFrame(draw);
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "white";
  let offset = now / 10;
  columns.forEach((c, i) => {
    let [ystep, speed] = c;
    let x = i * xstep;
    let yOffset = offset * speed % ystep;
    for (let y = -ystep; y < h * 1.2; y += ystep) {
      rect(x, y + yOffset, xstep, ystep);
    }
    //xstep = Math.random() * w * 0.05 + w * 0.01;
  });
}

function rect(x, y, width, height) {
  ctx.beginPath();
  //ctx.save();
  ctx.rect(x, y, width, height);
  ctx.stroke();
  /*
  ctx.clip();
  
  let nrOfLines = (Math.random() * 0.3 + 0.1) * width * height * 0.2;
  for(let i = 0; i < nrOfLines; i++) {
    let x1 = Math.random() * width + x;
    let y1 = Math.random() * height + y;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + Math.random() * width * 0.2, y1);
    ctx.stroke();
  }
  */
  //ctx.restore();
}

setup();
draw(0);