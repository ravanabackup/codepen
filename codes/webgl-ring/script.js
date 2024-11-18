container = document.createElement('div');
document.body.appendChild(container);



// サイズを指定
const width = window.innerWidth;
const height = window.innerWidth;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(45, width / height);
camera.position.set(0, 0, +1000);

// 平行光源
// const directionalLight = new THREE.DirectionalLight(0xFFFFFF)
// directionalLight.position.set(1, 1, 1)
// scene.add(directionalLight)
// ポイント光源
const pointLight = new THREE.PointLight(0xFFFFFF, 2.5, 600);
scene.add(pointLight);

// 箱を作成
const geometry = new THREE.TorusGeometry(30, 10, 50, 50);
const material = new THREE.MeshToonMaterial({ color: 0x6699ff });
const group = new THREE.Group();
for (let i = 0; i < 2000; i++) {
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = Math.random() * 2000 - 1000;
  mesh.position.y = Math.random() * 2000 - 1000;
  mesh.position.z = Math.random() * 2000 - 1000;
  mesh.rotation.x = Math.random() * 2 * Math.PI;
  mesh.rotation.y = Math.random() * 2 * Math.PI;
  mesh.matrixAutoUpdate = false;
  mesh.updateMatrix();
  group.add(mesh);
}
scene.add(group);

// scene.fog = new THREE.Fog(0x000000, 1400, 2000)
scene.fog = new THREE.FogExp2(0x000000, 0.0002);
animate();

function animate() {
  requestAnimationFrame(animate);
  render();
}
function render() {
  group.rotation.x += 0.0005;
  group.rotation.y += 0.002;
  renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize, false);
onWindowResize();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}