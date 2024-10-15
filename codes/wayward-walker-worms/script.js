class Walker {
  constructor(stepSize) {
    this.x = floor(random(w / stepSize)) * stepSize;
    this.y = floor(random(h / stepSize)) * stepSize;
    this.stepSize = stepSize;
    this.hue = random(60) + 260;
    this.tail = [];
    this.tailLength = 20;
  }

  walk() {
    if (this.tail.length > this.tailLength) {
      this.tail.splice(0, 1);
    }

    let angle = random(angles);
    this.x += cos(angle) * this.stepSize;
    this.y += sin(angle) * this.stepSize;
    this.tail.push([this.x, this.y]);
    stroke(this.hue, 100, 55, 1);

    for (var i = 0; i < this.tail.length - 1; i++) {
      var p1 = this.tail[i];
      var p2 = this.tail[i + 1];
      line(p1[0], p1[1], p2[0], p2[1]);
    }
    this.bounce();
  }

  bounce() {
    if (this.x < 0) this.x = 0;
    if (this.x > w) this.x = w;
    if (this.y < 0) this.y = 0;
    if (this.y > h) this.y = h;
  }}



let angles;
let nrOfWalkers;
let walkers;
let stepSize;
let w;
let h;

function setup() {
  nrOfWalkers = 50;
  angles = [0, PI / 2, PI, 3 * PI / 2];
  stepSize = 8;
  setWidthAndHeigt();

  walkers = [];
  for (let i = 0; i < nrOfWalkers; i++) {
    let walker = new Walker(stepSize);
    walkers.push(walker);
  }

  createCanvas(w, h);
  strokeWeight(2);
  colorMode(HSL);
}

function draw() {
  background("black");
  walkers.forEach(w => w.walk());
}

function windowResized() {
  setWidthAndHeigt();
  resizeCanvas(w, h);
}

function setWidthAndHeigt() {
  w = round(windowWidth / stepSize) * stepSize;
  h = round(windowHeight / stepSize) * stepSize;
}