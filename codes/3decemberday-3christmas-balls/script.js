// Renderer
var renderer = new THREE.WebGLRenderer({canvas:document.getElementById('main'),antialiasing:true});
renderer.setClearColor(0x000000);
renderer.setSize(window.innerWidth,window.innerHeight);

// Camera
var camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.1, 5000 );
camera.position.z = 700;

// Scene
var scene = new THREE.Scene();

  // Light
var light = new THREE.AmbientLight(0xffffff,0.05);

var light1 = new THREE.PointLight(0xffffff,0.4);
light1.position.z = 100;
light1.position.x = -500;

var light2 = new THREE.PointLight(0xffffff,0.4);
light2.position.x = 500;

scene.add(light);
scene.add(light1);
scene.add(light2);

// Create + init position mesh
var ammount = 800;
var cubes = [];
for (var i = 0; i < ammount; i++) {
  	var geometry = new THREE.SphereGeometry( 20,20,10);
  	var material = new THREE.MeshPhongMaterial( { color:0x63A8AF,shininess :500} );
  	var cube = new THREE.Mesh( geometry, material );
  	scene.add( cube );
  	cubes.push( cube );	
  	cube.position.x = Math.random() * 1000 - 500;
  	cube.position.y = Math.random() * 1000 - 500;
  	cube.position.z = Math.random() * 1000 - 500;
  	cube.modifier = Math.random();
  	cube.material.transparent = true;
  	cube.material.opacity = 1*Math.random();
}

  // Render
  var counter = 0
  function render(){
  	counter+=0.03;
  	for (var i = cubes.length - 1; i >= 0; i--) {
  		var cosPos = Math.cos(counter*(2*cubes[i].modifier)) * cubes[i].modifier;

  		if(cubes[i].position.z > 0){
  			cubes[i].position.z -= cosPos;	
  		}else if(cubes[i].position.z < 0){
  			cubes[i].position.z += cosPos;
  		}
  		
  		if(cubes[i].position.x > 0){
  			cubes[i].position.x -= cosPos;	
  		}else if(cubes[i].position.x < 0){
  			cubes[i].position.x += cosPos;
  		}
  		
  		if(cubes[i].position.y > 0){
  			cubes[i].position.y -= cosPos;	
  		}else if(cubes[i].position.y < 0){
  			cubes[i].position.y += cosPos;
  		}
  		cubes[i].material.color = new THREE.Color(
  			Math.sin(counter+i)+1, 
  			Math.cos(counter+i)+1,
  			Math.cos(counter+i)+1 
  		);
  		
  	}
  	scene.rotation.y += 0.003;
  	scene.rotation.z += 0.001;
  	scene.rotation.x += 0.001;
  	
  	camera.lookAt(scene.position)
  	
  	renderer.render(scene,camera);
  	window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);