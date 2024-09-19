import * as $ from '//cdn.skypack.dev/three@0.125.0/build/three.module.js?min'
import { OrbitControls } from '//cdn.skypack.dev/three@0.125.0/examples/jsm/controls/OrbitControls.js?min'
import { EffectComposer } from '//cdn.skypack.dev/three@0.125.0/examples/jsm/postprocessing/EffectComposer.js?min'
import { RenderPass } from '//cdn.skypack.dev/three@0.125.0/examples/jsm/postprocessing/RenderPass.js?min'
import { UnrealBloomPass } from '//cdn.skypack.dev/three@0.125.0/examples/jsm/postprocessing/UnrealBloomPass.js?min'
import { gsap } from '//cdn.skypack.dev/gsap?min'

//// Boot

const renderer = new $.WebGLRenderer({ antialias: true });
const scene = new $.Scene();
const camera = new $.PerspectiveCamera(75, 2, .1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
window.addEventListener('resize', () => {
    const { clientWidth, clientHeight } = renderer.domElement;
    renderer.setSize(clientWidth, clientHeight, false);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
});
document.body.prepend(renderer.domElement);
window.dispatchEvent(new Event('resize'));

//// Setup

camera.position.set(-2, 8, 2);

const light0 = new $.DirectionalLight('white', 1);
light0.position.set(2, -2, -2);
scene.add(light0);

const light1 = new $.DirectionalLight('white', 1);
light1.position.set(-2, 2, 2);
scene.add(light1);

const steps = 1000;
const extrudeSteps = 1024 * 2;
const extrudeDepth = 0.5;
const repeat = 4;
const scaleX = 100;
const thickness = 1;

const curve = new $.CurvePath();
let prev = new $.Vector3();
let curr = new $.Vector3();
for (let i = 0; i < steps; ++i) {
    const t = i / steps;
    const ft = Math.sin(t * Math.PI * 2 * repeat);
    const x = scaleX * (t - 0.5);
    const y = ft;
    if (i === 0) {
        prev.set(x, y, 0);
        continue;
    }
    curr = new $.Vector3(x, y, 0);
    const line = new $.LineCurve3(prev, curr);
    curve.add(line);
    prev = curr;
}

const shape = new $.Shape();
shape.moveTo(-extrudeDepth / 2, -thickness / 2);
shape.lineTo(-extrudeDepth / 2, thickness / 2);
shape.lineTo(extrudeDepth / 2, thickness / 2);
shape.lineTo(extrudeDepth / 2, -thickness / 2);
shape.lineTo(-extrudeDepth / 2, -thickness / 2);

const gs = [];
const geom = new $.ExtrudeGeometry(shape, {
    extrudePath: curve, bevelEnabled: false,
    steps: extrudeSteps
});
for (let i = 0, I = 16; i < I; ++i) {
    const color = new $.Color().setHSL(i / I * 2, 0.8, 0.5);
    const mat = new $.MeshPhongMaterial({ color });
    const mesh = new $.Mesh(geom, [null, mat]);
    mesh.position.z = (i / (I - 1) - 0.5) * 20;
    mesh.position.x = (i % 8);
    const g = new $.Group();
    g.add(mesh);
    Object.defineProperty(g, '$x', {
        get() { return g.position.x },
        set(v) { g.position.x = v }
    });
    scene.add(g);
    gs.push(g);
}

const res = renderer.getDrawingBufferSize(new $.Vector2());
window.addEventListener('resize', () => {
    renderer.getDrawingBufferSize(res);
    const { clientWidth, clientHeight } = renderer.domElement;
    composer.setPixelRatio(window.devicePixelRatio);
    composer.setSize(clientWidth, clientHeight);
});
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(res, 1, 0.5, 0.1));
renderer.setAnimationLoop(() => {
    composer.render();
    controls.update();
});

gsap.to(gs, { $x: scaleX / repeat, duration: 1, ease: 'none', repeat: -1 });