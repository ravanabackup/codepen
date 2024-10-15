/*
  Johan Karlsson (DonKarlssonSan)
*/
function setup() {
  colorMode(HSB);
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for(var x = 0; x < windowWidth; x += 20) {
    for(var y = 0; y < windowHeight; y += 20) {
      var xval = (x + mouseX) / windowWidth * 10 + frameCount/16;
      var yval = (y + mouseY) / windowHeight * 10;
      var h = noise(xval, yval) * 100;
      fill(h, 100, 100, 0.5);
      ellipse(x, y, 40, 40);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}