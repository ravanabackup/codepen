import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r114/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r114/examples/jsm/controls/OrbitControls.js";
import { GUI } from "https://threejsfundamentals.org/3rdparty/dat.gui.module.js";

const s_group = new THREE.Group();

const d_header = document.querySelector('.header');const _root = document.documentElement;
const _mouse = document.querySelector('.mouse');
const _mouse_mid = document.querySelector('.mouse-mid');
const _mouse_guide = document.querySelector('.mouse-guide');

const a = 0.4;	// Div follow mouse - speed
let _s = 60;		// Div size - hover
let isstatus = false;

let x_ = 0;
let y_ = 0;
let _x = 0;
let _y = 0;
let _xm_ = 0;
let _ym_ = 0;
let _x_ = 0;
let _y_ = 0;

let start = Date.now();
let m_global,
	p_pnt,
	p_mat,
	p_geo,
	p_drp,
	p_rain,
	p_cnt = 150;

const main = () => {
	const canvas = document.querySelector("#canvas");
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
		alpha: true
	});
	
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(35);
	
	scene.background = new THREE.Color(0x000000);
	scene.fog = new THREE.Fog(scene.background, 20, 40);

	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.outputEncoding = THREE.sRGBEncoding;
	
	const controls = new OrbitControls(camera, canvas);
	controls.target.set(0, 0, 0);
	controls.rotateSpeed = 1.0;
	controls.enableZoom = false;
	controls.enableDamping = true;
	controls.dampingFactor = 0.05;
	controls.update();

	camera.position.z = 20;
	scene.add(s_group);

	const createGUI = () => {
		const gui = new GUI();
		const g_gui = gui.addFolder("Material");
		const c_gui = gui.addFolder("Colors");
		
    gui.add(options, 'text', false).name('Show Text').onChange((value)=> {
			if (value) {
				d_header.style.display = 'Block';
			} else {
				d_header.style.display = 'None';
			}
		});
		
		//gui.add(options.rain, 'r', false).name('Star Dust').onChange((value)=> { p_rain.visible = value	});
		//gui.add(options.rain, 'c', false).name('Turbulence');
		
		g_gui.add(options.perlin, "speed", 0.2, 1.0);
		g_gui.add(options.perlin, "decay", 0.2, 5.0);
		g_gui.add(options.perlin, "waves", 0.0, 3.0);
		g_gui.add(options.perlin, "displace", 0.0, 3.0);
		g_gui.add(options.perlin, "size", 0.0, 1.0);

		c_gui.add(options.perlin, "eqcolor", 1.0, 30.0);
		c_gui.add(options.perlin, "rcolor", 0.0, 2.0);
		c_gui.add(options.perlin, "gcolor", 0.0, 2.0);
		c_gui.add(options.perlin, "bcolor", 0.0, 2.0);

		g_gui.open();
		c_gui.open();
		//gui.close();
	};

	const options = {
		perlin: {
			speed: 0.4,
			size: 0.25,
			perlins: 1.0,
			decay: 1.2,
			displace: 0.2,
			complex: 0.5,
			waves: 2.7,
			eqcolor: 15.0,
			rcolor: 0.7,
			gcolor: 0.2,
			bcolor: 0.0,
			fragment: true,
			points: false
		},
		text: false,
		rain: {
			r: false,
			c: false
		}
	};

	const createElements = () => {
		const c_geo = new THREE.IcosahedronBufferGeometry(1, 6);
		const w_geo = new THREE.IcosahedronBufferGeometry(1.1, 2);
		m_global = new THREE.ShaderMaterial({
			uniforms: {
				time: {
					type: "f",
					value: 0.1
				},
				decay: {
					type: "f",
					value: 0.3
				},
				size: {
					type: "f",
					value: 0.3
				},
				displace: {
					type: "f",
					value: 4.1
				},
				waves: {
					type: "f",
					value: 0.1
				},
				eqcolor: {
					type: "f",
					value: 0.0
				},
				rcolor: {
					type: "f",
					value: 0.0
				},
				gcolor: {
					type: "f",
					value: 0.0
				},
				bcolor: {
					type: "f",
					value: 0.0
				}
			},
			vertexShader: document.getElementById("vertexShader").textContent,
			fragmentShader: document.getElementById("fragmentShader").textContent
		});
		const c_mes = new THREE.Mesh(c_geo, m_global);
		const w_mes = new THREE.Points(w_geo, m_global);
		//--
		s_group.add(c_mes);
		s_group.add(w_mes);
	};
	const createLights = () => {
		const a_light = new THREE.AmbientLight(0xffffff, 0.5);
		const p_light = new THREE.PointLight(0xffffff, 0.5);
		p_light.position.set(5, 5, -5);

		scene.add(p_light);
		scene.add(a_light);
	};

	const createParticles = (value) => {
		const p_amp = 20;
		p_geo = new THREE.Geometry();
		for (let i = 0; i < p_cnt; i++) {
			p_drp = new THREE.Vector3(
				Math.random() * p_amp - (p_amp / 2),
				Math.random() * (p_amp * 2) - (p_amp),
				Math.random() * p_amp - (p_amp / 2)
			);
			p_drp.velocity = {};
			p_drp.velocity = 0;
			p_drp.velocitx = Math.random() * 0.001;
			p_drp.velocitz = Math.random() * 0.001;
			p_geo.vertices.push(p_drp);
			
		}
		
		p_mat = new THREE.PointsMaterial({
			transparent: true,
			size: 0.1,
			color: 0xffffff
		});
		
		p_rain = new THREE.Points(p_geo, p_mat);
		p_rain.visible = value;
		scene.add(p_rain);
	};

	const animation = () => {
		requestAnimationFrame(animation);


		gsap.to(m_global.uniforms["time"], {value:(options.perlin.speed / 1000) * (Date.now() - start)});
		gsap.to(m_global.uniforms["decay"], {value:Math.pow(options.perlin.decay, 0.3)});
		gsap.to(m_global.uniforms["size"], {value:Math.pow(options.perlin.size * 2, 0.5)});
		gsap.to(m_global.uniforms["waves"], {value:options.perlin.waves});
		
		//m_global.uniforms["waves"].value = options.perlin.waves;
		m_global.uniforms["displace"].value = options.perlin.displace * 5;

		m_global.uniforms["eqcolor"].value = options.perlin.eqcolor*3;
		m_global.uniforms["rcolor"].value = options.perlin.rcolor;
		m_global.uniforms["gcolor"].value = options.perlin.gcolor;
		m_global.uniforms["bcolor"].value = options.perlin.bcolor;

		p_geo.vertices.forEach((p) => {
			p.velocity -= 0.0001 + Math.random() * 0.0005;
			p.y += p.velocity;
			if (options.rain.c) {
				p.x = Math.sin(Date.now() * p.velocitx) * 15;
				p.z = Math.cos(Date.now() * p.velocitz) * 15;
			} else {
				
			}
			
			if (p.y <= -20) {
				p.y = 20;
				p.velocity = 0;
			}
		});
		
		p_geo.verticesNeedUpdate = true;
		
		x_ += (_x - x_) * a / 2;
		y_ += (_y - y_) * a / 2;
		_x_ += (_x - _x_) * a;
		_y_ += (_y - _y_) * a;
		_xm_ += (_x - _xm_) * a / 1.5;
		_ym_ += (_y - _ym_) * a / 1.5;
		//--
		_mouse.style.left = x_ + 'px';
		_mouse.style.top = y_ + 'px';
		_mouse_mid.style.left = _xm_ + 'px';
		_mouse_mid.style.top = _ym_ + 'px';
		_mouse_guide.style.left = _x_ + 'px';
		_mouse_guide.style.top = _y_ + 'px';
		
		camera.lookAt(scene.position);
		camera.updateMatrixWorld();
		controls.update();
		renderer.render(scene, camera);
	};

	const onWindowResize = () => {
		const w = window.innerWidth;
		const h = window.innerHeight;
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
		renderer.setSize(w, h);
	};

	createElements();
	createLights();
	createParticles(false);
	createGUI();
	animation();
	onWindowResize();

	window.addEventListener("resize", onWindowResize, false);
};

_root.addEventListener('mousemove', function(event) {
	_x = event.clientX;
	_y = event.clientY;	
}, false);

_root.addEventListener('mousedown', function(event) {
	_mouse.style.width = _s + 'px';
	_mouse.style.height = _s + 'px';
	_mouse.style.border = 2 +'px solid white';
	_mouse.style.opacity = 1;
}, false);

_root.addEventListener('mouseup', function(event) {
	_mouse.style.width = (_s / 2.3) + 'px';
	_mouse.style.height = (_s / 2.3) + 'px';
	_mouse.style.border = 20 +'px solid #444758'
	_mouse.style.opacity = 0.1;
}, false);

function _onrollOver(value) {
	switch(value) {
		case true:
			_mouse.style.width = _s + 'px';
			_mouse.style.height = _s + 'px';
			_mouse.style.border = 2 +'px solid white';
			_mouse.style.opacity = 1;
			break;
		case false:
			_mouse.style.width = (_s / 1.7) + 'px';
			_mouse.style.height = (_s / 1.7) + 'px';
			_mouse.style.border = 20 +'px solid #444758'
			_mouse.style.opacity = 0.1;
			break;
		default:
			break;
	}
}
window.addEventListener("load", main, false);