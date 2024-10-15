let scene;
let camera;
let renderer;
let sphere;
let simplex;

function setup() {
  setupNoise();
  setupScene();
  setupCamera();
  setupRenderer();
  setupSphere();
  setupLights();
  setupEventListeners();
}

function setupNoise() {
  simplex = new SimplexNoise();
}

function setupScene() {
  scene = new THREE.Scene();
}

function setupCamera() {
  let res = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(
  75,
  res,
  0.1,
  1000);
  camera.position.z = 2.5;
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({
    antialias: true });

  renderer.setSize(
  window.innerWidth,
  window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function setupSphere() {
  let geometry = new THREE.SphereGeometry(1, 32, 32);
  let hue = 0;
  let color = new THREE.Color(`hsl(${hue}, 70%, 60%)`);

  let noiseDataUri = renderNoiseImage();
  let texture = new THREE.TextureLoader().load(noiseDataUri);
  let material = createMaterial(texture);

  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
}

function createMaterial(texture) {
  let material = new THREE.MeshStandardMaterial({
    bumpMap: texture,
    map: texture,
    metalness: 0.6,
    roughness: 0.7,
    color: 0x33ff99,
    side: THREE.DoubleSide });

  material.lights = true;

  return material;
}

function setupLights() {
  let ambientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight);

  let spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(60, 60, 60);
  spotLight.castShadow = true;
  scene.add(spotLight);
}

function setupEventListeners() {
  window.addEventListener("resize", onWindowResize);
}

function renderNoiseImage() {
  // Size "must" be a power of 2
  let zoom = 1;
  let size = 1024;
  let canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  let ctx = canvas.getContext("2d");
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      let lon = x / size * Math.PI * 2 - Math.PI / 2;
      let lat = y / size * Math.PI - Math.PI / 2;

      let xs = 3 * Math.cos(lat) * Math.cos(lon) / zoom;
      let ys = 3 * Math.cos(lat) * Math.sin(lon) / zoom;
      let zs = 3 * Math.sin(lat) / zoom;

      let n = Math.round((simplex.noise3D(xs, ys, zs) + 1) * 127);

      ctx.fillStyle = `rgb(${n}, ${n}, ${n})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  return canvas.toDataURL();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function draw() {
  requestAnimationFrame(draw);
  renderer.render(scene, camera);

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
}

setup();
draw();