import * as $ from '//cdn.skypack.dev/three@0.124.0/build/three.module.js?min'
import { OrbitControls } from '//cdn.skypack.dev/three@0.124.0/examples/jsm/controls/OrbitControls.js?min'
import { EffectComposer } from '//cdn.skypack.dev/three@0.124.0/examples/jsm/postprocessing/EffectComposer.js?min'
import { RenderPass } from '//cdn.skypack.dev/three@0.124.0/examples/jsm/postprocessing/RenderPass.js?min'
import { ShaderPass } from '//cdn.skypack.dev/three@0.124.0/examples/jsm/postprocessing/ShaderPass.js?min'

//// Boot

const renderer = new $.WebGLRenderer({});
const scene = new $.Scene();
const camera = new $.PerspectiveCamera(100, 2, 10, 2000);
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

camera.position.set(400, 400, 400);
scene.background = new $.Color('black');
scene.fog = new $.FogExp2(scene.background, 0.0015);
scene.add(new $.AmbientLight('white', 0.5));
controls.autoRotate = true;
controls.autoRotateSpeed = -2;
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI / 2.1;


const light0 = new $.DirectionalLight('white', 1);
light0.position.set(1, 1, 0);
scene.add(light0);

//// Make Meshes
//https://unsplash.com/photos/AAgW5Ow1H84
const tex0 = new $.TextureLoader().load('https://images.unsplash.com/photo-1589841500597-2c043ed540c5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8YnVpbGRpbmclMjBmcm9udHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60');
const nInst = 10000;
const mesh = new $.InstancedMesh(
    new $.BoxGeometry(1, 1, 1).translate(0, 0.5, 0),
    new $.MeshPhongMaterial({ map: tex0, alphaMap: tex0, alphaTest: 0.5, side: $.DoubleSide }),
    nInst
);
for (let i = 0; i < nInst; ++i) {
    const scaleBase = 10 + Math.random() * 20;
    const scaleHeight = 1 + i / nInst * 300.0;
    const x = Math.random() * 4000 - 2000;
    const z = Math.random() * 4000 - 2000;
    mesh.setMatrixAt(i, new $.Matrix4().makeTranslation(x, 0, z).multiply(
        new $.Matrix4().makeScale(scaleBase, scaleHeight, scaleBase)
    ));
}
mesh.instanceMatrix.needsUpdate = true;
scene.add(mesh);

//// Make RenderTarget 

const drawingBufferSize = renderer.getDrawingBufferSize(new $.Vector2());
const depthTexture = new $.DepthTexture(drawingBufferSize.x, drawingBufferSize.y);
const renderTarget = new $.WebGLRenderTarget(drawingBufferSize.x, drawingBufferSize.y, { depthTexture });

window.addEventListener('resize', () => {
    const { x, y } = renderer.getDrawingBufferSize(new $.Vector2());
    renderTarget.setSize(x, y);
});

//// Post Processing Ground Fog

const composer = new EffectComposer(renderer);
composer.addPass(new ShaderPass({
    uniforms: {
        cameraNear: { value: camera.near },
        cameraFar: { value: camera.far },
        tDiffuse: { value: null },
        tDepth: { value: null },
        fogColor: { value: scene.background },
        projectionMatrixInverse: { value: camera.projectionMatrixInverse },
        viewMatrixInverse: { value: camera.matrixWorld }
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
    fragmentShader: `
    #include <packing>
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    uniform sampler2D tDepth;
    uniform float cameraNear;
    uniform float cameraFar;
    uniform mat4 projectionMatrixInverse;
    uniform mat4 viewMatrixInverse;
    uniform vec3 fogColor;

    // see https://threejs.org/examples/webgl_depth_texture.html
    float readDepth( sampler2D depthSampler, vec2 coord ) {
        float fragCoordZ = texture2D( depthSampler, coord ).x;
        float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
        return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
    }

    // see https://stackoverflow.com/questions/32227283/getting-world-position-from-depth-buffer-value
    // this is supposed to get the world position from the depth buffer
    vec3 WorldPosFromDepth(float depth, vec2 uv) {
        float z = depth * 2.0 - 1.0;
        vec4 clipSpacePosition = vec4(uv * 2.0 - 1.0, z, 1.0);
        vec4 viewSpacePosition = projectionMatrixInverse * clipSpacePosition;
        // Perspective division
        viewSpacePosition /= viewSpacePosition.w;
        vec4 worldSpacePosition = viewMatrixInverse * viewSpacePosition;
        return worldSpacePosition.xyz;
    }

    void main() {
        vec3 world = WorldPosFromDepth( texture( tDepth, vUv ).x, vUv );
        vec4 texel = texture( tDiffuse, vUv );
        gl_FragColor.rgb = mix( fogColor,
            texel.rgb * world / 50.0, // tint
            smoothstep(0.0, 150.0, world.y) ); // altitude 150
        gl_FragColor.a = texel.a; 
    }`
}, 'stubbed'));

//// Render

renderer.setAnimationLoop((t) => {
    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
    composer.passes[0].uniforms.tDiffuse.value = renderTarget.texture;
    composer.passes[0].uniforms.tDepth.value = renderTarget.depthTexture;
    composer.passes[0].uniforms.viewMatrixInverse.value = camera.matrixWorld;
    composer.render();
    controls.target.set(150 * Math.sin(t * 0.001), 0, 150 * Math.cos(t * 0.001));
    controls.update();
});