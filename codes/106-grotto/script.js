import * as THREE from '//cdn.skypack.dev/three@0.136?min'
import { OrbitControls } from '//cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls?min'
import { gsap } from "https://cdn.skypack.dev/gsap@3.9.1";

// ----
// main ( @2021-12-29 )
// ----

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 2, .1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 0, 1);
controls.enableDamping = true;
controls.minPolarAngle = Math.PI / 2 - 0.1;
controls.maxPolarAngle = Math.PI / 2 + 0.1;
controls.minAzimuthAngle = -.2;
controls.maxAzimuthAngle = .2;
controls.maxDistance = 1;

const light = new THREE.PointLight();
light.position.set(0, 0, -.5);
scene.add(light);

// Photo by MontyLov - https://unsplash.com/photos/HyBXy5PHQR8
const url = 'https://images.unsplash.com/photo-1518893063132-36e46dbe2428?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA3fHxyZWQlMjBwYWludCUyMGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
const dmap = new THREE.TextureLoader().load(url);
dmap.repeat.setScalar(.5);

const geom = new THREE.IcosahedronGeometry(1, 30);
const mat = new THREE.MeshPhysicalMaterial({
  displacementMap: dmap,
  displacementScale: 2,
  side: THREE.BackSide,
  map: dmap,
  roughness: 0
});
const mesh = new THREE.Mesh(geom, mat);
mesh.rotation.y = -Math.PI / 2;
scene.add(mesh);

// ----
// render
// ----

const n = new THREE.Group();
n.add(camera);
camera.position.set(.2, .1, 2);
gsap.to(n.rotation, { z: Math.PI * 2, duration: 5, repeat: -1, ease: 'none' });

renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
  controls.update();
});

// ----
// view
// ----

function resize(w, h, dpr = devicePixelRatio) {
  renderer.setPixelRatio(dpr);
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
addEventListener('resize', () => resize(innerWidth, innerHeight));
dispatchEvent(new Event('resize'));
document.body.prepend(renderer.domElement);