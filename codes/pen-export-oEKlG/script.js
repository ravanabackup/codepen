window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

// ---------------------

var width, height, prevTime;
var mousePos;
var particleAnimation;
var canvas = document.getElementById('c');
var ctx    = canvas.getContext('2d');

width = window.innerWidth;
height = window.innerHeight;

canvas.width  = width;
canvas.height = height;

// ---------------------

var Point = function(x, y){
  this.x = this.origX = x;
  this.y = this.origY = y;
};

var AnimationPoint = function(ctx, x, y){
  this.ctx = ctx;
  this.x = this.origX = x;
  this.y = this.origY = y;
  
  this.isDraw = true;
};

AnimationPoint.prototype = {
  rad1   : 50,
  theta1 : 0,
  
  rad2   : 100,  
  theta2 : 0,
  
  rad : 3,

  update : function(){
    this.theta1 += .01;
    this.theta2 += .02;
    
    this.x = this.origX + this.rad1 * Math.cos(this.theta1) + this.rad2 * Math.sin(this.theta2);
    this.y = this.origY + this.rad2 * Math.sin(this.theta1);
    
    if(this.isDraw) this.draw();
  },
  
  draw : function(){
    this.ctx.beginPath();
    this.ctx.fillStyle = '#000';
    this.ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.closePath();
  }
};


var ParticleAnimation = function(ctx){
  this.ctx = ctx;
  
  this.gridWid = width / (this.gridNums - 1);
  this.gridHig = height / (this.gridNums - 1);
  
  this.range = this.gridWid * 3;
  
  this.points = [];
  
  for(var _x = 0; _x < this.gridNums; _x++){
    for(var _y = 0; _y < this.gridNums; _y++){
      var posX, posY, particle;
      posX = this.gridWid * _x; posY = this.gridHig * _y;
      particle = new Point(posX, posY)
      this.points.push(particle);
    }
  }
  
  this.animationPt = new AnimationPoint(this.ctx, width/2, height/2);
  
  this.isDraw = true;
};

ParticleAnimation.prototype = {
  gridNums : 21,
  points : [],
  isDraw : false,
  speed : 500,
  
  update : function(){
    
    this.animationPt.update();
    
    for(var i = 0; i < this.points.length; i++){
      var dx, dy, distance;
      var pt = this.points[i];
      
      dx = this.animationPt.x - pt.x;
      dy = this.animationPt.y - pt.y;
      
      distance = Math.sqrt(dx * dx + dy * dy);
      pt.x = (pt.x - (dx / distance) * (this.range / distance) * this.speed) - ((pt.x - pt.origX) / 2);
      
      pt.y = (pt.y - (dy / distance) * (this.range / distance) * this.speed) - ((pt.y - pt.origY) / 2);            
      
      
    }
    
    
    if(this.isDraw) this.draw();
  },
  
  draw : function(){
    this.ctx.strokeStyle = '#fff';
    for(var i = 0; i < this.points.length; i++){
      var pt = this.points[i];
      this.ctx.beginPath();
      this.ctx.moveTo(pt.x, pt.y);
      this.ctx.lineTo(pt.origX - 1, pt.origY);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }
};

// ---------------------


init();
loop();

function init(){
    particleAnimation = new ParticleAnimation(ctx);
    prevTime = +new Date;
}

function loop(){
    var curTime = +new Date;
    var duration = (curTime - prevTime)/1000;
    prevTime = curTime;

    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, width, height);
  
    particleAnimation.update();

    requestAnimationFrame(loop);
}

canvas.addEventListener("mousemove", function (evt) {
  mousePos = {x: evt.clientX, y: evt.clientY};
}, false);