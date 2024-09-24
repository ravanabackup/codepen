var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext( '2d' ),
    
    opts = {
      
      particleCount: 40,
      particleSpeed: -2,
      particleAngularSpeed: .03,
      particleRayBehaviourProb: .05,
      particleCircleBehaviourProb: .01,
      
      connectionCount: 10,
      connectionLife: 10,
      connectionAddedLife: 10,
      connectionSplits: 3,
      connectionJitter: 5,
      connectionSpanMultiplier: .2, // relative to length
      
      repaintAlpha: .1,
      tickSpeed: 1,
      
      cx: w / 2,
      cy: h / 2
    },
    
    tick = 0,
    first = true,
    particles = [];
    
function init() {
  
  if( first ){
    
    first = false;
    
    // spawn only a few, to get something for the preview
    // but not all of them at once
    for( var i = 0; i < Math.min( opts.particleCount, 10 ); ++i )
      particles.push( new Particle );
    
    loop();
    
  } else {
    
    particles.map( function( particle ) { particle.reset(); } );
  }
}

function loop(){
  
  window.requestAnimationFrame( loop );
  
  step();
  draw();
}
function step() {
  
  tick += opts.tickSpeed;
  
  if( particles.length < opts.particleCount && Math.random() < .1 )
    particles.push( new Particle );
  
  particles.map( function( particle ) { particle.step(); } );
}
function draw() {
  
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(0,0,0,alp)'.replace( 'alp', opts.repaintAlpha );
  ctx.fillRect( 0, 0, w, h );
  ctx.globalCompositeOperation = 'lighter';
  
  particles.map( function( particle ) { particle.draw(); } );
}

function Particle() {
  
  this.connections = [];
  for( var i = 0; i < opts.connectionCount; ++i )
    this.connections.push( {} );
  
  this.reset();
}
Particle.prototype.reset = function() {
  
  // spawn particles on edges and calculate radiant coordinates
  if( Math.random() < .5 ){
    
    this.x = Math.random() * w;
    this.y = Math.random() < .5 ? 0 : h;
    
  } else {
    
    this.x = Math.random() < .5 ? 0 : w;
    this.y = Math.random() * h;
  }
  
  var dx = this.x - opts.cx,
      dy = this.y - opts.cy;
  
  this.rad = Math.atan( dy / dx );
  if( dx < 0 ) this.rad += Math.PI;
  
  this.cos = Math.cos( this.rad );
  this.sin = Math.sin( this.rad );
  
  this.len = Math.sqrt( dx*dx + dy*dy );
  
  this.behaviour = 'ray';
  
  // reset connections
  for( var i = 0; i < this.connections.length; ++i )
    this.resetConnection( i );
  
  this.hasDied = false;
}
Particle.prototype.step = function() {
  
  if( this.behaviour === 'ray' ) {
    
    this.len += opts.particleSpeed;
    
    if( this.len < 0 )
      this.hasDied = true;
    
    if( Math.random() < opts.particleCircleBehaviourProb )
      this.behaviour = 'circle';
    
  } else {
    
    this.rad += opts.particleAngularSpeed;
    this.cos = Math.cos( this.rad );
    this.sin = Math.sin( this.rad );
    
    if( Math.random() < opts.particleRayBehaviourProb )
      this.behaviour = 'ray';
  }
  
  this.x = opts.cx + this.cos * this.len;
  this.y = opts.cy + this.sin * this.len;
  
  for( var i = 0; i < this.connections.length; ++i ){
    
    --this.connections[ i ].life;
    if( this.connections[ i ].life < 0 )
      this.resetConnection( i );
  }
}
Particle.prototype.draw = function() {
  
  if( this.hasDied ) return this.reset();
  
  ctx.strokeStyle = 'hsl(hue,80%,50%)'.replace( 'hue', this.rad / Math.PI * 180 + tick );
  ctx.lineWidth = .1;
  
  for( var i = 0; i < this.connections.length; ++i ) {
    
    var conn = this.connections[ i ],
        sdx = ( conn.x - this.x ) / opts.connectionSplits,
        sdy = ( conn.y - this.y ) / opts.connectionSplits,
        x = this.x,
        y = this.y;
    
    for( var j = 0; j < opts.connectionSplits; ++j ){
      
      ctx.beginPath();
      ctx.moveTo( x, y );
      
      x = this.x + sdx * j + Math.random() * opts.connectionJitter * ( Math.random() < .5 ? 1 : -1 );
      y = this.y + sdy * j + Math.random() * opts.connectionJitter * ( Math.random() < .5 ? 1 : -1 );
      
      ctx.lineTo( x, y );
      ctx.stroke();
    }
  }
  
  if( this.behaviour === 'circle' ) {
    
    ctx.strokeStyle = 'white';
    ctx.lineWidth = .01;
    
    ctx.beginPath();
    ctx.arc( opts.cx, opts.cy, this.len, 0, Math.PI * 2 );
    ctx.stroke();
  }
  
}
Particle.prototype.resetConnection = function( i ) {
  
  this.connections[ i ].x = this.x +
    ( Math.random() < .5 ? -1 : 1 ) * Math.random() * opts.connectionSpanMultiplier * this.len;
  this.connections[ i ].y = this.y +
    ( Math.random() < .5 ? -1 : 1 ) * Math.random() * opts.connectionSpanMultiplier * this.len;
  
  this.connections[ i ].life = opts.connectionLife + Math.random() * opts.connectionAddedLife;
}
init();