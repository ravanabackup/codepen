console.clear();

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import Threeasy from "threeasy";

class Damping {
	constructor(value = 0) {
		this.current = value;
		this.target = value;
		this.damping = .05;
	}
	update() {
		this.current = this.current - ((this.current - this.target)*this.damping)
	}
	value() {
		return this.current;
	}
	set(value) {
		this.target = value;
	}
}
const time = new Damping()

const app = new Threeasy(THREE, {
	light:false,
	preload: {
    clockface: "https://assets.codepen.io/5946/rotatingClock.png"
  }
});

app.camera.position.z = 2.25;

const bg = new THREE.Color(0xfdf0d5);
const white = new THREE.Color(0xffffff);
const lightRed = new THREE.Color(0xc1121f);
const red = new THREE.Color(0x780000);

app.scene.background = bg;

// ORBIT CONTROLS
new OrbitControls(app.camera, app.renderer.domElement);

app.postload(()=>{
	// MATERIALS
	const whiteMat = new THREE.MeshPhysicalMaterial({
		color: white,
		metalness: .9,
		roughness: .5,
		reflectivity: 1,
		clearcoat: 1,
		clearcoatRoughness: 0,
	});
	const redMat = new THREE.MeshPhysicalMaterial({
		color: red,
		metalness: .9,
		roughness: .5,
		reflectivity: 1,
		clearcoat: 1,
		clearcoatRoughness: 0,
	});
	const faceMat = new THREE.MeshPhysicalMaterial().copy( whiteMat );
	faceMat.map = app.clockface;
	console.log(app.clockface)
	console.log(faceMat)
	const glassMat = new THREE.MeshPhysicalMaterial({
		color: white,
		transparent: true,
		opacity: .125,
		metalness: 1,
		ior: 1,
		roughness: 0,
		reflectivity: 1,
		clearcoat: 1,
		clearcoatRoughness: 0,
		sheen: 1,
		sheenRoughness: 0,
		sheenColor: 0xff9999,
		transmission: 1
	});

	// GEOMETRIES
	const shiftSize = .0125;
	const capGeo = new THREE.CylinderGeometry(1, 1, .1, 64);
	const faceGeo = new THREE.CylinderGeometry(1-shiftSize * 4, 1-shiftSize * 4, 1, 64);
	const glassGeo = new THREE.CylinderGeometry(1 - shiftSize, 1 - shiftSize, 1, 64);
	const tickerGeo = new THREE.CylinderGeometry(0, shiftSize*2, .75, 64);


	// MESHES
	const topCap = new THREE.Mesh(capGeo, whiteMat);
	topCap.castShadow = true;
	topCap.receiveShadow = true;
	topCap.position.y = .5;
	app.scene.add(topCap);

	const bottomCap = new THREE.Mesh(capGeo, whiteMat);
	bottomCap.castShadow = true;
	bottomCap.receiveShadow = true;
	bottomCap.position.y = -.5;
	app.scene.add(bottomCap);

	const glass = new THREE.Mesh(glassGeo, glassMat);
	glass.castShadow = true;
	glass.receiveShadow = true;
	app.scene.add(glass);
	
	const ticker = new THREE.Mesh(tickerGeo, redMat);
	ticker.position.y = -.125;
	ticker.position.z = 1 - (shiftSize*3);
	ticker.castShadow = true;
	ticker.receiveShadow = true;
	app.scene.add(ticker)

	const face = new THREE.Mesh(faceGeo, faceMat);
	face.castShadow = true;
	face.receiveShadow = true;
	app.scene.add(face);
	// let frame = 0;
	app.animator.add(()=>{
		const d = new Date();
		let hour = d.getHours();
		let mins = d.getMinutes();
		const hourCount = `${hour}.${Math.floor(100*(mins/60))}`;
		const perc = new Number(hourCount) / 12;
		
		time.set(Math.PI * 2 * perc * -1)
		time.update()
		// if(frame < 1) {
		// 	console.log('-----------------')
		// 	console.log(hour)
		// 	console.log(mins)
		// 	console.log(hourCount)
		// 	console.log(perc)
		// }
		// frame++;
		face.rotation.y = time.value(); 
	})

	// LIGHTS
	function createLight (x,y,z,s) {
		const lightTarget = new THREE.Object3D();
		lightTarget.position.set(x,y,z);
		app.scene.add(lightTarget)

		const light = new THREE.DirectionalLight( white, s );
		light.target = lightTarget;
		light.position.set(-x,-y,-z);
		light.castShadow = true;
		app.scene.add(light);

		return light;
	}
	const leftLight = createLight(1.5,2,-2, .25);
	const rightLight = createLight(-1,2,-2, .5);
	const backLight = createLight(0,-2,-2, .75);

	const ambientLight = new THREE.AmbientLight( white, 100 );
	app.scene.add( ambientLight );
})