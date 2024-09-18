import * as THREE from "https://cdn.skypack.dev/three@0.133.1";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls";

const getAspectRatio = () => canvas.offsetWidth / canvas.offsetHeight;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'high-performance',
  canvas });


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x331144);

const camera = new THREE.PerspectiveCamera(45, getAspectRatio(), 0.01, 1000);
camera.position.set(0, 3, 8);
camera.lookAt(0, 0, 0);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);

const geometry = new THREE.OctahedronGeometry(1, 32);
geometry.rotateX(Math.PI * -.5);

const material = new THREE.ShaderMaterial({
  vertexShader: shader_simplexNoise4D.textContent + shader_vertex.textContent,
  fragmentShader: shader_simplexNoise4D.textContent + shader_fragment.textContent,
  uniforms: {
    u_time: { value: 0.0 },
    u_width: { value: 1.3 },
    u_bump_frequency: { value: 0.3 },
    u_bump_scale: { value: 0.4 } } });



const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = .15;
scene.add(mesh);

const clock = new THREE.Clock();
clock.start();
const loop = () => {
  const delta = clock.getDelta();
  material.uniforms.u_time.value += delta;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};
loop();

const update_size = () => {
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false);
  camera.aspect = getAspectRatio();
  camera.updateProjectionMatrix();
};

window.addEventListener('resize', update_size);

update_size();