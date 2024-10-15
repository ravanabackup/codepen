var renderer = new THREE.WebGLRenderer({canvas:document.getElementById('main'),antialiasing:true});
		renderer.setClearColor(0xffffff);
		renderer.setSize(window.innerWidth,window.innerHeight);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		renderer.gammaInput = true;
		renderer.gammaOutput = true;

		var camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 100 );
		camera.position.set( 55, 8, - 15 );
		camera.position.y += 10;

		// Scene
		var scene = new THREE.Scene();

		// Light
		var ambient = new THREE.AmbientLight( 0xffffff, 0.1 );
		var spotLight = new THREE.SpotLight( 0xffffff, 1 );
		spotLight.position.set( -20, 50, -15 );
		spotLight.castShadow = true;
		spotLight.angle = Math.PI / 4;
		spotLight.distance = 200;
		spotLight.shadow.mapSize.width = 4000;
		spotLight.shadow.mapSize.height = 4000;
		scene.add( ambient );
		scene.add( spotLight );
		scene.add( camera );

		// Floor
		var matFloor = new THREE.MeshPhongMaterial({ color: 0xFF872B});
		var geoFloor = new THREE.BoxGeometry( 2000, 1, 2000 );
		var mshFloor = new THREE.Mesh( geoFloor, matFloor );
		mshFloor.receiveShadow = true;
		mshFloor.position.set( 0,3, 0 );
		scene.add( mshFloor );

		// Box
		var matBox = new THREE.MeshPhongMaterial( { color: 0x4080ff,shininess:0  } );
		var geoBox = new THREE.BoxGeometry( 3, 3, 3 );
		geoBox.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 2, 0 ) );
		var mshBox = new THREE.Mesh( geoBox, matBox );
		mshBox.castShadow = true;
		mshBox.position.set( 40,3, 0 );
		mshBox.rotation.y = 60;
		mshBox.rotation.z = Math.PI / 2;
		scene.add( mshBox );
		
		// Explosion
		var ammount = 100;
		var lines = [];
		for (var i = 0; i < ammount; i++) {
			var matLine = new THREE.MeshPhongMaterial();
			var geoLine = new THREE.CylinderGeometry( 0.02, 0.02, 2, 20 );
			var mshLine = new THREE.Mesh( geoLine, matLine );

			mshLine.material.color = new THREE.Color(2,2,2);
			mshLine.rotation.x =  Math.cos(i) /(0.8 + (0.2 * Math.random()));
			mshLine.rotation.z = Math.sin(i)/(0.8 + (0.2 * Math.random())) ;
			mshLine.material.transparent = true;
			mshLine.material.opacity = 0.8;
			mshLine.position.set( 40,1, 0 );

			lines.push(mshLine);
			scene.add(mshLine);
		}
		
		// Timeline
		var tl = new TimelineMax({repeat: -1});
		tl.to(mshBox.scale, 0.6, {x: 0.7,y:1.7,z:1.7, ease: Power4.easeOut});
		tl.add('end');
		for (var i = lines.length - 1; i >= 0; i--) {
			tl.to(lines[i].scale, 0.3*Math.random(), {y:10*Math.random(), ease: Power2.easeOut},"end");
			tl.to(lines[i].material, 0.2, {opacity:0, ease: Power2.easeOut,delay:.1},"end");
			tl.to(lines[i].material, 0, {opacity:1},"end");
			tl.to(lines[i].scale,0 ,{y:0},"end");
		}
		tl.to(mshBox.position, 0.3, {y:6, ease: Expo.easeOut},"end");
		tl.to(mshBox.rotation, 0.6, {z: -Math.PI /2 , ease: Expo.easeOut},"end");
		tl.to(mshBox.scale, 0.3, {x:0.4,y:0.4,z:1.6, ease: Expo.easeOut},"end");
		tl.to(mshBox.position, 0.2, {y:3, ease: Power4.easeIn,delay:.3},"end");
		tl.to(mshBox.scale, 1, {x: 1,y:1,z:1, ease: Elastic.easeOut,delay:0.5},"end");
		tl.to(mshBox.scale, 0.6, {x:0.5,y:1.9,z:1.9, ease: Power4.easeOut});
		tl.add('end3');
		for (var i = lines.length - 1; i >= 0; i--) {
			tl.to(lines[i].scale, 0.3*Math.random(), {y:20*Math.random(), ease: Power2.easeOut},"end3");
			tl.to(lines[i].material, 0.2, {opacity:0, ease: Power2.easeOut,delay:.1},"end3");
			tl.to(lines[i].material, 0, {opacity:1},"end3");
			tl.to(lines[i].scale,0 ,{y:0},"end3");
		}
		tl.to(mshBox.position, 0.4, {y:8, ease: Expo.easeOut},"end3");
		tl.to(mshBox.rotation, 0.4, {z: Math.PI /2 , ease: Expo.easeOut},"end3");
		tl.to(mshBox.scale, 0.4, {x:0.3,y:0.3,z:1.8, ease: Expo.easeOut},"end3");
		tl.add('end4');
		tl.to(mshBox.position, 0.2, {y:3, ease: Power4.easeIn},"end4");
		tl.to(mshBox.scale, 1, {x: 1,y:1,z:1, ease: Elastic.easeOut,delay:0.2},"end4");

		var counter=0;
		function render(){
			counter+=0.001;
			camera.position.x = mshBox.position.x + 25 * Math.cos( 2 * counter );         
			camera.position.z = mshBox.position.z + 25 * Math.sin( 2 * counter );
			camera.lookAt(mshBox.position);
			renderer.render(scene,camera);
			window.requestAnimationFrame(render);
		}

		window.requestAnimationFrame(render);