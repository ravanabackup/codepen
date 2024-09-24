var w = c.width = window.innerWidth,
		h = c.height = window.innerHeight,
		ctx = c.getContext( '2d' ),
		
		opts = {
			
			side: 50,
			sizeConst: .4,
			distMult: 1,
			sizeDistMult: .3,
			frameMult: 1,
			alpha: .1,
			boostProb: .03,
			boostValue: 1,
			
			cx: w / 2,
			cy: h / 2
		},
		
		tiles = [],
		tick = 0;

function init() {
	
	tiles.length = 0;
	for( var i = -opts.side/2; i < w; i += opts.side )
		for( var j = -opts.side/2; j < h; j += opts.side )
			tiles.push( new Tile( i, j ) );
	
	if( tick === 0 )
		loop();
}
function loop() {
	
	window.requestAnimationFrame( loop );
	
	++tick;
	
	tiles.map( function( tile ){ tile.step(); } );
}
function Tile( x, y ){
	
	this.x = x + opts.side / 2;
	this.y = y + opts.side / 2;
	
	this.assignCenter();
} 
Tile.prototype.assignCenter = function() {
	
	var dx = opts.cx - this.x,
			dy = opts.cy - this.y;
	
	this.dist = Math.sqrt( dx*dx + dy*dy );
	
	this.size = opts.side;
	this.sizeIncrement = opts.side / ( this.dist * opts.sizeDistMult ) * opts.sizeConst;
}
Tile.prototype.step = function() {
	
	this.size -= this.sizeIncrement;
	if( Math.random() < opts.boostProb ) this.size -= opts.boostValue;
	if( this.size < 0 ) this.size = opts.side;
	
	ctx.fillStyle = 'hsla(hue,80%,50%,alp)'.replace( 'hue', tick * opts.frameMult + this.dist * opts.distMult ).replace( 'alp', opts.alpha );
	ctx.fillRect( this.x - this.size / 2, this.y - this.size / 2, this.size, this.size );
}
init();

window.addEventListener( 'click', function( e ){
	
	opts.cx = e.clientX;
	opts.cy = e.clientY;
	
	tiles.map( function( tile ){ tile.assignCenter(); } );
});
window.addEventListener( 'resize', function(){
	
	w = c.width = window.innerWidth;
	h = c.height = window.innerHeight;
	
	opts.cx = w / 2;
	opts.cy = h / 2;
	
	init();
})