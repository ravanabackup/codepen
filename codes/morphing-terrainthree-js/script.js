import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/DRACOLoader.js';
import gsap from 'https://cdn.skypack.dev/gsap@3.10.4';
import { createNoise3D } from "https://cdn.skypack.dev/simplex-noise@4.0.0";

console.clear();

const simplex = new createNoise3D();

/* SETUP */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
camera.position.y = 20;
camera.position.x = -20;
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(new THREE.Color(0.2, 0.2, 0.3));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* CONTROLS */
const controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, -25, 0);
controls.enableDamping = true;

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.140.0/examples/js/libs/draco/');
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
let ground;
let ground2;
loader.load('https://mamboleoo.be/CodePen/random/Brussels/everest.glb?v4', setup);

const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add(light);
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 150, 10, 50 );
scene.add( spotLight );

const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.7, 18 );
directionalLight2.position.set(1, 1, -1);
scene.add(directionalLight2);

let clone;
let mesh;
function setup (model) {
  mesh = model.scene.children[0];
  scene.add(mesh);
  mesh.geometry.scale(0.5,0.5,0.5);
  mesh.geometry.translate(0, 16.5, 0);
  mesh.material.emissive = new THREE.Color(0.2, 0.2, 0.3);
  mesh.material.side = 2;
  
  clone = mesh.geometry.attributes.position.clone();
  
  let wireframe = mesh.clone();
  wireframe.material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0.2, 0.2, 0.3),
    wireframe: true,
    transparent: true,
    opacity: 0.2
  });
  scene.add(wireframe);
}
let tween = {
  a: 0
};
gsap.to(tween, {
  a: 28,
  duration: 8,
  ease: 'power2.inOut',
  repeat: -1,
  yoyo: true,
  repeatDelay: 0.5
});

gsap.to(scene.rotation, {
  y: Math.PI * 2,
  duration: 60,
  ease: 'linear'
});

/* RENDERING */
function render(a) {
  requestAnimationFrame(render);
  
  controls.update();
  if (!clone) return;
  
  const arr = mesh.geometry.attributes.position.array;
  for (let i = 0; i < clone.array.length; i+=3) {
    let y = clone.array[i + 1];
    let n = ((simplex(arr[i + 0] * 0.05, a*0.001, arr[i + 2] * 0.05)) * 0.4);
    let offset = (y / 28) * (1.4 + n);
    if (y < (tween.a * offset)) {
      arr[i + 1] = y;
    } else {
      arr[i + 1] = tween.a * offset;
    }
  }
  mesh.geometry.attributes.position.needsUpdate = true;
  
  renderer.render(scene, camera);
}

/* EVENTS */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);
requestAnimationFrame(render);