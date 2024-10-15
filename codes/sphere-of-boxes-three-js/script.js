/*
  Johan Karlsson, 2019
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/

let scene;
let camera;
let renderer;
let boxes;
let tick;
let w, h;
let simplex;
let movingLight;

const config = {
  nrOfBoxes: 500,
  r: 10 };


function setup() {
  setupNoise();
  setupScene();
  setupCamera();
  setupRenderer();
  setupBoxes();
  setupLights();
  setupEventListeners();
}

function setupNoise() {
  simplex = new SimplexNoise();
}

function setupScene() {
  tick = 0;
  scene = new THREE.Scene();
}

function setupCamera() {
  w = window.innerWidth;
  h = window.innerHeight;
  let res = w / h;
  camera = new THREE.PerspectiveCamera(75, res, 0.1, 1000);
  camera.position.z = 22;

  let controls = new THREE.OrbitControls(camera);
  controls.update();
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function setupBoxes() {
  let geometry = new THREE.BoxGeometry(0.4, 0.4, 4);
  boxes = [];

  for (let i = 0; i < config.nrOfBoxes; i++) {
    let material = new THREE.MeshPhongMaterial({
      shininess: 60,
      transparent: true,
      opacity: 0.75 });

    let box = new THREE.Mesh(geometry, material);
    let θ = Math.random() * Math.PI;
    let φ = Math.random() * Math.PI * 2;
    let x = config.r * Math.sin(θ) * Math.cos(φ);
    let y = config.r * Math.sin(θ) * Math.sin(φ);
    let z = config.r * Math.cos(θ);
    box.position.set(x, y, z);
    box.lookAt(0, 0, 0);
    scene.add(box);
    boxes.push(box);
  }
}

function setupLights() {
  let ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  let spotLight = new THREE.SpotLight(0x444444);
  spotLight.position.set(30, 60, 60);
  scene.add(spotLight);

  let centerPointLight = new THREE.PointLight();
  scene.add(centerPointLight);

  movingLight = new THREE.PointLight();
  scene.add(movingLight);
}

function setupEventListeners() {
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  w = window.innerWidth;
  h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

function moveLight() {
  let θ = Math.PI / 2;
  let φ = tick / 50;
  let x = config.r * Math.sin(θ) * Math.cos(φ);
  let y = config.r * Math.sin(θ) * Math.sin(φ);
  let z = config.r * Math.cos(θ);
  movingLight.position.set(x, y, z);
}

function draw() {
  requestAnimationFrame(draw);
  renderer.render(scene, camera);
  let zoom = 30;
  boxes.forEach(box => {
    let x = box.position.x;
    let y = box.position.y;
    let z = box.position.z;
    let n = simplex.noise4D(
    x / zoom,
    y / zoom,
    z / zoom,
    tick / 140);
    box.rotateZ(n / 20);
    let hue = (n + 1) * 90 + 180;
    let color = new THREE.Color(`hsl(${hue}, 90%, 40%)`);
    box.material.color = color;
  });

  moveLight();

  tick++;
}

setup();
draw();