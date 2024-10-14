function ease(p, g) {
  if (p < 0.5) 
    return 0.5 * pow(2*p, g);
  else
    return 1 - 0.5 * pow(2*(1 - p), g);
}

function setup() {
  createCanvas(540, 540);
  stroke(255,0,0);
  strokeWeight(1.2);
  rectMode(CENTER);
}

var N = 8, de = 55, ee = 5, speed = 4e-5,
    x, y, l, t, tt;

function draw() {
  t = (Date.now()*speed)%1;
  background(250);
  push();
  translate(width/2,height/2);
  fill(32);
  l = 500;
  rect(0,0,l,l);
  for(var i=0; i<N; i++){
    fill(32);
    if(i%2 == 0)
      fill(250);
    l -= de;
    
    tt = (t*(i+1))%1;
    x = constrain(4*tt,0,1) - constrain(4*tt-2,0,1);
    x = lerp(-de/2,de/2,ease(x,ee));
    y = constrain(4*tt-1,0,1) - constrain(4*tt-3,0,1);
    y = lerp(-de/2,de/2,ease(y,ee));
    push();
    translate(x,y);
    rect(0,0,l,l);
  }
  
  for(var i=0; i<N; i++)
    pop();
  
  pop();
}