/*
  Johan Karlsson (DonKarlssonSan)
*/
class Walker {
  constructor(stepSize, hueOffset, tailLength) {
    this.x = floor(random(w / stepSize)) * stepSize;
    this.y = floor(random(h / stepSize)) * stepSize;
    this.stepSize = stepSize;
    this.hue = (random(80) + hueOffset) % 360;
    this.tail = [];
    this.tailLength = tailLength;
  }

  walk() {
    this.chopTail();
    this.move();
    this.draw();
    this.bounce();
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
    fill(this.hue, 70, 50, 0.02);
    stroke(this.hue, 70, 50, 0.03);
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
  angles = [0, PI / 2, PI, 3 * PI / 2];
  setRandom();
  setWidthAndHeigt();
  createCanvas(w, h);
  strokeWeight(2);
  colorMode(HSL);
  cursor(HAND);
}

function draw() {
  noLoop();
  initWalkers();
  background("black");
  let steps = random(100, 200);
  for (let i = 0; i < steps; i++) {
    walkers.forEach(w => w.walk());
  }
}

function windowResized() {
  setWidthAndHeigt();
  resizeCanvas(w, h);
}

function touchEnded() {
  reset();
}

function mouseClicked() {
  reset();
}

function reset() {
  setRandom();
  setWidthAndHeigt();
  draw();
}

function setRandom() {
  nrOfWalkers = floor(random(40, 60));
  stepSize = floor(random(2, 15));
}

function initWalkers() {
  walkers = [];
  let hueOffset = random(360);
  let tailLength = floor(random(10, 40));
  for (let i = 0; i < nrOfWalkers; i++) {
    let walker = new Walker(stepSize, hueOffset, tailLength);
    walkers.push(walker);
  }
}

function setWidthAndHeigt() {
  w = floor(windowWidth / stepSize) * stepSize;
  h = floor(windowHeight / stepSize) * stepSize;
}