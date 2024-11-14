import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js';
import {EffectComposer} from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/postprocessing/RenderPass.js';
import {BloomPass} from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/postprocessing/BloomPass.js';
import {AfterimagePass} from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/postprocessing/AfterimagePass.js';
import {FilmPass} from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/postprocessing/FilmPass.js';
import {GUI} from 'https://threejsfundamentals.org/3rdparty/dat.gui.module.js';

function main() {
	
	let depthnav = 0;
	const min = -200;
	const max = 2;
	const x_range = 15;
	const y_range = 10;
	
	const query = document.querySelector('.icon-guide')
	
	const canvas = document.querySelector('#c');
	const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
	const scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0x000000, max, -min)
	const camera = new THREE.PerspectiveCamera(10);
	camera.position.set(0,0,10);
	
	const s_group = new THREE.Group();
	scene.add(s_group);
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	
	const a_light = new THREE.HemisphereLight( 0xFF0000, 0x28222F, 1 );
	scene.add( a_light );
	
	const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
	
	const filmpass = new FilmPass(0.8, 20, 512, false);
	filmpass.renderToScreen = true;
	
	const bloompass = new BloomPass(10, 10, 10, 80);
  
  const afterpass = new AfterimagePass(0.85);
  afterpass.renderToScreen = false;
  
	composer.addPass(bloompass);
	composer.addPass(afterpass);
	composer.addPass(filmpass);
		
	function onWindowResize() {
		
		const w = window.innerWidth;
		const h = window.innerHeight;
		
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
		
		renderer.setSize(w, h);
		
	}
	
	const options = {
		bloom: {
			s: 0.3
		},
		auto: false,
		pass: true,
		physics: {
			p: true,
			c: 17,
			s: 20,
			a: 0.015
		},
		setup: {
			damp: afterpass.uniforms[ 'damp' ].value,
			//kernel: bloompass.copyUniforms[ "tDiffuse" ].value
		},
		
	}
	
	function onchangepass() {
		afterpass.uniforms[ "damp" ].value = options.setup.damp;
		//bloompass.copyUniforms[ "tDiffuse" ].value = Math.pow(options.setup.kernel, 1);
	}
	
	const gui = new GUI();
  {
    const f_fxl = gui.addFolder('FX');
    const f_flm = gui.addFolder('Film');
    const f_mtn = gui.addFolder('Motion');
		
    f_fxl.add(bloompass.copyUniforms.opacity, 'value', 1, 10).name('Strength');
		
    f_flm.add(filmpass.uniforms.nIntensity, 'value', 0, 1).name('Noise');
    f_flm.add(filmpass.uniforms.sIntensity, 'value', 0, 100).name('Scan lines');
    f_flm.add(filmpass.uniforms.sCount, 'value', 0, 512*2).name('Lines');
    f_flm.add(filmpass.uniforms.grayscale, 'value', false).name('Gray Scale');
		
		f_fxl.add(options.setup, 'damp', 0.5, 0.98).name('Damp').onChange(onchangepass);
		//f_fxl.add(options.setup, 'kernel', 0.0, 1.0).name('Kernel').onChange(onchangepass);
		
		f_mtn.add(options, 'auto', true).name('MouseScroll');
		f_mtn.add(options.physics, 'p', false).name('Rotation');
		f_mtn.add(options.physics, 'c', 1, 40).name('Cos');
		f_mtn.add(options.physics, 's', 1, 40).name('Sin');
		f_mtn.add(options.physics, 'a', 0.01, 0.1).name('Amp');
		
		//f_mtn.add(options, 'pass', true).name('Postprocessing');
		
    //f_fxl.open();
    f_mtn.open();
    //f_flm.open();
  }
	
	function createElement(value) {
		
		const l_geo = new THREE.BoxBufferGeometry(1);
		const l_edg = new THREE.EdgesGeometry( l_geo );
		const c_geo = new THREE.ConeGeometry(1,1,3);
		const c_mat = new THREE.MeshLambertMaterial( {wireframe:false} );
		const l_mat = new THREE.LineBasicMaterial( { color: 0x7872F0 } );
		
		for (let i = 0; i<value; i++) {
			
			const c_line = new THREE.LineSegments( l_edg, l_mat);
			c_line.number = Math.random() * 0.005;
			c_line.position.z = mathRandomNum(min);
			c_line.position.x = mathRandomNum(x_range);
			c_line.position.y = mathRandomNum(y_range);
			c_line.rotation.set(mathRandomNum(3),mathRandomNum(3),mathRandomNum(3));
			s_group.add(c_line);
			
			const c_mes = new THREE.Mesh(c_geo, c_mat);
			const c_num_x = mathRandomNum(5);
			const c_num_y = mathRandomNum(10)
			const c_num_z = -Math.abs(mathRandomNum(value*10));
			c_mes.number = Math.random() * 0.005;
			c_mes.scaleset = mathRandomNum(3);
			c_mes.position.set(c_num_x, c_num_y, c_num_z);
			c_mes.rotation.set(mathRandomNum(3),mathRandomNum(3),mathRandomNum(3));
			c_mes.scale.set(c_mes.scaleset,c_mes.scaleset,c_mes.scaleset);
			s_group.add(c_mes);
			
		}
	}
	
	function mathRandomNum(value) {
		
		const e = -Math.random() * value + Math.random() * value;
		return e;
		
	}
	
	
	function animation() {
		requestAnimationFrame(animation);
		(options.auto) ? query.style.opacity = '1' : query.style.opacity = '0';
		(options.auto) 
			? window.addEventListener('wheel', onScrollDown, false) 
			: window.removeEventListener('wheel', onScrollDown, false);
		
		if (!options.auto) {
			for ( let i = 0, l = s_group.children.length; i < l; i ++ ) {
    	
				const object = s_group.children[ i ];
				object.position.z -= 2;
				object.rotation.y += 0.04;
				object.rotation.x -= 0.07;
				if (options.physics.p) {
					object.position.y = Math.sin(object.position.z / (object.number+options.physics.s)) * (options.physics.a / object.number);
					object.position.x = Math.cos(object.position.z / (object.number+options.physics.c)) * (options.physics.a / object.number);
				}
				if (object.position.z<min-1) {
					object.position.x = mathRandomNum(x_range);
					object.position.y = mathRandomNum(y_range);
					object.position.z = max + (Math.random() * 3);
				}
				if (object.position.z>max+1) {
					object.position.x = mathRandomNum(x_range);
					object.position.y = mathRandomNum(y_range);
					object.position.z = min + (-Math.random() * 3);
				}
			}
		}
		
		(options.pass) ? composer.render() && renderer.clear() : renderer.render(scene, camera);
		
	}
		
	function onScrollDown(event) {
		
		(options.auto) ? depthnav = event.deltaY * 0.05 : null;
		
		for ( let i = 0, l = s_group.children.length; i < l; i ++ ) {
    	
			const object = s_group.children[ i ];
			object.rotation.y += event.deltaY * object.number;
			object.rotation.x -= event.deltaY * object.number;
			if (options.auto) {
				object.position.z += -depthnav;	
				if (options.physics.p) {
					object.position.y = Math.sin(object.position.z / (object.number+options.physics.s)) * (options.physics.a / object.number);
					object.position.x = Math.cos(object.position.z / (object.number+options.physics.c)) * (options.physics.a / object.number);
				}
			}
			
			
			if (object.position.z<min-1) 
				object.position.z = max + (Math.random() * 10);
			if (object.position.z>max+1)
				object.position.z = min + (Math.random() * 10);
		}
	}
	{
		window.addEventListener('wheel', onScrollDown, false);
		window.addEventListener('resize', onWindowResize, false);
	}
	(function() {
		createElement(40);
		onWindowResize();
		animation();	
	})();
	
};

window.addEventListener('load', main, false);