/*
  Johan Karlsson (DonKarlssonSan) 2021
*/

let scene;
let camera;
let renderer;
let rings;
let radii;
let nrOfCuboids;
let then;

function setup() {
  nrOfCuboids = 64;
  setupScene();
  setupCamera();
  setupRenderer();
  setupCuboids();
  setupLights();
  setupEventListeners();
}

function setupScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);
}

function setupCamera() {
  let res = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, res, 0.1, 1000);
  camera.position.z = 19;
  camera.position.y = -45;
  camera.lookAt(0, 0, 0);
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function setupCuboids() {
  rings = [];
  radii = [];
  addCuboidRing(5, 3, 0.3);
  addCuboidRing(10, 4, 0.7);
  addCuboidRing(16, 5, 1.05);
  addCuboidRing(24, 6, 1.5);
  addCuboidRing(33, 7, 2.2);
}

function addCuboidRing(radius, x, y) {
  radii.push(radius);
  let geometry = new THREE.BoxGeometry(x, y, x);
  let material = new THREE.MeshPhongMaterial({
    color: 0x111111,
    shininess: 100 });

  let cuboid = new THREE.InstancedMesh(geometry, material, nrOfCuboids);
  cuboid.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(cuboid);
  rings.push(cuboid);
}

function setupLights() {
  let ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  addSpotLight(-30, 60, 60);
  addSpotLight(30, 60, 60);
  addSpotLight(30, 30, 60);
  addSpotLight(-30, 30, 30);
  addSpotLight(10, -30, 30);
}

function addSpotLight(x, y, z) {
  let spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(x, y, z);
  scene.add(spotLight);
}

function setupEventListeners() {
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function draw(now) {
  requestAnimationFrame(draw);
  renderer.render(scene, camera);
  let angle = now / 1000;
  const dummy = new THREE.Object3D();
  rings.forEach((cuboidInstancedMesh, ringIndex) => {
    let sign = ringIndex % 2 === 0 ? -1 : 1;
    for (let cuboidIndex = 0; cuboidIndex < nrOfCuboids; cuboidIndex++) {
      let r = radii[ringIndex];
      let offsetAngle = cuboidIndex / nrOfCuboids * Math.PI;
      dummy.position.set(Math.cos(offsetAngle * 2) * r, Math.sin(offsetAngle * 2) * r, 0);

      let zAngle = cuboidIndex / nrOfCuboids * Math.PI * 2;
      let zRotation = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), zAngle);
      let a = (angle + zAngle) * sign;
      let wave = (Math.sign(Math.sin(a)) - 1) * Math.pow(Math.sin(a), 2) * 0.5;
      let yRotation = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), (angle + offsetAngle + wave) * sign);
      zRotation.multiply(yRotation);

      dummy.rotation.setFromRotationMatrix(zRotation);
      dummy.updateMatrix();
      cuboidInstancedMesh.setMatrixAt(cuboidIndex, dummy.matrix);
    }
    cuboidInstancedMesh.instanceMatrix.needsUpdate = true;
  });
}

setup();
draw(1);