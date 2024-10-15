/*
  Johan Karlsson (DonKarlssonSan)
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let ticker;
let positions;
let nrOfCircles;

function setup() {
  noFill();
  ticker = 0;
  positions = [];
  nrOfCircles = 200;
  for (let i = 0; i < nrOfCircles; i++) {
    addPosition();
  }
  createCanvas(windowWidth, windowHeight);
}

function addPosition() {
  let pos = getPosition();
  positions.unshift(pos);
  ticker += 0.01;
}

function getPosition() {
  let xOffset = (noise(ticker) - 0.5) * windowWidth * 0.5;
  let yOffset = (noise(ticker + 1000) - 0.5) * windowHeight * 0.5;
  return [xOffset, yOffset];
}

function draw() {
  clear();
  strokeWeight(1);
  translate(windowWidth / 2, windowHeight / 2);
  let m = max(windowWidth, windowHeight) * 1.8;
  let stepSize = m / nrOfCircles;
  let r = 1;
  positions.forEach(p => {
    ellipse(p[0], p[1], r, r);
    r += stepSize;
  });
  addPosition();
  positions.pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}