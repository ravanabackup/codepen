var camera, renderer, uniforms, bg_uniforms;
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



			const bg_geometry = new THREE.PlaneBufferGeometry( 4000, 3000 );
			bg_uniforms = {
			 time: { type: "f", value: 1.0 },
			 resolution: { type: "v2", value: new THREE.Vector2() }
 			};
			const bg_material = new THREE.ShaderMaterial( {
					uniforms: bg_uniforms,
					vertexShader: document.getElementById( 'vertexShader' ).textContent,
					fragmentShader: document.getElementById( 'bg_fragmentShader' ).textContent
			} );
			const bg = new THREE.Mesh( bg_geometry, bg_material );
			bg.position.z = -1000;
			scene.add( bg );

			// 独自グループを作る

			const myGroup = new MyGroup();
			scene.add(myGroup);

			onWindowResize();
			window.addEventListener( 'resize', onWindowResize, false );

			tick();

			// 毎フレーム時に実行されるループイベントです
			function tick() {
				var delta = clock.getDelta();

				bg_uniforms[ "time" ].value += delta * 5;
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
				this.donutsList = [];

				this.uniforms = {
					"time": { value: 1.0 }
				};

				this.material = new THREE.ShaderMaterial( {
					uniforms: this.uniforms,
					vertexShader: document.getElementById( 'vertexShader' ).textContent,
					fragmentShader: document.getElementById( 'fragmentShader' ).textContent
				} );



				for (var i = 0; i < 5; i++) {
					// ドーナツを作成
					this.donuts = new THREE.Mesh(
						new THREE.TorusGeometry(i*100+50, i*5+10, 60, 60),
						this.material
					);

					this.donuts.rotation.x = i;
					this.donuts.rotation.y = i;
					this.donuts.rotation.z = i;

					this.add(this.donuts);
					this.donutsList[i] = this.donuts;
				}

			}

			/** 更新命令を定義します。 */
			update(delta) {
				for ( var i = 0; i < this.donutsList.length; i ++ ) {
					var object = this.donutsList[i];
					object.rotation.y += delta * 0.5 * ( i % 2 ? 1 : - 1 );
					object.rotation.x += delta * 0.5 * ( i % 2 ? - 1 : 1 );
					object.material.uniforms["time"].value +=  delta* 5;

				}
			}
		}

			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
				bg_uniforms.resolution.value.x = renderer.domElement.width;
				bg_uniforms.resolution.value.y = renderer.domElement.height;
			}

			function getRandom(min, max) {
			  return Math.random() * (max - min) + min;
			}