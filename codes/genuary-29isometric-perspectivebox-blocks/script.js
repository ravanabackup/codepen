/*
  Johan Karlsson, 2022
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/

let scene;
let camera;
let renderer;
let boxes;
let plane;
let colorSchemeIndex;
const frustumSize = 100;

function setup() {
  setupColors();
  setupScene();
  setupCamera();
  setupRenderer();
  setupLights();
  setupEventListeners();
}

function setupColors() {
  colors = [[
  "#A8279F",
  "#F0DC8C",
  "#F551E9",
  "#38F5E0",
  "#6FA8A2"],
  [
  "#AB87A6",
  "#F0E2A5",
  "#F596E9",
  "#7DF5EC",
  "#83A8A6"],
  [
  "#754837",
  "#F7CDBE",
  "#F59573",
  "#75625A",
  "#C2765B"],
  [
  "#6F6175",
  "#D283F7",
  "#E8CBF5",
  "#643E75",
  "#B7A1C2"],
  [
  "#A7846C",
  "#385375",
  "#59B3BD",
  "#851141",
  "#615A49"],
  [
  "#A5C2BB",
  "#4F8F7F",
  "#E9F4EB",
  "#F6ACDE",
  "#BFA5C2"],
  [
  "#7CB6A3",
  "#886C5D",
  "#A8C6E2",
  "#BD3799",
  "#DFC99A"],
  [
  "#85C7D1",
  "#6B2A8A",
  "#FFF236",
  "#BD4674",
  "#E0AB84",
  "#333333"],
  [
  "#85A9D1",
  "#754D8A",
  "#FFBB92",
  "#BD6987",
  "#98898F"]];

}
function pickRandomColorScheme() {
  let nrOfColorSchemes = colors.length;
  colorSchemeIndex = Math.floor(Math.random() * nrOfColorSchemes);
}

function getRandomColor() {
  let len = colors[colorSchemeIndex].length;
  let randomIndex = Math.floor(Math.random() * len);
  return colors[colorSchemeIndex][randomIndex];
}

function setupScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
}

function setupPlane() {
  if (plane) {
    scene.remove(plane);
  }
  let w = window.innerWidth;
  let h = window.innerHeight;
  let geometry = new THREE.PlaneGeometry(w * 20, h * 20);
  let material = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.6,
    color: getRandomColor(),
    side: THREE.DoubleSide });

  material.lights = true;

  plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = Math.PI / 2;
  plane.position.x = 10;
  plane.position.z = 200;
  plane.position.y = 0;
  plane.receiveShadow = true;
  scene.add(plane);
}

function setupCamera() {
  const aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 1, 1000);
  camera.position.x = 60;
  camera.position.y = 60;
  camera.position.z = 60;
  camera.lookAt(scene.position);
  scene.add(camera);
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);
}

function setupBoxes() {
  if (boxes && boxes.length > 0) {
    boxes.forEach(b => scene.remove(b));
  }
  boxes = [];
  for (let i = 0; i < 1000; i++) {
    let w = Math.random() * 10 + 0.1;
    let h = Math.random() * 10 + 0.1;
    let d = Math.random() * 10 + 0.1;
    let geometry = new THREE.BoxGeometry(w, h, d);
    let color = new THREE.Color(getRandomColor());
    let material = new THREE.MeshPhongMaterial({
      color: color,
      shininess: 1 });


    let x = (Math.random() - 0.5) * 200;
    let z = (Math.random() - 0.5) * 200;
    let y = h * 0.5;

    let box = new THREE.Mesh(geometry, material);
    box.position.set(x, y, z);
    box.castShadow = true;
    box.receiveShadow = true;

    scene.add(box);
    boxes.push(box);
  }
}

function setupLights() {
  let ambientLight = new THREE.AmbientLight(0x888888);
  scene.add(ambientLight);

  let spotLight = new THREE.SpotLight(0xaaaaaa);
  spotLight.position.set(-100, 100, 100);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 4096;
  spotLight.shadow.mapSize.height = 4096;

  scene.add(spotLight);
}

function setupEventListeners() {
  window.addEventListener("resize", onWindowResize);
  window.addEventListener("click", draw);
}

function onWindowResize() {
  const aspect = window.innerWidth / window.innerHeight;

  camera.left = -frustumSize * aspect / 2;
  camera.right = frustumSize * aspect / 2;
  camera.top = frustumSize / 2;
  camera.bottom = -frustumSize / 2;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  draw();
}

function draw() {
  pickRandomColorScheme();
  setupBoxes();
  setupPlane();
  renderer.render(scene, camera);
}

setup();
draw();