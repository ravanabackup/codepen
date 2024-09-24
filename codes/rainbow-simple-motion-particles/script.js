var w = c.width = window.innerWidth,
		h = c.height = window.innerHeight,
		ctx = c.getContext( '2d' ),
		
		fx = function( t ){
			
			return w / 2 + w / 3 * Math.sin( t )
		},
		fy = function( t ){
			
			return h / 2 + h / 3 * Math.sin( 2 * t );
		},
		
		count = 100,
		tick = 0;

function anim(){
	
	window.requestAnimationFrame( anim );
	
	tick += .02;
	
	ctx.fillStyle = 'rgba(0,0,0,.1)';
	ctx.fillRect( 0, 0, w, h );
	
	for( var i = 0; i < count; ++i ){
		
		var rapport = i / count;
		ctx.fillStyle = 'hsl(hue,80%,50%)'.replace( 'hue', rapport * 360 );
		ctx.beginPath();
		ctx.arc( fx( tick + rapport * Math.PI * 2 ), fy( tick + rapport * Math.PI ), 2, 0, Math.PI * 2 );
		ctx.fill();
	}
}
ctx.fillStyle = '#111'
ctx.fillRect( 0, 0, w, h );
anim();

window.addEventListener( 'resize', function(){
	w = c.width = window.innerWidth;
	h = c.height = window.innerHeight;
	ctx.fillStyle = '#111'
	ctx.fillRect( 0, 0, w, h );
})