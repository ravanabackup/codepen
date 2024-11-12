let loopNum = 1000;
let startSize = 0;
let fistColor = 0;

const init = () => {
  background(0);
  startSize = min(windowWidth, windowHeight) * 0.12;
  fistColor = random(360);
};

const devideRect = (x, y, size, n, color) => {
  n--;

  if (n < 1) return;

  const rand = random(10);

  //noStroke();
  stroke(color, 100, 100, 0.5);

  if (rand > 8) {
    fill(color, 100, 100, 0.5);
    rect(x, y, size, size);
  } else if (rand > 5) {
    fill(random(360, 240), 100, 100, 0.5);
    rect(x, y, size, size);
  } else if (rand > 2) {
    fill(random(240, 120), 100, 100, 0.5);
    rect(x, y, size, size);
  } else {
    fill(random(120, 0), 100, 100, 0.5);
    rect(x, y, size, size);
  }

  devideRect(random(width), random(height), size * 0.995, n, color);

};

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  colorMode(HSB);
  blendMode(ADD);
  init();
}

function draw() {
  devideRect(random(width), random(height), startSize, loopNum, fistColor);

}


// function mouseClicked() {
//   clear();
//   background(0);
// }

function mousePressed() {
  clear();
  init();
  redraw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  clear();
  init();
  redraw();
}