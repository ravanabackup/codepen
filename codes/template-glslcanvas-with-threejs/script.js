const R360 = Math.PI * 2.0;
let lastTimeStamp = Date.now();

const mousePoint = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2 };


const render = () => {
  const timeStamp = Date.now();
  const progress = (timeStamp - lastTimeStamp) * 0.005;
  mesh.material.uniforms.time.value += progress;
  mesh.material.uniforms.time.value %= R360;
  mesh.material.uniforms.mouse.value.x = mousePoint.x;
  mesh.material.uniforms.mouse.value.y = mousePoint.y;
  renderer.render(scene, camera);
  lastTimeStamp = timeStamp;
  requestAnimationFrame(render);
};

const onResize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  mesh.material.uniforms.resolution.value.x = width;
  mesh.material.uniforms.resolution.value.y = height;
  // renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

/* scene
--------------------------------------*/
const scene = new THREE.Scene();

/* renderer
--------------------------------------*/
const renderer = new THREE.WebGLRenderer();
// renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('WebGL-output').appendChild(renderer.domElement);
renderer.domElement.addEventListener('mousemove', e => {
  mousePoint.x = e.offsetX;
  mousePoint.y = e.offsetY;
});

/* camera
--------------------------------------*/
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 0.11);
camera.lookAt(scene.position);

/* mesh
--------------------------------------*/
const uniforms = {
  time: {
    type: 'f',
    value: Math.random() * 100 },

  resolution: {
    type: 'v2',
    value: new THREE.Vector2(window.innerWidth, window.innerHeight) },

  mouse: {
    type: 'f',
    value: new THREE.Vector2() } };


const shaderMaterial = new THREE.RawShaderMaterial({
  uniforms: uniforms,
  vertexShader: document.getElementById('vs').textContent,
  fragmentShader: document.getElementById('fs').textContent });

const planeBufferGeometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1);
const mesh = new THREE.Mesh(planeBufferGeometry, shaderMaterial);
mesh.position.z = -0.1;
scene.add(mesh);

/* add event on window
--------------------------------------*/
window.addEventListener('resize', onResize, false);

render();