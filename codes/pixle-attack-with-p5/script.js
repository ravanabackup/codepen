function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  fill(30);
}

function draw() {
  background(0);
  for (var i = 0; i < windowWidth; i += 10) {
    for (var j = 0; j < windowHeight; j += 10) {
      var r = random(200, 255);
      var s = random(200);
      var t = random(250);
      fill(r, s, t);
      rect(i, j, 10, 10);
    }
  }
}