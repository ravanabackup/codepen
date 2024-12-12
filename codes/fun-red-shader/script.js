console.clear();

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import Threeasy from "threeasy";

const app = new Threeasy(THREE);
// new OrbitControls(app.camera, app.renderer.domElement);

app.camera.position.z = 1;

const mat = new THREE.ShaderMaterial({ 
	uniforms: {
		time: {
			value:0
		}
	},
	vertexShader: `
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}
	`,
	fragmentShader: `
		varying vec2 vUv;
		uniform float time;

		void main() {
			float r = (sin(vUv.x) * 2.) + (sin((vUv.y+time) * 9.)*.3);
			
			r = r-.5;
			r = r*2.;
			r = 1. - r;
			r*=r;
			r*=r;
			
			gl_FragColor = vec4(r,0.,0.,1);
	}
	`,
});
const geo = new THREE.PlaneGeometry();

const mesh = new THREE.Mesh(geo, mat);

app.scene.add(mesh);

app.animator.add(()=>{
	mesh.material.uniforms.time.value += .005;
})

const params = {
	threshold: 0,
	strength: .3,
	radius: 0,
	exposure: .05
};
const renderScene = new RenderPass( app.scene, app.camera );

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.threshold;
bloomPass.strength = params.strength;
bloomPass.radius = params.radius;

const outputPass = new OutputPass();

const composer = new EffectComposer( app.renderer );
composer.addPass( renderScene );
composer.addPass( bloomPass );
composer.addPass( outputPass );

app.render = () => composer.render();