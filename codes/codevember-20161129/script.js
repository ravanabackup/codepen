var resTwoPi;
var originalRadius;
var kapa;
var kapaRadius;
var eta;
var phi;
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1, 1, 1, 1);
  resTwoPi = 20;
  originalRadius = 50;
  kapa = 0;
  kapaRadius = 25;
  eta = 0;
  phi = 1 + sqrt(5) * 2;
  background(0);
}

function draw() {
  background(0);
  
  var resGrid = 12;
  resTwoPi = 2;
  var radius = originalRadius;
  var alpha = 0;
  eta += phi * 0.0005;
  noStroke();
  for(var i=0; i<resGrid; i++){
    var newKapaRadius = kapaRadius - pow(i, 3) * 0.05 ;
    radius = (originalRadius * i) + (i * 15) * -1 + newKapaRadius - sin(kapa) * newKapaRadius;
    var beta = 0;
    kapa += 0.001;
    var zulu = eta + noise(i * 0.1, pow(i, 4) * 0.005, frameCount * 0.01);
    var rtp = Math.round(resTwoPi * i);
    var opacity = 1.0 - norm(i, 0, resGrid);
    for(var j=0; j<rtp; j++){
      var theta = norm(j, 0, rtp) * TWO_PI + zulu;
      var x = width/2 + cos(theta) * radius;
      var y = height/2 + sin(theta) * radius;
      var hue = noise(i * 0.1 + alpha * 0.01, j * 0.5 + beta * 0.01, frameCount * 0.01);
      var gamma = hue * TWO_PI;
      push();
      translate(x, y);
      rotate(theta);
      fill(hue, 1, 1, opacity * 1.5);
      rectMode(CENTER);
     // rect(4, 0, originalRadius * 0.005 * (i * 1.0), originalRadius * 0.25 * (i * 0.15));
      //rect(-4, 0, originalRadius * 0.005 * (i * 1.0), originalRadius * 0.25 * (i * 0.15));
      rect(0, 0, originalRadius * (0.5 + sin(kapa * i * 0.1) * 0.5), originalRadius * 0.05 * i *0.1);
      pop();
      beta += 0.01;
    }
    alpha += 0.01;
    resTwoPi += resTwoPi * 0.25;
  }
}