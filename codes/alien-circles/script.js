var s = c.width = c.height = 500,
		ctx = c.getContext( '2d' ),
		
		tick = 0,
		
		radiuses = [ s/6, s/3.5, s/2.5 - 8, s/2.5, s/2.1 - 8, s/2.1 ],
		widths = [ 1, 2 ],
		
		radiuses2 = [ s / 4, s / 3 ],
		heights = [ 5, 10 ],
		
		radSpacing = .05,
		radAdded = .02,
		radSpan = 3,
		slices = radSpan / radSpacing,
		
		diff = s / 2 - s / 4.5,
		baseRadius = s / 5 - 5,
		radiusDecrement = s / 20,
		
		gradient1 = ctx.createLinearGradient( -s/2, -s/2, s/2, -s/2 ),
		gradient2 = ctx.createLinearGradient( -s/2, -s/2, s/2, 0 ),
		gradient3 = ctx.createRadialGradient( 0, 0, 0, 0, 0, radiuses[ 1 ] ),
		
		color1 = 'rgba(243, 69, 208, 0.8)',
		color2 = 'rgba(69, 188, 243, 0.8)',
		color3 = 'rgba(255,255,255,alp)',
		color4 = 'rgba(50, 140, 210, 0.8)';

gradient1.addColorStop( 0, color1 );
gradient1.addColorStop( 1, color2 );

gradient2.addColorStop( 0, color2 );
gradient2.addColorStop( 1, color1 );

gradient3.addColorStop( 0, 'rgba(69, 188, 243, 0)' );
gradient3.addColorStop( .5, 'rgba(69, 188, 243, 0.1)' );
gradient3.addColorStop( 1, color2 );

function anim(){
	
	window.requestAnimationFrame( anim );
	
	++tick
	
	ctx.clearRect( 0, 0, s, s );
	
	ctx.translate( s / 2, s / 2 );
	for( var i = 0; i < radiuses.length; ++i ){
		
		ctx.lineWidth = widths[ i % widths.length ];
		var radius = radiuses[ i ];
		
		ctx.strokeStyle = i % 2 === 0 ? gradient1 : gradient2;
		
		var rotation = ( Math.sin( ( i + tick / 100 ) / radiuses.length * Math.PI * 2 ) ) * Math.PI * 2;
		
		ctx.rotate( rotation );
		ctx.beginPath();
		ctx.arc( 0, 0, radius, 0, Math.PI * 2 );
		ctx.stroke();
		ctx.rotate( -rotation );
	}
	
	
	for( var i = 0; i < radiuses2.length; ++i ){
		
		var beginRadius = radiuses2[ i ],
				endRadius = beginRadius + heights[ i ],
				
				beginRad = Math.sin( ( i + 1 ) * tick / 150 ) * Math.PI * 2 + tick / 100;
		
		for( var j = 0; j < slices; ++j ){

			var proportion = j / slices,
					rad1 = beginRad + radSpacing * j,
					rad2 = beginRad + radSpacing * j + radAdded;

			ctx.fillStyle = color3.replace( 'alp', proportion > .5 ? 1 - proportion : proportion );
			ctx.beginPath();
			ctx.arc( 0, 0, beginRadius, rad1, rad2 );
			ctx.arc( 0, 0, endRadius, rad2, rad1, true );
			ctx.fill();
		}
	}
	
	ctx.lineWidth = 1;
	ctx.strokeStyle = gradient3;
	var rad = Math.sin( tick / 10 ) / 20 + tick / 80,
			x = Math.cos( rad ) * radiuses[ 1 ],
			y = Math.sin( rad ) * radiuses[ 1 ];
	
	ctx.beginPath();
	ctx.moveTo( x, y );
	ctx.lineTo( -x, -y );
	ctx.stroke();
	
	ctx.translate( -s / 2, -s / 2 );
	
	ctx.lineWidth = 1;
	ctx.strokeStyle = color4;
	ctx.beginPath();
	
	var radiant1 = 0,
			radiant2 = 0,
			cx1 = diff,
			cy1 = diff,
			cx2 = diff,
			cy2 = diff;
	
	for( var i = baseRadius; i > 0; i -= radiusDecrement ){
		
		radiant1 += Math.sin( ( i + tick * 2 ) / 80 ) + tick / 20;
		radiant2 += Math.cos( ( i - tick * 2 ) / 40 ) - tick / 40;
		
		cx1 += Math.cos( radiant1 ) * i / 8;
		cx2 += Math.cos( radiant2 ) * i / 8;
		cy1 += Math.sin( radiant1 ) * i / 8;
		cy2 += Math.sin( radiant2 ) * i / 8;
		
		ctx.moveTo( s / 2 + cx1 + i, s / 2 - cy1 );
		ctx.arc( s /2 + cx1, s / 2 - cy1, i, 0, Math.PI * 2 );
		
		ctx.moveTo( s / 2 - cx2 + i, s / 2 + cy2 );
		ctx.arc( s / 2 - cx2, s / 2 + cy2, i, 0, Math.PI * 2 );
	}
	ctx.stroke();
}
anim();