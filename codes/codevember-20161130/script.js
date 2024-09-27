var resTwoPi;
var resGrid ;
var origin;
var minRadius;
var maxRadius;
var noiseRadius = [];
var phi;
var alphaNoise;
var betaNoise;
var eta;
var nx;
var ny;
var elementList = [];
 
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1, 1, 1, 1);
  resTwoPi = 60;
  resGrid = 10;
  origin = createVector(width/2, height/2);
  nx = origin.x;
  ny = origin.y
  minRadius = 10;
  maxRadius = 250 - minRadius;
  eta = random(TWO_PI);
  phi = 1 + sqrt(5) * 2;
  alphaNoise = random(PI); 
betaNoise = random(TWO_PI); ;
  animateNoise();
  
  background(0);
}

function draw() {
  fill(0, 0, 0, 0.65);
  noStroke();
  rect(0,0,width, height);
  animateNoise();
  eta += phi * 0.0001 + (noise(frameCount * 0.1) * TWO_PI / 100);
 /* origin.x = width/2 + noise(nx) * maxRadius;
  origin.y = height/2 + noise(ny) * maxRadius;
  nx += 0.0025;
  ny += 0.0015;*/
  updateElementList();
  noStroke();
  noFill();
  
  stroke(0,0,1);
  for(var i=0; i<elementList.length - resGrid - 1; i++){
    var index0 = i;
    var index1 = i+1;
    var index2 = i+ resGrid;
    var index3 = i+ resGrid+1;
    
    var vert0 = elementList[index0];
    var vert1 = elementList[index1];
    var vert2 = elementList[index2];
    var vert3 = elementList[index3];
    
    var hue = noise(i * 0.01, vert0.x * 0.025, vert0.y * 0.025) * 0.25 +
        noise(i * 0.015, vert1.x * 0.015, vert1.y * 0.015) * 0.25 +
        noise(i * 0.02, vert2.x * 0.035, vert2.y * 0.015) * 0.25 + 
        noise(i * 0.005, vert3.x * 0.005, vert3.y * 0.005) * 0.25;
    
    var opacity = noise(i*0.001, (vert0.x * vert1 . x) * 0.00001, frameCount * 0.001);
        
    stroke(hue ,  0.75 + opacity * 0.25, opacity, opacity);
    beginShape(TRIANGLES);
    vertex(vert0.x, vert0.y);
    vertex(vert2.x, vert2.y);
    vertex(vert1.x, vert1.y);
    vertex(vert1.x, vert1.y);
    vertex(vert2.x, vert2.y);
    vertex(vert3.x, vert3.y);
    endShape(CLOSE);
  };
}

function animateNoise(){
  for(var i=0; i<resTwoPi; i++){
    var theta = norm(i, 0, resTwoPi) * TWO_PI;
    if(i < resTwoPi-1){
      noiseRadius[i] = noise(betaNoise, alphaNoise, sin(theta)) * maxRadius;   
    }
    else{
      noiseRadius[i] = noiseRadius[0];
    }
    alphaNoise += 0.00001;
  }
  betaNoise += 0.01;
}

function updateElementList(){
    for(var i=0; i<resGrid; i++){
    var inci = norm(i, 0, resGrid)
    var min = noise(i, frameCount * 0.01) * minRadius;
    var max = noise(frameCount * 0.001) * maxRadius;
    var radius = min + inci * max + (1 + sin(i * frameCount * 0.015)) * (25/2);
    for(var j=0; j<resTwoPi; j++){
      var theta = norm(j, 0, resTwoPi-1) * TWO_PI + eta;
     
      var x = origin.x + cos(theta) * (radius + noiseRadius[j] * inci);
      var y = origin.y + sin(theta) * (radius + noiseRadius[j] * inci);
      var index = i + j * resGrid;
      elementList[index] = createVector(x, y);
    }
  }  
}