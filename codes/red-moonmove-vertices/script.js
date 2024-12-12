console.clear();

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { SimplexNoise } from "three/addons/math/SimplexNoise.js";

import Threeasy from "threeasy";

let frame = 1;

const app = new Threeasy(THREE);
new OrbitControls(app.camera, app.renderer.domElement);

app.camera.position.y = 3;
app.camera.position.z = 3;

// MOON
let moonGeo = new THREE.IcosahedronGeometry(10, 10);
let moonMat = new THREE.MeshBasicMaterial({
	color: 0xff0000
});
const moon = new THREE.Mesh(moonGeo, moonMat);
moon.position.y = 12;
moon.position.z = -50;
app.scene.add(moon);

const pmremGenerator = new THREE.PMREMGenerator(app.renderer);
const renderTarget = pmremGenerator.fromScene(app.scene);
app.scene.environment = renderTarget.texture;


let xCount = 100;
let yCount = 300;
let seaGeo = new THREE.PlaneGeometry(100, 100, xCount, yCount);

let noise = new SimplexNoise();

const updatePoints = (seaGeo) => {
	let points = seaGeo.getAttribute("position").array;
	let positionData = new Float32Array(points.length);
	
	for (let i = 0; i < points.length; i += 3) {
		let pos = new THREE.Vector3(points[i], points[i + 1], points[i + 2]);
		
		let noise1 = noise.noise3d(pos.x,pos.y + frame*.007,pos.z + frame*.003);
		noise1 = noise1 * .2;
		
		let noise2 = noise.noise3d(pos.x*.1,pos.y*.1,pos.z + (frame*.013));
		noise2 = noise2 * .4;
		
		let noise3 = noise.noise3d(pos.x*.01,(pos.y*.01) -  (frame*.005),pos.z);
		noise3 = noise3 * .8;
		
		let finalNoise = (noise1 + noise2 + noise3) * .3333;
		
		let x = (i/3)%(xCount+1);
		const perc = (x)/(xCount+1);
		
		positionData[i + 0] = pos.x;
		positionData[i + 1] = pos.y;
		positionData[i + 2] = finalNoise * perc;
		// positionData[i + 2] = noise3 * perc;
	}
	seaGeo.setAttribute("position", new THREE.BufferAttribute(positionData, 3));
	seaGeo.computeVertexNormals();
	return seaGeo;
}

seaGeo = updatePoints(seaGeo);

let seaMat = new THREE.MeshStandardMaterial({
	color: 0x000000,
	metalness: .5,
	roughness: .1,
});
// mat = new THREE.MeshNormalMaterial();
const sea = new THREE.Mesh(seaGeo, seaMat);
sea.rotateX(-Math.PI / 2);

app.scene.add(sea);
app.animator.add(() => {
	frame++;
	seaGeo = updatePoints(seaGeo);
});