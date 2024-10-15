/*
  Johan Karlsson, 2019
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/

let scene;
let camera;
let renderer;
let cubes;
let w, h;
let frustumSize;
let tick;

function setup() {
  setupScene();
  setupCamera();
  setupRenderer();
  setupCubes();
  setupEventListeners();
}

function setupScene() {
  scene = new THREE.Scene();
}

function setupCamera() {
  tick = 0;
  frustumSize = 10;
  w = window.innerWidth;
  h = window.innerHeight;
  let aspect = w / h;
  camera = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 1, 1000);
  camera.position.z = 6;
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  document.body.appendChild(renderer.domElement);
}

function setupCubes() {
  let size = 1;
  let geometry = createGeometry(size);
  cubes = [];
  let material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });
  let width = w / 60;
  let height = h / 60;
  let counter = 0;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let cube = new THREE.Mesh(geometry, material);
      cube.position.x = -width / 2 + x;
      let isEven = x % 2 === 0;
      let yOffset = isEven ? 0 : 0.5 * size;
      cube.position.y = -height / 2 + y + yOffset;
      cube.rotation.x = Math.PI / 4;
      cube.rotation.y = Math.PI / 4;
      scene.add(cube);
      cubes.push(cube);
      counter++;
    }
  }
}

function createGeometry(size) {
  let geometry = new THREE.BoxGeometry(size, size, size);
  let red = 0xbb0000;
  let white = 0xffffff;
  let black = 0x000000;
  geometry.faces[0].color.setHex(red);
  geometry.faces[1].color.setHex(red);
  geometry.faces[2].color.setHex(red);
  geometry.faces[3].color.setHex(red);
  geometry.faces[4].color.setHex(black);
  geometry.faces[5].color.setHex(black);
  geometry.faces[6].color.setHex(black);
  geometry.faces[7].color.setHex(black);
  geometry.faces[8].color.setHex(white);
  geometry.faces[9].color.setHex(white);
  geometry.faces[10].color.setHex(white);
  geometry.faces[11].color.setHex(white);
  return geometry;
}

function setupEventListeners() {
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  w = window.innerWidth;
  h = window.innerHeight;
  cubes.forEach(cube => {
    scene.remove(cube);
  });
  setupCubes();
  let aspect = w / h;
  camera.left = -frustumSize * aspect / 2;
  camera.right = frustumSize * aspect / 2;
  camera.top = frustumSize / 2;
  camera.bottom = -frustumSize / 2;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

function draw() {
  requestAnimationFrame(draw);
  renderer.render(scene, camera);
  cubes.forEach((cube, index) => {
    let angle = Math.PI * Math.sin(tick / 500);
    cube.rotation.x = angle;
    cube.rotation.z = angle;
  });
  tick++;
}

setup();
draw();