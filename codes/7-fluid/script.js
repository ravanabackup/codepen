import * as $ from '//unpkg.com/three@0.123.0/build/three.module.js'
import { OrbitControls } from '//unpkg.com/three@0.123.0/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from '//unpkg.com/three@0.123.0/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from '//unpkg.com/three@0.123.0/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from '//unpkg.com/three@0.123.0/examples/jsm/postprocessing/UnrealBloomPass'

// ----
// Boot
// ----

const renderer = new $.WebGLRenderer({ antialias: true });
const scene = new $.Scene();
const camera = new $.PerspectiveCamera(75, 2, .01, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
const composer = new EffectComposer(renderer);
const bufSize = new $.Vector2();
window.addEventListener('resize', () => {
    const { clientWidth, clientHeight } = renderer.domElement;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    composer.setPixelRatio(window.devicePixelRatio);
    composer.setSize(clientWidth, clientHeight);
    renderer.getDrawingBufferSize(bufSize);
});
document.body.prepend(renderer.domElement);
window.dispatchEvent(new Event('resize'));
renderer.setAnimationLoop((t) => {
    composer.render();
    controls.update();
    animate(t);
});

// ----
// Main
// ---- 

$.ShaderChunk.my_map_fragment = `
#ifdef USE_MAP
    float t = t * 0.001;
    vec2 uv = vUv * vec2(2.0, 1.0) + vec2(-0.9);
    vec4 A = (
        texture2D(map, uv * 1.0 + vec2(t*0.1, t*0.3))
        + texture2D(map, uv * 2.0 + vec2(t*-0.1, t*0.4))
        + texture2D(map, uv * 3.0 + vec2(t*-0.1, t*0.5))
        + texture2D(map, uv * 4.0 + vec2(t*0.1, t*0.6))
    ) / 4.0;
    vec4 texelColor = A * A;
    texelColor = mapTexelToLinear(texelColor);
    diffuseColor *= texelColor;
#endif
`;

const IMGURL = 'https://images.unsplash.com/photo-1570884745218-1275bb172d97?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80';

camera.position.set(0, 0, 1);

const tex = new $.TextureLoader().load(IMGURL);
tex.wrapS = tex.wrapT = $.MirroredRepeatWrapping;
const geom = new $.SphereBufferGeometry(10, 10, 60);
const mat = new $.ShaderMaterial({
    uniforms: $.UniformsUtils.merge([ // deep clone
        $.ShaderLib.basic.uniforms,
        { t: 0 }
    ]),
    vertexShader: $.ShaderLib.basic.vertexShader,
    fragmentShader: `
    uniform float t;
    ` + $.ShaderLib.basic.fragmentShader.replace(
        '#include <map_fragment>',
        '#include <my_map_fragment>'
    ),
    side: $.BackSide
});
mat.map = mat.uniforms.map.value = tex;
const mesh = new $.Mesh(geom, mat);
mesh.rotation.x = Math.PI / 4;
scene.add(mesh);

//// Pp

const renderPass = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(bufSize, 0.5, 0.5, 0.25);
composer.addPass(renderPass);
composer.addPass(bloomPass);

//// Anim

function animate(t /*sec*/) {
    mat.uniforms.t.value = t;
}

gsap.timeline({ repeat: -1 }).to(mesh.rotation, {y: Math.PI *2, duration: 60});