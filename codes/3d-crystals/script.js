/* 
 * 3D CRYSTALS
 * Made with ThreeJS - Enjoy!
 * https://threejs.org/
 *
 * Move cursor over the crystals to change their material and light effect.
 * On mobile touch crystals to change them, and touch anywhere else on the screen to go back to default material. 
 *
 * If you find any bugs or have any tips to improve the performance of this code, please do tell. I'm trying to learn the most performant ways to work with threejs in both browser and mobile :) 
 *
 * #029 - #100DaysOfCode
 * By ilithya | 2019
 */

const nearDist = 1;
const farDist = 1000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
nearDist,
farDist);

camera.position.set(0, 0, 500);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("hotpink"); // Backgrond Color #ff69b4
renderer.setPixelRatio(window.devicePixelRatio); // For HiDPI devices to prevent bluring output canvas
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector("#canvas-wrapper").appendChild(renderer.domElement);

// CREATE CRYSTALS
const crystalSize = 50;
const colorMaterial = '#6978ff'; // Purple
const colorSpecular = '#78ff69'; // Green

const geometry = new THREE.BoxBufferGeometry(crystalSize, crystalSize, crystalSize);
const material = new THREE.MeshNormalMaterial(); // Maps the normal vectors to RGB colors

const group = new THREE.Group();
for (let i = 0; i < 250; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  const dist = crystalSize * 3.8;
  const distDouble = dist * 2;
  const tau = 2 * Math.PI;

  mesh.position.x = Math.random() * distDouble - dist;
  mesh.position.y = Math.random() * distDouble - dist;

  mesh.rotation.x = Math.random() * tau;
  mesh.rotation.y = Math.random() * tau;

  // Manually control when 3D transformations recalculation occurs for better performance
  mesh.matrixAutoUpdate = false;
  mesh.updateMatrix();

  group.add(mesh);
}
scene.add(group);

// CREATE RAYCASTING FOR INTERACTION EFFECTS
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const newMaterial = new THREE.MeshPhongMaterial({
  color: colorMaterial,
  specular: colorSpecular,
  shininess: 50 });


// Add light for MeshPhongMaterial to be visible in scene
const light = new THREE.DirectionalLight(); // Default is white and intensity 1
light.position.set(0, 0.5, 1); // FYI .normalize() won't make a difference here
scene.add(light);

function onMouseMove(e) {
  mouse.x = e.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Calculate objects intersecting the picking ray
  const ob = group.children;
  const intersects = raycaster.intersectObjects(ob, true);

  ob.forEach(el => {
    el.material = intersects.length > 0 ? newMaterial : material;
    el.material.needsUpdate = true;
  });
}
document.addEventListener('mousemove', onMouseMove);

// CREATE ANIMATIONS
const createAnimRotation = () => {
  group.rotation.x += 0.01;
  group.rotation.z += 0.01;
};

// RENDER 3D GRAPHIC
const render = () => {
  requestAnimationFrame(render);

  // Rotates the object to face a point in world space
  camera.lookAt(scene.position);

  createAnimRotation();

  renderer.render(scene, camera);
};
render();