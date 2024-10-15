// Renderer
		var renderer = new THREE.WebGLRenderer({canvas:document.getElementById('main'),antialiasing:true});
		renderer.setClearColor(0x000000);
		renderer.setSize(window.innerWidth,window.innerHeight);

		// Camera
		var camera = new THREE.PerspectiveCamera(55,window.innerWidth / window.innerHeight, 0.1, 6000);
		camera.position.x = 0;
		camera.position.y = 100;

		// Scene
		var scene = new THREE.Scene();

		// Light
		var light = new THREE.AmbientLight(0xffffff,0.5);
		scene.add(light);
		var light1 = new THREE.PointLight(0xffffff,0.5);
		scene.add(light1);

		
		// Material
		var material = new THREE.MeshLambertMaterial( { 
			color: 0xfc001f, 
			shading: THREE.FlatShading 
		} );
	
			
		// Geometry
		var meshArray = [];
		var r = Math.random;

		function generateCube(){
			var size = r();
			var geometry = new THREE.BoxGeometry(1, 1, 1);
			var mesh = new THREE.Mesh(geometry,material);
			mesh.position.x = 0;
			mesh.position.y = -50;
			mesh.position.z = r() * 150 - 400;
			return mesh
		}
				
		window.requestAnimationFrame(render);

		var spawnCount = 0;
		var spawnTime = 1;

		function render(){
			spawnCount++;
			if(spawnCount == spawnTime){
				var mesh = generateCube();
				scene.add(mesh);
				mesh.angle = 0;
				mesh.angleMultiplier = (0.02 * r()) + 0.02;
				mesh.angleGoingDown = false;
				mesh.spiralCounter = 0;
				mesh.spiralMultiplier = (0.02 * r()) + 0.1;
				meshArray.push(mesh);
				spawnCount = 0;
			}

			for (var i = meshArray.length - 1; i >= 0; i--) {
				meshArray[i].rotation.x += 0.05;
				meshArray[i].rotation.y += 0.005;

				meshArray[i].scale.x += 0.8 * meshArray[i].spiralMultiplier;
				meshArray[i].scale.y += 0.8 * meshArray[i].spiralMultiplier;
				meshArray[i].scale.z += 0.8 * meshArray[i].spiralMultiplier;

				meshArray[i].position.x +=  ( Math.cos(meshArray[i].angle) * meshArray[i].spiralCounter) / 5 ;
				meshArray[i].position.z +=  ( Math.sin(meshArray[i].angle) * meshArray[i].spiralCounter) / 5;
				meshArray[i].position.y += 0.7;

				meshArray[i].angle += meshArray[i].angleMultiplier;
				meshArray[i].spiralCounter += meshArray[i].spiralMultiplier;
			}
			renderer.render(scene,camera);
			window.requestAnimationFrame(render);
		}