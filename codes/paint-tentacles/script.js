var w = c1.width = c2.width = window.innerWidth,
    h = c1.height = c2.height = window.innerHeight,
    ctx1 = c1.getContext('2d'),
    ctx2 = c2.getContext('2d'),
    
    constAmount = ((w*h)/8000)|0,
    minSpeed = 5,
    maxSpeed = 7,
    minSize = 20,
    maxSize = 30,
    
    frame = 0,
    count1 = 0,
    count2 = 0,
    circles = [];

function Circle(){
 	if(count1 >= count2){
    this.ctx = ctx2;
    this.count = 2;
    ++count2;
  } else {
    this.ctx = ctx1;
    this.count = 1;
    ++count1;
  }
  this.color = 'hsla(f, 80%, 50%, alp)'.replace('f', ((frame/1.8)%360)|0).replace('alp', (Math.random()/2)+.5);
  this.size = Math.random() * (maxSize - minSize) + minSize;
  this.pos = Math.random() < w/(w+h) ?
  {
    x: Math.random() * w,
    y: -this.size
  } : {
    x: -this.size,
    y: Math.random() * h
  }
  this.rad = Math.random() * (Math.PI/2 - .5) + .5;
  this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
  this.vel = {
    x: Math.cos(this.rad) * this.speed,
    y: Math.sin(this.rad) * this.speed
  }
  
  this.shadowFrame = Math.random();
}
Circle.prototype.update = function(){
  this.shadowFrame += (1/this.size)*4;
  this.rad += .1;
  this.vel.x -= Math.cos(this.rad)/3;
  //this.vel.y += Math.sin(this.rad)/30;
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;
}
Circle.prototype.draw = function(){ 
  var ctx = this.ctx;
  ctx.fillStyle = this.color;
  ctx.shadowColor = this.color;
  ctx.shadowBlur = (this.size*2) * Math.abs(Math.sin(this.shadowFrame));
  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI*2);
  ctx.fill();
  ctx.closePath();
}
function anim(){
  window.requestAnimationFrame(anim);
  
  update();
}

function update(){
  ++frame;
  
  for(var i = 0; i < circles.length; ++i){
    var circ = circles[i];
    circ.update();
    circ.draw();
    
    if(circ.pos.x - circ.size > w ||
       circ.pos.y - circ.size > h ||
       circ.pos.x + circ.size < 0 ||
       circ.pos.y + circ.size < 0){
      
      if(circ.count === 1) --count1;
      else --count2;
      
      circles[i] = new Circle;
    }
  }
}

for(var n = 0; n < constAmount; ++n){
  var circ = new Circle();
  circ.pos.x = Math.random() * w;
  circ.pos.y = Math.random() * h;
  circles.push(circ);
}
for(var i = 0; i < constAmount; ++i){
  update();
}

anim();