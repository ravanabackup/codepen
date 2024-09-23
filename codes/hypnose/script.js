let diameter;
let lines = [];
const _noise = noise;
_noise.seed(Math.random() * 100);
let detail = 2;
function setup () {
  createCanvas(windowWidth, windowHeight);
  windowResized();
}
function mouseClicked () {
  windowResized();
}
function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
  diameter = min(width, height) * 0.8;
  noFill();
  stroke(255);
  strokeWeight(2);
  lines = [];
  for (let i = 0; i < 50; i++) {
    lines.push(new Line(i));
  }
}
function draw () {
  clear();
  circle(width / 2, height / 2, diameter);
  lines.forEach(l => l.draw());
}
class Line {
  constructor (i) {
    this.angle = random(TWO_PI);
    this.endX = sin(this.angle) * (diameter / 2) + width / 2;
    this.endY = cos(this.angle) * (diameter / 2) + height / 2;
    this.stepX = (width / 2 - this.endX) / detail;
    this.stepY = (height / 2 - this.endY) / detail;
  }
  draw () {
    
    beginShape();
    for (let r = 0; r <= (diameter / 2); r+=detail) {
      let x = sin(this.angle + r * 0.03);
      let y = cos(this.angle + r * 0.03);
      let offset = _noise.simplex3(x * 0.2, y * 0.2, frameCount * 0.005) * 0.3;
      x = sin(this.angle + offset) * r;
      y = cos(this.angle + offset) * r;
      x += width / 2;
      y += height / 2;
      vertex(x, y);
    }
    endShape();
  }
}