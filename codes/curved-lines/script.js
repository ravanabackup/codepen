var canvas,
	ctx,
	width,
	height,
	xCenter,
	yCenter,
	size,
	lines,
	tick;

function rand( min, max ) {
	return Math.random() * ( max - min ) + min;
}

function Line( offset ) {
	this.p1 = { x: 0, y: yCenter };
	this.p2 = { x: size * 0.333, y: yCenter };
	this.p3 = { x: size * 0.666, y: yCenter };
	this.p4 = { x: size, y: yCenter };
	this.offset = offset;
}

Line.prototype.step = function() {
	var base = ( this.offset + tick ) / 60;
	this.p1.x += Math.cos( base ) * ( size / 250 );
	this.p2.x += Math.sin( base ) * ( size / 250 );
	this.p3.x += Math.cos( base ) * ( size / 250 );
	this.p4.x += Math.sin( base ) * ( size / 250 );
	this.p2.y = yCenter + Math.cos( base ) * size / 1;
	this.p3.y = yCenter + Math.sin( base ) * size / 1;
};

Line.prototype.draw = function( i ) {
	ctx.beginPath();
	ctx.moveTo( this.p1.x, this.p1.y );
	ctx.bezierCurveTo(
		this.p2.x,
		this.p2.y,
		this.p3.x,
		this.p3.y,
		this.p4.x,
		this.p4.y
	);
	var alpha = ( 0.55 + ( Math.sin( ( this.offset + tick ) / 20 ) * 0.45 ) );
	if( i % 2 === 0 ) {
		ctx.strokeStyle = 'hsla(' + ( i / 10 ) * 360 + ', 100%, 85%, ' + alpha + ')';
	} else {
		ctx.strokeStyle = 'hsla(0, 0%, 100%, ' + alpha + ')';
	}
	ctx.stroke();
}

function init() {
	canvas = document.getElementById( 'canvas' );
	ctx = canvas.getContext( '2d' );
	lines = [];
	reset();
	loop();
}

function reset() {
	width = window.innerWidth;
	height = window.innerHeight;
	xCenter = width / 2;
	yCenter = height / 2;
	size = Math.min( width, height ) * 0.5;
	lines.length = 0;
	tick = 0;
	canvas.width = width;
	canvas.height = height;
	ctx.lineWidth = 2;
	for( var i = 0; i < 20; i++ ) {
		lines.push( new Line( i * 6 ) );
	}
}

function loop() {
	requestAnimationFrame( loop );
	var i = lines.length;
	while( i-- ) {
		lines[ i ].step();	
	}
	ctx.fillStyle = '#111';
	ctx.fillRect( 0, 0, width, height );
	ctx.save();
	ctx.translate( xCenter, yCenter );
	ctx.rotate( tick / 200 );
	ctx.translate( -xCenter, -yCenter );
	ctx.translate( ( width - size ) / 2, 0 );
	var i = lines.length;
	while( i-- ) {
		lines[ i ].draw( i );	
	}
	ctx.restore();
	tick++;
}

window.addEventListener( 'resize', reset );

init();