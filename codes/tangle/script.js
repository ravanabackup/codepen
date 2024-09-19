"use strict";
const { Engine, Scene, Effect, Vector2, ShaderMaterial, ArcRotateCamera, Vector3, MeshBuilder, CSG } = BABYLON;
const canvas = document.querySelector('canvas');
const engine = new Engine(canvas, true);
const scene = createScene(engine);
engine.runRenderLoop(() => { scene.render(); });
addEventListener('resize', () => { engine.resize(); });
// --- 
// vshader - support instancing
// see https://forum.babylonjs.com/t/instances-with-shadermaterial/8201/2
// ---
Effect.ShadersStore[`fooVertexShader`] = `
in vec3 position;
in vec2 uv;
#include<instancesDeclaration> //<--------
varying vec2 vUV;
uniform mat4 viewProjection;   //<--------
void main() {
    #include<instancesVertex>  //<--------
    vUV = uv;
    gl_Position = 
        viewProjection
        *finalWorld            /* <---- */
        *vec4(position,1.0);
}
`;
// ---
// fshader
// - execise. https://thebookofshaders.com/11/ 
// ---
Effect.ShadersStore['fooFragmentShader'] = `
uniform vec2 u_resolution;
uniform float u_time;
varying vec2 vUV;
#define PI 3.1415

// -----------------------------------------------------------------------------
// https://thebookofshaders.com/edit.php#11/2d-gnoise.frag
vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// Gradient Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/XdXGW8
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 c00 = vec2(0.0, 0.0);
    vec2 c01 = vec2(0.0, 1.0);
    vec2 c10 = vec2(1.0, 0.0);
    vec2 c11 = vec2(1.0, 0.0);

    vec2 u = f*f*(3.0-2.0*f);
    return mix( 
        mix(dot(random2(i+c00), f-c00), dot(random2(i+c10), f-c10),u.x),
        mix(dot(random2(i+c01), f-c01), dot(random2(i+c11), f-c11),u.x),
        u.y
    );

    //# random2(intCornerFoo) -> gen rnd dir at int corner foo ... (D)
    //# dot(D, vector from corner foo to fract point position) -> distribution
    //# mix(mix(.., X), mix(.., X), Y) -> bilinear interp. the distributions
    //#             ^           ^   ^ cubic interp.
}

void main() {
    vec2 st = vUV;
    st = st * 2.0-1.0;

    // Radius and Angle
    float r = fract(length(st));
    float a = atan(st.y, st.x) /PI * 0.5 + 0.5; // 0..1
    a = fract(a + r*2. + u_time*0.0005);

    // No. of sectors
    float nSector = 2.0;
    float n = floor(a * nSector) / (nSector-1.0);     // step vals in [0..1]

    // No. of slices per sector
    float nSlice = 100.0;
    float m = floor(r * nSlice) / (nSlice-1.0);       // step vals in [0..1]

    // Field
    // \`edeg\` varies on noise
    float noiseOuter = (noise(st*vec2(2000.0, 1.0))*0.5+0.5)*0.5;  //v. scratch
    float noiseInner = (noise(st*vec2(1.0, 1000.0))*0.5+0.5)*1.0;  //h. scratch
    float f = 
        step(1.0 - noiseInner, length(st)) 
        * (1.0 - (
            step(0.5 + noiseOuter, length(st))
        ))
        * step(1.0, mod(floor(m * (nSlice-1.0)), 2.0))
        + step(1.0, mod(floor(n * (nSector-1.0)), 2.0));

    // Color
    vec2 v = random2(vec2(n,m));
    gl_FragColor = vec4(vec3(v.x)*f,0.5);
}
`;
main();
function main() {
    const canvas = document.querySelector('canvas');
    const engine = new Engine(canvas, true);
    const scene = createScene(engine);
    engine.runRenderLoop(() => { scene.render(); });
    addEventListener('resize', () => { engine.resize(); });
}
function createScene(engine) {
    const scene = new Scene(engine);
    scene.clearColor.set(1, 1, 1, 1);
    const camera = new ArcRotateCamera('', -Math.PI / 2, Math.PI / 2, 120, Vector3.Zero(), scene);
    camera.attachControl(engine.getRenderingCanvas());
    camera.useAutoRotationBehavior = true;
    // ---
    // Create Shader from store
    // ---
    const mat = new ShaderMaterial('', scene, {
        vertex: 'foo', fragment: 'foo'
    }, {
        uniforms: ['u_time', 'viewProjection'],
        attributes: ['position', 'uv', 'world0', 'world1', 'world2', 'world3'],
        defines: ['#define INSTANCES'],
        needAlphaBlending: true,
        needAlphaTesting: true
    });
    // ---
    // General Material Properties
    // ---
    mat.backFaceCulling = false;
    // ---
    // Update Uniforms
    // ---
    mat.metadata = { t: 0 };
    mat.onBindObservable.add(() => {
        mat.metadata.t += engine.getDeltaTime();
        const ef = mat.getEffect();
        ef.setFloat('u_time', mat.metadata.t);
        ef.setVector2('u_resolution', new Vector2(engine.getRenderWidth(), engine.getRenderHeight()));
    });
    // ---
    // Mesh
    // ---
    const mesh = MeshBuilder.CreateTorusKnot('', {
        radius: 10,
        tube: 1,
        radialSegments: 300,
        tubularSegments: 10,
        updatable: true
    });
    mesh.material = mat;
    mesh.setEnabled(false);
    mesh.mustDepthSortFacets = true;
    mesh.onBeforeRenderObservable.add(() => {
        mesh.updateFacetData();
    });
    for (let i = 0, N = 20; i < N; ++i) {
        const inst = mesh.createInstance('');
        inst.scaling.setAll(1 + i / N * 2);
        inst.rotation.setAll(i / N * Math.PI * 2 * 2);
    }
    const frameMesh0 = MeshBuilder.CreateBox('', { size: 50 });
    const hollowMesh0 = MeshBuilder.CreateBox('', { width: 50, height: 48, depth: 48 });
    const hollowMesh1 = MeshBuilder.CreateBox('', { width: 48, height: 50, depth: 48 });
    const hollowMesh2 = MeshBuilder.CreateBox('', { width: 48, height: 48, depth: 50 });
    const frameMesh = CSG.FromMesh(frameMesh0)
        .subtract(CSG.FromMesh(hollowMesh0))
        .subtract(CSG.FromMesh(hollowMesh1))
        .subtract(CSG.FromMesh(hollowMesh2))
        .toMesh('');
    frameMesh0.dispose();
    hollowMesh0.dispose();
    hollowMesh1.dispose();
    hollowMesh2.dispose();
    return scene;
}