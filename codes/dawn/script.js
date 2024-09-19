"use strict";
const { Engine, Scene, ArcRotateCamera, Vector3, MeshBuilder, PBRMaterial, PointLight, DefaultRenderingPipeline, SolidParticleSystem, SSAORenderingPipeline } = BABYLON;
const canvas = document.querySelector('canvas');
const engine = new Engine(canvas);
const scene = new Scene(engine);
scene.clearColor.set(0.1, 0.1, 0.1, 1);
const camera = new ArcRotateCamera('', -Math.PI / 2, Math.PI / 2, 250, new Vector3(0, 0, 0), scene);
camera.attachControl(canvas);
const mat = new PBRMaterial('', scene);
mat.albedoColor.set(0.1, 0.1, 0.1);
mat.roughness = 1;
const light = new PointLight('', new Vector3(0, 0, 0), scene);
light.intensity = 1e5;
light.diffuse.set(1, 0.8, 0.9); // mood
const rnds = (a = 0, b = 1) => (a + Math.random() * (b - a)) * (Math.random() < 0.5 ? -1 : 1);
const box = MeshBuilder.CreateBox('', { size: 10 });
const sps = new SolidParticleSystem('', scene);
sps.addShape(box, 2e2);
let x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1;
const TH = 90;
sps.updateParticle = (p) => {
    switch (Math.random() * 3 | 0) {
        case 0: // floor/ceiiing
        case 1:
            x = rnds(0, 100);
            y = rnds(TH, 100);
            z = rnds(0, 100);
            sx = 5;
            sy = 1;
            sz = Math.random() * 10;
            break;
        case 2: // wall
            x = rnds(0, 50);
            y = rnds(0, 100);
            z = Math.random() * 10 + 90;
            sx = 10;
            sy = 1;
            sz = 1;
            break;
    }
    ;
    p.position.set(x, y, z);
    p.scaling.set(sx, sy, sz);
    p.rotation.set(0, rnds(0, Math.PI / 10), rnds(0, Math.PI / 10));
    return p;
};
const spsmesh = sps.buildMesh();
box.dispose();
sps.setParticles();
spsmesh.material = mat;
spsmesh.alwaysSelectAsActiveMesh = true;
const gem = MeshBuilder.CreatePolyhedron('', { type: 1, sizeY: 10, sizeX: 5, sizeZ: 5 });
const gemMat = new PBRMaterial('', scene);
gemMat.roughness = 0.1;
gemMat.metallic = 0.4;
gemMat.emissiveColor = light.diffuse;
gem.material = gemMat;
gem.position.z = 40;
gem.parent = spsmesh;
let t = 0;
scene.onBeforeRenderObservable.add(() => {
    gem.position.y = Math.sin(t) * 5 + 20;
    gem.rotation.y = t;
    spsmesh.rotation.y = Math.sin(t * 0.02) * Math.PI / 3;
    light.position = gem.position.add(new Vector3(0, 16, 0));
    t += 0.1;
    canvas.classList.toggle('hover-gem', scene.meshUnderPointer == gem); // css
});
scene.constantlyUpdateMeshUnderPointer = true;
const pp = new DefaultRenderingPipeline('');
pp.bloomEnabled = true;
pp.bloomWeight = 0.1;
pp.bloomThreshold = 0.8;
const ao = new SSAORenderingPipeline('', scene, { ssaoRatio: 0.8, combineRatio: 1.0 }, [camera]);
ao.radius = 0.0002;
ao.base = 0.7;
window.onresize = () => engine.resize();
engine.runRenderLoop(() => scene.render());