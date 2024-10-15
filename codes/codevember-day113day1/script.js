var renderer = new THREE.WebGLRenderer({canvas:document.getElementById('main'),antialiasing:true});
		renderer.setClearColor(0x000000);
		renderer.setSize(window.innerWidth,window.innerHeight);

		var camera = new THREE.PerspectiveCamera(35,window.innerWidth / window.innerHeight, 0.1, 3000);
		camera.position.x = 200;
		camera.position.y = 150;

		var scene = new THREE.Scene();

		var light = new THREE.AmbientLight(0xffffff,0.5);
		scene.add(light);

		var light1 = new THREE.PointLight(0xffffff,0.8);
		scene.add(light1);

		var meshArray = [];

		var material = new THREE.MeshLambertMaterial( { color: 0x11111f, shading: THREE.FlatShading } );
			
    var t= 0;
		for (var i = 0; i < 50; i++) {
			var geometry = new THREE.BoxGeometry(200*Math.random() +5,200*Math.random()+5,200*Math.random()+5);
			var mesh = new THREE.Mesh(geometry,material);

			mesh.position.x = Math.random() * 500 - 40;
			mesh.position.y = Math.random() * 500 - 40;
			mesh.position.z = Math.random() * 150 - 400;
			mesh.rotation.x = Math.random() * 2;
			mesh.rotation.y = Math.random() * 2;
			mesh.rotation.z = Math.random() * 2;
			mesh.scale.x = Math.random() + 0.5;
			mesh.scale.y = Math.random() + 0.5;
			mesh.scale.z = Math.random() + 0.5;

			scene.add(mesh);
			meshArray.push(mesh);
		}

				
		window.requestAnimationFrame(render);
		function render(){
			for (var i = meshArray.length - 1; i >= 0; i--) {
				var randomNum = Math.floor(Math.random() * 10);
				meshArray[i].rotation.x += 0.005;
				meshArray[i].rotation.y += 0.005;
			}
			renderer.render(scene,camera);
			window.requestAnimationFrame(render);
		}