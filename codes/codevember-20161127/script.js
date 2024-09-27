var resTwoPi;
var originalRadius;
var eta;
var phi;
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1, 1, 1, 1);
  resTwoPi = 20;
  originalRadius = 50;
  background(0);
  eta = 0;
  phi = 1 + sqrt(5) * 2;
}

function draw() {
  rectMode(CORNER);
  fill(0, 0, 0, .25);
  noStroke();
  rect(0, 0, width, height);
  
  var resGrid = 10;
  resTwoPi = 20;
  var radius = originalRadius;
  var alpha = 0;
  eta += phi * 0.0005;
  for(var i=0; i<resGrid; i++){
    radius = originalRadius + (originalRadius * i) + (i * 15) * -1;
    var beta = 0;
    var zulu = eta + noise(i * 0.1, i, frameCount * 0.01);
    for(var j=0; j<resTwoPi; j++){
      var theta = norm(j, 0, resTwoPi + 1) * TWO_PI + zulu;
      var x = width/2 + cos(theta) * radius;
      var y = height/2 + sin(theta) * radius;
      var hue = noise(i * 0.1 + alpha * 0.01, j * 0.5 + beta * 0.01, frameCount * 0.01);
      var gamma = hue * TWO_PI + theta;
      var diameter = noise(frameCount * 0.025, i * 0.1 * hue, j * 0.1);
      if(diameter > 0.35){
        push();
        translate(x, y);
        rotate(theta);
        fill(hue, 1, 1);
        rectMode(CENTER);
        //line(0, -10, 0, 10);
        ellipse(0, 0, originalRadius * 0.25 * pow(diameter, 1.5), originalRadius * 0.25 * pow(diameter, 1.5))
        //rect(4, 0, originalRadius * 0.005 * (i * 1.0), originalRadius * 0.25 * (i * 0.15));
       // rect(-4, 0, originalRadius * 0.005 * (i * 1.0), originalRadius * 0.25 * (i * 0.15));
        pop();
      }
      
      beta += 0.01;
    }
    alpha += 0.01;
    resTwoPi += resTwoPi * 0.25;
  }
}