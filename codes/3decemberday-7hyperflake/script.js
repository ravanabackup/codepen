// Renderer
		var renderer = new THREE.WebGLRenderer({canvas:document.getElementById('main'),antialiasing:true});
		renderer.setClearColor(0xffffff);
		renderer.setSize(window.innerWidth,window.innerHeight);

		// Camera
		var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 5000 );
		camera.position.z = 700;

		// Scene
		var scene = new THREE.Scene();

		// Create + init position mesh
		var ammount = 80;
		var cubes = [];
		for (var i = 0; i < ammount; i++) {
		  	var geometry = new THREE.BoxGeometry( 5,(400*Math.random())+50 ,10);
		  	var material = new THREE.MeshPhongMaterial( { color:0x000000} );
		  	var cube = new THREE.Mesh( geometry, material );
		  	scene.add( cube );
		  	cubes.push( cube );	
		  	cube.modifier = Math.random();
		  	cube.rotation.z = cube.modifier * 500;
		  	cube.material.transparent = true;
		  	cube.material.opacity = 1*Math.random();
		}

		  // Render
		  var counter = 0
		  function render(){
		  	counter+=0.3;
		  	for (var i = cubes.length - 1; i >= 0; i--) {
		  		cubes[i].rotation.x += 0.02*cubes[i].modifier; 
		  		cubes[i].rotation.y += 0.02*cubes[i].modifier; 
		  		cubes[i].rotation.z += 0.02*cubes[i].modifier; 
		  	}
		  	scene.rotation.y += 0.003;
		  	scene.rotation.z += 0.003	;
		  	scene.rotation.x += 0.003	;
		  	
		  	camera.lookAt(scene.position);
		  	
		  	renderer.render(scene,camera);
		  	window.requestAnimationFrame(render);
		}

		window.requestAnimationFrame(render);