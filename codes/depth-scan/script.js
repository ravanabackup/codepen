//Create var for the contenair, the webGL 3D scene, uniforms to bind into shader and timer
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.domElement );

var main;
var content;
var container;
var camera, scene, renderer;
var uniforms;
var startTime;


var canvasWidth;
var canvasHeight;
var resPoster = 1920.0/1080.0;
var minWidth = 480;
var minHeight = minWidth / resPoster;
var margin = 50;

var textures = [];
var UITexture;

init(); //init scene
animate(); //updateScene

function init() {
	//loadTexture
	loadAllTextures();
	
	//get contenaire
	main = document.getElementById('main');
	content = document.getElementById('content');
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
		target: { type: "f", value: 0.5 },
		resolution: { type: "v2", value: new THREE.Vector2() },
		texture: { type: "t", value: textures[0]},
		UIText: { type: "t", value: UITexture}
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
	
}

function loadAllTextures(){
	textures.push(new THREE.TextureLoader().load(tex0));
	textures.push(new THREE.TextureLoader().load(tex1));
	textures.push(new THREE.TextureLoader().load(tex2));
	textures.push(new THREE.TextureLoader().load(tex3));
	textures.push(new THREE.TextureLoader().load(tex4));
	
	UITexture = new THREE.TextureLoader().load(UI);
}

function onWindowResize(event) {
	var mainHeight =  window.innerHeight - margin * 6.0;
	var mainWidth =  mainHeight * resPoster;
	container.style.height = mainHeight+"px";
	container.style.width = mainWidth+"px";
	container.style.minHeight = minHeight+"px";
	container.style.minWidth = minWidth+"px";
	
	content.style.margin = "0 0 "+margin * 0.5+"px 0";
	main.style.padding = margin*0.5+"px";
	main.style.width = mainWidth+"px";
	main.style.minWidth = minWidth+"px";

	canvasWidth = container.offsetWidth;
	canvasHeight = container.offsetHeight;
	//send new size value to the shader and resize the window
	uniforms.resolution.value.x = canvasWidth;
	uniforms.resolution.value.y = canvasHeight;
	
	renderer.setSize(canvasWidth, canvasHeight);
}

function animate() {
	stats.begin();
	render();
	stats.end();
	requestAnimationFrame(animate);
}

function render() {
	var currentTime = Date.now();
	var elaspedSeconds =  (currentTime - startTime) / 1000.0;
	var maxTime = 4.0;
	var normTime = (elaspedSeconds % maxTime) / maxTime;
	var index = Math.floor(elaspedSeconds * 0.25 % (textures.length));
	
	uniforms.time.value = elaspedSeconds * 0.5;
	uniforms.target.value = 1.0 - normTime;
	uniforms.texture.value = textures[index];

	renderer.render(scene, camera);
}