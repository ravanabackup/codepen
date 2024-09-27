var resTwoPi;
var originalRadius;
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1, 1, 1, 1);
  resTwoPi = 20;
  originalRadius = 50;
  background(0);
}

function draw() {
  rectMode(CORNER);
  fill(0, 0, 0, 0.15);
  noStroke();
  rect(0, 0, width, height);
  
  var resGrid = 10;
  resTwoPi = 20;
  var radius = originalRadius;
  var alpha = 0;
  for(var i=0; i<resGrid; i++){
    radius = (originalRadius * i) + (i * 15) * -1;
    var beta = 0;
    for(var j=0; j<resTwoPi; j++){
      var theta = norm(j, 0, resTwoPi + 1) * TWO_PI;
      var x = width/2 + cos(theta) * radius;
      var y = height/2 + sin(theta) * radius;
      var hue = noise(i * 0.1 + alpha * 0.01, j * 0.5 + beta * 0.01, frameCount * 0.01);
      var gamma = hue * TWO_PI;
      push();
      translate(x, y);
      rotate(gamma);
      fill(hue, 1, 1);
      rectMode(CENTER);
      rect(4, 0, originalRadius * 0.005 * (i * 1.0), originalRadius * 0.25 * (i * 0.15));
      rect(-4, 0, originalRadius * 0.005 * (i * 1.0), originalRadius * 0.25 * (i * 0.15));
     // rect(0, 0, originalRadius * 0.5 * (i * 0.15), originalRadius * 0.01 * (i * 1.0));
      pop();
      beta += 0.01;
    }
    alpha += 0.01;
    resTwoPi += resTwoPi * 0.25;
  }
}