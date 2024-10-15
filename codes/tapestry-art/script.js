/* 
 * TAPESTRY ART
 * Made with p5 - Enjoy!
 *
 * #048 - #100DaysOfCode
 * By ilithya | 2020
 * https://www.ilithya.rocks/
 * https://twitter.com/ilithya_rocks
 */

const colorBg = '#7c4de1';
const colorFibers = [
'hotpink',
'#fffffd', // white
'#4DD0E1' // blue
];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  smooth();

  background(colorBg);
  strokeWeight(1);
  stroke(colorFibers[0]);
  noFill();
}

const createGenerativeArt = () => {
  const randomSize = random(mouseX, mouseY);
  box(randomSize);
};

function mouseMoved() {
  createGenerativeArt();
}
function touchMoved() {
  createGenerativeArt();
}

function checkIfMouseMoved() {
  if (mouseMoved) {
    const randomColor = random(colorFibers);
    stroke(randomColor);
  }
}
setInterval(checkIfMouseMoved, 500);

const clearCanvas = () => {
  clear();
  background(colorBg);
};

function mousePressed() {
  clearCanvas();
}
function touchStarted() {
  clearCanvas();
}

function windowResized() {
  clearCanvas();
  resizeCanvas(windowWidth, windowHeight);
}