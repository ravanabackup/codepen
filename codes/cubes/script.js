const colors = ["#2f3136", "#2a2b30", "#7d8187", "#1e1f23", "#5f6a89"];
const backgroundColor = "#000000";
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
  frameCount += 1;
  let frameDelta = (2 * Math.PI * (frameCount % totalFrames)) / totalFrames;
  let delta = sin(frameDelta);
  
  colorMode(RGB);
  
  let bg = color(backgroundColor);
  background(bg);
  
  let w = 20;
  let h = 20;
  let size = 10;
  let space = 10;
  
  translate(0, -100, 0);
  scale(1.75);
  rotateX(HALF_PI / 1.5);
  rotateZ(HALF_PI / 2);
  //rotateZ(delta);
  //rotateY(delta);

  translate(-w * space / 2, -h * space / 2, -w * space / 2);

  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
        push();

        translate(i * space, j * space, 0);

        let d = dist(i, j, w/2, h/2);
        let d2 = dist(i, 0, w/2, h/2);

        let delt = delta * 10;
        let ry = sin(delt + d);
        let rz = sin(delt + d);
        
        let _z = sin(d + delt) * sin(cos(delta)) * cos(delt / 20) * 15;
        translate(0, 0, _z);

        colorMode(HSB);

        let _h = map(_z, 0, w / 2, 200, 360);
        let _b = map(_z, 1, 0, 10, 100, true);
        let _s = map(_z, 0, 1, 100, 0, true);
      console.log(_s);
        fill(color(_h, _s, _b, 1))
      
        let _h2 = map(_z, 0, w / 2, 360, 200);
        let _b2 = map(_z, 5, 0, 10, 100, true);
        let _s2 = map(_z, 0, 1, 100, 50, true);

        strokeWeight(1);
        stroke(color(_h2, _s2, _b2, 1));

        box(size, size, size);

        pop();
      
    }
  }
  //checkForRecording();
}