let d = 1;
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  strokeWeight(2);
  fill(0, 0, 0, 0);
  noFill();
}
function draw() {

  t = frameCount / 100;
  background(255*cos(t/2)*cos(t/2));
  stroke(255*sin(t/2)*sin(t/2));
  rotateX(t);
  rotateY(t);
  rotateZ(t);
  
  d = 1;
   push();
    rotateY(d*cos(t))
    rotateX(d*cos(t))
    box(width / 2 / d, width / 2 / d, width / 2 / d);
    pop();
  for (let i = 0; i < 9; i++) {
    push();
    rotateX(i*sin(t))
    translate(0,0,i*sin(t))
    box(width / 2 / d, width / 2 / d, width / 2 / d);
    pop();
    d = d * (d + 1);
  }
}