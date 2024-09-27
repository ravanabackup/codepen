const colors = ["#2f3136", "#2a2b30", "#7d8187", "#1e1f23", "#5f6a89"];
const backgroundColor = "#202225";
const width = window.innerWidth;
const height = window.innerHeight;
const totalFrames = 1000;
let frameCount = 0;
let recording = false;

let c01 = (g) => {
  return constrain(g, 0, 1);
};

let ease = (p) => {
  p = c01(p);
  return 3 * p * p - 2 * p * p * p;
};

function easeInQuint(x) {
  return x * x * x * x * x;
}

function easeOutQuart(x) {
  return 1 - pow(1 - x, 4);
}

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - pow(2, -10 * x);
}

function setup() {
  canvas = createCanvas(width, height, WEBGL);
  noiseSeed(20);
}

function draw() {
  frameCount += 5;
  let frameDelta = (2 * Math.PI * (frameCount % totalFrames)) / totalFrames;

  colorMode(RGB);
  
  let bg = color(backgroundColor);
  background(bg);

  let w = 10;
  let h = 10;
  let space = 15;
  
  scale(1.75);
  rotateX(HALF_PI / 1.5);
  rotateZ(HALF_PI / 2);
  rotateZ(frameCount * 0.001);
  rotateY(frameCount * 0.001);

  translate(-w * space / 2, -h * space / 2, - h * space / 2);

  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      for (let k = 0; k < h; k++) {
        push();

        space = 20 + sin(frameDelta) * 5;
        
        translate(i * space, j * space, k * space);

        let d = dist(i, j, w/2, h/2);

        let delt = frameDelta;
        let ry = sin(delt + d);
        let rz = sin(delt + d);

        let z = sin(d + delt) * sin(cos(frameDelta)) * cos(delt / 20) * sin(cos(frameDelta + d)) * 20;
        translate(0, 0, z);

        strokeWeight(2);
        //stroke(color(255, 255, 255, 255));

        colorMode(HSB);

        let _h = map(d, 0, w / 2, 0, 50);
        stroke(color(_h, 100, 100, 1));
        fill(color(_h, 70, 100, .5))

        box(w, w, w);

        pop();
      }
    }
  }
  //checkForRecording();
}