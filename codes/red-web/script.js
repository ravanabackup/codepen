var c,
	ctx,
	w,
	h,
	mouse,
	mouseMoved,
	cols,
	rows,
	points,
	tick;

function Point( opt ) {
	this.x = opt.x;
	this.y = opt.y;
	this.xBase = this.x;
	this.yBase = this.y;
	this.offset = rand( 0, 1000 );
	this.duration = rand( 20, 60 );
	this.range = rand( 3, 6 );
	this.dir = rand( 0, 1 ) > 0.5 ? 1 : -1;
	this.rad = rand( 2, 4 );
}

Point.prototype.step = function() {
	this.x = this.xBase + this.dir * Math.sin( ( tick + this.offset ) / this.duration ) * this.range;
	this.y = this.yBase + this.dir * Math.cos( ( tick + this.offset ) / this.duration ) * this.range;
	
	var angle = angleTo( this, mouse ); 
	this.x = this.x + Math.cos( angle )	* 100;
	this.y = this.y + Math.sin( angle )	* 100;
};

function rand( min, max ) {
	return Math.random() * ( max - min ) + min;
}

function dist( p1, p2 ) {
	var dx = p1.x - p2.x,
		dy = p1.y - p2.y;
	return Math.sqrt( dx * dx + dy * dy );
}

function angleTo( p1, p2 ) {
	var dx = p1.x - p2.x,
		dy = p1.y - p2.y;
	return Math.atan2( dy, dx );
}

function init() {
	c = document.createElement( 'canvas' );
	ctx = c.getContext( '2d' );
	mouse = { x: 0, y: 0 };
	points = [];
	spacing = 90;
	spread = spacing * 0.25;
	document.body.appendChild( c );
	reset();
	loop();	
}

function reset() {
	w = window.innerWidth;
	h = window.innerHeight;
	c.width = w;
	c.height = h;
	mouse.x = w / 2;
	mouse.y = h / 2;
	mouseMoved = false;
	cols = 0;
	rows = 0;
	points.length = 0;
	tick = 0;
	create();
	
	ctx.strokeStyle = '#f00';
	ctx.lineWidth = 2;
}

function create() {
	for( var x = -spacing / 2; x < w + spacing; x += spacing ) {
		cols++;
		for( var y = -spacing / 2; y < h + spacing; y += spacing ) {
			if( x == -spacing / 2 ) {
				rows++;
			}
			points.push( new Point({
				x: ~~( x + rand( -spread, spread ) ),
				y: ~~( y + rand( -spread, spread ) )
			}));
		}
	}
}

function step() {
	if( !mouseMoved ) {
		mouse.x = w / 2 + Math.cos( tick / 40 ) * 90;
		mouse.y = h / 2 + Math.sin( tick / 40 ) * 90;
	}
	
	points.forEach( function( point ) {
		point.step();
	});
	
	tick++;
}

function draw() {
	ctx.clearRect( 0, 0, w, h );
	
	ctx.beginPath();
	for( var x = 0; x < cols; x++ ) {
		for( var y = 0; y < rows; y++ ) {
			basePoint = points[ x * rows + y ];
			rightPoint = x === cols - 1 ? null : points[ ( x + 1 ) * rows + y ];
			botPoint = y === rows - 1 ? null : points[ x * rows + y + 1 ];
			
			if( rightPoint ) {
				ctx.moveTo( basePoint.x, basePoint.y );
				ctx.lineTo( rightPoint.x, rightPoint.y );
			}
			if( botPoint ) {
				ctx.moveTo( basePoint.x, basePoint.y );
				ctx.lineTo( botPoint.x, botPoint.y );
			}
		}
	}
	ctx.stroke();
	
	ctx.fillStyle = '#000';
	points.forEach( function( point ) {
		ctx.save();
		ctx.beginPath();
		ctx.translate( point.x, point.y );
		ctx.rotate( Math.PI / 4 );
		ctx.rect( -6, -6 , 12, 12 );
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	});
	
	// this needs to be optimized. way too expensive to make each frame.
	var grad = ctx.createRadialGradient( mouse.x, mouse.y, 0, mouse.x, mouse.y, 500 );
	grad.addColorStop( 0, 'hsla(0, 0%, 0%, 0)' );
	grad.addColorStop( 1, 'hsla(0, 0%, 0%, 0.85)' );
	ctx.fillStyle = grad;
	ctx.fillRect( 0, 0, w, h );
}

function loop() {
	requestAnimationFrame( loop );
	step();
	draw();
}

function mousemove( e ) {
	mouseMoved = true;
	mouse.x = e.pageX;
	mouse.y = e.pageY;
}

window.addEventListener( 'resize', reset );
window.addEventListener( 'mousemove', mousemove );

init();