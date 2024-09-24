var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext( '2d' ),
    
    pointCount = 30,
    lineSplits = 30,
    jitter = 1.5,
    lineWidth = 10,
    repaintAlpha = .07,
    
    gui = new dat.GUI,
    
    tick = 0,
    mouse = {
      x: w/2,
      y: h/2
    };

gui.add( window, 'pointCount', 1, 100 );
gui.add( window, 'lineSplits', 2, 100 );
gui.add( window, 'jitter', 0, 3 );
gui.add( window, 'lineWidth', 0, 20 );
gui.add( window, 'repaintAlpha', 0, 1 );

ctx.fillStyle = '#222';
ctx.fillRect( 0, 0, w, h );

function anim() {
  
  window.requestAnimationFrame( anim );
  
  ++tick;
  tick %= 360;
  
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(0,0,0,alp)'.replace( 'alp', repaintAlpha );
  ctx.fillRect( 0, 0, w, h );
  ctx.globalCompositeOperation = 'lighter';
  
  for( var i = 0; i < pointCount; ++i ) {
    
    var x = Math.random() * w,
        y = Math.random() * h,
        dx = -( mouse.x - x ) / lineSplits,
        dy = -( mouse.y - y ) / lineSplits;
        
    if( Math.abs( dx ) + Math.abs( dy ) > 1 )
      for( var j = 0; j < lineSplits; ++j ) {

        var jit = jitter * j,
            x2 = x + dx * j + Math.random() * jit - jit / 2,
            y2 = y + dy * j + Math.random() * jit - jit / 2;

        ctx.strokeStyle = 'hsla( hue, 80%, 50%, .5 )'
          .replace( 'hue', ( x + y ) / ( w + h ) * 360 + tick );
        ctx.lineWidth = j / lineSplits * lineWidth;

        ctx.beginPath();
        ctx.moveTo( x, y );
        ctx.lineTo( x2, y2 );
        ctx.stroke();

        x = x2;
        y = y2;

        if( x > w || x < 0 || y > h || y < 0 ) j = lineSplits
      }
  }
}

anim();

c.addEventListener( 'click', function( e ) {
  
  mouse.x = e.clientX;
  mouse.y = e.clientY;
} );
window.addEventListener( 'resize', function() {
  
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  
  ctx.fillStyle = '#222';
  ctx.fillRect( 0, 0, w, h );
  
  mouse.x = w / 2;
  mouse.y = h / 2;
} );