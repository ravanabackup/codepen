import * as $ from '//unpkg.com/three@0.117.1/build/three.module.js'
import { OrbitControls } from '//unpkg.com/three@0.117.1/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from '//unpkg.com/three@0.117.1/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from '//unpkg.com/three@0.117.1/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from '//unpkg.com/three@0.117.1/examples/jsm/postprocessing/UnrealBloomPass'
import { BokehPass } from '//unpkg.com/three@0.117.1/examples/jsm/postprocessing/BokehPass'


// ----
// Boot
// ----

const renderer = new $.WebGLRenderer({ antialias: false });
const scene = new $.Scene();
const camera = new $.PerspectiveCamera(75, 2, 1, 100);
const controls = new OrbitControls(camera, renderer.domElement);
const composer = new EffectComposer(renderer);
const res = new $.Vector2();
window.addEventListener('resize', () => {
    const { clientWidth, clientHeight } = renderer.domElement;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    composer.setPixelRatio(window.devicePixelRatio);
    composer.setSize(clientWidth, clientHeight);
    res.set(clientWidth, clientHeight);
});
document.body.prepend(renderer.domElement);
window.dispatchEvent(new Event('resize'));
renderer.setAnimationLoop(function (t) {
    composer.render();
    controls.update();
});

// ----
// Main
// ---- 

renderer.shadowMap.enabled = true;
scene.background = new $.Color('lime');
camera.position.set(4, 0, -4);
controls.target = new $.Vector3(0, -5, 0);

//// Make Mesh - Platforms

const platformGroup = new $.Group();
const platforms = Array.from(Array(4), () => new $.Group());
const platformLength = 5; // how many crates
const crateSz = 2;
const crateGeom = new $.BoxBufferGeometry(crateSz, crateSz, crateSz * 2);
for (let j = 0, J = 4; j < J; ++j) {
    const crate0Mat = new $.MeshLambertMaterial({ color: 'tomato' });
    const crate0Mesh = new $.Mesh(crateGeom, crate0Mat);
    crate0Mesh.position.set(-(platformLength + 1) * crateSz / 2, 0, 0);
    platforms[j].add(crate0Mesh);
    for (let i = 0, I = platformLength; i < I; ++i) {
        const color = i % 2 ? 'lemonchiffon' : 'skyblue';
        const crateMat = new $.MeshLambertMaterial({ color });
        const crateMesh = new $.Mesh(crateGeom, crateMat);
        crateMesh.position.set((I / -2 + i + 0.5) * crateSz, 0, 0);
        crateMesh.receiveShadow = true;
        platforms[j].add(crateMesh);
    }
    const matrix = new $.Matrix4().makeTranslation(0, -(platformLength + 1) * crateSz / 2, 0)
        .premultiply(new $.Matrix4().makeRotationZ(Math.PI / 2 * j));
    platforms[j].applyMatrix4(matrix);
    platformGroup.add(platforms[j]);
}
scene.add(platformGroup);

//// Make Mesh - Walker Box

const walkerSz = crateSz / 2;
const walkerGeom = new $.BoxBufferGeometry(walkerSz, walkerSz, walkerSz);
const walkerMat0 = new $.MeshLambertMaterial({ color: 'white' });
const walkerMat1 = new $.MeshLambertMaterial({ color: 'tomato' });
const walkerMat2 = new $.MeshLambertMaterial({ color: 'skyblue' });
const walkerMesh = new $.Mesh(walkerGeom, [
    walkerMat0, walkerMat0, walkerMat1, walkerMat1, walkerMat2, walkerMat2]);
walkerMesh.position.y = 1;
walkerMesh.castShadow = true;

//// GSAP Utils 

function asyncTo(target, option) {
    return new Promise(onComplete => {
        gsap.to(target, { onComplete, ...option });
    });
}

//// Helper - Add walker mesh to platform 

function addToPlatform(platform, walkerX) {
    platform.add(walkerMesh);
    walkerMesh.position.set(
        -platformLength * crateSz / 2 + (walkerX + 0.5)* walkerSz, (crateSz + walkerSz) / 2, 0);
}

//// Helper - Walk (1D)
// 1. Add mesh to pivot; Add pivot to platform.
// 2. Set pivot pos and mesh pos.
// 3. Rotate pivot from 0 to 90d (GSAP).
// 4. On tween ended, Add mesh to platform; Transform mesh and its geom. 
////

async function walk(duration) {
    //// 1
    const pivot = new $.Object3D();
    const platform = walkerMesh.parent;
    platform.add(pivot);
    pivot.add(walkerMesh);
    //// 2
    const oldMeshPosition = walkerMesh.position.clone();
    pivot.position.set(.5 * walkerSz, -.5 * walkerSz, 0).add(walkerMesh.position);
    walkerMesh.position.set(-.5 * walkerSz, .5 * walkerSz, 0);
    //// 3
    await asyncTo(pivot.rotation, { z: Math.PI / -2, duration, ease: 'bounce' });
    //// 4
    walkerMesh.geometry.rotateZ(Math.PI / -2);
    walkerMesh.position.copy(oldMeshPosition.add(new $.Vector3(walkerSz, 0, 0)));
    platform.add(walkerMesh);
}

//// Lighting

const light0 = new $.HemisphereLight('skyblue', 'white', .5);
scene.add(light0);

const light1 = new $.PointLight('salmon', 1);
light1.castShadow = true;
scene.add(light1);

//// PostProcessing

composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(res, .35, 1, 0.85));
composer.addPass(new BokehPass(scene, camera, { focus: 10, aperture: 0.01 / 20, maxblur: 0.1 }));

//// Animate

window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 1e10;
(async () => {
    let i = 1;
    const walkerDur = .45;
    const platformDur = (platformLength * (crateSz / walkerSz) - 1) * walkerDur * 4;
    gsap.timeline({ repeat: 1e10 })
        .to(platformGroup.rotation, { z: Math.PI * -2, duration: platformDur, ease: 'none' });
    while (true) {
        addToPlatform(platforms[i++ % 4], 0);
        for (let i = 0, I = platformLength * (crateSz / walkerSz) - 1; i < I; ++i) {
            await walk(walkerDur);
        }
        walkerMesh.geometry.rotateZ(Math.PI / 2);
    }
})();