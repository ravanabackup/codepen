class Walker {
  constructor(stepSize) {
    this.x = floor(random(w / stepSize)) * stepSize;
    this.y = floor(random(h / stepSize)) * stepSize;
    this.stepSize = stepSize;
    this.hue = random(40) + 300;
    this.tail = [];
    this.tailLength = 60;
  }

  walk() {
    this.chopTail();
    this.move();
    this.bounce();
    this.draw();
  }

  chopTail() {
    if (this.tail.length > this.tailLength) {
      this.tail.splice(0, 1);
    }
  }

  move() {
    let angle = random(angles);
    let steps = random(1, 4);
    this.x += cos(angle) * this.stepSize * steps;
    this.y += sin(angle) * this.stepSize * steps;
    this.tail.push([this.x, this.y]);
  }

  draw() {
    fill(this.hue, 50, 50, 0.1);
    stroke(this.hue, 50, 50, 0.3);
    beginShape();
    vertex(this.x, this.y);
    this.tail.forEach(pos => {
      vertex(pos[0], pos[1]);
    });
    endShape();
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
  stepSize = 5;
  setWidthAndHeigt();
  initWalkers();
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
  w = floor(windowWidth / stepSize) * stepSize;
  h = floor(windowHeight / stepSize) * stepSize;
}

function initWalkers() {
  walkers = [];
  for (let i = 0; i < nrOfWalkers; i++) {
    let walker = new Walker(stepSize);
    walkers.push(walker);
  }
}