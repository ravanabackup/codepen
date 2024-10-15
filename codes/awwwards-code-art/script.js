var c = document.createElement( 'canvas' ),
    ctx = c.getContext( '2d' ),
    cw = c.width = 400,
    ch = c.height = 400,			
    mx = 0,
    my = 0,
    trail = [],
    maxTrail = 200,
    mouseDown = false,
    radius = 1,
    speed = 0.4,
    angle = 0,
    arcx = 0,
    arcy = 0,
    growRadius = true,
    seconds = 0,
    milliseconds = 0;

ctx.lineWidth = .1;
ctx.lineJoin = 'round';
  
function rand( min, max ) {
  return Math.random() * ( max - min ) + min;
}

function hitTest( x1, y1, w1, h1, x2, y2, w2, h2 ) {
  return !( x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1 );
}
  
function createPoint( x, y ) {					
  trail.push({
    x: x,
    y: y						
  });
}

function updateTrail() {					
  if( trail.length < maxTrail ) {
    this.createPoint( arcx, arcy );
  }					

  if( trail.length >= maxTrail ) {
    trail.splice( 0, 1 );
  }					
}

function updateArc() {
  arcx = ( cw / 2 ) + Math.sin( angle ) * radius;
  arcy = ( ch / 2 ) + Math.cos( angle ) * radius;					
  var d = new Date();
  seconds = d.getSeconds();
  milliseconds = d.getMilliseconds();
  angle += speed * ( seconds + ( milliseconds / 1000 ) );

  if( radius <= 1 ) {
    growRadius = true;
  } 
  if( radius >= 200 ) {
    growRadius = false;
  }

  if( growRadius ) {
    radius += 1;	
  } else {
    radius -= 1;	
  }
}

function renderTrail() {
  var i = trail.length;					
  ctx.beginPath();
  while( i-- ) {
    var point = trail[ i ],
        nextPoint = ( i == trail.length ) ? trail[ i + 1 ] : trail[ i ],
        c = ( point.x + nextPoint.x ) / 2,
        d = ( point.y + nextPoint.y ) / 2;						
    ctx.quadraticCurveTo( Math.round( arcx ), Math.round( arcy ), c, d );
  }
  ctx.strokeStyle = 'hsl(' + rand( 160, 190 ) + ', ' + rand( 60, 90 ) + '%, ' + rand( 30, 80 ) + '%)';	
  ctx.stroke();
  ctx.closePath();
}		
 
function clear() {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect( 0, 0, cw, ch );					
  ctx.globalCompositeOperation = 'lighter';
}
  
function loop() {
  requestAnimationFrame( loop );
  clear();
  updateArc();
  updateTrail();
  renderTrail();							
}

document.body.appendChild( c );
loop();