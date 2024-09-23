var renderer, scene, camera, plane, amount;
var ww = window.innerWidth,
  wh = window.innerHeight;
var canvas = document.querySelector("canvas");

function init() {

  renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });
  renderer.setSize(ww, wh);
  renderer.setClearColor(0x030118);

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x030118,100,1000);

  camera = new THREE.PerspectiveCamera(50, ww / wh, 0.1, 10000);
  camera.position.set(0, 200, 700);
  scene.add(camera); 
  camera.lookAt(new THREE.Vector3(0,100,0));
  
  var light = new THREE.PointLight(0xa1b3ff, 2, 1800);
  light.position.set(0, 100, 200);
  scene.add(light);
  

  var geometry = new THREE.PlaneGeometry(1500, 800, 40, 40);
  var material = new THREE.MeshLambertMaterial({
    color: 0x57BBEC,
    map: texture
  });
  plane = new THREE.Mesh(geometry, material);
  amount = geometry.vertices.length;
  for (var i = 0; i < amount; i++) {
    var vector = plane.geometry.vertices[i];
    var distance = Math.sqrt((vector.x) * (vector.x) + (vector.y) * (vector.y));
    vector.offset = distance;
  }
  plane.rotation.x = -Math.PI/2.6;
  scene.add(plane);

  window.addEventListener("resize", onWindowResize);
  requestAnimationFrame(render);
}

var a = 0;
function render(a) {
  requestAnimationFrame(render);

  for (var i = 0; i < amount; i++) {
    var vector = plane.geometry.vertices[i];
    vector.z = Math.sin((a * 0.05 + vector.offset*2) * 0.02) * 20;
    vector.z -= Math.sin(vector.offset * 0.5) * 10;
  }
  plane.geometry.verticesNeedUpdate = true;
  
  camera.position.z = Math.sin(a*0.0003) * 100 + 500;

  renderer.render(scene, camera);
}

function onWindowResize() {

  ww = window.innerWidth;
  wh = window.innerHeight;

  renderer.setSize(ww, wh);
  camera.aspect = ww / wh;
  camera.updateProjectionMatrix();
}

var textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = "";
var texture = null;
textureLoader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/seaPattern.jpg", function(data) {
  texture = data;
  init();
});