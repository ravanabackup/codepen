var renderer = new THREE.WebGLRenderer({canvas:document.getElementById('main'),antialiasing:true});
		renderer.setClearColor(0x000000);
		renderer.setSize(window.innerWidth,window.innerHeight);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		renderer.gammaInput = true;
		renderer.gammaOutput = true;

		// Scene
		var scene = new THREE.Scene();

		// Camera
		var camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.z = 35;
		scene.add( camera );

		// Light
		var light = new THREE.PointLight( 0xffffff, 2,300 );
		light.position.z = 200;
		scene.add( light );

		// Geo
		var colors1 = [0x616163,0x44FFD2,0x87F6FF,0xDAF5FF,0xFFBFA0,0x616163,0x44FFD2,0x87F6FF,0xDAF5FF,0xFFBFA0];
		var colors2 = [0x0B7A75,0x048BA8,0x2E4057,0x99C24D,0x2F2D2E,0x0B7A75,0x048BA8,0x2E4057,0x99C24D,0x2F2D2E];
		var colors3 = [0x247BA0,0x70C1B3,0xB2DBBF,0xF3FFBD,0xFF1654,0x247BA0,0x70C1B3,0xB2DBBF,0xF3FFBD,0xFF1654];
		var colors4 = [0x50514F,0xF25F5C,0xFFE066,0x247BA0,0x70C1B3,0x50514F,0xF25F5C,0xFFE066,0x247BA0,0x70C1B3];
		var allColors = [colors1,colors2,colors3,colors4];
		var colors = allColors[Math.round((allColors.length - 1) * Math.random())];

		var ammount = 10;
		var pcPlanes = [];
		var randomArray = [];
		for (var i = 0; i < ammount; i++) {
			randomArray.push(Math.random());
		}
		
		for (var i = 0; i < ammount; i++) {
			var geoPlane = new THREE.SphereGeometry(15, 15, 15);
			var matPlane = new THREE.PointsMaterial({color:colors[i]})
			var pcPlane = new THREE.Points(geoPlane,matPlane);	
			pcPlane.material.transparent = true;
		  	pcPlane.material.opacity = 1 *(i/ammount) +0.5;
			var diff = i/ammount* 3;
			var timeline = new TimelineMax({repeat:-1});
			var timeline2 = new TimelineMax({repeat:-1});
			timeline.to(pcPlane.scale,4,{x:1.5*diff,z:1.5*diff,y:1.5*diff,ease:Power3.easeOut})
				.to(pcPlane.scale,4,{x:0.5*diff,z:0.5*diff,y:0.5*diff,ease:Power3.easeOut})
				.to(pcPlane.scale,6,{y:2*diff,ease:Power3.easeOut})
				.to(pcPlane.scale,3,{z:0.2*diff,x:0.2*diff,ease:Power3.easeOut})
				.to(pcPlane.scale,4,{z:0.5*diff,x:0.5*diff,y:0.4*diff,ease:Power3.easeOut})
				.to(pcPlane.scale,4,{x:1,z:1,y:1,ease:Power3.easeOut});

			timeline2.to(pcPlane.material,4,{size:1,ease:Power3.easeOut})
				.to(pcPlane.material,4,{size:3*diff,ease:Power3.easeOut})
				.to(pcPlane.material,6,{size:3,ease:Power3.easeOut})
				.to(pcPlane.material,3,{size:5,ease:Power3.easeOut})
				.to(pcPlane.material,4,{size:3,ease:Power3.easeOut})
				.to(pcPlane.material,4,{size:1,ease:Power3.easeOut})
			scene.add(pcPlane);
			pcPlanes.push(pcPlane);

		}
						
		var counter = 0;
		function render(){
			counter+=0.03;
			for (var i = 0; i < pcPlanes.length; i++) {
				pcPlanes[i].rotation.y += 0.01*(i/ammount);
			}

			camera.lookAt(scene.position);
			renderer.render(scene,camera);
			window.requestAnimationFrame(render);
		}

		window.requestAnimationFrame(render);