let renderer, scene, camera, group;
let mouseX = 0;
let mouseY = 0;
let stone;
let points = [];

function onMouseMove(event) {
  event.preventDefault();

  mouseX = event.clientX / window.innerWidth * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function generateLights() {
  let pointLight = new THREE.DirectionalLight(0x415b90, 2);
  pointLight.decay = 1;
  pointLight.position.set(65, 55, -20);

  let aLight = new THREE.DirectionalLight(0xdd105e, 0.5);
  aLight.decay = 1;
  aLight.position.set(-20, 35, -30);

  let cLight = new THREE.SpotLight(0xffffff, 0.05);
  cLight.position.set(0, 120, 250);

  let sphere = new THREE.SphereGeometry(0.1, 5, 5);
  for (let i = 0; i < 3; i++) {
    let light = new THREE.PointLight(0xF7EBC9, 0.8, 10);
    light.add(
    new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xF7EBC9 })));

    scene.add(light);
    points.push(light);
  }

  scene.add(pointLight);
  scene.add(aLight);
  scene.add(cLight);
}

function generateStone(geometry, material) {
  geometry.computeVertexNormals();
  stone = new THREE.Mesh(geometry, material);
  group.add(stone);
}

function init() {
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  let loader = new THREE.JSONLoader();
  loader.load(
  "https://gist.githubusercontent.com/lisilinhart/f927c470ad4daf8cde4478d9b5af26fd/raw/d58a1722b97e520cff847056a0ba8ef077831062/stone.json",
  generateStone);


  camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  10000);

  camera.zoom = 2;
  camera.position.set(0, 0, 70);
  camera.updateProjectionMatrix();

  scene = new THREE.Scene();
  scene.updateMatrixWorld();

  group = new THREE.Group();
  group.position.y = -5;
  scene.add(group);
  generateLights();

  window.addEventListener("resize", onWindowResize, false);
  document.addEventListener("mousemove", onMouseMove, false);
}

function updatePoints(time) {
  points[0].position.x = Math.sin(time * 0.3) * 10;
  points[0].position.y = Math.sin(time * 0.5) * 5;
  points[0].position.z = Math.cos(time * 0.4) * 5;

  points[1].position.x = Math.sin(time * 0.5) * 5;
  points[1].position.y = Math.cos(time * 0.8) * 5;
  points[1].position.z = Math.sin(time * 0.7) * 10;

  points[2].position.x = Math.cos(time * 0.3) * 10;
  points[2].position.y = Math.cos(time * 0.5) * 5;
  points[2].position.z = Math.sin(time * 0.2) * 5;
}

function update(event) {
  requestAnimationFrame(update);

  let time = Date.now() * 0.0008;
  updatePoints(time);

  if (group) {
    group.rotation.y = mouseX * 0.25;
    group.rotation.x = mouseY * -0.25;
  }

  renderer.render(scene, camera);
}


init();
update();