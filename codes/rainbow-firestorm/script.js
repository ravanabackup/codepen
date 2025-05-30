/*/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

Vars

=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=*/

var c = document.createElement( 'canvas' ),
    ctx = c.getContext( '2d' ),
    dpr = window.devicePixelRatio,
    w = 600,
    h = 400,
    clearStyle = 'hsla(0, 0%, 0%, 0.3)',
    particles = [],
    particleCount = 500,
    particlePath = 6,
    pillars = [],
    pillarCount = 60,
    pillarGrowth = 0.5,
    pillarReduction = 0.1,
    pillarStyle = 'hsla(0, 0%, 8%, 0.3)',
    hue = 0,
    hueRange = 60,
    hueChange = 1,
    gravity = 0.175,
    lineWidth = 1,
    lineCap = 'butt',
    PI = Math.PI,
    TWO_PI = PI * 2,
    lastTime = Date.now(),
    currentTime = Date.now(),
    deltaTime = 0,
    raf = null;

c.width = w * dpr;
c.height = h * dpr;
ctx.scale(dpr, dpr);

/*/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

Utility

=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=*/

function rand( min, max ) {
  return Math.random() * ( max - min ) + min;
}

function distance( a, b ) {
  var dx = a.x - b.x,
      dy = a.y - b.y;
  return Math.sqrt( dx * dx + dy * dy );
}

/*/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

Particle

=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=*/

function Particle( opt ) {
  this.path = [];
  this.reset();
}

Particle.prototype.reset = function() {
  this.radius = 1;
  this.x = rand( 0, w );
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.hit = 0;
  this.path.length = 0;
};

Particle.prototype.step = function() {
  this.hit = 0;

  this.path.unshift( [ this.x, this.y ] );
  if( this.path.length > particlePath ) {
    this.path.pop();
  }

  this.vy += (gravity / 16) * deltaTime;

  this.x += (this.vx / 16) * deltaTime;
  this.y += (this.vy / 16) * deltaTime;

  if( this.y > h + 10 ) {
    this.reset();
  }

  var i = pillarCount;
  while( i-- ) {
    var pillar = pillars[ i ];
    if( distance( this, pillar ) < this.radius + pillar.renderRadius ) {
      this.vx = -( pillar.x - this.x ) * rand( 0.01, 0.03 );
      this.vy = -( pillar.y - this.y ) * rand( 0.01, 0.03 );
      pillar.radius -= pillarReduction;
      this.hit = 1;
    }
  }
};

Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.moveTo( this.x, ~~this.y );
  for( var i = 0, length = this.path.length; i < length; i++ ) {
    var point = this.path[ i ];
    ctx.lineTo( point[ 0 ], ~~point[ 1 ] );
  }
  ctx.strokeStyle = 'hsla(' + rand( hue + ( this.x / 3 ), hue + ( this.x / 3 ) + hueRange ) + ', 50%, 30%, 0.6)';
  ctx.stroke();

  if( this.hit ) {
    ctx.beginPath();
    ctx.arc( this.x, this.y , rand( 1, 15 ), 0, TWO_PI );
    ctx.fillStyle = 'hsla(' + rand( hue + ( this.x / 3 ), hue + ( this.x / 3 ) + hueRange ) + ', 80%, 15%, 0.1)'
    ctx.fill();
  }
};

/*/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

Pillar

=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=*/

function Pillar() {
  this.reset();
}

Pillar.prototype.reset = function(){
  this.radius = rand( 50, 100 );
  this.renderRadius = 0;
  this.x = rand( 0, w );
  this.y = rand( h / 2 - h / 4, h );
  this.active = 0;
};

Pillar.prototype.step = function() {
  if( this.active ) {
    if( this.radius <= 1 ) {
      this.reset();
    } else {
      this.renderRadius = this.radius;
    }
  } else {
    if( this.renderRadius < this.radius ) {
      this.renderRadius += (pillarGrowth / 16) * deltaTime;
    } else {
      this.active = 1;
    }
  }
};

Pillar.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc( this.x, this.y, this.renderRadius, 0, TWO_PI, false );
  ctx.fill();
};

/*/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

Init

=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=*/

function init() {
  ctx.lineWidth = lineWidth;
  ctx.lineCap = lineCap;

  var i = pillarCount;
  while( i-- ){
    pillars.push( new Pillar() );
  }

  document.querySelector('.scene').appendChild( c );
  loop();
}

/*/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

Step

=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=*/

function step() {
  lastTime = currentTime;
  currentTime = Date.now();
  deltaTime = currentTime - lastTime;
  
  hue += (hueChange / 16) * deltaTime;

  if( particles.length < particleCount ) {
    particles.push( new Particle() );
  }

  var i = particles.length;
  while( i-- ) {
    particles[ i ].step();
  }

  i = pillarCount;
  while( i-- ) {
    pillars[ i ].step();
  }
}

/*/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

Draw

=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=*/

function draw() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = clearStyle;
  ctx.fillRect( 0, 0, w, h );
  
  i = pillarCount;
  ctx.fillStyle = pillarStyle;
  while( i-- ) {
    pillars[ i ].draw();
  }
  
  ctx.globalCompositeOperation = 'lighter';
  var i = particles.length;
  while( i-- ) {
    particles[ i ].draw();
  }
}

/*/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

Loop

=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=*/

function loop() {
  raf = window.requestAnimationFrame( loop );
  step();
  draw();
}

/*/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

Page Visibility

=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=*/

document.addEventListener('visibilitychange', () => {
  lastTime = Date.now();
  currentTime = Date.now();
  deltaTime = 0;

  window.cancelAnimationFrame(raf);

  if (document.visibilityState === 'visible') {
    loop();
  }
});

/*/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

Blast Off

=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=*/

init();