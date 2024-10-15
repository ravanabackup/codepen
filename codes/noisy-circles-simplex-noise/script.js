/*
  Johan Karlsson (DonKarlssonSan) 2018
*/

let canvas;
let ctx;
let w, h;
let m;
let simplex;
let mx, my;
let now;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  reset();
  window.addEventListener("resize", reset);
  canvas.addEventListener("mousemove", mousemove);
  console.log(`Referrer: ${document.referrer}`);
  if (document.referrer === "https://codepen.io/tv/AQpNyx") {
    // Mua hahahahahahahaha!!
    canvas.classList.add("hide");
    let text = document.querySelector("#text");
    text.classList.remove("hide");
  }
}

function reset() {
  simplex = new SimplexNoise();
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  m = Math.min(w, h);
  mx = w / 2;
  my = h / 2;
}

function mousemove(event) {
  mx = event.clientX + 1;
  my = event.clientY + 1;
}

function draw(timestamp) {
  now = timestamp;
  requestAnimationFrame(draw);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "white";
  for (let i = 10; i < m / 2 - 40; i += 10) {
    drawCircle(i);
  }
}

function drawCircle(r) {
  ctx.beginPath();
  let point, x, y;
  let deltaAngle = Math.PI * 2 / 400;
  for (let angle = 0; angle < Math.PI * 2; angle += deltaAngle) {
    point = calcPoint(angle, r);
    x = point[0];
    y = point[1];
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}

function calcPoint(angle, r) {
  let noiseFactor = mx / w * 50;
  let zoom = my / h * 200;
  let x = Math.cos(angle) * r + w / 2;
  let y = Math.sin(angle) * r + h / 2;
  n = simplex.noise3D(x / zoom, y / zoom, now / 2000) * noiseFactor;
  x = Math.cos(angle) * (r + n) + w / 2;
  y = Math.sin(angle) * (r + n) + h / 2;
  return [x, y];
}

setup();
draw();