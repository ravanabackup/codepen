var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext( '2d' ),
    
    opts = {
      
      text: 'codepen',
      font: '16px Verdana',
      lineHeight: 18,
      lineWidth: false, // to be defined later, or you can use a fixed amount if you change it now
      
      hueSpeed: 2,
      lightsParTick: 3,
      repaintAlpha: .04
    },
    
    width, tick = 0;

ctx.font = opts.font;
if( !opts.lineWidth )
  opts.lineWidth = ctx.measureText( opts.text ).width + 1;

ctx.fillStyle = '#0c0c0c';
ctx.fillRect( 0, 0, w, h );

function loop(){
  
  window.requestAnimationFrame( loop );
  
  ++tick;
  
  ctx.fillStyle = 'rgba(0,0,0,alp)'.replace( 'alp', opts.repaintAlpha );
  ctx.fillRect( 0, 0, w, h );
  
  var xs = ( w / opts.lineWidth + 1 ) |0,
      ys = ( h / opts.lineHeight + 1 ) |0;
  
  for( var i = 0; i < opts.lightsParTick; ++i ){
    
    var x = ( Math.random() * xs ) |0,
        y = ( Math.random() * ys ) |0;
    
    ctx.fillStyle = 'hsl(hue,80%,50%)'.replace( 'hue', ( tick + x + y ) * opts.hueSpeed );
    ctx.fillText( opts.text, x * opts.lineWidth, y * opts.lineHeight );
  }
}
loop();

window.addEventListener( 'resize', function(){
  
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  
  ctx.font = opts.font;
  
  ctx.fillStyle = '#0c0c0c'
  ctx.fillRect( 0, 0, w, h );
});
c.addEventListener( 'click', function(){
  
  opts.text = prompt( 'what text would you like to be inserted?' );
  
  opts.lineWidth = ctx.measureText( opts.text ).width + 3;
})