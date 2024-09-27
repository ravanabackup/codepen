//Create var for the contenair, the webGL 3D scene, uniforms to bind into shader and timer
var container;
var camera, scene, renderer;
var uniforms;
var startTime;

//update cols rows according to mouse position
var cols = 50;
var rows;
var radius = 0.45;

init(); //init scene
animate(); //updateScene

function init() {
	//get contenaire
	container = document.getElementById('container');
	
	//Create THREE.JS scene and timer
	startTime = Date.now();
	camera = new THREE.Camera();
	camera.position.z = 1;
	scene = new THREE.Scene();
	
	//create a simple plance
	var geometry = new THREE.PlaneBufferGeometry(16, 9);
	
	//create uniform table which provide all our GLSL binding
	uniforms = {
		time: { type: "f", value: 1.0 },
		resolution: { type: "v2", value: new THREE.Vector2() },
		colsrows: {type: "v2", value: new THREE.Vector2()},
		radius:{type: "f", value: 1.0}
	};
	
	//create THREE.JS material
	var material = new THREE.ShaderMaterial( {
	//set shaders and uniforms into material
		uniforms: uniforms,
		vertexShader: document.getElementById('vertexShader').textContent,
		fragmentShader: document.getElementById('fragmentShader').textContent
	} );

	//create mesh, add it to the scene
	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	
	//create renderer and add it to the DOM
	renderer = new THREE.WebGLRenderer();
	container.appendChild(renderer.domElement);
	
	//check window for resize This will give us the proper resolution values to bind
	onWindowResize();
	window.addEventListener('resize', onWindowResize, false);
	
	//send values to shader
	var res = window.innerWidth / cols;
	var rows = window.innerHeight / res;
	uniforms.colsrows.value.x = cols;
	uniforms.colsrows.value.y = rows;
	
	//set radius
	uniforms.radius.value = radius;
}

function onWindowResize(event) {
	//send new size value to the shader and resize the window
	uniforms.resolution.value.x = window.innerWidth;
	uniforms.resolution.value.y = window.innerHeight;
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	var currentTime = Date.now();
	var elaspedSeconds =  (currentTime - startTime) / 1000.0;
	var maxTime = 4.0;
	var normTime = (elaspedSeconds % maxTime) / maxTime;
	uniforms.time.value = Math.sin(normTime * Math.PI);

	renderer.render(scene, camera);
}