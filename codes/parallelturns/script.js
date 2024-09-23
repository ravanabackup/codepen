let lineArray = [];
let m = 6;
let n = 100;
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  lineArray = [];
  m = random(-5, 5);
  lines();
  angleMode(DEGREES);
}

function draw() {
  t = frameCount / 2;
  translate(width / 2, height / 2);
  rotate(-t);
  for (let i = 0; i < n; i++) {
    lineArray[i].display();
  }
}

function mousePressed() {
  setup();
}

class paraL {
  constructor(m1, x1, y1) {
    this.x1 = x1;
    this.y1 = y1;
    this.thick = random(0.5, 5);
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);
  }
  display() {
    strokeWeight(this.thick);
    stroke(this.r, this.g, this.b);
    let x1 = 0;
    let y1 = m * (x1 - this.x1) + this.y1;
    let x2 = width;
    let y2 = m * (x2 - this.x1) + this.y1;
    line(x1, y1, x2, y2);
  }
}
function lines() {
  for (let i = 0; i < n; i++) {
    lineArray.push(new paraL(m, i, 0));
  }
}