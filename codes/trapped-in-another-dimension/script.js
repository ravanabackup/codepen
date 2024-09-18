var container;

			var camera, scene, renderer;

			var mouseX = 0, mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;
      var dirLight;

      const TEXTURE_PATH = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366'

			init();
			animate();


			function init() {
      

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.z = 300;
				// scene

				scene = new THREE.Scene();

				var ambient = new THREE.AmbientLight( 0x9EDCE6 );
				scene.add( ambient );

        //LIGHTS
        
        dirLight = new THREE.DirectionalLight( 0x282C39 );
				dirLight.position.set( 1, 0, 3 ).normalize();
				//scene.add( dirLight );
        
        var spotLight = new THREE.SpotLight( 0x282C39 );
        spotLight.position.set( 100, 1000, 100 );

        spotLight.castShadow = true;

        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        spotLight.shadow.camera.near = 500;
        spotLight.shadow.camera.far = 400;
        spotLight.shadow.camera.fov = 30;

        scene.add( spotLight );
        
				var directionalLight = new THREE.DirectionalLight( 0x1C8B7B );
				directionalLight.position.set( 1, 0, 5 );
				scene.add( directionalLight );

				// texture

				var manager = new THREE.LoadingManager();
				manager.onProgress = function ( item, loaded, total ) {

					console.log( item, loaded, total );

				};

				var texture = new THREE.Texture();

				var onProgress = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round(percentComplete, 2) + '% downloaded' );
					}
				};

				var onError = function ( xhr ) {
				};


				// model
      loader = new THREE.TextureLoader();
      loader.setCrossOrigin( 'https://s.codepen.io' );
      var texture = loader.load( TEXTURE_PATH + '/ship-textures2.jpg' );

				var loader = new THREE.OBJLoader( manager );
				loader.load( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/ship.obj', function ( object ) {

					object.traverse( function ( child ) {

						if ( child instanceof THREE.Mesh ) {

							child.material.map = texture;

						}

					} );
        object.position.y = 140;
				object.position.x = 140;	
        object.scale.set(90,90,90);
        object.rotation.x += 40;
					scene.add( object );

				}, onProgress, onError );
        
				//BACKGROUND
        
        var geometry1 = new THREE.SphereGeometry(500, 150, 40);
    geometry1.scale(-1, 1, 1);
        
   THREE.TextureLoader.prototype.crossOrigin = 'anonymous';

    var material1 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/a20.jpg' )
    });
        
         mesh1 = new THREE.Mesh(geometry1, material1);
         scene.add(mesh1);
         mesh1.position.z = -100;
        
        //
				renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setClearColor( 0x000000, 0 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {
				requestAnimationFrame( animate );
        scene.rotation.y += 0.005;
        //scene.rotation.z += 0.0001;
				render();

			}

			function render() {

				//camera.lookAt( scene.position );

				renderer.render( scene, camera );
        renderer.domElement.id = 'c';
       
			}