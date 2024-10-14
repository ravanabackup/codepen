var cx, cy, circles, laserEmitters;
var currentHue = 0;
var hueSpeed = 0.1;
var currentAlpha = 0;


function setup() {
  frameRate(60);
  colorMode(HSB);
  cx = windowWidth/2;
  cy = windowHeight/2;
  createCanvas(windowWidth, windowHeight, 'webgl');
  background(0);

  circles = [];

  circles.push(new Circle({
    radiusOffset : 0,
    totalParticles: 30,
    minTotalParticles: 20,
    laserRange: 150,
    radius: 200,
  }));

  circles.push(new Circle({
    radiusOffset : 0,
    totalParticles: 10,
    laserRange: 100,
    radius: 120
  }));

  circles.push(new Circle({
    radiusOffset : 0,
    totalParticles: 5,
    laserRange: 80,
    radius: 80
  }));

  circles.push(new Circle({
    radiusOffset : 0,
    totalParticles: 10,
    laserRange: 60,
    radius: 40
  }));

  laserEmitters = [];

  laserEmitters.push(new LaserEmitter({
    primary: true,
    radius: 30,
    speed: 0.1,
    rotationSpeed: 0.01,
    particleRadius: 2,
    rotation: 0.9
  }));

}

function draw() {
  background(0);
  currentHue += hueSpeed;
  if (currentHue > 255 || currentHue <=0) {
    hueSpeed = hueSpeed *-1;
  }

  for (var i = 0; i < circles.length; i++) {    circles[i].update();
  }
 

  for (var i = 0; i < laserEmitters.length; i++) {
    laserEmitters[i].update();
  }
}

function mouseWheel(event) {
  event.preventDefault();
    laserEmitters[0].radius = constrain(event.deltaY+laserEmitters[0].radius, 21, 250);
  
}

var LaserEmitter = function(settings) {
  this.radius = settings.radius || 150;
  this.totalParticles = settings.totalParticles || 10;
  this.particleRadius = settings.particleRadius || 2;
  this.speed = settings.speed || 1;
  this.rotationSpeed = settings.rotationSpeed || 0.01;
  this.rotation = settings.rotation || 0;
  this.primary = settings.primary || false;
  this.setup();
}

LaserEmitter.prototype.setup = function() {
  this.particles = [];
  for (var i = 0; i < this.totalParticles; i++) {
    var angle = i * 2 * Math.PI / this.totalParticles;
    this.particles.push({
      pos: createVector((cx + Math.cos(angle) * this.radius) - this.particleRadius / 2, (cy + Math.sin(angle) * this.radius) - this.particleRadius / 2)
    });
  }
}

LaserEmitter.prototype.randomize = function() {
  this.totalParticles = Math.round(random(3,20));
  this.setup();
}

LaserEmitter.prototype.update = function() {
  this.rotation += this.rotationSpeed;
  this.draw();
}

LaserEmitter.prototype.draw = function() {
  var centerX = mouseX || cx;
  var centerY = mouseY || cy;
  noStroke();
  for (var i = 0; i < this.particles.length; i++) {
    var angle = i * 2 * Math.PI / this.totalParticles + this.rotation;
    this.particles[i].pos = createVector((centerX + Math.cos(angle) * this.radius) - this.particleRadius / 2, (centerY + Math.sin(angle) * this.radius) - this.particleRadius / 2);
    ellipse(this.particles[i].pos.x, this.particles[i].pos.y, this.particleRadius, this.particleRadius);

    for (var a = 0; a < circles.length; a++) {
      strokeWeight(1);
      for (var b = 0; b < circles[a].particles.length; b++) {
        var distance = this.particles[i].pos.dist(circles[a].particles[b].pos);
        var opacity = Math.abs(map(distance, 0, circles[a].laserRange, 200, 0));
        //console.log(opacity);
        stroke(currentHue,255,255, opacity);
        if (distance <= circles[a].laserRange) {
          line(this.particles[i].pos.x, this.particles[i].pos.y, circles[a].particles[b].pos.x, circles[a].particles[b].pos.y);
        }
      }
    }
  }
}

var Circle = function(settings) {
  this.radius = settings.radius || 150;
  this.initialRadius = this.radius;
  this.totalParticles = settings.totalParticles || 20;
  this.maxTotalParticles = settings.maxTotalParticles || settings.totalParticles || 10;
  this.minTotalParticles = settings.minTotalParticles || 5;
  this.particleRadius = settings.particleRadius || 2;
  this.radiusOffset = settings.radiusOffset || 0;
  this.frequency = settings.frequency || 'bass';
  this.laserRange = settings.laserRange || 150;
  this.rOff = 0.0;
  this.setup();
}

Circle.prototype.randomize = function() {
  this.totalParticles = Math.round(random(this.minTotalParticles, this.maxTotalParticles));
  this.laserRange = Math.round(random(50,200));
  this.setup();
}

Circle.prototype.setup = function() {
  this.particles = [];

  for (var i = 0; i < this.totalParticles; i++) {
    var angle = i * 2 * Math.PI / this.totalParticles;
    this.particles.push({
      pos: createVector((cx + Math.cos(angle) * this.radius) - this.particleRadius / 2, (cy + Math.sin(angle) * this.radius) - this.particleRadius / 2)
    });
  }
}

Circle.prototype.update = function() {
  this.draw();
}

Circle.prototype.draw = function() {
  fill(currentHue, 255, 255, 255);
  for (var i = 0; i < this.particles.length; i++) {
    var angle = i * 2 * Math.PI / this.totalParticles;
    this.particles[i].pos = createVector((cx + Math.cos(angle) * this.radius) - this.particleRadius / 2, (cy + Math.sin(angle) * this.radius) - this.particleRadius / 2);
    ellipse(this.particles[i].pos.x, this.particles[i].pos.y, this.particleRadius, this.particleRadius);
  }
}