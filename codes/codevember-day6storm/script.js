// Renderer
var renderer = new THREE.WebGLRenderer({canvas:document.getElementById('main'),antialiasing:true});
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth,window.innerHeight);

// Camera
var camera = new THREE.PerspectiveCamera(55,window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.x = -50;
camera.position.y = 100;

// Scene
var scene = new THREE.Scene();

// Light
var light1 = new THREE.PointLight(0xffffff,0.5);
scene.add(light1);

// Material
var material = new THREE.MeshLambertMaterial( { 
	color: 0x49c9ff
} );
var loader = new THREE.TextureLoader();
loader.crossOrigin= "";
var texture1 = loader.load( "https://s3-us-west-2.amazonaws.com/s.cdpn.io/764435/thuglee-chrome-02c.jpg" );
var material = new THREE.ShaderMaterial( {
    uniforms: {
      tMatCap: {
        type: 't',
        value: texture1
      },

      time: { type: "f", value: 0 },	
    },
    vertexShader: document.getElementById( 'vertexshader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
    shading: THREE.FlatShading
} );
			
// Geometry
var meshArray = [];
var r = Math.random;

// Create + init position mesh
var ammount = 200;
var ammountLines = 650;
var dimension = 40;
var gridAmmount = ammount/10;
var gridX = 0;
var gridY = 0;
var cubes = [];
var lines = [];

for (var i = 0; i < ammountLines; i++) {
  var geometryLines = new THREE.BoxGeometry( 4,2,2);
  var materialLines = new THREE.MeshPhongMaterial( { color:0xffffff} );
  var line = new THREE.Mesh( geometryLines, materialLines );
  scene.add( line );
  lines.push( line );	
  line.rotation.z = Math.random() * 360;
  line.position.x = Math.random() * (dimension * 15) - (dimension / 2 * 15);
  line.position.y = Math.random() * (dimension * 15) - (dimension / 2 * 15);
  line.position.z = (-600 * Math.random()) + 150;
  line.modifier = Math.random();

}

for (var i = 0; i < ammount; i++) {
  var geometry = new THREE.BoxGeometry( dimension/2,dimension/2,dimension/2);
  var material1 = new THREE.MeshPhongMaterial( { color:0xffffff,shininess :500} );
  gridX++;

  if(gridX==ammount/10){
    gridY+=1;
    gridX=0;
  }
}

function generateCube(){
	var size = r();
	var sizz = Math.round(2*Math.random());
	var geometry = new THREE.TetrahedronGeometry(1, 0);
	var mesh = new THREE.Mesh(geometry,material);
	mesh.position.x = 0;
	mesh.position.y = -50;
	mesh.position.z = r() * 150 - 400;
	return mesh
}
				
window.requestAnimationFrame(render);

var spawnCount = 0;
var spawnTime = 1;
var counter = 0;

function render(){
	counter+=0.001;
	for (var i = lines.length - 1; i >= 0; i--) {
    	lines[i].position.y += 5* lines[i].modifier;
	    if(lines[i].position.y >300){
			lines[i].position.y = -100;
	    }
	}

	spawnCount++;
	if(spawnCount == spawnTime){
		var mesh = generateCube();
		scene.add(mesh);
		mesh.angle = 0;
		mesh.angleMultiplier = (0.02 * r()) + 0.02;
		mesh.angleGoingDown = false;
		mesh.spiralCounter = 0;
		mesh.spiralMultiplier = (0.02 * r()) + 0.1;
		meshArray.push(mesh);
		spawnCount = 0;
	}

	for (var i = meshArray.length - 1; i >= 0; i--) {
		meshArray[i].rotation.x += 0.05;
		meshArray[i].rotation.y += 0.005;
		meshArray[i].scale.x += 0.4 * meshArray[i].spiralMultiplier;
		meshArray[i].scale.y += 0.4 * meshArray[i].spiralMultiplier;
		meshArray[i].scale.z += 0.4 * meshArray[i].spiralMultiplier;

		meshArray[i].position.x +=  ( Math.cos(meshArray[i].angle) * meshArray[i].spiralCounter) / 10 ;
		meshArray[i].position.z +=  ( Math.sin(meshArray[i].angle) * meshArray[i].spiralCounter) / 10;
		meshArray[i].position.y += 0.8;

		meshArray[i].angle += meshArray[i].angleMultiplier;
		meshArray[i].spiralCounter += meshArray[i].spiralMultiplier;
    if(meshArray[i].position.y > 300){
      meshArray.splice(i,1);
      scene.remove(meshArray[i]);
    }
    
	}
	renderer.render(scene,camera);
	window.requestAnimationFrame(render);
}