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
var resPoster = 841.0/594.0;
var minWidth = 450;
var minHeight = minWidth * resPoster;
var margin = 50;
var mouseX;

init(); //init scene
resize();
animate(); //updateScene

function init() {
	//get contenaire
	main = document.getElementById('main');
	content = document.getElementById('content');
	container = document.getElementById('container');
	container.addEventListener('mousemove', onMousemove, false);
	
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
		mouse: { type: "v2", value: new THREE.Vector2()}
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
	
	window.addEventListener('resize', onWindowResize, false);
	uniforms.mouse.value.x = 1.0;
	uniforms.mouse.value.y = 1.0;
	resize();
}

function resize(){
	var mainHeight =  window.innerHeight - margin * 2.0;
	var mainWidth =  mainHeight / resPoster;
	var contentHeight = content.offsetHeight;
	var contentMargin = margin  * 0.25;
	var containerHeight =  mainHeight - (contentHeight + contentMargin);
	var containerMinHeight =  minHeight - (contentHeight + contentMargin);
	
	main.style.height = mainHeight+"px";
	main.style.width = mainWidth+"px";
	main.style.minHeight = minHeight+"px";
	main.style.minWidth = minWidth+"px";
	main.style.padding = margin*0.5+"px";
	content.style.margin = "0 0 "+contentMargin+"px 0";
	container.style.height = containerHeight+"px";
	container.style.minHeight = containerMinHeight+"px";
	
	canvasWidth = container.offsetWidth;
	canvasHeight = container.offsetHeight;
	//send new size value to the shader and resize the window
	uniforms.resolution.value.x = canvasWidth;
	uniforms.resolution.value.y = canvasHeight;
	
	renderer.setSize(canvasWidth, canvasHeight);
}

function onWindowResize(event) {
	resize();
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
	
	uniforms.time.value = elaspedSeconds;

	renderer.render(scene, camera);
}

function onMousemove(e){
    var m_posx = 0, m_posy = 0, e_posx = 0, e_posy = 0,
           obj = this;
    //get mouse position on document crossbrowser
    if (!e){e = window.event;}
    if (e.pageX || e.pageY){
        m_posx = e.pageX;
        m_posy = e.pageY;
    } else if (e.clientX || e.clientY){
        m_posx = e.clientX + document.body.scrollLeft
                 + document.documentElement.scrollLeft;
        m_posy = e.clientY + document.body.scrollTop
                 + document.documentElement.scrollTop;
    }
    //get parent element position in document
    if (obj.offsetParent){
        do { 
            e_posx += obj.offsetLeft;
            e_posy += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
	var mx = (m_posx - e_posx) / canvasWidth;
	var my = (m_posy - e_posy) / canvasHeight;
	uniforms.mouse.value.x = mx;
	uniforms.mouse.value.y = my;
}