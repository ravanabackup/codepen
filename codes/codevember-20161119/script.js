var movers = [];
var cols;
var rows;
var resX;
var resY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1.0, 1.0, 1.0, 1.0);
  var resolution = (width * 1.0) / (height * 1.0);
  cols = 50;
  rows = Math.round(cols/resolution);
  resX = width/cols;
  resY = height/rows;
  for(var i = 0; i < cols; i++){
  var theta = 0;
    for(var j = 0; j < rows; j++){
      var index = i + j * cols;
      var x = i * resX + resX/2;
      var y = j * resY + resY/2;
      var emx = i * resX;
      var eMx = i * resX + resX;
      var emy = j * resY;
      var eMy = j * resY + resY;
      movers[index] = new Mover(x, y, noise(i*0.1, j*0.1, theta), emx, eMx, emy, eMy);
      theta += 0.01;
    }
  }
  background(0, 0, 0.075);
}

function draw() {
  /*fill(0, 0, 0.075, 0.1);
  noStroke();
  rect(0,0, width, height);*/
  background(0, 0, 0.075);
  var globalGravity = createVector(0, 0.1);
  var globalWind = createVector(0.1, 0.0);
  noStroke();
  var gamma = 0;
  drawLines();
  for(var i = 0; i < cols; i++){
    var eta = 0;
    for(var j = 0; j < rows; j++){
      var index = i + j * cols;
      
      var noiseGravity = -1 + noise((i + gamma) * 0.01, (j + eta)*0.01, frameCount * 0.01) * 2;
      var noiseWind = -1 + noise((j + gamma) * 0.01, (i + eta) * 0.01, frameCount * 0.0075) * 2;
      var hue = noise((i + gamma) * 0.25, (j + eta)*0.15, frameCount * 0.01);  
      var x = i * resX;
      var y = j * resY;
      var gravity = createVector(0, noiseGravity);
      var wind = createVector(noiseWind * 0.5, 0);
      var c = 0.01;
      var normal = 1;
      var frictionMag = c * normal;
      var friction = movers[i].velocity.copy();
      friction.mult(-1);
      friction.normalize();
      friction.mult(frictionMag);
      eta += 0.25;
      
      movers[index].hue = hue;
      movers[index].applyForce(gravity);
      movers[index].applyForce(wind);
      movers[index].applyForce(friction);
      movers[index].update();
      movers[index].checkDefinedEdges();
      //movers[index].display();
      
      
      stroke(0, 0, 0.1);
      noFill();
      //rect(x, y, resX, resY);
      //stroke(0, 0, 1, 0.5);
      //var center = createVector(x +resX/2, y + resY/2);
      //line(center.x, center.y, center.x + wind.x * resX, center.y + gravity.y * resY);
    }
    gamma += 0.1;
  }
}

function drawLines(){
  for(var i = 0; i < cols; i++){
      for(var j = 0; j < rows; j++){
        var ij = i + j * cols;
        var neiLeft = (i-1) + j * cols;
       // var neiRight = (i+1) + j * cols;
        var neiTop = i + (j-1) * cols;
       // var neiBottom = i + (j+1) * cols;
        
        var m0 = movers[ij].position;
       
        stroke(noise(i * 0.1, j * 0.1, frameCount*0.01), 1.0, 1.0);
        if(i>0){ 
          var m1 = movers[neiLeft].position;  
          line(m0.x, m0.y, m1.x, m1.y);
        }
        if(j>0){
          var m3 = movers[neiTop].position;
          line(m0.x, m0.y, m3.x, m3.y);
        }
      }
  }
}

var Mover = function(x, y, hue, emx, eMx, emy, eMy) {
  this.hue = hue;
  this.sat = random(0.5, 1);
  this.bright = random(0.75, 1);
  this.mass = random(0.95, 1.75);
  this.radius = random(4, 10);
  this.oradius = this.radius;
  this.position = createVector(x,y);
  this.oposition = createVector(x,y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.edgeMinX = emx;
  this.edgeMinY = emy;
  this.edgeMaxX = eMx;
  this.edgeMaxY = eMy;
  
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
    fill(this.hue, this.sat, this.bright);
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
  
  this.checkDefinedEdges = function() {
    if (this.position.x > this.edgeMaxX - this.radius) {
      this.position.x = this.edgeMaxX-this.radius;
      this.velocity.x *= -1;
    } else if (this.position.x < this.edgeMinX + this.radius) {
      this.velocity.x *= -1;
      this.position.x = this.edgeMinX + this.radius;
    }
    if (this.position.y> this.edgeMaxY - this.radius ) {
      this.velocity.y *= -1;
      this.position.y =  this.edgeMaxY - this.radius;
    }else if (this.position.y < this.edgeMinY + this.radius) {
      this.velocity.y *= -1;
      this.position.y = this.edgeMinY + this.radius;
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