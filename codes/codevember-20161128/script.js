var resTwoPi;
var originalRadius;
var eta;
var phi;
var oResTwoPi;
var noiseOff;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 1, 1, 1);
  oResTwoPi = 25;
  originalRadius = 50;
  background(0);
  eta = 0;
  phi = 1 + sqrt(5) * 2;
  noiseOff = random(1);
}

function draw() {
  rectMode(CORNER);
  fill(0, 0, 0, 1.0);
  noStroke();
  rect(0, 0, width, height);
  
  var resGrid = 10;
  resTwoPi = oResTwoPi;
  var radius0 = originalRadius;
  var radius1 = 0;
  var alpha = 0;
  eta += phi * 0.0005;
  var noiseRadius = noise(eta, noiseOff, sin(frameCount * 0.05)) * 50;
  noiseOff += 0.005;
  for(var i=0; i<resGrid; i++){    
    var beta = 0;
    radius0 = originalRadius + (originalRadius * i) + (i * 15) * -1 + i * 2.5 + sin((eta + beta) * 10) * 20 + noiseRadius;
    radius1 = originalRadius + (originalRadius * (i+1)) + ((i+1) * 15) * -1;

    var globalHue = noise(i * 0.1, i, frameCount * 0.01);
    var zulu = eta + globalHue;
    var opacity =1.0 -  norm(i, 0, resGrid);
    
    stroke(globalHue * 360, 1.0, opacity * 0.5);
    noFill();
    ellipse(width/2, height/2, radius0 * 2, radius0 * 2);
    ellipse(width/2, height/2, radius1 * 2, radius1 * 2);
    
    for(var j=0; j<resTwoPi; j++){
      var theta = norm(j, 0, resTwoPi + 1) * TWO_PI + zulu;    
      var nextTheta = norm(j+1, 0, resTwoPi + 1) * TWO_PI + zulu;
      
      var x0 = width/2 + cos(theta) * radius0;
      var y0 = height/2 + sin(theta) * radius0;
      var x1 = width/2 + cos(nextTheta) * radius0;
      var y1 = height/2 + sin(nextTheta) * radius0;
      var x2 = width/2 + cos(theta) * radius1;
      var y2 = height/2 + sin(theta) * radius1;
      var x3 = width/2 + cos(nextTheta) * radius1;
      var y3 = height/2 + sin(nextTheta) * radius1;
      
      var hue = noise(i * 0.1 + alpha * 0.01, j * 0.5 + beta * 0.01, frameCount * 0.01);
      var bright = noise(i * 0.01, j * 0.05, frameCount * 0.001);
      var diameter = noise(frameCount * 0.025, i * 0.1 * zulu, j * theta *  0.1);
      if(j%40 == 0){
        stroke(100 + hue * 160, 1.0, opacity * 0.75, opacity * 0.75);
        line(x0, y0, width/2, height/2);  
      }
      if(j%4 == 0){
        stroke(hue * 360, 1.0, opacity * 0.75, opacity * 0.75);
        var lx = lerp(x0, x2, 0.5);
        var ly = lerp(y0, y2, 0.5);
        ellipse(lx, ly, 6, 6);    
      }
      if(diameter > 0.5){
        stroke(100 + hue * 160, 1.0, opacity);
        beginShape(QUADS);
        vertex(x0, y0);
        vertex(x1, y1);
        vertex(x3, y3);
        vertex(x2, y2);
        endShape();
       // line(x0, y0, x1, y1);
      }  
      
      beta += 0.01;
    }
    alpha += 0.01;
    resTwoPi += resTwoPi * 0.4;
  }
}