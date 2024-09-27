var limit;
var middleX;
var middleY;
var diameter;
var oradius;
var phi;
var eta;

function setup() {
  createCanvas(windowWidth, windowHeight);
  middleX = windowWidth/2;
  middleY = windowHeight/2;
  limit = 4;
  diameter = 4;
  oradius = 150;
  phi = (sqrt(5)+1)/2 ;
  eta = phi;
  phiOff = 1;
  phiInc = 0.01;
  colorMode(HSB, 360, 1, 1, 1);
 background(0);
}

function draw() {
  fill(0, 0, 0, 0.1);
  rect(0, 0, middleX*2, middleY*2);
  noStroke();
  eta+= 0.01;
  var gamma =0;
  for(var j=0; j<4; j++)
  {
    var newRadius = oradius + sin(HALF_PI * j) * 40;
    for(var i=0; i<360/limit; i++)
    {
      var theta = norm(i, 0, 360/limit) * TWO_PI + eta;
      var maxRadius = (newRadius * 0.75 + noise(i * 0.1, j *0.1, theta * 0.5) * oradius * 0.75 + sin(gamma) * oradius*0.15);
      var radius = (cos(theta * 0.65) + cos(theta * 1.25)) * maxRadius;
      var x = middleX + cos(theta) * radius;
      var y = middleY + sin(theta) * radius;
      var newDiameter = diameter/2 + noise(i * 0.1, j *0.1, theta * 0.75) * diameter;
      fill(norm(radius, 0, maxRadius) * 180 + norm(noise(i*0.5, theta*0.75, j), 0, 1)*360, 1, 1);
      ellipse(x, y, newDiameter, newDiameter);
      gamma += phi * 0.5;
    }
  }
}