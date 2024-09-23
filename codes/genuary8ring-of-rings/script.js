//genuary8 - sdf
let p = [];
let nC = 7;
let a, b, c, f, ds, np;
let r1;
function setup() {
  cnv = createCanvas(500, 500);
  background(255, 255, 255);
  noStroke();
  np = floor(random(5000, 20000));
  for (let i = 0; i < np; i++) {
    p.push(new pnts());
  }
  a = random(1, 3);
  b = random(1, 3);
  c = random(-3, 3);
  f = random(-3, 3);

  ds = 80000 / np;
  r1 = int(random(20, 50));
}
function draw() {
  translate(width / 2, height / 2);
  background(255, 255, 255, 5);
  t = frameCount / 100;
  for (let i = 0; i < np; i++) {
    p[i].display();
  }
}

class pnts {
  constructor() {
    this.x = random(-width / 2, width / 2);
    this.y = random(-height / 2, height / 2);
  }
  display() {
    isIn(this.x, this.y);
    circle(this.x, this.y, ds);
  }
}

function isIn(x, y, cx, cy) {
  r2 = width / 4;

  d = [];
  fill(200, 200, 200, 20);
  for (let i = 0; i < nC; i++) {
    cx = r2 * Math.sin(a * t + (TWO_PI / nC) * i + c);
    cy = r2 * Math.cos(b * t + (TWO_PI / nC) * i + f);
    d[i] = dist(x, y, cx, cy);
    if (d[i] <= r1) {
      fill(50, 50, 50);
    }
    if (d[i] <= r1 / 2) {
      fill(200, 200, 200, 20);
    }
  }
}

function mousePressed() {
  if (nC < 25) {
    nC++;
  } else {
    nC = 2;
  }
}

function keyPressed() {
  p = [];
  setup();
  draw();
}