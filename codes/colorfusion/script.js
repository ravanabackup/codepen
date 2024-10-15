var theta = 0 ,sz = 0, frms = 600;
var num = 250, _min, _max;

function setup() {
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB,num,100,100,100);
  _min = width/15;
  _max = width/10;
}

function draw() {
  background(0);
  noStroke();
  for (var i=0; i<num; i++) {
    fill(i,90,100,25);
    var offSet = TWO_PI/num*i;
    var y = map(sin(theta+offSet), -1, 1, height*.2, height*.8);
    var x = map(sin(theta-offSet), -1, 1, width*.2, width*.8);
    var sz = map(sin(theta+offSet*3), -1, 1, _min, _max);
    ellipse(x, y, sz*1.5, sz);
  }
  theta += TWO_PI/frms;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}