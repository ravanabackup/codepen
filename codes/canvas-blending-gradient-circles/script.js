var canvas = document.createElement( 'canvas' ),
    canvasgrad = document.createElement( 'canvas' ),
    ctx = canvas.getContext( '2d' ),
    ctxgrad = canvasgrad.getContext( '2d' ),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    parts = [],
    partsMax = 150,
    radiusMin = 50,
    radiusMax = 100,
    PI = Math.PI,
    TWO_PI = PI * 2,
    grad,
    raf;

function rand( min, max ) {
  return min + Math.random() * ( max - min );
}

function Part() {
  this.init();
}

Part.prototype.init = function() {
  this.x = width / 2;
  this.y = height / 2;
  this.radius = rand( radiusMin, radiusMax );
  this.radiusBase = this.radius;
  this.speed = rand( 0, 0 );
  this.accelSpeed = rand( 0.005, 0.06 );
  this.angle = rand( 0, TWO_PI );
  this.accelAngle = 0.01;
  this.life = 0;
  this.decay = -0.0025;
  this.growth = 0.04;
  this.peak = 0;
  this.alpha = 0;
};

Part.prototype.step = function() {
  this.x += Math.cos( this.angle ) * this.speed;
  this.y += Math.sin( this.angle ) * this.speed;
  this.speed += this.accelSpeed;
  this.angle += this.accelAngle;
  
  if( !this.peak ) {
    if( this.life < 1 ) {
      this.life += this.growth;
    } else {
      this.peak = 1;
      this.life = 1;
    }
  } else {
    this.life += this.decay;
  }
  
  this.radius = Math.max( 0.001, this.radiusBase * this.life );
  this.alpha = this.life / 6;
  
  if( ( this.life <= 0 && this.peak ) || this.x - this.radius > width || this.x < -this.radius || this.y - this.radius > height || this.y < -this.radius ) {
    this.init();
  }
};

Part.prototype.draw = function() {
  ctx.globalAlpha = this.alpha;
  ctx.drawImage( canvasgrad, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2 );
};

function init() {
  cancelAnimationFrame( raf );
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  clear();
  parts.length = 0;
  ctx.globalCompositeOperation = 'lighter';
  createGradient();
  document.body.appendChild( canvas );
  loop();
}

function createGradient() {
  canvasgrad.width = radiusMax * 2,
  canvasgrad.height = radiusMax * 2;
  grad = ctxgrad.createRadialGradient( radiusMax, radiusMax, 0, radiusMax, radiusMax, radiusMax );
  grad.addColorStop( 0, 'hsla(330, 70%, 50%, 0.15)' );
  grad.addColorStop( 1, 'hsla(0, 70%, 50%, 0)' );
  ctxgrad.beginPath();
  ctxgrad.arc( radiusMax, radiusMax, radiusMax, 0, TWO_PI );
  ctxgrad.fillStyle = grad;
  ctxgrad.fill();
}

function step() {
  if( parts.length < partsMax ) {
    parts.push( new Part() );
  }
  
  parts.forEach( function( part ) {
    part.step();
  });
}

function clear() {
  ctx.clearRect( 0, 0, width, height );
}

function draw() {
  parts.forEach( function( part ) {
    part.draw();
  });
}

function loop() {
  raf = requestAnimationFrame( loop );
  step();
  draw();
}

init();

window.addEventListener( 'click', init );
window.addEventListener( 'resize', init );