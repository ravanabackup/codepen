var mouse = { x: 0, y: 0 },
  positionFactor = 100,
  tick = 0,
  particleSystem,
  options = {
    spawnRate: 2000,
    maxParticles: 100000,
    particleLifetime: 1,
    turbulence: 3,
    size: 2,
    positionRandomness: 20,
    sizeRandomness: 1
  },
  mouseMoving = false,
  sizeSign = 1,
  sizeRandomness = 0.5;

/**
 * ====================================
 * SCENE
 * ====================================
 */

var scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

var canvas = document.getElementById("canvas"),
  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: false }),
  canvasWidth = document.documentElement.clientWidth,
  canvasHeight = document.documentElement.clientHeight;

renderer.setSize(canvasWidth, canvasHeight);

/**
 * ====================================
 * CAMERA
 * ====================================
 */

var camera = new THREE.PerspectiveCamera(
  30,
  canvasWidth / canvasHeight,
  0.1,
  10000
);
camera.position.z = 150;
scene.add(camera);

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.3;
controls.enableZoom = true;
controls.autoRotate = false;
controls.autoRotateSpeed = 0.5;
controls.minDistance = 100;
controls.maxDistance = 300;
controls.minAzimuthAngle = -0.5;
controls.maxAzimuthAngle = 0.5;

window.addEventListener("resize", function() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  renderer.setSize(canvasWidth, canvasHeight);
  camera.aspect = canvasWidth / canvasHeight;
  camera.updateProjectionMatrix();
});

/* 
=======================
Geometry
=======================
*/

var geometry = new THREE.CubeGeometry(5000, 5000, 5000),
  cubeMaterials = new THREE.MultiMaterial([
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("https://projects.thibautfoussard.com/particles2/1/textures/DarkStormyFront2048.jpg"),
      side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("textures/DarkStormyBack2048.jpg"),
      side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("textures/DarkStormyUp2048.jpg"),
      side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("textures/DarkStormyDown2048.jpg"),
      side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("textures/DarkStormyRight2048.jpg"),
      side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("textures/DarkStormyLeft2048.jpg"),
      side: THREE.DoubleSide
    })
  ]),
  cube = new THREE.Mesh(geometry, cubeMaterials);
scene.add(cube);

particleSystem = new THREE.GPUParticleSystem({
  maxParticles: options.maxParticles
});
scene.add(particleSystem);

particleOptions = {
  velocityRandomness: 0,
  color: "rgb(255,255,255)",
  lifetime: options.particleLifetime,
  size: options.size,
  turbulence: options.turbulence,
  positionRandomness: options.positionRandomness,
  sizeRandomness: options.sizeRandomness,
  velocity: new THREE.Vector3(),
  position: new THREE.Vector3(),
  colorRandomness: 0.2,
  smoothPosition: true,
  sizeAttenuation: false
};

/* 
=======================
Logic
=======================
*/

camera.lookAt(scene.position);
renderer.render(scene, camera);

var tack = 0;
(function animate() {
  tick += 0.01;
  tack += Math.random() / 10;
  controls.update();
  particleOptions.color = "rgb(255,255,255)";
  particleOptions.lifetime = options.particleLifetime;
  particleOptions.turbulence = options.turbulence;
  particleOptions.size = options.size;
  particleOptions.positionRandomness = options.positionRandomness;
  particleOptions.sizeRandomness = changeSizeRandomness();
  if (mouseMoving) {
    particleOptions.position.x = mouse.x;
    particleOptions.position.y = mouse.y;
  } else {
    var movingFactor = 0.2;
    particleOptions.position.x += Math.cos(tack) * movingFactor;
    particleOptions.position.y += Math.sin(tack) * movingFactor;
  }
  for (var x = 0; x < options.spawnRate; x++) {
    particleSystem.spawnParticle(particleOptions);
  }
  particleSystem.update(tick);

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
})();

var mouseMovingTimeout;
window.addEventListener("mousemove", function(event) {
  clearTimeout(mouseMovingTimeout);
  mouseMoving = true;
  mouseMovingTimeout = setTimeout(function() {
    mouseMoving = false;
  }, 20);
  mouse.x = (event.clientX / canvasWidth * 2 - 1) * positionFactor;
  mouse.y = (-(event.clientY / canvasHeight) * 2 + 1) * positionFactor;
});

function changeSizeRandomness() {
  sizeRandomness += 0.02 * sizeSign;
  if (sizeRandomness >= 10) {
    sizeSign = -1;
  }
  if (sizeRandomness <= 0.4) {
    sizeSign = 1;
  }
  return sizeRandomness;
}