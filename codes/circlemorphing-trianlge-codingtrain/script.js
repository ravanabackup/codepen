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
let trianglePoints;
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

  // Make it "responsive"
  // Try re-sizing the window
  numberOfPoints = r * 2;

  ctx.strokeStyle = "white";
  addCirclePoints();
  addTrianglePoints();
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

function drawShape(points) {
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.closePath();
  ctx.stroke();
}

function addCirclePoints() {
  circlePoints = [];
  for (let i = 0; i < numberOfPoints; i++) {
    let angle = i / numberOfPoints * Math.PI * 2 - Math.PI / 2;
    let cx = Math.cos(angle) * r;
    let cy = Math.sin(angle) * r;
    circlePoints.push([cx, cy]);
  }
}


function addTrianglePoints() {
  trianglePoints = [];

  let angle = -Math.PI / 2;
  let x1 = Math.cos(angle) * r;
  let y1 = Math.sin(angle) * r;

  angle += Math.PI * 2 / 3;
  let x2 = Math.cos(angle) * r;
  let y2 = Math.sin(angle) * r;

  angle += Math.PI * 2 / 3;
  let x3 = Math.cos(angle) * r;
  let y3 = Math.sin(angle) * r;

  let steps = numberOfPoints / 3;
  for (let i = 0; i < steps; i++) {
    let x = x1 + (x2 - x1) * i / steps;
    let y = y1 + (y2 - y1) * i / steps;
    trianglePoints.push([x, y]);
  }

  for (let i = 0; i < steps; i++) {
    let x = x2 - (x2 - x3) * i / steps;
    let y = y2;
    trianglePoints.push([x, y]);
  }

  for (let i = 0; i < steps; i++) {
    let x = x3 + (x2 - x1) * i / steps;
    let y = y3 - (y3 - y1) * i / steps;
    trianglePoints.push([x, y]);
  }
}

function tweenPoints(p0, p1, t, i) {
  let t1 = 300;
  if (i % 7 === 0) {
    t += 100;
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
  let p0 = tweenPoints(circlePoints[0], trianglePoints[0], tick);
  ctx.beginPath();
  ctx.moveTo(p0[0], p0[1]);
  for (let i = 1; i < numberOfPoints; i++) {
    let p = tweenPoints(circlePoints[i], trianglePoints[i], tick, i);
    ctx.lineTo(p[0], p[1]);
  }
  ctx.closePath();
  ctx.stroke();
}

setup();
draw();