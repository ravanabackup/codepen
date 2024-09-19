import * as THREE from '//cdn.skypack.dev/three@0.132?min'
import { OrbitControls } from '//cdn.skypack.dev/three@0.132/examples/jsm/controls/OrbitControls?min'
import { gsap } from "https://cdn.skypack.dev/gsap@3.7.1?min";

// ----
// main
// ----

const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 2, .1, 100);
const controls = new OrbitControls(camera, renderer.domElement);

scene.background = new THREE.Color(0);
camera.position.set(0, 1, -4);
controls.enableDamping = true;
renderer.shadowMap.enabled = true;

const light0 = new THREE.DirectionalLight();
light0.castShadow = true;
light0.position.set(1, 5, 1);
light0.shadow.bias = -0.00002;
scene.add(light0);
scene.add(new THREE.AmbientLight(0xffffff, .5));

const nInst = 24;
const geom = new THREE.BoxGeometry(3, .025, .5).translate(1.5 - .1, 0, 0);
const mat = new THREE.MeshPhongMaterial({});
const stair = new THREE.InstancedMesh(geom, mat, nInst);
stair.castShadow = true;
stair.receiveShadow = true;
scene.add(stair);

for (let i = 0, $m = new THREE.Matrix4(); i < nInst; ++i) {
  $m.makeRotationY(-Math.PI + i / nInst * Math.PI * 2);
  $m.setPosition(0, (i / (nInst - 1) - .5) * (.4 * nInst), 0);
  stair.setMatrixAt(i, $m);
}
stair.instanceMatrix.needsUpdate = true;

{
  const geom = new THREE.CylinderGeometry(.05, .05, 100, 16, 1);
  const mesh = new THREE.Mesh(geom, mat);
  stair.add(mesh);
}

const ball = (() => {
  const geom = new THREE.BoxGeometry(.4, .4, .4).translate(0, .2, -.2);
  const mat = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.position.set(2, .2, .25);
  mesh.castShadow = true;
  stair.add(mesh);
  return mesh;
})();

gsap.timeline({ defaults: { ease: 'none', repeat: -1, duration: .45 }})
  .to(stair.rotation, { y: Math.PI * 2 / (nInst - 1) })
  .to(stair.position, { y: .4 }, '<')
  .to(ball.rotation, { x: Math.PI, y: Math.PI * 2 / (nInst-1) }, '<')

// ----
// render
// ----

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