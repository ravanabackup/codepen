var c = document.createElement( 'canvas' ),
    ctx = c.getContext( '2d' ),
    cw = c.width = 500,
    ch = c.height = 500,
    dotCols = 35,
    dotRows = 35,
    dotXSpacing = ( cw / dotCols ),
    dotYSpacing = ( ch / dotRows ),
    dotRandomSpread = ( ( dotXSpacing + dotYSpacing ) / 2 ) * 0.45,
    dotMinRadius = 1.25,
    dotMaxRadius = 11,
    dots = [],
    tick = 0;

ctx.fillStyle = '#202020';

for( var x = 0; x < dotCols; x++ ) {
  for( var y = 0; y < dotRows; y++ ) {
    var dotx = ( x * dotXSpacing ) + ( dotXSpacing / 2 ) - dotRandomSpread + Math.random() * dotRandomSpread * 2,
        doty = ( y * dotYSpacing ) + ( dotYSpacing / 2 ) - dotRandomSpread + Math.random() * dotRandomSpread * 2,
        dotdx = dotx - ( cw / 2 ),
        dotdy = doty - ( ch / 2 ),
        dotdist = Math.sqrt( dotdx * dotdx + dotdy * dotdy );
    dots.push({
      x: dotx,
      y: doty,
      dist: dotdist,
      radius: dotMinRadius
    });
  }
}

function loop() {
  requestAnimationFrame( loop );
  ctx.clearRect( 0, 0, cw, ch );  
  var i = dots.length;
  ctx.beginPath();
  while( i-- ) {
    var dot = dots[ i ];
    dot.radius = Math.sin( tick / 20 - dot.dist / ( ( dotCols + dotRows ) * 1.5 ) ) * ( dotMinRadius + dotMaxRadius ) * 2;
    ctx.moveTo( dot.x, dot.y );
    ctx.arc( dot.x, dot.y, Math.min( dotMaxRadius, Math.max( dotMinRadius, dot.radius ) ), 0, Math.PI * 2 );
  }
  ctx.fill();
  tick++;
}

document.body.appendChild( c );
loop();