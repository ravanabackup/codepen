var movers = [];
var numberOfMovers;

function setup()
{
  createCanvas(windowWidth, windowHeight);
  numberOfMovers = Math.round(25, 50);
  var rad = numberOfMovers*1;
  for (var i = 0; i < numberOfMovers; i++) {
    var theta = norm(i, 0, numberOfMovers) * TWO_PI;
    movers[i] = new Mover(width/2 + cos(theta) * rad, height/2 + sin(theta) * rad);
  }
  background(10);
}

function draw()
{
  fill(0,10);
 // rect(0, 0, width, height);
 
  updateMovers(0);
  drawLineBeetween(1.15);
}

function drawLineBeetween(mult)
{
   for (var i = 0; i < movers.length; i++) {
     var m0 = movers[i];
     for (var j = 0; j < movers.length; j++) {
       if(i != j){
         var m1 = movers[j];
        var distance = p5.Vector.dist(m0.position, m1.position);
        var minDist = m0.radius + m1.radius;
        if(distance <= minDist * mult)
        {
          var colorInc = 1.0 - norm(distance, minDist, minDist * mult);
          stroke(255, 5);// 255*colorInc);
          line(m0.position.x, m0.position.y, m1.position.x,m1.position.y);
        }
       }
     }
   }
}

function updateMovers(boolDisplay)
{
  var gravity = createVector(0, 0.1);
  for (var i = 0; i < movers.length; i++) {
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


    movers[i].applyForce(friction);
    movers[i].applyForce(gravity);
    movers[i].update();
    movers[i].checkEdges();
    if(boolDisplay == 1)
      { 
        movers[i].display();
      }
  }
}

var Mover = function(x, y) {
  this.mass = random(0.5, 2.5);
  this.radius = random(25, 50);
  this.position = createVector(x,y);
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

  this.display = function() {
    stroke(255);
    noFill();
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
      this.position.y = height-this.radius;
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
      }
  };
};