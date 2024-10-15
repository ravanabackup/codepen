window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

var c = document.getElementById( 'c' ),
    cw = c.width = 500,
    ch = c.height = 300,
    ctx = c.getContext( '2d' ),
    cols = [],
    range = 30,
    baseline = ch - range,
    deviation = 2,
    tick = 0;

function random( min, max ) {
	return Math.random() * ( max - min ) + min;
}

function initCols() {
  for( var i = 0; i < cw; i++ ) {
    if( i === 0 ) {
      cols.push( random( baseline - range, baseline + range) );
    } else {      
      var colPrev = cols[ i - 1 ],
          colNew = colPrev + random( -deviation, deviation );
      if( colNew > ch ) {
        colNew = ch;
      } else if( colNew < baseline - range ) {
        colNew = baseline - range;
      }
      cols.push( colNew );
    }
  }
}

function updateCols() {
  for( var i = 0; i < cw; i++ ) {
    var colNew;
    
    if( i === 0 ) {
      colNew = cols[ i ] + random( -deviation, deviation );
    } else {
      var colOld = cols[ i ],
          colPrev = cols[ i - 1 ];
      colNew = colPrev + random( -deviation, deviation );
      if( Math.abs( colNew - colOld ) > deviation ) {
        colNew = ( colNew + colOld ) / 2;
      }
    }
    
    if( colNew > ch ) {
      colNew = ch;
    } else if( colNew < baseline - range ) {
      colNew = baseline - range;
    }
      
    cols[ i ] = colNew;    
  }
}

function render() {   
  var imageData = ctx.getImageData( 0, 0, cw, ch );
  ctx.putImageData( imageData, 0, -1 );  
  for( var i = 0; i < cw; i++ ) {
    var lightness = 60 - ( 50 * ( ( ch - cols[ i ] ) / ( range * 2 ) ) );
    ctx.fillStyle = 'hsl(' + ( tick / 6 ) + ', 70%, ' + lightness + '%)';
    ctx.fillRect( i, cols[ i ], 1, ch - cols[ i ] );
  }
}

function loop() {
  requestAnimFrame( loop );
  updateCols();
  render();
  tick++;
}

initCols();
loop();