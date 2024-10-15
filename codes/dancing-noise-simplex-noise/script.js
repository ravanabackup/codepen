/*
  Johan Karlsson (DonKarlssonSan) 2018
*/
let canvas;
let ctx;
let simplex;
let w, h;
let ticker;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "lighter";
  window.addEventListener("resize", reset);
  reset();
}

function reset() {
  simplex = new SimplexNoise();
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  ctx.fillStyle = "black";
  ctx.lineWidth = 2;
}

function draw(now) {
  requestAnimationFrame(draw);

  ticker = now / 3000;

  ctx.fillRect(0, 0, w, h);
  let zoom = 110;
  let strengthX = 140;
  let strengthY = 140;
  for (let y = h / 2 - 40; y < h / 2 + 40; y += 0.5) {
    let hue = y * 0.6 + ticker * 50;
    ctx.beginPath();
    ctx.strokeStyle = `hsla(${hue}, 100%, 50%, 0.03)`;
    for (let x = -strengthX; x < w + strengthX; x += 4) {
      let n1 = simplex.noise3D(x / zoom, y / zoom, ticker) * strengthX;
      let n2 = simplex.noise3D(x / zoom + 1000, y / zoom + 1000, ticker + 1000) * strengthY;
      ctx.lineTo(x + n1, y + n2);
    }
    ctx.stroke();
  }
}

setup();
draw(1);