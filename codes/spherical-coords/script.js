import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'https://threejsfundamentals.org/3rdparty/dat.gui.module.js';

//--

function main() {

	const canvas = document.querySelector('#canvas');
	const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha:true });
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(18);
	const s_group = new THREE.Group();
	//--
	const controls = new OrbitControls(camera, canvas);
	controls.target.set(0, 0, 0);
	controls.rotateSpeed = 0.8;
	controls.enableZoom = false;
	controls.enableDamping = true;
	controls.dampingFactor = .05;
	controls.update();
	
	camera.position.set(0, 5, -9.5);
	renderer.gammaOutput = true;
	renderer.gammaInput = true;
	//renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.toneMapping = THREE.Uncharted2ToneMapping;
	//--
	const amount = 320;
	//--
	scene.add(s_group);
	scene.fog = new THREE.Fog(0x00131B, 10, 12);
	//--
	const a_light = new THREE.HemisphereLight(0xFFFFFF, 0x28222F, 1);
	scene.add(a_light);

	const l_light = new THREE.PointLight(0x444758, 20, 10);
	//l_light.castShadow = true;
	scene.add(l_light);

	const p_light = new THREE.PointLight(0xFFFFFF, 0.5, 10);
	//p_light.castShadow = true;
	scene.add(p_light);
	
	//--

	var options = {
		object: {
			r: 1.1,
			p: 2,
			s: 0.6,
			q: 1,
			t: 2,
			d: 1
		},
		status: {
			m: 'auto',
			c: false
		},
		setup: {
			s: function() {
				options.object.r = 1.0;
				options.object.p = 2;
				options.object.s = 0.5;
				options.object.q = 1.2;
				options.object.d = 1;
				options.object.t = 1.2;
			},
			e: function() {
				options.object.r = 1;
				options.object.p = 2 + Math.random() * 1;
				options.object.s = 0.2 + Math.random() * 0.5;
				options.object.q = Math.random() * 5;
				options.object.d = 1+Math.random() * 5;
				options.object.t = Math.random() * 5;
			}
		}
	}

	const gui = new GUI(); {

		const f_set = gui.addFolder('Config');
		const f_mtn = gui.addFolder('Motion');
		const f_lgt = gui.addFolder('Light');

		f_set.add(options.setup, 's').name('Normal');
		f_set.add(options.setup, 'e').name('Random');
		f_set.add(scene.fog, 'near', 1, 10).name('Depth Near');
		f_set.add(scene.fog, 'far', 10, 20).name('Depth Far');
		f_set.add(options.status, 'c', false).name('Color');

		f_mtn.add(options.status, 'm', ['Auto', 'Mouse', 'Pause']).name('Rotation');
		f_mtn.add(options.object, 'r', 0, 2).name('Amplitude');
		f_mtn.add(options.object, 's', 0.01, 1).name('Size');
		f_mtn.add(options.object, 'd', 1, 5).name('Power');
		f_mtn.add(options.object, 'p', 2, 5).name('Pi');
		f_mtn.add(options.object, 'q', 0, 5).name('Delay');
		f_mtn.add(options.object, 't', 0.5, 5).name('Speed');
		
		f_lgt.add(l_light, 'intensity', 0, 20).name('Light');
		f_lgt.add(a_light, 'intensity', 0, 5).name('Ambient');
		f_lgt.add(p_light, 'intensity', 0, 5).name('Point');

		f_set.open();
		//f_mtn.open();
		//f_lgt.open();

	}
	//gui.close();
	//--
	function createElements() {

		const l_geo = new THREE.BoxBufferGeometry();
		const l_edg = new THREE.EdgesGeometry(l_geo);

		// -- 0x28222F

		for (let i = 0, l = amount; i <= l; i++) {
			const c_col = 0xFFFFFF - (i * 10000);
			const a_col = 0x28222F;
			const d_col = 0x7e0cf5;
			
			const c_mat = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide, color: d_col });
			const l_mat = new THREE.LineBasicMaterial({ color: d_col });
			const c_object = new THREE.Mesh(l_geo, c_mat);
			const w_object = new THREE.LineSegments(l_edg, l_mat);
			
			c_object.castShadow = true;
			c_object.receiveShadow = true;
			c_object.currentHex = c_object.material.emissive.getHex();

			c_object.add(w_object);

			const c_phi = Math.acos(-1 + (options.object.p * i) / l);
			const c_theta = Math.sqrt(Math.pow(l / 2, 3) * Math.PI) * c_phi;
			c_object.position.setFromSphericalCoords(
					options.object.r, c_phi, c_theta);
			s_group.add(c_object);

		}
		//--
		scene.add(c_mes);
		//--
	}
	
	let counter = 0;
	let _x = 0;
	let _y = 0;
	
	
	document.addEventListener('mousemove', onMouseMove, false);
	
	function onMouseMove(event) {
		_x = event.clientX / (window.innerWidth / 2);
		_y = event.clientY / (window.innerHeight / 2);
	}
	
	
	function animation() {

		requestAnimationFrame(animation);
		const time = Date.now() * 0.003;
		//--
		switch (options.status.m) {
			case 'Mouse':
				s_group.rotation.x += (-_y - s_group.rotation.x) * 0.4 - 45;
				s_group.rotation.z += (_x - s_group.rotation.z) * 0.4 - 45;
				break;
			case 'Pause':
				s_group.rotation.x += 0 - s_group.rotation.x * 0.09;
				s_group.rotation.z += 0 - s_group.rotation.z * 0.09;
				break;
			case 'Auto':
				s_group.rotation.x += 0.01;
				s_group.rotation.z += 0.01;
				break;
		}
		//--
		p_light.position.x = Math.sin(time / 5) * 10;
		p_light.position.z = Math.cos(time / 5) * 10;
		
		counter += 1;
		if (counter > s_group.children.length+1) counter = 0;
		//--
		const speed = Math.pow(time / options.object.t, 1);
		
		const d_col = 0x00D0DA;
		const b_col = 0x00A0DA;
		const c_col = 0xFFFFFF;
		
		let s_number = Math.round(1 + counter * s_group.children.length-2);
		//--
		for (let i = 0, l = s_group.children.length - 1; i <= l; i++) {
			
			const c_mes = s_group.children[i];
			const c_phi = Math.acos(-1 + (options.object.p * i) / l);
			const c_theta = Math.sqrt(l * Math.PI) * c_phi;
			const c_r = Math.pow(Math.sin(speed + ((0.03 * options.object.q) * i)) * (options.object.s), 3);
			
			const g_col = d_col + Math.pow(b_col, (options.object.d / 100)+ Math.abs(c_mes.position.x));
			if(options.status.c) {
				
				s_group.children[i].material.color.set( g_col );
				s_group.children[counter].material.color.set( c_col );
				s_group.children[i].children[0].material.color.set( g_col * 2 );
				s_group.children[counter].children[0].material.color.set( c_col );
				
			} else {
				
				c_mes.material.color.setHex( b_col );
				c_mes.children[0].material.color.setHex( d_col );
				
			}
			
			c_mes.lookAt(scene.position);
			c_mes.scale.set(c_r, c_r, c_r);
			c_mes.position.setFromSphericalCoords(Math.pow(options.object.r, 3), Math.pow(c_phi, 1.12), Math.pow(c_theta, options.object.d));
		}
		controls.update();
		camera.lookAt(scene.position);
		camera.updateMatrixWorld();
		renderer.render(scene, camera);

	}

	function onWindowResize() {

		const w = window.innerWidth;
		const h = window.innerHeight;
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
		renderer.setSize(w, h);

	}

	window.addEventListener('resize', onWindowResize, false);

	onWindowResize();
	animation();
	createElements();
}

window.addEventListener('load', main, false);