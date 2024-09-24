var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext( '2d' ),
    
    repaintAlpha = .1,
    lineWidth = .1,
    radApart = .5,
    accApart = .001,
    jitter = 20,
    gui = new dat.GUI,
    
    bx = -w/2, // boundary min x
    bX = w/2,
    by = -h/2,
    bY = h/2,
    
    mx = Math.random() * 200 - 100,
    my = Math.random() * 200 - 100,
   
    pairs = [],
    frame = 0;

function anim() {
  
  window.requestAnimationFrame( anim );
  
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba( 0, 0, 0, alp )'.replace( 'alp', repaintAlpha );
  ctx.fillRect( 0, 0, w, h );
  ctx.globalCompositeOperation = 'lighter';
  
  ctx.lineWidth = lineWidth;
  
  ++frame;
  
  if( pairs.length < 100 && Math.random() < .3 ) pairs.push( new Pair );
  
  ctx.translate( w/2, h/2 );
  pairs.map( function( pair ) { pair.step(); } );
  ctx.translate( -w/2, -h/2 );
}

function Pair() {
  
  this.reset();
}
Pair.prototype.reset = function() {
  
  var rad = Math.random() * Math.PI * 2,
      acc = Math.random() * .1 + .01,
      radDiff = Math.random() * radApart;
  
  if( Math.random() < .5 ) radDiff *= -1;
  
  this.midRad = rad + radDiff / 2;
  
  this.p1 = new Point( rad, acc );
  this.p2 = new Point( rad + radDiff, acc + Math.random() * accApart );
}
Pair.prototype.step = function() {
  
  if( this.p1.step() && this.p2.step() ) this.reset();
  
  ctx.strokeStyle = 'hsl( hue, 80%, 50% )'.replace( 'hue', this.midRad / ( Math.PI * 2 ) * 360 + frame%360 );
  
  ctx.beginPath();
  ctx.moveTo( this.p1.x |0, this.p1.y |0);
  ctx.quadraticCurveTo( (mx + Math.random() * jitter) |0, (my + Math.random() * jitter) |0, this.p2.x |0, this.p2.y |0);
  ctx.stroke();
}
function Point( rad, acc ) {
  
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.ax = Math.cos( rad ) * acc;
  this.ay = Math.sin( rad ) * acc;
}
Point.prototype.step = function () {
  
  this.x += this.vx += this.ax;
  this.y += this.vy += this.ay;
  
  if( this.x < bx || this.x > bX || this.y < by || this.y > bY )
    return true; // dead check
}

gui.add( window, 'repaintAlpha', 0, 1 );
gui.add( window, 'lineWidth', 0, 1 );
gui.add( window, 'radApart', 0, 3 );
gui.add( window, 'accApart', 0, .05 );
gui.add( window, 'jitter', 0, 40 );

ctx.translate( w/2, h/2 );
for( var i = 0; i < 200; ++i ){
  
 ++frame;
  
 if( pairs.length < 100 && Math.random() < .3 ) pairs.push( new Pair );
  
 pairs.map( function( pair ) { pair.step(); } );
}
ctx.translate( -w/2, -h/2 );
anim();

c.addEventListener( 'click', function( e ) {
  mx = e.clientX - w/2;
  my = e.clientY - h/2;
} );
window.addEventListener( 'resize', function() {
  
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  
  bx = -w/2;
  bX = w/2;
  by = -h/2;
  bY = h/2;
} );