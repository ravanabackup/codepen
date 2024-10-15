/*
  Johan Karlsson (DonKarlssonSan) 2021
*/

let scene;
let camera;
let renderer;
let rings;
let nrOfCuboids;
let then;

function setup() {
  nrOfCuboids = 128;
  setupScene();
  setupCamera();
  setupRenderer();
  setupCuboids();
  setupLights();
  setupEventListeners();
}

function setupScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
}

function setupCamera() {
  let res = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, res, 0.1, 1000);
  camera.position.z = 8;
  camera.position.y = -15;
  camera.lookAt(0, 0, 0);
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function setupCuboids() {
  rings = [];
  addCuboidRing(8, new THREE.BoxGeometry(3.6, 0.2, 3.6));
}

function addCuboidRing(radius, geometry) {
  let cuboids = [];
  for (let i = 0; i < nrOfCuboids; i++) {
    let angle = i / nrOfCuboids * Math.PI * 2;
    let cuboid = createCuboid(i, geometry);
    cuboid.position.x = Math.cos(angle) * radius;
    cuboid.position.y = Math.sin(angle) * radius;
    scene.add(cuboid);
    cuboids.push(cuboid);
  }
  rings.push(cuboids);
}

function createCuboid(i, geometry) {
  let material = new THREE.MeshPhongMaterial({
    color: 0x090909,
    shininess: 200 });

  return new THREE.Mesh(geometry, material);
}

function setupLights() {
  const ambientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight);

  addSpotLight(-30, 60, 60);
  addSpotLight(-10, 20, 60);
  addSpotLight(30, 30, 30);
  addSpotLight(-30, -60, -90);
  addSpotLight(10, -30, 30);
  addSpotLight(20, -60, -20);

  const directionalLight = new THREE.DirectionalLight(0x666666, 0.9);
  directionalLight.position.set(0, -1, -1);
  scene.add(directionalLight);
}

function addSpotLight(x, y, z) {
  let spotLight = new THREE.SpotLight(0xcccccc);
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
  rings.forEach((cuboids, ringIndex) => {
    let sign = ringIndex % 2 === 0 ? -1 : 1;
    cuboids.forEach((cuboid, cuboidIndex) => {
      let offsetAngle = cuboidIndex / nrOfCuboids * Math.PI;
      let zAngle = cuboidIndex / nrOfCuboids * Math.PI * 2;
      let zRotation = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), zAngle);

      let a = (angle + zAngle) * sign;
      let wave = (Math.sign(Math.sin(a)) - 1) * Math.pow(Math.sin(a), 2) * 0.5;
      let yRotation = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), (angle + offsetAngle + wave) * sign);
      zRotation.multiply(yRotation);
      cuboid.rotation.setFromRotationMatrix(zRotation);
    });
  });
}

setup();
draw(1);