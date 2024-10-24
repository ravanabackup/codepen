var camera, renderer;
		// ページの読み込みを待つ
		window.addEventListener('load', init);

		function init() {

			// レンダラーを作成
			renderer = new THREE.WebGLRenderer({
				canvas: document.querySelector('#myCanvas'),
				antialias: true
			});
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );

			// シーンを作成
			const scene = new THREE.Scene();
			const clock = new THREE.Clock();

			// カメラを作成
			camera = new THREE.PerspectiveCamera(45,  window.innerWidth / window.innerHeight);
			camera.position.set(0, 0, 1000);

			// 独自グループを作る
			const myGroup = new MyGroup();
			scene.add(myGroup);

			onWindowResize();
			window.addEventListener( 'resize', onWindowResize, false );


			tick();

			// 毎フレーム時に実行されるループイベントです
			function tick() {
				var delta = clock.getDelta();
				myGroup.update(delta);
				// 更新命令を実行します。
				// レンダリング
				renderer.render(scene, camera);
				requestAnimationFrame(tick);
			}
			
		}

		/** メッシュを継承した独自グループのクラスです。 */
		class MyGroup extends THREE.Object3D {
			/** コンストラクターです。 */
			constructor() {
				super();
				// 任意の処理
				this.uniforms = {
					"time": { value: 1.0 },
          "resolution": { type: "v2", value: new THREE.Vector2(renderer.domElement.width,renderer.domElement.height) }
				};

				this.material = new THREE.ShaderMaterial( {
					uniforms: this.uniforms,
					vertexShader: document.getElementById( 'vertexShader' ).textContent,
					fragmentShader: document.getElementById( 'fragmentShader' ).textContent
				} );

        // ドーナツを作成
        this.donuts = new THREE.Mesh(
          new THREE.SphereGeometry( 300, 100, 100),
          this.material
        );

        this.donuts.rotation.x = 20;
        this.donuts.rotation.y = 20;
        this.donuts.rotation.z = 20;

        this.add(this.donuts);
        //this.donutsList[0] = this.donuts;
      }

			/** 更新命令を定義します。 */
			update(delta) {
					var object = this.donuts;
					object.rotation.y += delta * 0.5 * ( 1 % 2 ? 1 : - 1 );
					object.rotation.x += delta * 0.5 * ( 1 % 2 ? - 1 : 1 );
					object.material.uniforms["time"].value +=  delta* 5;
        //console.log(object.material.uniforms["time"].value)
        
			}
		}

			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

			function getRandom(min, max) {
			  return Math.random() * (max - min) + min;
			}