import * as $ from '//unpkg.com/three@0.124.0/build/three.module.js'
import { OrbitControls } from '//unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from '//unpkg.com/three@0.124.0/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from '//unpkg.com/three@0.124.0/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from '//unpkg.com/three@0.124.0/examples/jsm/postprocessing/UnrealBloomPass'

// ---- boot

const renderer = new $.WebGLRenderer({ antialias: false });
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

// ---- setup

camera.position.set(0, 0, 1);

// ---- mesh

const mesh = new $.Mesh(
    new $.PlaneBufferGeometry(10, 10).rotateX(-0.2 * Math.PI),
    new $.ShaderMaterial({
        uniforms: $.UniformsUtils.merge([
            $.ShaderLib.basic.uniforms,
            {
                tPal: { value: null },
                imgGridSz: { value: 128 }, // pixelate
                palGridSz: { value: 64 }, // palatte
                scanline: { value: new $.Vector3(0.4, 0.6, 0) } // min,max,val
            }
        ]),
        vertexShader: $.ShaderLib.basic.vertexShader,
        fragmentShader: `
        uniform sampler2D tPal;
        uniform float imgGridSz;
        uniform float palGridSz;
        uniform vec3 scanline;
        ` + $.ShaderLib.basic.fragmentShader.replace('#include <map_fragment>', `
        #ifdef USE_MAP
            vec2 uv = floor(vUv*imgGridSz)/imgGridSz;
            vec4 org = texture2D(map, uv);
            float k = dot(vec3(0.1,0.5,0.4), org.rgb);
            k = floor(k * palGridSz) / palGridSz;
            vec2 uv2 = vec2(k, mix(scanline.x, scanline.y, scanline.z));
            vec4 nu = texture2D(tPal, uv2);
            vec4 texelColor = 0.9*nu + 0.1*org;
            texelColor = mapTexelToLinear( texelColor );
            diffuseColor *= texelColor;
        #endif
        `),
        side: $.DoubleSide
    })
);

const loader = new $.TextureLoader();
const url0 = 'https://images.unsplash.com/photo-1610305013822-ad68befe3550?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'; // pal
const url1 = 'https://images.unsplash.com/photo-1534823983341-d4e6e4aa046c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8dW5pY29ybnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'; // main
mesh.material.uniforms.tPal.value = loader.load(url0);
mesh.material.map = mesh.material.uniforms.map.value = loader.load(url1, (t) => mesh.scale.set(1, t.image.height / t.image.width, 1));
scene.add(mesh);

// ---- fx

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(new $.Vector2(), 1, 0.5, 0.6));
window.addEventListener('resize', () => {
    composer.setPixelRatio(devicePixelRatio);
    composer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight);
    renderer.getDrawingBufferSize(composer.passes[1].resolution);
});

// ---- anim

renderer.setAnimationLoop(() => {
    composer.render();
    controls.update();
});

gsap.to(mesh.material.uniforms.scanline.value, { z: 1, repeat: -1, ease: 'none', duration: 10, yoyo: 1 });