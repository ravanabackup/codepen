var w = window.innerWidth,
    h = window.innerHeight;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, w/h, 0.1,1000);
camera.position.z = 200;


var renderer = new THREE.WebGLRenderer();
renderer.setSize( w, h);
renderer.setClearColor( 0xefefef, 0);

document.body.appendChild( renderer.domElement );

var geometry = new THREE.TorusKnotGeometry(50, 6, 500, 16, 3, 2, 2);
var material = new THREE.MeshNormalMaterial({wireframe:true});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var light = new THREE.PointLight(0xFFFF00);
light.position.set(10, 10, 25);
scene.add(light);

var render = function () {
  requestAnimationFrame(render);
  
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.005;
  cube.rotation.z += 0.05;
  
  renderer.render(scene, camera);
  
};
render();