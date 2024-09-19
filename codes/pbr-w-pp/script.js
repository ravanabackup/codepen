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
const camera = new $.PerspectiveCamera(75, 2, .1, 1000);
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
    vec2 uv = vUv * vec2(4.0,1.0) + vec2(-0.5,0.0);         // scale uv (repeat) 
    vec4 A = texture2D(map, uv);            // old texel
    uv.y += length(A.rgb) / 3.0 + t * 0.1;  // offset v 
    vec4 B = texture2D(map, uv);            // new texel
    vec4 texelColor = vec4(A.r, A.g, B.b + 0.2, A.a) * A;
    if (fract(uv.y) > 0.2) { texelColor = B * A; }
    texelColor = mapTexelToLinear(texelColor);
    diffuseColor *= texelColor;
#endif
`;

// https://unsplash.com/photos/N5H_J2aCOSo
const IMGURL = 'https://images.unsplash.com/photo-1603186784779-37ae3dded503?ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTZ8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60';
const RATIO = 634 / 951; 

camera.position.set(0, 0.0, 1);

const light0 = new $.PointLight('white', 1);
light0.position.set(0, 0, 0);
scene.add(light0);

const tex = new $.TextureLoader().load(IMGURL);
tex.wrapS = tex.wrapT = $.MirroredRepeatWrapping;
const geom = new $.SphereBufferGeometry(1, 50, 50);
const mat = new $.ShaderMaterial({
    uniforms: $.UniformsUtils.merge([ // deep clone
        $.ShaderLib.physical.uniforms,
        { t: 0 }
    ]),
    vertexShader: $.ShaderLib.physical.vertexShader,
    fragmentShader: `
    uniform float t;
    ` + $.ShaderLib.physical.fragmentShader.replace(
        '#include <map_fragment>',
        '#include <my_map_fragment>'
    ),
    lights: true,
    side: $.DoubleSide
});
mat.map = mat.uniforms.map.value = tex;
mat.uniforms.roughness.value = 0.8;
mat.uniforms.metalness.value = 0.2;
const mesh = new $.Mesh(geom, mat); 
scene.add(mesh);

//// Anim

function animate(t /*sec*/) {
    mat.uniforms.t.value = t;
}

//// Pp

const renderPass = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(bufSize, 1, 0.5, 0.2);

composer.addPass(renderPass);
composer.addPass(bloomPass);