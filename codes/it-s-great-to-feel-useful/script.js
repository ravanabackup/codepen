var w = c.width = window.innerWidth,
		h = c.height = window.innerHeight,
		ctx = c.getContext( '2d' ),
		
		opts = {
			
			radius: 200,
			spotRadius: 20,
			colors: 7,
			repetitions: 20,
			lineRadiantProportion: .2,
			
			bgColor: '#222',
			templateColor: 'hsl(hue,80%,50%)',
			
			arcIncrement: 5,
			arcLineWidth: 1.5,
			
			rotSpeed: .001,
			yinRotSpeed: -.002,
			arcOffsetSpeed: .2,
			
			yinColors: [ '#181818', '#eee' ]
		},
		calc = {
			
			doubleRadius: opts.radius * 2,
			halfRadius: opts.radius / 2,
			repetitionRadiant: Math.PI * 2 / opts.repetitions,
			colorRadiant: Math.PI * 2 / opts.repetitions / opts.colors,
			lineRadiant: Math.PI * 2 / opts.repetitions / opts.colors * opts.lineRadiantProportion, 
			
			baseHue: 360 / opts.colors,
			
			cx: w / 2,
			cy: h / 2,
			
			sx: w / 2 - opts.radius,
			sy: h / 2 - opts.radius,
			
			maxRadius: Math.sqrt( w*w/4 + h*h/4 )
		},
		
		rotation = 0,
		yinRotation = 0,
		arcOffset = 0,
		tau = Math.PI * 2;

var yinCanvas = document.createElement( 'canvas' ),
		yinCtx = yinCanvas.getContext( '2d' ),
		
		arcCanvas = document.createElement( 'canvas' ),
		arcCtx = arcCanvas.getContext( '2d' );

yinCanvas.width = yinCanvas.height =
arcCanvas.width = arcCanvas.height = calc.doubleRadius;

function anim(){
	
	window.requestAnimationFrame( anim );
	
	rotation += opts.rotSpeed;
	yinRotation += opts.yinRotSpeed;
	arcOffset += opts.arcOffsetSpeed;
	
	clearCanvases();
	
	drawLines();
	drawArcs();
	drawCanvases();
}

function clearCanvases(){
	
	ctx.fillStyle = opts.bgColor;
	ctx.fillRect( 0, 0, w, h );
	
	yinCtx.clearRect( 0, 0, calc.doubleRadius, calc.doubleRadius );
	arcCtx.clearRect( 0, 0, calc.doubleRadius, calc.doubleRadius );
}
function drawLines(){
	
	for( var i = 0; i < opts.colors; ++i ){
		
		ctx.fillStyle = opts.templateColor.replace( 'hue', calc.baseHue * i );
		ctx.beginPath();
		
		var offset = rotation + calc.colorRadiant * i;
		
		for( var j = 0; j < opts.repetitions; ++j ){
			
			offset += calc.repetitionRadiant;
			
			ctx.moveTo( calc.cx, calc.cy );
			ctx.arc( calc.cx, calc.cy, calc.maxRadius, offset, offset + calc.lineRadiant );
			
		}
		
		ctx.fill();
	}
}

function drawArcs(){
	
	var cx = opts.radius + calc.halfRadius * Math.cos( yinRotation ),
			cy = opts.radius + calc.halfRadius * Math.sin( yinRotation );
	
	arcCtx.beginPath();
	arcCtx.lineWidth = opts.arcLineWidth;
	arcCtx.strokeStyle = opts.yinColors[ 0 ];
	
	var radius = arcOffset % opts.arcIncrement;
	while( radius < opts.radius + calc.halfRadius + opts.arcLineWidth ){
		
		arcCtx.moveTo( cx + radius, cy );
		arcCtx.arc( cx, cy, radius, 0, Math.PI * 2 );
		
		radius += opts.arcIncrement;
	}
	
	arcCtx.stroke();
}
function drawCanvases(){
	
	var dx = calc.halfRadius * Math.cos( yinRotation ),
			dy = calc.halfRadius * Math.sin( yinRotation ),
			cx = opts.radius,
			cy = opts.radius;
	
	yinCtx.fillStyle = opts.yinColors[ 1 ];
	yinCtx.beginPath();
	yinCtx.moveTo( cx + dx * 2, cy + dy * 2 );
	yinCtx.arc( cx, cy, opts.radius, yinRotation, yinRotation + Math.PI );
	yinCtx.arc( cx - dx, cy - dy, calc.halfRadius, yinRotation + Math.PI, yinRotation, true);
	yinCtx.arc( cx + dx, cy + dy, calc.halfRadius, yinRotation, yinRotation + Math.PI, true );
	
	yinCtx.fill();
	
	yinCtx.globalCompositeOperation = 'destination-out';
	yinCtx.beginPath();
	yinCtx.arc( cx + dx, cy + dy, opts.spotRadius, 0, tau );
	yinCtx.fill();
	
	yinCtx.globalCompositeOperation = 'source-over';
	
	var arcImageData = arcCtx.getImageData( 0, 0, calc.doubleRadius, calc.doubleRadius ).data,
			yinImage = yinCtx.getImageData( 0, 0, calc.doubleRadius, calc.doubleRadius ),
			yinImageData = yinImage.data;
	
	for( var i = 3; i < arcImageData.length; i += 4 )
		if( arcImageData[ i ] > 0 && yinImageData[ i ] === 255 ){
			yinImageData[ i ] = 255 - arcImageData[ i ];
		}
	
	yinCtx.putImageData( yinImage, 0, 0 );
	
	yinCtx.beginPath();
	yinCtx.fillStyle = opts.yinColors[ 1 ];
	yinCtx.arc( cx - dx, cy - dy, opts.spotRadius, 0, tau );
	yinCtx.fill();
	
	yinCtx.beginPath();
	yinCtx.lineWidth = opts.arcLineWidth;
	yinCtx.strokeStyle = opts.yinColors[ 0 ];
	
	var radius = arcOffset % opts.arcIncrement;
	
		cx -= dx;
		cy -= dy;
	while( radius < opts.spotRadius + opts.arcLineWidth ){
		
		yinCtx.moveTo( cx + radius, cy );
		yinCtx.arc( cx, cy, radius, 0, Math.PI * 2 );
		
		radius += opts.arcIncrement;
	}
	yinCtx.stroke();
	
	
	ctx.fillStyle = opts.yinColors[ 0 ];
	ctx.beginPath();
	ctx.arc( calc.cx, calc.cy, opts.radius, 0, tau );
	ctx.fill();
	
	ctx.drawImage( yinCanvas, calc.sx, calc.sy );
}

anim();