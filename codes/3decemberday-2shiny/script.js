// Renderer
var renderer = new THREE.WebGLRenderer({canvas:document.getElementById('main'),antialiasing:true});
renderer.setClearColor(0x000000);
renderer.setSize(window.innerWidth,window.innerHeight);

// Camera
var camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.1, 5000 );
camera.position.z = 900;

// Scene
var scene = new THREE.Scene();

// Light
var light1 = new THREE.PointLight(0xffffff,1);
light1.position.z = -100;
scene.add(light1);

var ammount = 1000;
var cubes = [];
var counter = 0;

for (var i = 0; i < ammount; i++) {
    var geometry = new THREE.BoxGeometry( 20, 20, 20 );
    var material = new THREE.MeshPhongMaterial( { color:0x00CCFF } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    cubes.push( cube );	
    cube.position.x = Math.random() * 1000 - 500;
    cube.position.y = Math.random() * 1000 - 500;
    cube.position.z = Math.random() * 1000 - 500;
}

window.requestAnimationFrame(render);


function render(){
    counter+=0.1;
    for (var i = cubes.length - 1; i >= 0; i--) {
        cubes[i].rotation.z += 0.02;
        cubes[i].scale.z +=Math.sin(counter/20)/20 ;
        cubes[i].scale.x -=Math.sin(counter/20)/1000;
        cubes[i].scale.y -=Math.sin(counter/20)/1000;
    }
    camera.position.z +=  Math.sin(counter/30)/500 ;
    renderer.render(scene,camera);
    window.requestAnimationFrame(render);
}