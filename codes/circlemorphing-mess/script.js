// easings from https://gist.github.com/gre/1650294
function easeInOutQuad(t) {return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;}
function easeInOutQuint(t) {return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;}
function easeInOutElastic(t) {return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1;}


/*
  Johan Karlsson (DonKarlssonSan) 2017
*/
let canvas;
let ctx;
let w, h;
let r;
let numberOfPoints;
let randomPoints;
let circlePoints;
let tick;

function setup() {
  tick = 0;
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");

  reset();
  window.addEventListener("resize", reset);
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  r = Math.min(w, h) * 0.45;

  numberOfPoints = r * 2;

  ctx.strokeStyle = "white";
  initCirclePoints();
  initRandomPoints();
}

function draw() {
  tick++;
  requestAnimationFrame(draw);

  ctx.save();
  ctx.fillRect(0, 0, w, h);
  ctx.translate(w / 2, h / 2);
  tweenShapes(tick);
  ctx.restore();
}

function initCirclePoints() {
  circlePoints = [];
  for (let i = 0; i < numberOfPoints; i++) {
    let angle = i / numberOfPoints * Math.PI * 2 - Math.PI / 2;
    let cx = Math.cos(angle) * r;
    let cy = Math.sin(angle) * r;
    circlePoints.push([cx, cy]);
  }
}

function initRandomPoints() {
  randomPoints = [];
  for (let i = 0; i < numberOfPoints; i++) {
    let x = (Math.random() - 0.5) * r * 2;
    let y = (Math.random() - 0.5) * r * 2;
    randomPoints.push([x, y]);
  }
}

function tweenPoints(p0, p1, t, i) {
  let t1 = 300;
  if (i % 2 === 0) {
    t += 10;
  }
  let t0 = t % t1;
  let x, y;
  let eased = easeInOutQuint(t0 / t1);
  if (t % (t1 * 2) >= t1) {
    x = p0[0] + (p1[0] - p0[0]) * eased;
    y = p0[1] + (p1[1] - p0[1]) * eased;
  } else {
    x = p1[0] - (p1[0] - p0[0]) * eased;
    y = p1[1] - (p1[1] - p0[1]) * eased;
  }
  return [x, y];
}

function tweenShapes(tick) {
  let p0 = tweenPoints(circlePoints[0], randomPoints[0], tick);
  ctx.beginPath();
  ctx.moveTo(p0[0], p0[1]);
  for (let i = 1; i < numberOfPoints; i++) {
    let p = tweenPoints(circlePoints[i], randomPoints[i], tick, i);
    ctx.lineTo(p[0], p[1]);
  }
  ctx.closePath();
  ctx.stroke();
}

setup();
draw();