import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
import { RectAreaLightHelper } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/helpers/RectAreaLightHelper.js";
import { RectAreaLightUniformsLib } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/lights/RectAreaLightUniformsLib.js';

const config = {
	scene: {
		speed: 0.5
	},
	object: {
		speed: 0.5
	},
	material: {
		roughness: 0.7,
		metalness: 0.7,
		ao: 0.5,
		emissive: 0.8,
		bumb: 0.1,
		displacement: 0
	},
	images: {
		env: "https://cdn.polyhaven.com/asset_img/primary/belfast_sunset_puresky.png?height=780",
		map: "https://images.unsplash.com/photo-1520698857293-5d763dde010f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
		mapInt: "https://images.unsplash.com/photo-1579196740962-8b86a7186aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
		roughness: "https://images.unsplash.com/photo-1542885421-3fb3de1f9f0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80",
		metalness: "https://images.unsplash.com/photo-1542885421-3fb3de1f9f0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80"
	},
	env: {
		intensity: 1,
		blur: 0
	},
	light: {
		intensity: 3
	}
};

class Panel {
	constructor() {
		this.init();
	}
	init() {
		function generatePane() {
			const pn = new Tweakpane.Pane({ title: "Panel" });
			const sn = pn.addFolder({ title: "Scene" });
			sn.addInput(config.scene, "speed", { min: 0, max: 1, label: "Speed" });
			const ob = pn.addFolder({ title: "Object" });
			ob.addInput(config.object, "speed", { min: 0, max: 1, label: "Speed" });
			const mt = pn.addFolder({ title: "Material"});
			mt.addInput(config.material, "roughness", {min: 0, max: 1, label: "Roughness"})
			mt.addInput(config.material, "metalness", {min: 0, max: 1, label: "Metalness"})
			mt.addInput(config.material, "ao", {min: 0, max: 1, label: "Amb Occ"})
			mt.addInput(config.material, "bumb", {min: 0, max: 1, label: "Bumb"})
			//mt.addInput(config.material, "displacement", {min: 0, max: 1, label: "DisplacementScale"})
			const ev = pn.addFolder({title: "Environment"})
			ev.addInput(config.env, "intensity", {min:0, max: 1, label: "Intensity"})
			//ev.addInput(config.env, "blur", {min:0, max: 1, label: "Blur"})
			//ev.addInput(config.light, "intensity", {min:0, max: 1, label: "Light"})
		}
		generatePane();
	}
}

class Control {
	constructor(props) {
		this.controls = new OrbitControls(props.camera, props.canvas);
		this.init();
	}
	init() {
		this.controls.target.set(0, 0, 0);
		this.controls.rotateSpeed = 0.2;
		this.controls.enableZoom = true;
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.08;
		this.controls.minPolarAngle = 0.5;
		this.controls.maxPolarAngle = 1.75;
		this.update();
	}
	update() {
		this.controls.update();
	}
}

class Material {
	constructor(props) {
		return this.material();
	}
	environment(src) {
		const renderer = this.renderer;
		const path = `https://source.unsplash.com/random/?${src}`;
		const preload = new THREE.TextureLoader().load(src ? src : path,
			(e) => {
				//console.log("Path", path)
				e.mapping = THREE.EquirectangularReflectionMapping;
				//e.anisotropy = renderer.capabilities.getMaxAnisotropy();
				e.magFilter = THREE.NearestFilter;
				e.minFilter = THREE.LinearMipmapLinearFilter;
				e.wrapS = e.wrapT = THREE.MirroredRepeatWrapping;
				e.type = THREE.HalfFloatType;
				e.format = THREE.RGBAFormat;
				e.repeat.set(1, 1);
				e.dispose();
			}
		);
		return preload;
	}
	material() {
		this.o_mat = new THREE.MeshStandardMaterial({
			color: 0x333333,
			//emissive: 0x000000,
			wireframe: false,
			map: this.environment(config.images.map),
			//--
			//emissiveIntensity: config.material.emissive / 4,
			roughness: config.material.roughness,
			metalness: config.material.metalness,
			aoMapIntensity: config.material.ao,
			bumpMap: this.environment(config.images.map),
			displacementMap: this.environment(config.images.mapInt),
			roughnessMap: this.environment(config.images.mapInt),
			metalnessMap: this.environment(config.images.mapInt),
			//emissiveMap: this.environment(config.images.mapInt),
			aoMap: this.environment(config.images.mapInt),
		});
		return this.o_mat;
	}
}
class Space {
	constructor(props) {
		this.name = props.name ? props.name : 'Null';
		this.canvas = props.canvas ? props.canvas : null;
		this.main();
	}
	main() {
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
			alpha: true
		});
		this.clock = new THREE.Clock();
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(35);
		this.camera.position.set(-5, 0, 8);
		//this.scene.background = new THREE.Color(0xbbbbdd);
		this.control = new Control({ camera: this.camera, canvas: this.canvas });
		//--
		RectAreaLightUniformsLib.init();
		//this.scene.fog = new THREE.Fog(0x111111, 10, 17);
		this.renderer.useLegacyLights = false;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFShoftSHadowMap;
		this.init();
	}
	init() {
		this.lights();
		this.object();
		this.base();
		//this.helper();
		this.rectLight(2, 5);
		this.targetRender();
		this.render();
		this.loop();
		this.resize();
	}
	helper() {
		this.axesHelper = new THREE.AxesHelper(2);
		this.axesHelper.position.y = -1.5;
		this.scene.add(this.axesHelper);
	}
	lights() {
		this.h_light = new THREE.HemisphereLight(0xeeeeff, 0xaaaacc, 1);
		this.scene.add(this.h_light);
	}
	rectLight(w, h) {
		this.r_light = new THREE.RectAreaLight(0xffffff, 10, w, h);
		this.r_light.position.set(0, 0, -8);
		//this.r_light.rotation.y = 180 * Math.PI / 180;
		
		this.r_light_help = new RectAreaLightHelper(this.r_light);
		this.r_light.add(this.r_light_help);
		
		this.scene.add(this.r_light);
	}
	object() {
		const o_geo = new THREE.IcosahedronGeometry(1, 5);
		const o_mat = new Material();
		const o_nor = new THREE.MeshNormalMaterial({wireframe:true})
		this.o_mes = new THREE.Mesh(o_geo, o_mat);
		this.o_wir = new THREE.Mesh(o_geo, o_nor);
		this.o_mes.castShadow = true;
		this.o_mes.receiveShadow = true;
		//this.o_mes.add(this.o_wir);
		this.scene.add(this.o_mes);
	}
	base() {
		const b_geo = new THREE.BoxGeometry(20, 20, 0.3);
		const b_mat = new Material();
		this.b_mes = new THREE.Mesh(b_geo, b_mat);
		this.b_mes.castShadow = true;
		this.b_mes.receiveShadow = true;
		//this.b_mes.material.side = THREE.BackSide
		this.b_mes.position.y = -3;
		this.b_mes.rotateX(-Math.PI / 2);
		this.scene.add(this.b_mes);
	}
	update() {
		this.scene.traverse((child) => {
			if (child.isMesh && child.material.isMeshStandardMaterial) {
				child.material.roughness = Math.pow(config.material.roughness, 2);
				child.material.metalness = Math.pow(config.material.metalness, 2);
				child.material.aoMapIntensity = Math.pow(config.material.ao, 2);
				child.material.emissiveIntensity = config.material.emissive / 25;
				child.material.bumpScale = config.material.bumb * 0.1;
				child.material.displacementScale = Math.pow(config.material.displacement, 2);
			}
		})
		this.r_light.lookAt(0, 0, 0);
		this.scene.backgroundBlurriness = config.env.blur;
		this.scene.backgroundIntensity = config.env.intensity * 2;
	}
	targetRender() {
		this.envmap = new THREE.TextureLoader().load(config.images.env);
		this.envmap.mapping = THREE.EquirectangularReflectionMapping;
		this.envmap.colorSpace = THREE.SRGBColorSpace;

		this.cubeRender = new THREE.WebGLCubeRenderTarget(256, {
			type: THREE.halfFloatType
		});
		this.cubeCamera = new THREE.CubeCamera(0.1, 10, this.cubeRender);

		this.scene.environment = this.cubeRender.texture;
		this.scene.background = this.envmap;
		//--
	}
	resize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
	render() {
		this.o_mes.rotation.y = -this.clock.getElapsedTime() * config.object.speed;
		//--
		//this.r_light.position.z = -8 + Math.sin(this.clock.getElapsedTime()) * 2;
		this.r_light.position.x = Math.cos(this.clock.getElapsedTime() * config.scene.speed) * 3;
		//this.o_mes.position.y = Math.cos(this.clock.getElapsedTime());
		//
		this.camera.lookAt(this.scene.position);
		this.camera.updateMatrixWorld();
		//--
		this.update();
		this.cubeCamera.update(this.renderer, this.scene);
		this.renderer.render(this.scene, this.camera);
		this.control.update();
	}
	loop() {
		this.render();
		requestAnimationFrame(this.loop.bind(this));
	}
}

const canvas = document.querySelector("canvas");
const world = new Space({ canvas });
const panel = new Panel();
window.addEventListener("resize", () => world.resize());
window.addEventListener("load", () => world.resize());