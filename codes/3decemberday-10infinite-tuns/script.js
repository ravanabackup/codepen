var renderer = new THREE.WebGLRenderer({canvas:document.getElementById('main'),antialiasing:true});
		renderer.setClearColor(0x000000);
		renderer.setSize(window.innerWidth,window.innerHeight);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		renderer.gammaInput = true;
		renderer.gammaOutput = true;

		// Scene
		var scene = new THREE.Scene();
		scene.fog = new THREE.FogExp2( 0x000000, 0.001 );

		// Camera
		var camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.z = 0;
		scene.add( camera );

		// Light
		var light = new THREE.PointLight( 0xffffff, 3,3000 );
		light.position.z = 100;
		scene.add( light );

		// Geo
		var geoTunnel = createGeo(30, 212, 200, 100);
		var mshTunnel1 = createMesh(geoTunnel);
		var mshTunnel2 = createFlashMesh(geoTunnel);

		scene.add(mshTunnel1);
		scene.add(mshTunnel2);

		var cameraTravelIncrement   = 0.0001;
		var cameraRotationIncrement = 0.0025;
		var cameraTravelledStep = 1;
	    var cameraRotationStep = 0.0;

		function createGeo(nbPoints, segments, radius, radiusSegments){
			var points = [];
		    var previousPoint = new THREE.Vector3(0, 0, 0);
		    for (var i = 0; i < nbPoints; i++)
		    {
		        var randomX = previousPoint.x + 5 + Math.round(Math.random() * 1000);
		        var randomY = previousPoint.y + 5 + Math.round(Math.random() * 1000);
		        var randomZ = previousPoint.z + 5 + Math.round(Math.random() * 1000);

		        previousPoint.x = randomX;
		        previousPoint.y = randomY;
		        previousPoint.z = randomZ;

		        points.push(new THREE.Vector3(randomX, randomY, randomZ));
		    }

		    spline = new THREE.CatmullRomCurve3(points);
		    
		    return new THREE.TubeGeometry(spline, segments, radius, radiusSegments, false);
		}

		function createMesh(geom){

			var material = new THREE.MeshPhongMaterial({color:0xFFFFFF,side:THREE.DoubleSide,transparent:true,opacity:1});

			return new THREE.Mesh(geom, material);
		}

		function createFlashMesh(geom){
			var matFlashTunner = new THREE.PointsMaterial({color:0x000000,side:THREE.DoubleSide,transparent:true,opacity:1})
			var psFlashTunner = new THREE.Points(geom,matFlashTunner);	
			psFlashTunner.material.size = 70;
			return psFlashTunner;
		}

		var counter = 0;
		function render(){
			counter+=0.03;
				if (cameraTravelledStep > 1 - cameraTravelIncrement)
			    {
			        cameraTravelledStep = 0.0;
			    }

			    var pos1 = spline.getPointAt(cameraTravelledStep);
			    var pos2 = spline.getPointAt(cameraTravelledStep + cameraTravelIncrement);
			    camera.position.set(pos1.x, pos1.y, pos1.z);
			    camera.lookAt(pos2);

			    light.position.set(pos1.x, pos1.y, pos1.z)
			    
			    camera.rotation.z = -Math.PI/2 + (Math.sin(cameraRotationStep) * Math.PI);
			    
			    cameraTravelledStep += cameraTravelIncrement;
				cameraRotationStep += cameraRotationIncrement;
			renderer.render(scene,camera);
			window.requestAnimationFrame(render);
		}

		window.requestAnimationFrame(render);