var cols;
var rows;
var resX;
var resY;
var beta;
var goldenRatio;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1.0, 1.0, 1.0, 1.0);
  var resolution = (width * 1.0) / (height * 1.0);
  cols = 60;
  rows = Math.round(cols/resolution);
  resX = width/cols;
  resY = height/rows;
  beta = 0;
  goldenRatio = 1 + sqrt(5) / 2;
 
  background(0, 0, 0.075);
}

function draw() {
  /*fill(0, 0, 0.075, 0.1);
  noStroke();
  rect(0,0, width, height);*/
 background(0, 0, 0.075);
  
  var gamma = 0;
  for(var i = 0; i < cols; i++){
    var eta = 0;
    for(var j = 0; j < rows; j++){
      var index = i + j * cols;
      var sinAngle = (beta + sin(i * 0.1 + gamma) + sin(j * 0.1 + eta)) * HALF_PI;
      var noiseAngle = noise((i + gamma) * 0.01, (j + eta) * 0.01, frameCount * 0.01) * TWO_PI;
      var hue = noise((i + gamma) * 0.25, (j + eta)*0.15, frameCount * 0.01);  
      var x = i * resX;
      var y = j * resY;   
      var center = createVector(x +resX/2, y + resY/2);
      var turbulence = createVector(center.x + cos(sinAngle) * resX/2, center.y + sin(sinAngle) * resX/2);
      
      
      /*stroke(0, 0, 0.1);
      noFill();
      rect(x, y, resX, resY);
      stroke(hue, 1.0, 1, 1.0);
      line(center.x, center.y, turbulence.x, turbulence.y);*/
      
      noStroke();
      fill(hue, 0.5 + hue, hue, 1.0);
      ellipse(turbulence.x, turbulence.y, resX * pow(hue, 2.5), resY * pow(hue, 2.5));
      eta += 0.15;
    }
    gamma += 0.15;
  }
  beta += goldenRatio * 0.01;
}