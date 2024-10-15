/* 
 * ELASTIC CIRCLE HUES
 * Shader Exp XXXVII.
 *
 * This is a Google Chrome Experiment:
 * You must allow the use of the microphone in your browser.
 * Talk to your device to 
 * - Change the shader's color to blue, pink or purple <3
 * - Make it stop/play
 *
 * If your browser has no SpeechRecognition API support, you'll experience a gradient color animation instead of flat colors.
 *
 * Follow my shader experiments here:
 * https://github.com/ilithya/anydayshaders
 * https://twitter.com/hashtag/anydayshaders
 * https://www.instagram.com/explore/tags/anydayshaders/
 *
 * #062 - #100DaysOfCode
 * By ilithya | 2020
 * https://www.ilithya.rocks/
 * https://twitter.com/ilithya_rocks
 */

let camera, scene, renderer, clock;
let uniforms;

init();
animate();

function init() {
	const container = document.getElementById("elastic-circles");

	clock = new THREE.Clock();
	camera = new THREE.Camera();
	camera.position.z = 1;

	scene = new THREE.Scene();

	const geometry = new THREE.PlaneBufferGeometry(2, 2);

	let anim = 0.0;
	let color = 1.0;
	uniforms = {
		u_anim: {type: "f", value: anim },
		u_color: {type: "f", value: color },
		u_resolution: { type: "v2", value: new THREE.Vector2() },
		u_time: { type: "f", value: 1.0 }
	};

	const material = new THREE.ShaderMaterial({
		uniforms,
		vertexShader: document.getElementById("vertex").textContent,
		fragmentShader: document.getElementById("fragment").textContent
	});

	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	
	function updateMat() { material.uniformsNeedUpdate = true; }
	const updateColor = {
		blue() { material.uniforms.u_color.value = 0.0; updateMat(); },
		pink() { material.uniforms.u_color.value = 1.0; updateMat(); },
		purple() { material.uniforms.u_color.value = 0.5; updateMat(); }
	};	
	const updateAnim = {
		stop() { material.uniforms.u_anim.value = 1.0; updateMat(); },
		play() { material.uniforms.u_anim.value = 0.0; updateMat(); }
	};
		
	// Speech recognition library
	if (annyang) {
		const commands = { 		
			'blue': updateColor.blue, 
			'pink': updateColor.pink, 
			'purple': updateColor.purple, 
			'stop': updateAnim.stop, 
			'wait': updateAnim.stop, 
			'play': updateAnim.play, 
			'go': updateAnim.play,
		};
		
		annyang.addCommands(commands);
		annyang.start();
	} else {
		material.uniforms.u_color.value = 10.0;
		updateMat();
	}

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);

	container.appendChild(renderer.domElement);

	onWindowResize();
	window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	uniforms.u_resolution.value.x = renderer.domElement.width;
	uniforms.u_resolution.value.y = renderer.domElement.height;
}

function render() {
	uniforms.u_time.value = clock.getElapsedTime();
	renderer.render(scene, camera);
}

function animate() {
	render();
	requestAnimationFrame(animate);
}