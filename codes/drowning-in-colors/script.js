var step = 5;
var bg;
var r = 0;
var theta = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  r = random(100);
  bg = color(34);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(bg);
  strokeWeight(0.9);
  noFill();

  var nx = 0;
  var ny = 0;
  for (var y = -height; y < 2 * height; y += step) {
    var d = map(sin(theta + ny), -1, 1, -100, 100);
    var ns = noise(nx, ny);
    var x2 = map(ns, 0, 1, -50 + r, 50 + r);
    var y2 = map(ns, 0, 1, -r, r);
    var x3 = map(ns, 0, 1, width - r, width + r);
    var y3 = map(ns, 0, 1, height - r, height - r);
    var s = map(ns, 0.2, 0.8, 0, 360);
    stroke(s, 900, 90, 150);
    bezier(-100, y, x2 + d, y2, x3 + d, y3, width + 100, y)
    nx += 0.002;
    ny += 0.05;
  }
  //noLoop();
  theta += 0.03;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}