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
const cubeRT = new $.WebGLCubeRenderTarget(128);
const cubeCamera = new $.CubeCamera(.01, 1000, cubeRT);
const composer = new EffectComposer(renderer);
const controls = new OrbitControls(camera, renderer.domElement);
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

// ----
// Main
// ---- 
// https://unsplash.com/photos/_bFj2QHsifg
const IMGURL = 'https://images.unsplash.com/photo-1608671611568-895aaf8ec972?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80';

$.ShaderChunk.my_map_fragment = `
#ifdef USE_MAP
    float t = t * 0.0001;
    vec2 uv = vUv * vec2(2.0);
    vec4 o = texture2D(map, uv);
    vec4 A = texture2D(map, uv * vec2(2.0) + vec2(0.0, t + o.b));
    vec4 B = texture2D(map, uv + vec2(t));
    vec4 C = texture2D(map, uv + vec2(0.0, t));
    vec4 D = texture2D(map, uv * vec2(5.0, 0.0) + vec2(0.0, t + o.r));
    vec4 nu = 0.2 * A + 0.2 * B + 0.5 * (C + 0.5) + 0.4 * D;
    nu = pow(nu, vec4(3.0));
    nu = mapTexelToLinear(nu);
    diffuseColor *= nu;
#endif
`;

controls.target.set(0, 20, 0);
camera.position.set(0, -5, 10);

const geom = new $.TorusBufferGeometry(10, 9.5, 64, 32);
const mat = new $.ShaderMaterial({
    uniforms: $.UniformsUtils.merge([$.ShaderLib.basic.uniforms, { t: { value: 0 } }]),
    vertexShader: $.ShaderLib.basic.vertexShader,
    fragmentShader: `uniform float t;\n` + $.ShaderLib.basic.fragmentShader.replace('<map_fragment>', '<my_map_fragment>'),
    side: $.BackSide
});
const tex = new $.TextureLoader().load(IMGURL);
tex.wrapS = tex.wrapT = $.MirroredRepeatWrapping;
mat.map = mat.uniforms.map.value = tex;
const tmpMesh = new $.Mesh(geom, mat);
tmpMesh.rotation.set(0.5 * Math.PI, Math.PI, 0);
scene.add(tmpMesh);

const mesh = new $.Mesh(
    new $.SphereBufferGeometry(1, 32, 32),
    new $.MeshStandardMaterial({
        color: '#111', emissive: 'gold', emissiveIntensity: 0.1,
        metalness: 1, roughness: 0, envMap: cubeRT.texture, envMapIntensity: 1,
        map: tex,
    })
);
mesh.position.set(0, 0, 5);
const transformGroup = new $.Group();
transformGroup.add(mesh);
scene.add(transformGroup);

//// Render & Anim

renderer.setAnimationLoop((t) => {
    mesh.visible = false;
    cubeCamera.position.copy(mesh.position);
    cubeCamera.update(renderer, scene);
    mesh.visible = true;
    composer.render();
    controls.update();
    mat.uniforms.t.value = t;
});
gsap.timeline({ repeat: -1 })
    .to(mesh.rotation, { z: Math.PI * 2, duration: 2, ease: 'none', repeat: -1 })
    .to(transformGroup.rotation, { y: -Math.PI * 2, duration: 15, ease: 'none', repeat: -1 }, '<');

composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(renderer.getDrawingBufferSize(), 1, 0.5, 0.5));