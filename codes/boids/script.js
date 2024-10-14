/*requestAnimationFrame polyfill  
https://codepen.io/enxaneta/pen/feac0eae1a56efd57f04e1bf75caeb59*/

/* function noise() p5.js
https://codepen.io/enxaneta/pen/7e315d161a8ee073ded48ab5d1669290*/

/* function Vector inspired by p5.js vector class
https://codepen.io/enxaneta/pen/210462e4c2c0a8af6460e09499d6b99b*/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var c = {}
var cw = canvas.width = window.innerWidth;
c.x = cw / 2;
var ch = canvas.height = window.innerHeight;
c.y = ch / 2;
ctx.strokeStyle = "#fff";

var rad = Math.PI / 180;
var fps = 15; // frames per second
var m = c; //mouse
var rid = false;
var sid = false;

var scl = 20;
var increment = .02;
var cols = ~~(cw / scl);
var rows = ~~(ch / scl);
var zoff = 0;

var flowField = [];
var flock = [];

function Cell(x,y,angle){
 this.pos = new Vector(x*scl,y*scl);
 this.angle = angle;
  
  var _x = scl * Math.cos(this.angle);
  var _y = scl * Math.sin(this.angle);
  
  this._pos = new Vector(_x,_y);
  
 this.draw = function(){
   ctx.lineWidth = 1;
   ctx.beginPath()
   ctx.moveTo(this.pos.x, this.pos.y);
   ctx.lineTo(this.pos.x+this._pos.x, this.pos.y+this._pos.y);
   ctx.strokeStyle = "rgba(200,200,200,.6)";
   ctx.stroke();
 }
 
 this.update = function(angle){
   this.angle = angle
   this._pos.x = scl * Math.cos(this.angle);
   this._pos.y = scl * Math.sin(this.angle);
 }
  
}

function buildFlowField() {
  var yoff = 0;

  for (var y = 0; y <= rows; y++) {
    var xoff = 0;
    for (var x = 0; x <= cols; x++) {

      var index = x + y * cols;

      var angle = noise(xoff, yoff, zoff) *  4*Math.PI;
      var cell = new Cell(x, y,angle);
      
      flowField[index] = cell;
      

      xoff += increment;
    }
    yoff += increment;
  }
  //zoff += 0.01;

}

buildFlowField();

function updateFlowField() {
  var yoff = 0;

  for (var y = 0; y <= rows; y++) {
    var xoff = 0;
    for (var x = 0; x <= cols; x++) {

      var index = x + y * cols;

      var angle = noise(xoff, yoff, zoff) *  2*Math.PI*2;
      
      flowField[index].update(angle);
      

      xoff += increment;
    }
    yoff += increment;
  }
  zoff += 0.01;

}

function Boid(x, y) {

  this.pos = new Vector(x, y);
  this.vel = new Vector(2, 0);
  this.acc = new Vector(0, 0);
  this.r = 10;
  this.theta = 0;
  this.maxSpeed = 2;
  this.maxForce = 0.1;
  this.steer = 0;
  
  this.getTarget = function(){
    var index = ~~(this.pos.x/scl) + ~~(this.pos.y/scl) * cols;
 
    var angle = flowField[index].angle;
   
    this.target = this.pos.add(flowField[index]._pos);
  } 
  
   this.getAngle = function() {
    var index = ~~(this.pos.x/scl) + ~~(this.pos.y/scl) * cols;

    this.theta = flowField[index].angle;
  }
   
 
  this.edges = function(i) {

    if ((this.pos.x > cw) || 
        (this.pos.x < 0)  || 
        (this.pos.y > ch) ||
        (this.pos.y < 0)) {
     //flock.splice(i,1);
     //flock.push(new Boid(Math.random()*cw,Math.random()*ch)); 
      this.pos.x = Math.random()* cw;
      this.pos.y = Math.random()* ch;
    }  
  }

   
  this.update = function() {
    
   
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0)
  }


  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.draw = function() {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ddd";
    ctx.fillStyle = "rgba(255,255,255,.5)";
    this.getAngle();
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.theta);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-2 * this.r, -.5 * this.r);
    ctx.lineTo(-2 * this.r, .5 * this.r);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.restore();
  }

}


for( var i = 0; i < 100; i++){
 var boid = new Boid(Math.random()*cw,Math.random()*ch);
 flock.push(boid);
}



  buildFlowField();


function Draw() {
  sid = setTimeout(function() {
    rid = window.requestAnimationFrame(Draw);
    frames++;
  }, 1000 / fps);

  ctx.clearRect(0, 0, cw, ch);
  
updateFlowField();  
for(var i = 0; i < flowField.length; i++){
  
  var cell = flowField[i];
  cell.draw()
}
  
for( var i = 0; i < flock.length;i++){
  var boid = flock[i];
  
  boid.getTarget();
  
  ctx.beginPath();
  ctx.fillStyle = "#f00";
  ctx.fillRect(boid.target.x,boid.target.y,5,5);

  //boid.seek(); 
  boid.update();
  
  boid.edges(i);
  boid.draw();
  
  
  
}

}

requestId = window.requestAnimationFrame(Draw);

function map(n, a, b, _a, _b) {
  var d = b - a;
  var _d = _b - _a;
  var u = _d / d;
  return _a + n * u;
}

function constrain(n, low, high) {
  return Math.max(Math.min(n, high), low);
}

function collision(particles,i) {
   var p = particles[i];
        for (j = i + 1; j < particles.length; j++) {
          var _p = particles[j];
          dx = _p.pos.x - p.pos.x;
          dy = _p.pos.y - p.pos.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var min_dist = 1.5*(p.r + _p.r);

          if (dist < min_dist) {
            var angle = Math.atan2(dy, dx),
                tx = p.pos.x + Math.cos(angle) * min_dist,
                ty = p.pos.y + Math.sin(angle) * min_dist,
                ax = (tx - _p.pos.x) * spring * 0.5, //multiply by half a spring
                ay = (ty - _p.pos.y) * spring * 0.5;
            p.vel.x -= ax;
            p.vel.y -= ay;
            _p.vel.x += ax;
            _p.vel.y += ay;
          }
        }
      }