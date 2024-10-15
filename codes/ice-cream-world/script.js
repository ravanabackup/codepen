/*
 * ICE CREAM WORLD
 * Made with ThreeJS - Enjoy!
 *
 * Use cursor to move around the space. 
 * On mobile touch + drag screen.
 *
 * Press buttons to change the world's flavor: multicolored vs. monochrome pink <3.
 *
 * Have any performance tips on this code? I'm all ears!
 *
 * Art assets are a remix by me from an original photo by Dids - https://www.pexels.com/@didsss
 *
 * #044 - #100DaysOfCode
 * By ilithya | 2020
 * https://www.ilithya.rocks/
 * https://twitter.com/ilithya_rocks
 */

// CREATE LOADER
let loadingManager = null;
let ASSETS_LOADED = false;
const loadingScreen = {
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		100
	),
	removeText() {
		const loadingText = document.querySelector("#canvas-loader");
		if (loadingText.parentNode) {
			loadingText.parentNode.removeChild(loadingText);
		}
	}
};

// CREATE RENDERED WORLD
const nearDist = 1;
const farDist = 1000;
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	nearDist,
	farDist
);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
const canvasWrapper = document.querySelector("#canvas-wrapper");

const init = () => {
	// Initialize loader
	loadingManager = new THREE.LoadingManager();
	loadingManager.onLoad = () => {
		loadingScreen.removeText();
		ASSETS_LOADED = true;
	};

	// Initialize rendered world
	camera.position.set(0, 0, 220);

	renderer.setClearColor("hotpink");
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	canvasWrapper.appendChild(renderer.domElement);
};
init();

// Add light for MeshPhongMaterial to be visible in scene
const light = new THREE.DirectionalLight();
light.position.set(0, 0, 1);
scene.add(light);

// CREATE WORLD
const cRadius = 100;
const geometry = new THREE.SphereBufferGeometry(
	cRadius,
	cRadius * 6.4,
	cRadius * 6.4
);

const textureLoader = new THREE.TextureLoader(loadingManager);
const textureSurface = textureLoader.load(
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/249663/world-surface.jpg"
);
const textureElevation = textureLoader.load(
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/249663/world-elevation.jpg"
);
const textureSpecular = textureLoader.load(
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/249663/world-specular.jpg"
);

// FYI: Another intersting color for emissive light is "#101f33" - blueish-black
const emissiveLight = "#3f1949"; // dark purple
const materialOptions = {
	emissive: emissiveLight,
	map: textureSurface,
	normalMap: textureElevation,
	specularMap: textureSpecular,
	shininess: 80
};
const coloredMaterial = new THREE.MeshPhongMaterial(materialOptions);
const sphere = new THREE.Mesh(geometry, coloredMaterial);
scene.add(sphere);

// CREATE WORLD COLOR TOGGLE
const materialMonoOptions = Object.create(materialOptions);
materialMonoOptions.emissive = "hotpink";
const monochromeMaterial = new THREE.MeshPhongMaterial(materialMonoOptions);

const toggle = {
	btn: document.querySelectorAll("#canvas-toggle button"),
	updateMaterial(mode) {
		const toggleMaterial =
			mode === "monochrome" ? monochromeMaterial : coloredMaterial;

		sphere.material = toggleMaterial;
		sphere.material.needsUpdate = true;
	},
	checkActiveBtn() {
		this.btn.forEach((el) => {
			el.addEventListener("click", (e) => {
				e.preventDefault();

				const target = e.currentTarget;

				this.btn.forEach((l) => delete l.dataset.active);
				target.dataset.active = true;

				this.updateMaterial(target.dataset.mode);
			});
		});
	}
};
toggle.checkActiveBtn();

// CREATE PART OF THE MOUSE/TOUCH OVER EFFECT
let mouseX = 0;
let mouseY = 0;
const mouseFX = {
	coordinates(cX, cY) {
		const limit = 280;
		const limitNeg = limit * -1;

		mouseX = cX - window.innerWidth / 2;
		mouseY = cY - window.innerHeight / 2;

		mouseX = mouseX >= limit ? limit : mouseX;
		mouseX = mouseX <= limitNeg ? limitNeg : mouseX;

		mouseY = mouseY >= limit ? limit : mouseY;
		mouseY = mouseY <= limitNeg ? limitNeg : mouseY;
	},
	onMouseMove(e) {
		mouseFX.coordinates(e.clientX, e.clientY);
	},
	onTouchMove(e) {		
		const touchX = e.changedTouches[0].clientX;
		const touchY = e.changedTouches[0].clientY;
		mouseFX.coordinates(touchX, touchY);
	}
};
document.addEventListener("mousemove", mouseFX.onMouseMove);
document.addEventListener("touchmove", mouseFX.onTouchMove);

// RESIZE CANVAS
// Weird resize glitch on Safari, so not loving this...
const onWindowResize = () => {
	const w = window.innerWidth;
	const h = window.innerHeight;
	
	camera.aspect = w / h;
	camera.updateProjectionMatrix();

	renderer.setSize(w, h);
};
window.addEventListener("resize", onWindowResize);

// CREATE ANIMATION
const createAnimRotation = () => {
	const speed = 0.005;

	sphere.rotation.z += speed / 2;
	sphere.rotation.y += speed;
};

// RENDER 3D GRAPHIC
const render = () => {
	if (!ASSETS_LOADED) {
		renderer.render(loadingScreen.scene, loadingScreen.camera);
		requestAnimationFrame(render);
		return;
	}

	camera.position.x += (mouseX * -1 - camera.position.x) * 0.05;
	camera.position.y += (mouseY - camera.position.y) * 0.05;
	camera.lookAt(scene.position);

	createAnimRotation();

	renderer.render(scene, camera);

	requestAnimationFrame(render);
};
render();