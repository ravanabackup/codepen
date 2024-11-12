var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true
});

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 4;

renderer.setSize(window.innerWidth, window.innerHeight);
window.onresize = function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

var starsGeometry = new THREE.Geometry();
for(i=0; i<3000; i++){
	var star = new THREE.Vector3();
	star.x = THREE.Math.randFloatSpread(2000);
	star.y = THREE.Math.randFloatSpread(2000);
	star.z = THREE.Math.randFloatSpread(2000);
	starsGeometry.vertices.push(star);
}
var starsMaterial = new THREE.PointsMaterial({color: 0x59e7ff});
var starField = new THREE.Points(starsGeometry,starsMaterial);
scene.add(starField);

var geo = new THREE.SphereGeometry(1, 64, 64);
var mat = new THREE.MeshPhongMaterial({
  vertexColors: THREE.FaceColors,
  specular: 0xffffff,
  shininess: 2000,
});
var mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

for(var i=0; i<8064;i++){
  var col = 200+Math.sin(i)*5;
  mesh.geometry.faces[i].color = new THREE.Color("hsl("+Math.abs(col)+", 100%, 50%)");
}

var update = function() {
  for (var i=0; i<mesh.geometry.vertices.length; i++) {
    var v = mesh.geometry.vertices[i];
    v.normalize().multiplyScalar(0.15*noise.simplex3(v.x*2+Date.now()*0.001, v.y*2, v.z*2)+1);
  }
  mesh.geometry.computeVertexNormals();
  mesh.geometry.normalsNeedUpdate = true;
  mesh.geometry.verticesNeedUpdate = true;
};

var light = new THREE.PointLight(0xffffff,1,5);
light.position.set(0,0,1.5);
scene.add(light);
var light = new THREE.PointLight(0xffffff,1,5);
light.position.set(0,1.5,0);
scene.add(light);

function render() {
  update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();