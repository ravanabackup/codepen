// divide this circle
// infinite and even parts
// this - apeirogon

let img1, img2;
let vertices = [];
let a;

function preload() {
  img1 = loadImage("https://assets.codepen.io/4559259/cyclotomic.jpg");
  img2 = loadImage("https://assets.codepen.io/4559259/star.png");
}

function setup() {
  createCanvas(600, 600);
  points = [];
  nPolygons = int(random(4, 40));
  strokeWeight(0.25);
  angleMode(DEGREES);
  stroke(255);
  imageMode(CENTER);
}

function draw() {
  translate(width / 2, height / 2);
  t1 = frameCount / 5 + 3;
  a = sin(t1);
  makeV();
  background(0);
  rotate(-t1 / 20);
  image(img1, 0, 0, 800, 800);
  noFill();
  if (mouseIsPressed) {
    cyclotomicGraph();
  } else {
    beginShape();
    for (let i = 0; i <= int(t1); i++) {
      x = 180 * sin((360 / t1) * i);
      y = 180 * cos((360 / t1) * i);
      vertex(x, y);
      image(img2, x, y, 40, 40);
      line(x, y, 0, 0);
    }
    endShape();
  }
}
function cyclotomicGraph() {
  for (let i = 0; i < vertices.length; i++) {
    fill(255);
    image(img2, vertices[i].x, vertices[i].y, 30, 50);
  }

  for (let i = 0; i < 41; i++) {
    line(
      vertices[connections[i * 2] - 1].x,
      vertices[connections[i * 2] - 1].y,
      vertices[connections[i * 2 + 1] - 1].x,
      vertices[connections[i * 2 + 1] - 1].y
    );
  }
}
function makeV() {
  //outer
  r1 = 180 + a * 50 * sin(t1);
  for (let i = 0; i < 5; i++) {
    vertices[i] = createVector(
      r1 * cos((360 / 5) * i + t1 / 2) + a * (r1 / 4) * sin(t1),
      r1 * sin((360 / 5) * i + t1 / 2) + a * (r1 / 4) * cos(t1)
    );
  }
  r2 = 100 + a * 50 * cos(t1);
  for (let i = 0; i < 5; i++) {
    vertices[i + 5] = createVector(
      r2 * cos((360 / 5) * i + 360 / 10 + a * (r2 / 4) * sin(t1)) -
        (r2 / 4) * sin(t1),
      r2 * sin((360 / 5) * i + 360 / 10 + a * (r2 / 4) * sin(t1)) -
        a * (r2 / 4) * cos(t1)
    );
  }
  r3 = 50 - a * 10 * sin(t1);
  for (let i = 0; i < 5; i++) {
    vertices[i + 10] = createVector(
      r3 * cos((360 / 5) * i + t1 / 3),
      r3 * sin((360 / 5) * i + t1 / 3)
    );
  }
  vertices[15] = createVector(0, 0);
}

function mousePressed() {
  frameCount = 0;
  setup();
  draw();
}

let connections = [
  1,
  2,
  1,
  5,
  1,
  7,
  1,
  9,
  1,
  11,
  2,
  3,
  2,
  8,
  2,
  10,
  2,
  12,
  3,
  4,
  3,
  6,
  3,
  9,
  3,
  13,
  4,
  5,
  4,
  7,
  4,
  10,
  4,
  14,
  5,
  6,
  5,
  8,
  5,
  15,
  6,
  11,
  6,
  12,
  6,
  16,
  7,
  12,
  7,
  13,
  7,
  16,
  8,
  13,
  8,
  14,
  8,
  15,
  8,
  16,
  9,
  14,
  9,
  15,
  9,
  16,
  10,
  11,
  10,
  15,
  10,
  16,
  11,
  13,
  11,
  14,
  12,
  14,
  12,
  15,
  13,
  15
];

//I originally made a cyclotomic graph and changed my design, so I included it as a hidden canvas.