import * as THREE from "https://cdn.skypack.dev/three@0.139.2";
import orbitControlsEs6 from "https://cdn.skypack.dev/orbit-controls-es6@2.0.1";

const canvasContainer = document.getElementById("container");
// Set up the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
var ww = window.innerWidth;
var wh = window.innerHeight;

// Renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(ww, wh);
renderer.setClearColor(0x080808);
document.body.appendChild(renderer.domElement);

// Lines
const lines = 20;

const directions = [
  new THREE.Vector3(0.1, 0, 0), // Right
  new THREE.Vector3(-0.1, 0, 0), // Left
  new THREE.Vector3(0, 0.1, 0), // Up
  new THREE.Vector3(0, -0.1, 0), // Down
  new THREE.Vector3(0, 0, 0.1), // Forward
  new THREE.Vector3(0, 0, -0.1) // Backward
];

for (let i = 0; i <= lines; i++) {
  const points = [];
  const initialPointA = new THREE.Vector3(0, 0, 0);
  const initialPointB = new THREE.Vector3(0, 0, 0);
  points.push(initialPointA, initialPointB);
  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.MeshBasicMaterial({ color: color,  linewidth: 2,
  opacity: 1,
  transparent: true,
  specularIntensity: 0.2 });
  const line = new THREE.Line(geometry, material);
  scene.add(line);

  function draw() {
    const lastPoint = points[points.length - 1];
    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];
    const newPoint = lastPoint.clone().add(randomDirection);
    points.push(newPoint);
    geometry.setFromPoints(points);
  }
  function animate() {
    requestAnimationFrame(animate);
    draw(); // Extend the line
    renderer.render(scene, camera);
  }

  animate();
}

new orbitControlsEs6(camera, renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  //renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
});

function handleKeyPress(event) {
  const speed = 0.1; // Adjust the speed as needed
  const keyCode = event.keyCode;
console.log(keyCode)
  switch (keyCode) {
    case 37: // Left arrow key
      camera.position.x -= speed;
      break;
    case 38: // Up arrow key
      camera.position.y += speed;
      break;
    case 39: // Right arrow key
      camera.position.x += speed;
      break;
    case 40: // Down arrow key
      camera.position.y -= speed;
      break;
  }
}

window.addEventListener("onkeypress", handleKeyPress);


resize();
window.addEventListener("resize", resize);
function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
}