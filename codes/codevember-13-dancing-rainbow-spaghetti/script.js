/*
  Johan Karlsson (DonKarlssonSan)
  
  All my #codevember Pens:
  https://codepen.io/collection/XwMkWm/
  
  See pen details for more info.
*/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
ctx.lineWidth = 4;
ctx.fillStyle = "black";

// Lissajous variables
var t = 0;
var A = 250;
var B = 250;
var a;
var b;
var δ = Math.PI / 2;
// A point somewhere along the curve
var x1, y1;
//  Another point along the curve, π/2 ahead.
var x2, y2;


function draw() {
  t += 0.01;
  x1 = A * Math.sin(a * (t + Math.PI / 2) + δ) + width / 2;
  y1 = B * Math.sin(b * (t + Math.PI / 2)) + height / 2;
  x2 = A * Math.sin(a * t + δ) + width / 2;
  y2 = B * Math.sin(b * t) + height / 2;

  // Fill with black to avoid transparent
  // images when doing Save as... on canvas.
  ctx.fillRect(0, 0, width, height);
  for (var x0 = 0; x0 < width; x0 += 20) {
    ctx.strokeStyle = `hsl(${x0 / width * 360}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(x0, 0);
    ctx.bezierCurveTo(
    x1, y1,
    x2, y2,
    x0, height);
    ctx.stroke();
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  draw();
}

canvas.addEventListener("click", random);
random();
animate();

function randomWithMax(max) {
  return Math.floor(Math.random() * max);
}

function random() {
  a = randomWithMax(10) + 1;
  b = randomWithMax(10) + 1;
}