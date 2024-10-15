var canvas = document.createElement( 'canvas' ),
    ctx = canvas.getContext( '2d' ),
    fl = 300,
    colors = [
      [ 0, 70, 20, 1 ],
      [ 220, 70, 20, 1 ]
    ],
    count = 300,
    points = [],
    tick = 0,
    width, height, bounds;

function rand( min, max ) {
    return Math.random() * ( max - min ) + min;
}

function resetPoint( p ) {
  p.x = Math.sin(tick / 5) * -100;
  p.y = Math.cos(tick / 5) * 100;
  p.z = 600 + Math.cos(tick / 13) * 400;
  p.vx = Math.sin( tick / 11 ) * 20 + rand( -5, 5 );
  p.vy = Math.cos( tick / 17 ) * 20 + rand( -5, 5 );
  p.vz = Math.cos( tick / 23 ) * 20 + rand( -5, 5 );
  p.s = 0;
  p.sx = 0;
  p.sy = 0;
  p.r = rand( 10, 60 );
  p.sr = 0;
  p.color = colors[ Math.floor( rand( 0, colors.length ) ) ].slice(0);
  p.life = 1;
  p.decay = 0.02;
  return p;
}

function update() {
  if( points.length < count ) {
    points.push( resetPoint( {} ) );
  }
  var i = points.length;
  while( i-- ) {
    var p = points[ i ];
    p.x += p.vx;
    p.y += p.vy;
    p.z += p.vz;
    p.life -= p.decay;
    p.color[ 3 ] = p.life / 10;
    if( 
      p.sx - p.sr > bounds.x.max ||
      p.sy - p.sr > bounds.y.max ||
      p.z > bounds.z.max ||
      p.sx + p.sr < bounds.x.min ||
      p.sy + p.sr < bounds.y.min ||
      p.z < bounds.z.min ||
      p.life <= p.decay
    ) {
      resetPoint( p );
    }
  }
}

function render() {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'hsla(0, 0%, 0%, 0.1)';
  ctx.fillRect( -width / 2, -height / 2, width, height );
  ctx.globalCompositeOperation = 'lighter';
  var i = points.length;
  while( i-- ) {
    var p = points[ i ];    
    p.s = fl / ( fl + p.z );
    p.sx = p.x * p.s;
    p.sy = p.y * p.s;
    p.sr = p.r * p.s;
    ctx.save();
    ctx.translate( p.sx, p.sy );
    ctx.scale( p.s, p.s );
    ctx.beginPath();
    ctx.arc( 0, 0, p.r, 0, Math.PI * 2, false );
    ctx.fillStyle = 'hsla(' + p.color[ 0 ] + ', ' + p.color[ 1 ] + '%, ' + p.color[ 2 ] + '%, ' + p.color[ 3 ] + ')';
    ctx.fill();
    ctx.restore();
  }
}

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  bounds = {
      x: { min: -width / 2, max: width / 2 },
      y: { min: -height / 2, max: height / 2 },
      z: { min: -300, max: 2000 }
  };
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate( width / 2, height / 2 );
}

function loop() {
  requestAnimationFrame( loop );
  update();
  render();
  tick++;
}

window.addEventListener( 'resize', resize );
document.body.appendChild( canvas );
resize();
loop();