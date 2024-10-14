function setup() {
  createCanvas(500, 500);   
  fill(0);
  stroke(60,255,100);
  strokeWeight(2.5);
}

var l = 520, t, speed = 5e-4;
var x, y, z, ph;
var nx = 80, dd;

function draw() {
  t = (Date.now()*speed)%1;
  background(0);
  push();
  translate(width/2,height/2);
  
  for(var a=-20; a<15; a++){
    strokeWeight(map(a,-20,15,2,3));
    beginShape();
    vertex(-l/2,l);
    for(var i=0; i<nx; i++){
      x = map(i,0,nx,-l/2,l/2);
      z = 25*(a+t);
      dd = .00004 *(x*x+z*z);
      ph = 3*dd;
      y = 75*cos(ph-TWO_PI*t)*exp(-dd) + z*.7 + .0004*z*z - 30;
      vertex(x,y);
    }
    vertex(l/2,l);
  endShape(CLOSE);
  }
  
  pop();
}