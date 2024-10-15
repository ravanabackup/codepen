/*
  Johan Karlsson, 2022
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;
let offsets;
let amplitude;
let rowHeight;
const pi = "31415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989";

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", () => {
    resize();
    reset();
  });
  canvas.addEventListener("click", reset);
  reset();
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  ctx.lineWidth = 2;
  rowHeight = Math.floor(h / 9);
}

function reset() {
  amplitude = 1.2;
  offsets = [];
  const rows = Math.ceil((h + rowHeight * 3) / rowHeight);
  for (let row = 0; row < rows; row++) {
    const offset = Math.floor(Math.random() * 1000);
    offsets.push(offset);
  }
}

function draw(now) {
  requestAnimationFrame(draw);
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "white";
  const step = 6;
  const t = Math.floor(now / 400);
  const t2 = Math.floor(now / (400 / step));
  const freq = 0.02;
  for (let y0 = 0; y0 < h + rowHeight * 3; y0 += rowHeight) {
    let i = 0;
    for (let x0 = -step; x0 < w + step * 2; x0 += step) {
      const x = x0 - t2 % step;
      const y1 = y0 + Math.sin(x * freq) * rowHeight * amplitude - rowHeight;
      const offset = offsets[Math.floor(y0 / rowHeight)];
      const index = (i + offset + t) % 1000;
      const digit = pi[index];
      const l = digit / 10 * rowHeight * 0.9;
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y1 - l);
      ctx.stroke();
      i++;
    }
  }
}

setup();
draw(performance.now());