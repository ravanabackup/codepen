var c = document.createElement( 'canvas' ),
    ctx = c.getContext( '2d' ),
    cols = 100,
    rows = 75,
    count = cols * rows,
    size = 4,
    w = cols * size,
    h = rows * size,
    dpr = window.devicePixelRatio,
    sizeDraw = size - 1,
    cells = [],
    tick = 0,
    i, j, cell, neighborCount, x, y;

function init() {
  c.width = w * dpr;
  c.height = h * dpr;
  c.style.width = w + 'px';
  c.style.height = h + 'px';
  ctx.scale(dpr, dpr);
  
  for( i = 0; i < count; i++ ) {
    cells.push( [ 0, 0 ] );
  }
  restart();
}

function restart() {
  ctx.clearRect( 0, 0, w, h );
  for( i = 0; i < count; i++ ) {
    cells[ i ][ 0 ] = Math.round( Math.random() );
  }
  tick = 0;
}

function getNeighborCount( i ) {
  neighborCount = 0;
  for( j = 0; j < 9; j++ ) {
    if( j != 4 ) {
      x = ( i % cols ) - 1 + j % 3;
      y = Math.floor( i / cols ) - 1 + Math.floor( j / 3 );
      if( x >= 0 && x < cols && y >= 0 && y < rows ) {
        if( cells[ y * cols + x ][ 0 ] ) {
          neighborCount++;
        }
      }
    }
  }
  return neighborCount;
}

function step() {
  for( i = 0; i < count; i++ ) {
    cells[ i ][ 1 ] = getNeighborCount( i );
  }
  for( i = 0; i < count; i++ ) {
    cell = cells[ i ];
    if( cell[ 0 ] ) {
      if( cell[ 1 ] < 2 ) {
        cell[ 0 ] = 0;
      } else if( cell[ 1 ] > 3 ) {
        cell[ 0 ] = 0;
      }
    } else {
      if( cell[ 1 ] === 3 ) {
        cell[ 0 ] = 1;
      }
    }
  }
}

function draw() {
  ctx.beginPath();
  for( i = 0; i < count; i++ ) {
    if( cells[ i ][ 0 ] ) {
      ctx.rect( ( i % cols ) * size, ~~( i / cols ) * size, sizeDraw, sizeDraw );
    }
  }
  ctx.fillStyle = 'hsla(0, 0%, ' + ( 0.5 + Math.sin( tick / 100 ) * 0.5 ) * 100 + '%, 0.1)';
  ctx.fill();
}

function loop() {
  requestAnimationFrame( loop );
  step();
  draw();
  tick++;
}

window.addEventListener( 'click', restart );

document.body.appendChild( c );
init();
loop();