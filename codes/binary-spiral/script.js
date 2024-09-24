var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext( '2d' ),

    tick = 0,

    particles = [],

    maxRadius = Math.sqrt( w*w/4 + h*h/4 );

ctx.font = '12px monospace';

function Particle(){
  
  this.reset();
}
Particle.prototype.reset = function(){
  
  this.radian = Math.random() * Math.PI * 2;
  this.radius = 0;
  this.angSpeed = .05;
  this.incSpeed = 5;

  this.x = this.y = 0;
}
Particle.prototype.step = function(){

  var prevX = this.x,
      prevY = this.y;

  this.radian += this.angSpeed;
  this.radius += this.incSpeed;

  this.x = this.radius * Math.cos( this.radian );
  this.y = this.radius * Math.sin( this.radian );

  var dx = this.x - prevX,
      dy = this.y - prevY,
      len = Math.sqrt( dx*dx + dy*dy );

  for( var i = 0; i <= len; i += 10 ){
      
    var y = prevY + dy * i / len,
        x = prevX + dx * i / len;
    
    var posX = ( x / 10 |0 ) * 10,
        posY = ( y / 10 |0 ) * 10;

		ctx.fillStyle = '#080808';
		ctx.fillRect( w/2 + posX, h / 2 + posY - 9, 10, 10 );
    ctx.fillStyle = 'hsl(hue,80%,50%)'.replace( 'hue', posX / w * 240 + posY / h * 240 + tick );
    ctx.fillText( Math.random() < .5 ? 0 : 1, w/2 + posX, h/2 + posY );
  }

  if( this.radius >= maxRadius )
    this.reset();
}

function anim(){
  
  window.requestAnimationFrame( anim );

  ++tick;

  ctx.fillStyle = 'rgba(20,20,20,.04)';
  ctx.fillRect( 0, 0, w, h );

  if( particles.length < 100 && Math.random() < .3 )
    particles.push( new Particle );

  particles.map( function( particle ){ particle.step(); } );

}
ctx.fillStyle = '#000';
ctx.fillRect( 0, 0, w, h );
anim();

window.addEventListener( 'resize', function(){
  
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  ctx.font = '12px monospace';
	
	ctx.fillStyle = '#000';
	ctx.fillRect( 0, 0, w, h );

  maxRadius = Math.sqrt( w*w/4 + h*h/4 );

})