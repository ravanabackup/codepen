window.addEventListener('load', init);
      function init() {

        // レンダラーを作成
        const renderer = new THREE.WebGLRenderer({
          canvas: document.querySelector('#myCanvas'),
          antialias: true
        });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth , window.innerHeight);
        renderer.setClearColor(0x000000, 1.0);
        renderer.toneMapping = THREE.ReinhardToneMapping;

        var ENTIRE_SCENE = 0, BLOOM_SCENE = 1;
  			var bloomLayer = new THREE.Layers();
  			bloomLayer.set( BLOOM_SCENE );

        var gui = new dat.GUI();

        var params = {
  				exposure: 1,
  				bloomStrength: 5,
  				bloomThreshold: 0,
  				bloomRadius: 0,
  				scene: "Scene with Glow"
  			};

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
        camera.position.set(0, 0, 1000);

        // 平行光源
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        // ポイント光源
        const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
        scene.add(pointLight);
        const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
        scene.add(pointLightHelper);

        var renderScene = new THREE.RenderPass( scene, camera );
        var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
        effectCopy.renderToScreen = true;

        var bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
        bloomPass.exposure = params.exposure;
        bloomPass.threshold = params.bloomThreshold;
  			bloomPass.strength = params.bloomStrength;
  			bloomPass.radius = params.bloomRadius;

        var bloomComposer = new THREE.EffectComposer( renderer );
        bloomComposer.renderToScreen = true;
        bloomComposer.addPass( renderScene );
        bloomComposer.addPass( bloomPass );
        bloomComposer.addPass( effectCopy );



        var finalPass = new THREE.ShaderPass(
          new THREE.ShaderMaterial( {
            uniforms: {
              baseTexture: { value: null },
              bloomTexture: { value: bloomComposer.renderTarget2.texture }
            },
            vertexShader: document.getElementById( 'vertexshader' ).textContent,
            fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
            defines: {}
          } ), "baseTexture"
        );


        finalPass.needsSwap = true;


        var finalComposer = new THREE.EffectComposer( renderer );
        finalComposer.addPass( renderScene );
        finalComposer.addPass( finalPass );
        finalComposer.addPass( effectCopy );
        var raycaster = new THREE.Raycaster();

        window.addEventListener( 'resize', function(){
          onWindowResize(camera, renderer,bloomComposer, finalComposer);
        }, false );

        const circleList = [];

        for (var i = 0; i < 10; i++) {
          circleList[i] = new Circle(i*i*4,BLOOM_SCENE);
          scene.add(circleList[i]);
        }

        gui.add( params, 'exposure', 0.1, 2 ).onChange( function ( value ) {
        	renderer.toneMappingExposure = Math.pow( value, 4.0 );

  			} );
  			gui.add( params, 'bloomThreshold', 0.0, 1.0 ).onChange( function ( value ) {
  				bloomPass.threshold = Number( value );
  			} );
  			gui.add( params, 'bloomStrength', 0.0, 3.0 ).onChange( function ( value ) {
  				bloomPass.strength = Number( value );
  			} );
  			gui.add( params, 'bloomRadius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {
  				bloomPass.radius = Number( value );
  			} );

        camera.layers.set( BLOOM_SCENE );
        scene.layers.set( BLOOM_SCENE );

        tick();

        function tick() {
          for (var i = 0; i < circleList.length; i++) {
            circleList[i].update(i);
          }
          renderer.render(scene, camera);
          requestAnimationFrame(tick);
          bloomComposer.render();
          finalComposer.render();
        }
      }


      class Circle extends THREE.Object3D {
        constructor(size,BLOOM_SCENE) {
          super();
          this.size = size;

          this.material = new THREE.MeshBasicMaterial({color: 0x8fdd4a});
          this.geometry = new THREE.TorusGeometry(size, 2, 64, 100);
          //this.geometry.position.set.x = window.innerWidth * Math.random();

          this.mesh = new THREE.Mesh(this.geometry, this.material);
          this.mesh.layers.enable(BLOOM_SCENE);
          this.add( this.mesh );

        }
        update(i) {
          this.mesh.rotation.x += 0.01+i*0.001;
          this.mesh.rotation.y += 0.01+i*0.001;
          this.mesh.rotation.z += 0.01+i*0.001;
        }
      }


      function onWindowResize(camera, renderer, bloomComposer, finalComposer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
        bloomComposer.setSize( window.innerWidth, window.innerHeight );
        finalComposer.setSize( window.innerWidth, window.innerHeight );
      }