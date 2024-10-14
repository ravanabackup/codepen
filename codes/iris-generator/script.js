console.clear();

/*--------------------
Setup
--------------------*/
let radius;
let h;
function setup() {
  const cnv = createCanvas(500, 500);
  cnv.id('texture');
  strokeWeight(1);
  noFill();
  radius = width < 450 ? width / 2 - 40 : 200;
  h = Math.floor(random(0, 255));
}


/*--------------------
Generate
--------------------*/
function loopCircle() {
  const r = random(20, 100);
  const x = random(-radius, radius);
  const y = random(-radius, radius);
  const c = color(`hsla(${Math.floor(random(h, h + 20))}, ${random(40, 70)}%, ${random(10, 50)}%, 0.05)`);
  stroke(c);
  const d = dist(x, y, 0, 0);
  if (d < radius && d > radius * 0.6) {
    circle(x, y, r);
  }
}


/*--------------------
Draw
--------------------*/
let time = 0;
function draw() {
  time++;
  if (time < 400) {
    background(0, 1.1);
    frameRate();
    translate(width / 2, height / 2);
    for (let i = 0; i < 40; i++) {
      loopCircle();
    }
  }
}


/*--------------------
Resize
--------------------*/
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  radius = width < 450 ? width / 2 - 40 : 200;
}


/*--------------------
Regenerate
--------------------*/
document.body.addEventListener('click', () => {
  resizeCanvas(windowWidth, windowHeight);
  h = Math.floor(random(0, 255));
  time = 0;
});