var w = c.width = window.innerWidth,
		h = c.height = window.innerHeight,
		ctx = c.getContext( '2d' ),
		
		opts = {
			rows: 10,
			cols: 40,
			spacing: 10,
			focalLength: 400,
			vanishPoint: {
				x: w / 2,
				y: h / 2
			},
			templateColor: 'hsla(hue,80%,50%,alp)',
			rotWaveIncrement: .02,
			rotWaveMultiplier: .6,
			depth: 200,
			maxDist: 350,
		},
		rot = {
			wave: 0,
			cos: 1,
			sin: 0
		};

function anim(){
	
	window.requestAnimationFrame( anim );
	
	
		
  var startX = -opts.cols * opts.spacing / 2,
		  endX = opts.cols * opts.spacing / 2,
		  spanX = endX - startX,
		  startZ = -opts.rows * opts.spacing / 2,
		  endZ = opts.rows * opts.spacing / 2;
	
	ctx.fillStyle = 'black';
	ctx.fillRect( 0, 0, w, h );
	
	rot.wave += opts.rotWaveIncrement;
	var radiant = Math.sin( rot.wave ) * opts.rotWaveMultiplier;
	rot.cos = Math.cos( radiant );
	rot.sin = Math.sin( radiant );
	
	for( var x = startX; x < endX; x += opts.spacing ){
		for( var z = startZ; z < endZ; z += opts.spacing ){
			
			var rx = x * rot.cos - z * rot.sin, // rotatedX
					rz = z * rot.cos + x * rot.sin + opts.depth,
					d = Math.sqrt( rx*rx + rz*rz ), // distance
					scale = opts.focalLength / rz,
			    sx = opts.vanishPoint.x + rx * scale; // screenX
			
			ctx.lineWidth = ( 1 - d / opts.maxDist ) * 3;
			ctx.strokeStyle = opts.templateColor.replace( 'hue', x / spanX * 360 ).replace( 'alp', 1 - d / opts.maxDist );
			ctx.beginPath();
			ctx.moveTo( sx, 0 );
			ctx.lineTo( sx, h );
			ctx.stroke();
		}
	}
}
anim();

window.addEventListener( 'resize', function(){
	
	w = c.width = window.innerWidth;
	h = c.height = window.innerHeight;
	
	opts.vanishPoint.x = w / 2;
	opts.vanishPoint.y = h / 2;
});
for( var opt in opts ){
	var p = document.createElement( 'p' ),
			input = document.createElement( 'input' ),
			shouldPush = true;
	switch( typeof opts[ opt ] ){
		case 'string': 
			input.setAttribute( 'type', 'text' );break;
		case 'number':
			input.setAttribute( 'type', 'range' );
			input.setAttribute( 'min', 0 );
			input.setAttribute( 'max', opts[ opt ] * 3 ); break;
		default: shouldPush = false;
	}
	if( shouldPush ){
		input.setAttribute( 'value', opts[ opt ] );
		p.appendChild( input );
		p.appendChild( document.createTextNode( opt ) );
		controls.appendChild( p );
		input.addEventListener( 'change', (function( opt, input ){
			 return typeof opts[ opt ] === 'string' ? function(){
				  opts[ opt ] = input.value || 'hsla(hue,80%,50%,alp)';
			 } : function(){
				  var result = Number( input.value );
				  result = parseFloat( result );
				  opts[ opt ] = result;
			 }
		})( opt, input ))
	}
}
dispControls.addEventListener( 'click', function(){
	controls.classList.toggle( 'hidden' );
})