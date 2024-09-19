import * as $ from '//unpkg.com/three@0.124.0/build/three.module.js'
import { Curves } from '//unpkg.com/three@0.124.0/examples/jsm/curves/CurveExtras.js'

// ---- boot

const renderer = new $.WebGLRenderer({});
const scene = new $.Scene();
const camera = new $.PerspectiveCamera(75, 2, .01, 5000);
window.addEventListener('resize', () => {
    const { clientWidth, clientHeight } = renderer.domElement;
    renderer.setSize(clientWidth, clientHeight, false);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
});
document.body.prepend(renderer.domElement);
window.dispatchEvent(new Event('resize'));

// ---- setup

scene.fog = new $.FogExp2('black', 0.05);
scene.add(new $.HemisphereLight('blue', 'orange', 2));

// ---- const

const mpms = (50) / 1e3; // meters per ms
const steps = 2000; // n extrusion steps

// ---- mesh

const shape = new $.Shape();
shape.moveTo(-5, -1);
shape.quadraticCurveTo(0, -4, 5, -1);
shape.lineTo(6, -1);
shape.quadraticCurveTo(0, -5, -6, -1);
const extrudePath = new Curves.TorusKnot();
const extrudeGeom = new $.ExtrudeBufferGeometry(shape, { bevelEnabled: false, steps, extrudePath, curveSegments: 5 });
const mat = new $.MeshLambertMaterial({ });
const mesh = new $.Mesh(extrudeGeom, mat);
scene.add(mesh);

// ---- anim

const totalLen = extrudePath.getLength();
const { binormals, normals, tangents } = extrudePath.computeFrenetFrames(steps);
const $m = new $.Matrix4(); // rotation matrix
let $u; // dist travelled (normalized)
renderer.setAnimationLoop((t /*ms*/) => {
    $u = ((mpms * t) % totalLen) / totalLen;
    // update cam position
    extrudePath.getPointAt($u, camera.position);
    // update cam rotation
    camera.setRotationFromMatrix($m.lookAt(
        /* eye */ camera.position,
        /* target */ extrudePath.getPointAt(Math.min(1.0, $u + 0.01)),
        /* up */ binormals[$u * steps | 0]
    ));
    renderer.render(scene, camera);
});