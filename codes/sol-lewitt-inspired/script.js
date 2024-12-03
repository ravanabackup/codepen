//genuary
let mode = 3; //animation mode
let cmode = 0; //colorMode
let smode = 0;
let bg, sc; //color for background and stroke

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  setColor();
  strokeWeight(2);
}

function draw() {
  translate(width / 2, height / 2);
  background(bg);
  stroke(sc);
  if (mode === 0) {
    rotate(frameCount / 2);
  } else if (mode === 1) {
  } else {
  }
  for (let i = -width; i < width; i++) {
    line(i * 6 - width / 2, -height * 2, i * 6 - width / 2, height * 2);
  }
  push();
  if (mode != 2 && mode !== 3) {
    rotate(-frameCount / 2);
  }
  if (mode === 2) {
    scale(2 * sin(frameCount), 2 * sin(frameCount));
    rotate(360 * sin(frameCount / 2));
  }
  fill(bg);
  stroke(sc);
  if (smode === 0) {
    portHole();
  } else if (smode === 1) {
    squareHole();
  } else if (smode === 2) {
    triHole();
  }

  pop();
}

function portHole() {
  fill(bg);
  r = min(width, height) / 3;
  beginShape();
  for (let i = 0; i <= 360; i += 0.01) {
    x = r * cos(i);
    y = r * sin(i);
    vertex(x, y);
    if (round(x, 1) % 6.0 === 0) {
      vertex(round(x), -y);
      vertex(round(x), y);
    }
  }
  endShape();
}

function squareHole() {
  fill(bg);
  r = int(min(width, height) / 3) - 1;
  rect(-r, -r, 2 * r, 2 * r);
  for (let i = 0; i < (2 * r) / 6; i++) {
    line(i * 6 - r, -r, i * 6 - r, r);
  }
}
function mousePressed() {
  mode++;
  mode = mode % 4;
  frameCount = 0;
}

function keyPressed() {
  if (keyCode === 67) {
    cmode++;
    cmode = cmode % 7;
    setColor();
  }
  if (keyCode === 83) {
    smode++;
    smode = smode % 3;
  }
}

function setColor() {
  if (cmode === 0) {
    bg = 255;
    sc = 0;
  } else if (cmode === 1) {
    bg = 0;
    sc = 255;
  } else if (cmode === 2) {
    bg = color(255, 0, 0);
    sc = color(255, 255, 0);
  } else if (cmode === 3) {
    sc = color(255, 0, 0);
    bg = color(255, 255, 0);
  } else if (cmode === 4) {
    sc = color(0, 0, 255);
    bg = color(0, 255, 0);
  } else if (cmode === 5) {
    sc = color(0, 255, 0);
    bg = color(0, 0, 255);
  } else if (cmode === 6) {
    sc = color(120);
    bg = color(150);
  }
}

function triHole() {
  r = int(min(width, height) / 3) - 1;
  beginShape();
  for (let i = 0; i < 360; i += 120) {
    x = cos(i) * r;
    y = sin(i) * r;
    vertex(x, y);
  }
  endShape(CLOSE);
  m = -1 / sqrt(3); //y=sqrt3 x + r
  for (i = 0; i < r / 4; i++) {
    x = cos(240) * r + i * 6;
    y = m * x + r / sqrt(3);
    line(x, y, x, -y);
  }
}