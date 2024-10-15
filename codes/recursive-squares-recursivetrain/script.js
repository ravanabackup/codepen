let angle;
let iterations;

function setup() {
  angle = 0;
  iterations = 5;
  createCanvas(windowWidth, windowHeight);
  strokeWeight(3);
  noFill();
}

function draw() {
  clear();
  angle += 0.001;
  let x = windowWidth / 2;
  let y = windowHeight / 2;
  d(iterations, x, y);
}

function d(iteration, x, y) {
  if (iteration <= 0) return;
  iteration--;
  push();
  translate(x, y);
  rotate(iteration * angle);
  let size = iteration / iterations * windowHeight / 3;
  rect(-size / 2, -size / 2, size, size);
  d(iteration, -size / 2, -size / 2);
  d(iteration, size / 2, size / 2);
  d(iteration, size / 2, -size / 2);
  d(iteration, -size / 2, size / 2);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}