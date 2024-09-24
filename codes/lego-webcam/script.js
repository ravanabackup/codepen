var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight;
//-
var camera, scene, renderer;
var knot, video, videoTexture;
var now, then = Date.now(), elapsed;
var startTime = then;

// -
var gui,
		guiParams 	= { w: 		1,
										h: 		1,
									 	fps: 	24,
									 	frustum: 1200,
									 	colorize: false,
									 	contrast: 1.0,
									 	
									 	whiteMin: 0.5,
									 	whiteSaturation: 0.5,
									  blackMin: 0.5,
									 	
									 	redMin: 0.0,
									 	redMax: 0.0,
									 	yellowMin: 0.0,
									 	yellowMax: 0.0,
									 	blueMin: 0.0,
									 	blueMax: 0.0,
									 	blueSaturation: 0.0,
									 	screenshot: function(){
												try {
														var imgData = renderer.domElement.toDataURL( 'image/png' );
														saveFile(imgData, 'legocam_screenshot.jpg');
												} catch (e) {
														console.log(e);
														return;
												}
										}
									};
// -
var wCam 				= 1280,
		hCam 				= 1280,
		fpsInterval = 1000,
		sizeBrick 	= 32,
		bricks, shaderMaterial;
var wBrick 			= sizeBrick,
		hBrick 			= sizeBrick;
	
//-
var uniforms = {
		resolution: 	{ type: "v2", value: new THREE.Vector2(1.0, 1.0) },
		texture: 			{ value: null },
		textureShadow: { value: null },
		textureLight: { value: null },
		image: 				{ value: null },
		texture_size: { type: "v2", value: new THREE.Vector2( guiParams.w, guiParams.h ) },
		colorize: 		{ type: "bool", value: guiParams.colorize },
		contrastLevel:{ type: "f", value: guiParams.contrast },

		whiteLimits: 	{ type: "v2", value: new THREE.Vector2( guiParams.whiteMin, guiParams.whiteSaturation ) },
		blackLimits: 	{ type: "f", value: guiParams.blackMin },

		redLimits: { type: "v2", value: new THREE.Vector2( guiParams.redMin, guiParams.redMax ) },
		yellowLimits: { type: "v2", value: new THREE.Vector2( guiParams.yellowMin, guiParams.yellowMax ) },
		blueLimits: { type: "v3", value: new THREE.Vector2( guiParams.blueMin, guiParams.blueMax, guiParams.blueBright ) },
};
//-


//- Data GUI
	gui = new dat.GUI({
		name:				'LegoCam',
		closeOnTop: true,
		closed: 		false
	});
	
	// - Width
	gui.add( guiParams, 'w', 8, 256).name('Number').step(1).listen().onChange(function(){
		guiParams.h = guiParams.w;
		sizeBrick 	= 32 / (guiParams.w/32);
		wBrick = hBrick = sizeBrick;
		uniforms.texture_size.value.x = guiParams.w * wBrick;
		uniforms.texture_size.value.y = guiParams.w * hBrick;
		updateScene();
	}).setValue(64);
	
	// - Frustum
	gui.add( guiParams, 'frustum', 200, 2500).name('Margin (Camera frustum)').step(1).onChange(function(){
		sizeBrick 	= 32 / (guiParams.w/32) * (1200/guiParams.frustum);
		wBrick = hBrick = sizeBrick;
		
		if(camera){
			camera.left 	= guiParams.frustum / - 2;
			camera.right 	= guiParams.frustum / 2;
			camera.top 		= guiParams.frustum / 2;
			camera.bottom = guiParams.frustum / - 2;
			camera.updateProjectionMatrix();
		}
	}).setValue(1200);

	// - FPS
	gui.add( guiParams, 'fps', 1, 60).name('FPS').step(1).onChange(function(){
		 fpsInterval = 1000 / guiParams.fps;
	}).setValue(12);
	
	
	var folderColor = gui.addFolder('Color');
	// - Contrast
	folderColor.add( guiParams, 'contrast', 0.0, 15.0).step(0.00001).name('Contrast').onChange(function(){
		 uniforms.contrastLevel.value = guiParams.contrast;
	}).setValue(0.65);

	// - Colorize
	folderColor.add( guiParams, 'colorize').name('Colorize').onChange(function(){
		 uniforms.colorize.value = guiParams.colorize;
	}).setValue(true);

	// - White limits
	folderColor.add( guiParams, 'whiteMin', 0.0, 1.0).step(0.000001).name('White (min)').onChange(function(){
		 uniforms.whiteLimits.value.x = 1.0 - guiParams.whiteMin;
	}).setValue(0.24);
	folderColor.add( guiParams, 'whiteSaturation', 0.0, 1.0).step(0.000001).name('White (saturation)').onChange(function(){
		 uniforms.whiteLimits.value.y = 1.0 - guiParams.whiteSaturation;
	}).setValue(0.8);
	// - Black limits
	folderColor.add( guiParams, 'blackMin', 0.0, 1.0).step(0.000001).name('Black (min)').onChange(function(){
		 uniforms.blackLimits.value = guiParams.blackMin;
	}).setValue(0.40);
	
	// - Red limits
	folderColor.add( guiParams, 'redMin', 0.0, 360.0).step(0.000001).name('Red (min)').onChange(function(){
		 uniforms.redLimits.value.x = guiParams.redMin;
	}).setValue(41.0);
	folderColor.add( guiParams, 'redMax', 0.0, 360.0).step(0.000001).name('Red (max)').onChange(function(){
		 uniforms.redLimits.value.y = guiParams.redMax;
	}).setValue(240.0);

	// - Yellow limits
	folderColor.add( guiParams, 'yellowMin', 0.0, 360.0).step(0.000001).name('Yellow (min)').onChange(function(){
		 uniforms.yellowLimits.value.x = guiParams.yellowMin;
	}).setValue(50.0);
	folderColor.add( guiParams, 'yellowMax', 0.0, 360.0).step(0.000001).name('Yellow (max)').onChange(function(){
		 uniforms.yellowLimits.value.y = guiParams.yellowMax;
	}).setValue(120.0);

	// - Blue limits
	folderColor.add( guiParams, 'blueMin', 0.0, 360.0).step(0.000001).name('Blue (min)').onChange(function(){
		 uniforms.blueLimits.value.x = guiParams.blueMin;
	}).setValue(139.0);
	folderColor.add( guiParams, 'blueMax', 0.0, 360.0).step(0.000001).name('Blue (max)').onChange(function(){
		 uniforms.blueLimits.value.y = guiParams.blueMax;
	}).setValue(254.0);
	folderColor.add( guiParams, 'blueSaturation', 0.0, 1.0).step(0.000001).name('Blue (saturation)').onChange(function(){
		 uniforms.blueLimits.value.z = guiParams.blueSaturation;
	}).setValue(0.24);

 gui.add(guiParams, 'screenshot').name('Take screenshot');

var center,
		positions, colors, sizes,
		textures = {
			tex: {src:'https://res.cloudinary.com/grooo/image/upload/v1597854531/LegoBrick_yk1wpt.png'},
			overlay: {src:'https://res.cloudinary.com/grooo/image/upload/v1597782474/LegoBrick_light_rlz23e.png'},
			shadow: {src:'https://res.cloudinary.com/grooo/image/upload/v1597782478/LegoBrick_shadow_obrk1c.png'},
			image: {src: null}
		},
		allTextures = [textures.tex, textures.shadow, textures.overlay, textures.image];




//- Cover 
function paintCover(){
	if( !video ){
		var svg = document.getElementById("cover").querySelector("svg");
		var svgData = (new XMLSerializer()).serializeToString(svg);

		var canvasCover = document.createElement("canvas");
		var svgSize = svg.getBoundingClientRect();
		canvasCover.width = svgSize.width;
		canvasCover.height = svgSize.height;
		var ctxCover = canvasCover.getContext("2d");

		var imgCover = document.createElement("img");
		imgCover.setAttribute("src", "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgData))) );
		imgCover.onload = function() {
			if( !video ){
				ctxCover.drawImage(imgCover, 0, 0);
				// -
				textures.image.tex = new THREE.Texture(canvasCover);
				textures.image.tex.needsUpdate = true;
				createScene();
				uniforms.image = { value: textures.image.tex };
			}
		}
	}
}




// - Init
function init() {
	renderer = new THREE.WebGLRenderer({
			antialias: true,
			preserveDrawingBuffer: true /* imprescindible para hacer screenshoots */
		});
	renderer.setPixelRatio( window.devicePixelRatio / 1 );
	$('#container').append( renderer.domElement );
	scene = new THREE.Scene();
	//scene.background = new THREE.Color( 0x222222 );
	//-
	camera = new THREE.OrthographicCamera(guiParams.frustum / - 2, guiParams.frustum / 2, guiParams.frustum / 2, guiParams.frustum / - 2, 10, 1000 );
	//-
	scene.add( new THREE.AmbientLight( 0xffcccc ) );
	//-
	var light1 = new THREE.DirectionalLight( 0xffffff, 1.0 );
	light1.position.set( 0.8, -1, 1 );
	scene.add( light1 );
	//-
	window.addEventListener( 'resize', onWindowResize, false );
	onWindowResize();

	//- Load Textures
	loadTexture( textures.tex );
	loadTexture( textures.shadow );
	loadTexture( textures.overlay );
	
	// - Cover (screenshot)
	paintCover();

	setTimeout(function(){	
		//- Webcam texture
		if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {
			var constraints = { video: { width: wCam, height: hCam, facingMode: 'user' }, audio: false };
			navigator.mediaDevices.getUserMedia( constraints ).then( function ( stream ) {
				video = document.getElementById( 'bgVideo' );
				videoTexture = new THREE.VideoTexture( video );
				video.srcObject = stream;
				video.play();
				// -
				textures.image.tex = videoTexture;
				textures.image.needsUpdate = true;
				createScene();
				uniforms.image = { value: textures.image.tex };
			} ).catch( function ( error ) {
				console.error( 'Unable to access the camera/webcam.', error );
			} );
		} else {
			console.error( 'MediaDevices interface not available.' );
		}
	}, 2000 );
}


//- All textures Loaded?
function loadTexture( _obj ){
	var textureLoader = new THREE.TextureLoader();
	textureLoader.crossOrigin = '';
	textureLoader.load( _obj.src, function( _tex ){
		_obj.tex = _tex;
		//-
		createScene();
	});
}

function isTexturesLoaded( _array ){
	var ok = true;
	$.each( _array, function( index, value ) {
		if( !value.tex ){
			ok = false;
		};
	});
	return ok;
}

//-
function createScene() {
	if( isTexturesLoaded(allTextures) && !bricks ){
		uniforms.texture = { value: textures.tex.tex };
		uniforms.textureShadow = { value: textures.shadow.tex };
		uniforms.textureLight = { value: textures.overlay.tex };
		uniforms.image = { value: textures.image.tex };
	
		//-
		shaderMaterial = new THREE.ShaderMaterial( {
			uniforms:       uniforms,
			vertexShader:   document.getElementById( 'vertexShader' ).textContent,
			fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
			//- blending:   THREE.AdditiveBlending,
			depthTest:      false,
			transparent:    true
		});

		// - 
		bricks = new THREE.Points( new THREE.BufferGeometry(), shaderMaterial );
		bricks.rotateX( THREE.Math.degToRad( -90 ) );
		scene.add( bricks );
		// -
		updateScene();
	}
}

function updateScene(){
	if(bricks){
		//- Geometry
		positions 	= []
		colors 			= [];
		color 			= new THREE.Color( 0xffffff );
		sizes 			= [];
		var i 			= 0, 
				i3 			= 0;
		center = new THREE.Vector2((wBrick *guiParams.w) / 2, (wBrick * guiParams.h) / 2);
		//-
		for ( var y = 0; y <= guiParams.h; y++ ) {
			for ( var x = 0; x <= guiParams.w; x++ ) {
				color = new THREE.Color();
				color.setHSL( ( x / guiParams.w ), 1.0, 0.7 );
				//-
				colors.push(color.r);
				colors.push(color.g);
				colors.push(color.b);
				// -
				positions.push( center.x - (x * wBrick) );
				positions.push( 150.0 );
				positions.push( center.y - (y * hBrick) );
				//-
				sizes[ i ] = sizeBrick;

				//-
				i3 += 3;
				i++;
			}
		}
		//-
		bricks.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );		
		bricks.geometry.setAttribute( 'customColor', new THREE.Float32BufferAttribute( colors, 3 ) );
		bricks.geometry.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ) );
	}
}

//-
function onWindowResize() {
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;
	//-
	if( renderer ){
		camera.updateProjectionMatrix();
		renderer.setSize( HEIGHT, HEIGHT );
		//-
		uniforms.resolution.value.x = renderer.domElement.width;
		uniforms.resolution.value.y = renderer.domElement.height;
	}
}

function animate( time ) {
	requestAnimationFrame( animate );
	now = Date.now();
	elapsed = now - then;
	//-
	if (elapsed > fpsInterval) {
		then = now - (elapsed % fpsInterval);
		// -
		renderer.render( scene, camera );
	}
}

$(document).ready(function(){
	init();
	animate();
});


//- Functions
function saveFile(strData, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = filename;
        link.href = strData;
        link.click();
        document.body.removeChild(link); //remove the link when done
    } else {
        location.replace(uri);
    }
};