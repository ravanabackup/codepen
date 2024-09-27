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
  cols = 55;
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
  rectMode(CENTER);
  var gamma = 0;
  for(var i = 0; i < cols; i++){
    var eta = 0;
    for(var j = 0; j < rows; j++){
      var index = i + j * cols;
      var sinAngle = (beta + sin(i * 0.1 + gamma) + sin(j * 0.1 + eta)) * HALF_PI;
      var noiseAngle = noise((i + gamma) * 0.01, (j + eta) * 0.01, frameCount * 0.01) * TWO_PI;
      var hue = noise((i + gamma) * 0.05, (j + eta)*0.15, frameCount * 0.0075);  
      var x = i * resX;
      var y = j * resY;   
      var center = createVector(x +resX/2, y + resY/2);
      var turbulence = createVector(center.x + cos(sinAngle + noiseAngle) * resX/2, center.y + sin(sinAngle + noiseAngle) * resX/2);     
      if(hue > 0.5){
        push();
        translate(turbulence.x, turbulence.y);
        rotate(sinAngle);
        noStroke();
        stroke(1.0 - hue, 1.0, hue, hue);
        noFill();
        //line(0, 0, 100, 0);
        rect(0,0, hue*resX, hue*resY);
        //ellipse(0,0, hue*resX*0.5, hue*resY*0.5);
        pop();
      }      
      eta += 0.15;
    }
    gamma += 0.15;
  }
  beta += goldenRatio * 0.01;
}