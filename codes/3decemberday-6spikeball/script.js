var renderer = new THREE.WebGLRenderer({canvas:document.getElementById('main'),antialiasing:true});
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.gammaInput = true;
renderer.gammaOutput = true;

// Scene
var scene = new THREE.Scene();

// Camera
var camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set( -30,45 , 0 );
scene.add( camera );

// Light
var light2 = new THREE.PointLight( 0xff0000, 100,1000 );
light2.position.set( 0,0,0 );
scene.add( light2 );

// Triangles
var ammount = 500;
var lines = [];
for (var i = 0; i < ammount; i++) {
	var matLine = new THREE.MeshPhongMaterial({ color: 0xff0000,shininess:1000  });
	var geoLine = new THREE.ConeGeometry(2,20 * Math.random() + 10,6*Math.random()+3 );
	geoLine.applyMatrix( new THREE.Matrix4().makeTranslation( 3, 15, 3 ) );
	var mshLine = new THREE.Mesh( geoLine, matLine );
	mshLine.material.color = new THREE.Color(2,2,2);
	mshLine.rotation.x =  Math.random() * 360;
	mshLine.rotation.z =  Math.random() *360 ;
	mshLine.castShadow = true;
	mshLine.receiveShadow = true;
	mshLine.material.transparent = true;
	mshLine.material.opacity = 0.8;
	lines.push(mshLine);
	scene.add(mshLine);
}

var counter=0;
function render(){
	counter+=0.001;
	for (var i = lines.length - 1; i >= 0; i--) {
		lines[i].rotation.x += 0.003;
		lines[i].rotation.y += 0.002;
	}
	camera.position.x = scene.position.x + 30 * Math.cos( 2 * counter );         
	camera.position.z =  scene.position.z + 30 * Math.sin( 2 * counter );
	camera.lookAt(scene.position);

	renderer.render(scene,camera);
	window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);