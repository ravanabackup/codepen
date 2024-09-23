import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r122/three.module.min.js';
import { OrbitControls } from 'https://unpkg.com/three@0.122.0/examples/jsm/controls/OrbitControls.js';

const s_group = new THREE.Group();
const c_group = new THREE.Group();

console.clear();

const theme = {
	dark1: 0x111111,
	dark2: 0x222222,
	dark3: 0x000000,
	//accent: 0xFFDA1F,
	accent: 0xFF3917,
	white: 0xFFFFFF
}

const main = () => {
	const canvas = document.querySelector('#canvas');
	const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: false});
	const scene = new THREE.Scene();
	//const camera = new THREE.PerspectiveCamera(18);
	const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0.1, 1000 );
	//--
	const controls = new OrbitControls(camera, canvas);
	controls.target.set(0, 0, 0);
	controls.rotateSpeed = 0.8;
	controls.enableZoom = false;
	controls.enableDamping = true;
	controls.dampingFactor = .05;
	controls.minPolarAngle = 0.7;
	controls.maxPolarAngle  = 1;
	controls.update();
	//--
	camera.position.z = 6;
	camera.position.x = -6;
	camera.position.y = 1;
	camera.zoom = 130;
	//--
	scene.add(s_group);
	scene.add(c_group);
	scene.fog = new THREE.Fog(theme.dark2, 6,14);
	scene.position.y = -0.8;
	//--
	renderer.setClearColor(scene.fog.color);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFShoftShadowMap;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.outputEncoding = THREE.sRGBEncoding;
	//--
	const concrete = new THREE.MeshPhongMaterial({
		color:theme.dark3,
		//envMap:e_envMap(),
		//map: e_material(),
		//flatShading: true,
		//roughness: 0.2,
		//metalness: 0.5,
		side:THREE.DoubleSide});
	const wireframe = new THREE.MeshStandardMaterial({
		color:theme.dark2,
		envMap:e_envMap(),
		roughness: 0.2,
		metalness: 1.2,
		wireframe: true
	});
	//--
	const gridHelper = new THREE.GridHelper( 40, 128, theme.accent, theme.dark1);
	scene.add(gridHelper);
	//--
	const createHEX = (b, c) => {
		const a = b <= c ? theme.accent : theme.dark3;
		return a;
	}
	let getPositions = [];
	//--
	const setRandomNum = (a) => {
		for (let i= 0; i<a; i++) getPositions.push([i]);
		getPositions.sort(function() { return Math.random() - 0.5});
		return getPositions;
	}
	//--
	const getRandomNum = () => {
		getPositions.shift();
		console.log(getPositions);
		//--
		return getPositions[0];
	}
	//--
	const createElements = (cant) => {
		let x_pos = 15;
		console.log(setRandomNum(cant));
		//--
		const c_geo = new THREE.CubeGeometry();
		const edges = new THREE.EdgesGeometry( c_geo );
		const d_mat =  new THREE.LineBasicMaterial( { color: theme.dark1 } );
		//--
		for (let i=0; i<cant; i++) {
			const c_mat = new THREE.MeshToonMaterial( { color:createHEX( i, Math.pow(cant,0.4) ), wireframe:false } );
			const c_mes = new THREE.Mesh(c_geo, c_mat);
			const line = new THREE.LineSegments( edges,d_mat );
			const w_mes = new THREE.Mesh(c_geo, wireframe);
			c_mes.add(line);
			c_mes.scale_num = 0.5;//0.7-Math.random()*0.5;
			c_mes.scale.set(c_mes.scale_num, 0.01+(Math.round(Math.random()*6)/2), c_mes.scale_num);
			//c_mes.position.x = (getRandomNum() / 2);
			//c_mes.position.z = (getRandomNum() / 2);
			c_mes.position.x = Math.round(-Math.random() * x_pos + Math.random() * x_pos)/2;
			c_mes.position.z = Math.round(-Math.random() * x_pos + Math.random() * x_pos)/2;
			c_mes.castShadow = true;
			c_mes.receiveShadow = true;
			c_mes.position.y = (c_mes.scale.y - c_mes.scale.y / 2)+0.01;
			c_group.add(c_mes);
		}
	}
	const createSun = (size) => {
		const s_geo = new THREE.IcosahedronGeometry( 1, 4 );
		const s_mat = new THREE.MeshBasicMaterial({
			color:theme.accent,
			transparent: true
		});
		let i = 0;
		const s = 2;
		const explode = () => {
			const s_mes = new THREE.Mesh(s_geo, s_mat);
			s_mes.scale.set(0.01,0.01,0.01);
			gsap.to(s_mes.scale, {
				startAt:{x:0.01 ,y:0.01 ,z:0.01},
				duration:s,
				x:size,
				y:size,
				z:size,
				repeat:-1,
				ease:Expo.easeOut
			});
			gsap.to(s_mes.material, {
				startAt:{ opacity:1 },
				duration:s,
				//delay:0.3,
				ease:Expo.easeInOut,
				repeat:-1,
				opacity:0
			});
			s_mes.name = i;
			scene.add(s_mes);
			scene.remove( scene.getObjectByName(i-1) );
			i++;
			gsap.to('p', {duration:0.5, delay:0.4, opacity:0});
		}
		//window.addEventListener('mousedown', explode, false);
		//--
		explode();
	}
	
	const createFloor = () => {
		const f_geo = new THREE.PlaneBufferGeometry(40,40);
		const f_mes = new THREE.Mesh(f_geo, concrete);
		f_mes.rotation.x = - Math.PI * 0.5;
		f_mes.receiveShadow = true;
		f_mes.castShadow = true;
		//--
		s_group.add(f_mes);
	}
	
	const createLights = () => {
		const a_light = new THREE.HemisphereLight( theme.white, theme.dark2, 1 );
		const p_light = new THREE.SpotLight(theme.white, 4);
		//--
		p_light.position.y = 4;
		p_light.position.z = 0;
		//--
		p_light.shadow.mapSize.width = 512;
		p_light.shadow.mapSize.height = 512;
		p_light.shadow.camera.near = 0;
		p_light.shadow.camera.far = 2;
		p_light.shadow.camera.fov = 5;
		p_light.shadow.focus = 0.7;
		//--
		p_light.angle = Math.PI / 8;
		p_light.penumbra = 0.8;
		p_light.decay = 0;
		p_light.distance = 3;
		//--
		p_light.castShadow = true;
		//--
		const spotLightHelper = new THREE.SpotLightHelper( p_light );
		//scene.add( spotLightHelper );
		//--
		scene.add(p_light);
		scene.add(a_light);
	}
	
	const building = () => {
		/*for (let i = 0, l = c_group.children.length - 1; i <= l; i++) {
			var p_object = c_group.children[i];
			p_object.rotation.y += 0.005;
			if (p_object.position.z >= x_pos) p_object.position.z = -x_pos;
		}*/
	}
		
	const animation = () => {
		requestAnimationFrame(animation);
		scene.rotation.y += 0.0015;
		camera.lookAt(scene.position);
		camera.updateMatrixWorld();
		controls.update();
		renderer.render(scene, camera);
	}

	const onWindowResize = () => {
		const w = window.innerWidth;
		const h = window.innerHeight;
		const aspect = window.innerWidth / window.innerHeight;
  
		camera.left = 1000 * aspect / - 2;
		camera.right = 1000 * aspect / 2;
		camera.top = 1000 / 2;
		camera.bottom = - 1000 / 2;

		camera.updateProjectionMatrix();
		renderer.setSize(w, h);
	}
	//--
	createFloor();
	createSun(4);
	createElements(180);
	createLights();
	animation();
	onWindowResize();
	//--
	window.addEventListener('resize', onWindowResize, false);
}

window.addEventListener('load', main, false);

const e_material = (value) => {
	(value==undefined) ? value = m : value = value;
	const o = new THREE.TextureLoader().load(value);
	return o;
}

const e_envMap = () => {
	const t_envMap = new THREE.TextureLoader().load(e);
	t_envMap.mapping = THREE.EquirectangularReflectionMapping;
	t_envMap.magFilter = THREE.NearestFilter;
	t_envMap.minFilter = THREE.LinearMipmapNearestFilter;
	t_envMap.encoding = THREE.sRGBEncoding;
	t_envMap.type = THREE.HalfFloatType;
	//---
	return t_envMap;
}

// Textures
var m = 'https://media.istockphoto.com/photos/environment-map-abstract-spherical-panorama-background-interior-light-picture-id1036687406?k=6&m=1036687406&s=612x612&w=0&h=mpoqgCRiij9k4qLhpvGI65uZaUIavrqqJOXG6qHn2rM=';

var e = 'https://live.staticflickr.com/2039/2209461984_702e2604e5_b.jpg';