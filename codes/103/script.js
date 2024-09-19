import * as THREE from "//cdn.skypack.dev/three@0.134?min";
import { OrbitControls } from "//cdn.skypack.dev/three@0.134/examples/jsm/controls/OrbitControls?min";
import { EffectComposer, FullScreenQuad, Pass } from "//cdn.skypack.dev/three@0.134/examples/jsm/postprocessing/EffectComposer?min";
import { ParametricGeometry } from "//cdn.skypack.dev/three@0.134//examples/jsm/geometries/ParametricGeometry"; // since r133
import { RenderPass } from "//cdn.skypack.dev/three@0.134/examples/jsm/postprocessing/RenderPass?min";
import { DualBloomPassGen } from "//cdn.jsdelivr.net/gh/ycw/three-dual-bloom@1.1.7/src/index.js";
import { gsap } from "//cdn.skypack.dev/gsap@3.8";

// ----
// main
// ----

const renderer = new THREE.WebGLRenderer({ alpha: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 2, .1, 100);
const controls = new OrbitControls(camera, renderer.domElement);

controls.target.set(0, 1, 0);
camera.position.set(0, 3.2, .5);
controls.autoRotate = true;
controls.enableDamping = true;
renderer.shadowMap.enabled = true;

scene.add(new THREE.AmbientLight('white', 1))

const light = new THREE.DirectionalLight('white', 1);
light.position.set(2, 1, 1);
light.castShadow = true;
light.shadow.bias = -0.0001;
scene.add(light);

const light1 = new THREE.RectAreaLight('cornsilk', 5, 5, 5);
light1.position.set(0, 3, 0);
light1.lookAt(0, 1, 0);
scene.add(light1);

// photo by Aperture Vintage - https://unsplash.com/photos/GFKx0wazemc
const url1 = 'https://images.unsplash.com/photo-1534888102055-69b44581d509?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
const tex1 = new THREE.TextureLoader().load(url1);
tex1.wrapS = tex1.wrapT = THREE.MirroredRepeatWrapping;
tex1.repeat.set(2, 2);
gsap.to(tex1.offset, { x: 0, y: -2, duration: 20, repeat: -1, ease: 'none' });
const mat0 = new THREE.MeshPhysicalMaterial({
  map: tex1, roughnessMap: tex1, bumpMap: tex1, bumpScale: 1, clearcoat: 1,
  emissiveMap: tex1, emissive: 'white', emissiveIntensity: 1,
});

{
  const geom = new ParametricGeometry((u, v, dest) => { // r134 -> ex/jsm/...
    if (v < .2 - .00001) {
      const a = u * Math.PI * 2;
      const r = Math.sin(Math.PI * v / .2 + Math.PI / 2);
      const x = r * Math.sin(a);
      const z = r * Math.cos(a);
      const y = -1;
      return dest.set(x, y, z);
    }
    if (v > .5 - 0.00001) {
      const a = u * Math.PI * 2;
      const r = Math.sin(Math.PI * (v - .5) / .5 + Math.PI / 2);
      const x = r * Math.sin(a);
      const z = r * Math.cos(a);
      const y = 1;
      return dest.set(x, y, z);
    }
    const n = (u * 20 | 0) % 4; //5petal
    const r = 1 + Math.sin(Math.PI * v / .5) + (n) * .2;
    const a = u * Math.PI * 2;
    const x = r * Math.sin(a);
    const z = r * Math.cos(a);
    const y = v + n * .5;
    dest.set(x, y, z);
  }, 50, 12);
  const mesh = new THREE.Mesh(geom, mat0);
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add(mesh);
}

{
  const geom = new THREE.SphereGeometry(.5);
  const mat = new THREE.MeshPhysicalMaterial({ map: tex1 });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.position.y = 2;
  mesh.castShadow = true;
  scene.add(mesh);
  gsap.to(mesh.rotation, { z: 6.28, duration: 5, repeat: -1, ease: "none" });
}

// ----
// render
// ----

const DualBloomPass = DualBloomPassGen({ THREE, Pass, FullScreenQuad });
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new DualBloomPass({ threshold: 0.5, blurriness: .5, intensity: 1, maxDuals: 8 }));

renderer.setAnimationLoop(() => {
  composer.render();
  controls.update();
});

// ----
// view
// ----

function resize(w, h, dpr = devicePixelRatio) {
  renderer.setPixelRatio(dpr);
  renderer.setSize(w, h, false);
  composer.setPixelRatio(dpr);
  composer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
addEventListener('resize', () => resize(innerWidth, innerHeight));
dispatchEvent(new Event('resize'));
document.body.prepend(renderer.domElement);