var movers = [];
var numberOfMovers;
var globalradius;
var center;

function setup()
{
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1, 1, 1, 1);
  initMovers();
  background(0, 0, 0.075);
}

function draw()
{
  updateMovers(1);
}

function updateMovers(boolDisplay)
{
  
  var globalvel = createVector(0, 0);
  var gravity = createVector(0, 0.10);
  var mouse = createVector(mouseX, mouseY);
  for (var i = 0; i < movers.length; i++) {
    if(boolDisplay == 1)
      { 
        movers[i].display();
      }
    
    var c = 0.01;
    var normal = 1;
    var frictionMag = c * normal;
    var friction = movers[i].velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(frictionMag);
    
    for(var j = 0; j < movers.length; j++)
      {
        if(j != i)
          {
            movers[i].comparePosition(movers[j]);
          }
      }
    var d = p5.Vector.dist(movers[i].position, center);
    var nradius = noise(sin((i * d) * 0.00015)) * movers[i].oradius;
    movers[i].hue =  noise((i * d) * 0.00005, frameCount * 0.01, sin(frameCount * 0.01));
    movers[i].radius = nradius;
    //movers[i].comparePositionFrom(center, globalradius, 0);
    movers[i].comparePositionFrom(mouse, globalradius, 1);
    movers[i].applyForce(friction);
   // movers[i].applyForce(gravity);
    movers[i].update();
    movers[i].checkEdges();
    globalvel.add(movers[i].velocity);
  }
  
  if(globalvel.mag() <= 0.5){
  background(0, 0, 0.075);
    initMovers();
   }
}

function initMovers()
{
  numberOfMovers = Math.round(150, 200);
  globalradius = 2;//random(150, height/3);
  center = createVector(width/2, height/2);
  for (var i = 0; i < numberOfMovers; i++) {
    var theta = norm(i, 0, numberOfMovers) * TWO_PI;
    movers[i] = new Mover(width/2 + cos(theta) * globalradius/2, height/2 + sin(theta) * globalradius/2, noise(i, sin(theta), tan(theta)));
  }
}

var Mover = function(x, y, hue) {
  this.hue = hue;
  this.sat = random(0.5, 1);
  this.bright = random(0.75, 1);
  this.mass = random(0.95, 1.75);
  this.radius = 4;//random(10, 15);
  this.oradius = this.radius;
  this.position = createVector(x,y);
  this.oposition = createVector(x,y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  
  this.run = function()
  {
    this.update();
    this.checkEdges();
  }

  this.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  };

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };

  this.display = function()
  {
    noStroke();
    fill(this.hue, this.sat, this.bright, 0.025);
    ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2);
  };

  this.checkEdges = function() {
    if (this.position.x > width-this.radius) {
      this.position.x = width-this.radius;
      this.velocity.x *= -1;
    } else if (this.position.x < this.radius) {
      this.velocity.x *= -1;
      this.position.x = this.radius;
    }
    if (this.position.y> height-this.radius ) {
      this.velocity.y *= -1;
      this.position.y =  height-this.radius;//createVector(random(width), this.radius);
    }else if (this.position.y < this.radius) {
      this.velocity.y *= -1;
      this.position.y = this.radius;
    }
  };
  
  this.comparePosition = function(mover)
  {
    var distance = p5.Vector.dist(this.position, mover.position);
    var minDist = this.radius + mover.radius;
    if(distance <= minDist)
      {
        var mainToSecond = p5.Vector.sub(this.position, mover.position);
        mainToSecond.normalize();
        
        this.velocity.add(mainToSecond);
        this.velocity.limit(this.mass);
        /*
        var dir = mainToSecond.copy();
        dir.mult(25);
        dir.add(this.position);
        stroke(0, 0, 1);
        line(this.position.x, this.position.y, dir.x, dir.y);
        */
    }
  };
  
  this.comparePositionFrom = function(target, moverradius, bool)
  {
    var distance = p5.Vector.dist(this.position, target);
    var minDist = moverradius - this.radius;
    if(bool == 0){ 
      if(distance >= minDist){
        var mainToSecond = p5.Vector.sub(target, this.position);
        mainToSecond.normalize();
        this.velocity.add(mainToSecond);
        this.velocity.limit(this.mass);
        /*
        var dir = mainToSecond.copy();
        dir.mult(25);
        dir.add(this.position);
        stroke(0, 1, 1);
        line(this.position.x, this.position.y, dir.x, dir.y);
        */
      }
    }else{
      if(distance <= this.radius){
        var mainToSecond = p5.Vector.sub(this.position, target);
        var nforce = 2 - norm(distance, 0, this.radius);
        mainToSecond.normalize();
        this.velocity.add(mainToSecond);
        this.velocity.limit(nforce * (this.mass * 4));
        /*
        var dir = mainToSecond.copy();
        dir.mult(25);
        dir.add(this.position);
        stroke(0.5, 1, 1);
        line(this.position.x, this.position.y, dir.x, dir.y);
        */
      }
    }
   
  };
};