let array;
let n = 10000;
let temp;
let colors = [
  "#E50000",
  "#F88D00",
  "#FFEE00",
  "#028121",
  "#004CFF",
  "#760088",
  "#000000",
  "#613915",
  "#73D7EE",
  "#FFAFC7",
  "#FFFFFF"
];
let t1, t2, t3, t4, t5;
function preload() {
  temp = loadImage("https://assets.codepen.io/4559259/template.jpeg");
}
function setup() {
  c = min(800, windowWidth * 0.9);
  createCanvas(c, (c * 2) / 3);
  // noLoop()
  setTriangles();
  background(0);
  array = [];
  for (let i = 0; i < n; i++) {
    array[i] = {
      r: random(0, width / 1.5),
      theta: random(0, TWO_PI),
      size: random(0.2, 1)
    };
  }
  noStroke();
  thickness = height / 6;
}

function draw() {
  translate(width / 2, height / 2);
  if (frameCount % 5 === 0) {
    background(0, 0, 0, 1);
  }
  if (!keyIsPressed) {
    background(0, 0, 0, 6);
  }

  getColor();
  fill(colors[0]);
  for (let i = 0; i < array.length; i++) {
    x = array[i].r * cos(array[i].theta);
    y = array[i].r * sin(array[i].theta);
    getColor(x, y);
    circle(x, y, array[i].size);
    array[i].theta += 0.001;
  }
}

function getColor(x, y) {
  intriangle = false;
  if (
    !intriangle &&
    isPointInTriangle(x, y, t5.x1, t5.y1, t5.x2, t5.y2, t5.x3, t5.y3)
  ) {
    fill(colors[10]);
    intriangle = true;
  }
  if (
    !intriangle &&
    isPointInTriangle(x, y, t4.x1, t4.y1, t4.x2, t4.y2, t4.x3, t4.y3)
  ) {
    fill(colors[9]);
    intriangle = true;
  }
  if (
    !intriangle &&
    isPointInTriangle(x, y, t3.x1, t3.y1, t3.x2, t3.y2, t3.x3, t3.y3)
  ) {
    fill(colors[8]);
    intriangle = true;
  }
  if (
    !intriangle &&
    isPointInTriangle(x, y, t2.x1, t2.y1, t2.x2, t2.y2, t2.x3, t2.y3)
  ) {
    fill(colors[7]);
    intriangle = true;
  }
  if (
    !intriangle &&
    isPointInTriangle(x, y, t1.x1, t1.y1, t1.x2, t1.y2, t1.x3, t1.y3)
  ) {
    fill(colors[6]);
    intriangle = true;
  }
  if (!intriangle && y >= -height / 2 && y < -height / 2 + height / 6) {
    fill(colors[0]);
  }
  if (
    !intriangle &&
    y >= -height / 2 + height / 6 &&
    y < -height / 2 + (2 * height) / 6
  ) {
    fill(colors[1]);
    intriangle = true;
  }
  if (
    !intriangle &&
    y >= -height / 2 + (2 * height) / 6 &&
    y < -height / 2 + (3 * height) / 6
  ) {
    fill(colors[2]);
  }
  if (
    !intriangle &&
    y >= -height / 2 + (3 * height) / 6 &&
    y < -height / 2 + (4 * height) / 6
  ) {
    fill(colors[3]);
  }
  if (
    !intriangle &&
    y >= -height / 2 + (4 * height) / 6 &&
    y < -height / 2 + (5 * height) / 6
  ) {
    fill(colors[4]);
  }
  if (
    !intriangle &&
    y >= -height / 2 + (5 * height) / 6 &&
    y < -height / 2 + (64 * height) / 6
  ) {
    fill(colors[5]);
  }
}

function mousePressed() {
  console.log((mouseX - width / 2) / width, mouseY - height / 2);
}

function isPointInTriangle(px, py, x1, y1, x2, y2, x3, y3) {
  let area = triangleArea(x1, y1, x2, y2, x3, y3);
  let area1 = triangleArea(px, py, x1, y1, x2, y2);
  let area2 = triangleArea(px, py, x2, y2, x3, y3);
  let area3 = triangleArea(px, py, x3, y3, x1, y1);
  let totalArea = area1 + area2 + area3;
  let epsilon = 1;
  return Math.abs(area - totalArea) < epsilon;
}

function triangleArea(x1, y1, x2, y2, x3, y3) {
  return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
}

function setTriangles() {
  t1 = {
    x1: (-0.04 * width) / 2,
    y1: 0,
    x2: -width / 2,
    y2: -(1.47 * height) / 2,
    x3: -width / 2,
    y3: (1.47 * height) / 2
  };
  t2 = {
    x1: (-0.21 * width) / 2,
    y1: 0,
    x2: -width / 2,
    y2: -(1.25 * height) / 2,
    x3: -width / 2,
    y3: (1.25 * height) / 2
  };
  t3 = {
    x1: (-0.37 * width) / 2,
    y1: 0,
    x2: -width / 2,
    y2: -(1 * height) / 2,
    x3: -width / 2,
    y3: (1 * height) / 2
  };
  t4 = {
    x1: (-0.535 * width) / 2,
    y1: 0,
    x2: -width / 2,
    y2: -(0.75 * height) / 2,
    x3: -width / 2,
    y3: (0.75 * height) / 2
  };
  t5 = {
    x1: (-0.69 * width) / 2,
    y1: 0,
    x2: -width / 2,
    y2: -(0.49 * height) / 2,
    x3: -width / 2,
    y3: (0.49 * height) / 2
  };
}