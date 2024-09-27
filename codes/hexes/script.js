const colors = ["#231651", "#4DCCBD", "#FF8484"];
const backgroundColor = "#D6FFF6";
const width = window.innerWidth;
const height = window.innerHeight;
const totalFrames = 1000;
let frameCount = 0;
let recording = false;
let recordingStarted = false;
let frameDelta = 0;
let m;
let b;
let particles = [];

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
  let bg = color(backgroundColor);
  background(bg);
}

function draw() {
  frameCount += 1;
  frameDelta = (2 * Math.PI * (frameCount % totalFrames)) / totalFrames;

  let bg = color(backgroundColor);
  background(bg);

  let w = 20;
  let h = 20;
  let space = 10 + sin(frameDelta * 3) * 3;
 let count = 5;

  translate((-w * space) / 2, (-h * space) / 2);

  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      push();

      let delt = frameDelta * 15;
      let s = 2;

      for (let n = 0; n < count; n++) {
        let angle = (2 * PI * n) / count;

        let x = w / 2 + (cos(angle) * w) / 4;
        let y = h / 2 + (sin(angle) * h) / 4;
        let d = dist(i, j, x, y);
        s -= sin(delt + d / 2) * 0.5;
      }

      let z = map(s, 0, 1, 1, 2);
      translate(i * space, j * space, z * 20);

      let _scale = map(s, 0, 1, 1, 1.25);
      scale(_scale);

      let c1 = color(colors[1]);
      let c2 = color(colors[0]);
      let c3 = color(colors[2]);

      let mapped = map(s, 1, 2, 0, 1);
      let colorPct = mapped;

      let c = lerpColor(c3, c2, colorPct);
      if (colorPct > 0.5) {
        let newPct = lerp(colorPct, 0, 0.5, 0, 1);
        c = lerpColor(c2, c1, newPct);
      }
      fill(c);
      noStroke();
      drawShape();

      pop();
    }
  }

  //checkForRecording();
}

function drawShape() {
  beginShape();

  let count = 8;
  for (let i = 0; i < count; i++) {
    let angle = (2 * PI * i) / count;

    let x = sin(angle) * 10;
    let y = cos(angle) * 10;
    vertex(x, y);
  }

  endShape();
  //circle(0, 0, 5);
}

function setGradient(s, c1, c2) {
  // noprotect
  noFill();
  for (var y = 0; y < s.height; y++) {
    var inter = map(y, 0, s.height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    s.stroke(c);
    s.line(0, y, s.width, y);
  }
}

function getPolar(x, y, r, a) {
  // Get as radians
  var fa = a * (Math.PI / 180);

  // Convert coordinates
  var dx = r * Math.cos(fa);
  var dy = r * Math.sin(fa);

  // Add origin values (not necessary)
  var fx = x + dx;
  var fy = y + dy;

  return [fx, fy];
}