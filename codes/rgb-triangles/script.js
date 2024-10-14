function setup() {
  createCanvas(750, 600);
  colorMode(HSB,3);
  noStroke();
}

var t, speed = 3e-4;
var r = 40;
var N = 6, M = 8;
var sp = 2*r*.866, x, y;
var wavelength = 300;

function draw() {
  t = (Date.now()*speed)%1;
  background(0);
  push();
  blendMode(SCREEN);
  translate(width/2,height/2);
  for(var i=-N; i<=N; i++){
    for(var j=-M; j<=M; j++){
      for(var a=0; a<3; a++){
        x = i*sp;
        y = j*.866*sp;
        if(j%2 != 0)
           x += .5*sp;
        fill(a,3,3);
        push();
        translate(x,y);
        scale(cos(TWO_PI*t + TWO_PI*a/3 - dist(x,y,0,0)/wavelength));
        triangle(0,-r,r*.866,r*.5,-r*.866,r*.5);
        pop();
      }
    }
  }
  pop();
}