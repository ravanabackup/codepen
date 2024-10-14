// APP
const modelURL =
  "https://assets.codepen.io/40429/campfire_FLATTENED_20201019_1.glb";

document.body.addEventListener("touchstart", (e) => {
  e.preventDefault();
});
const LoadModel = (model) => {
  return new Promise((resolve, reject) => {
    new THREE.GLTFLoader().load(
      model,
      (item) => {
        let gltf = item.scene;
        resolve(gltf);
      },
      (xhr) => {
        let _percent = (xhr.loaded / xhr.total) * 100;
        console.log(`Load Progress: ${_percent}%`);
      },
      (error) => {
        console.log("MODEL ERROR :", error);
        reject(error);
      }
    );
  });
};
let container, stats;
let camera,
  controls,
  scene,
  campfireGroup,
  renderer,
  innerFire,
  middleFire,
  outterFire,
  smoke,
  sparks,
  pointlight,
  constantLight,
  heatLight;
let clock = new THREE.Clock();

LoadModel(modelURL).then((campfire) => {
  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, transparent: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 5;
  camera.position.y = 5;
  controls = new THREE.OrbitControls(camera);
  controls.maxPolarAngle = 1.35 // Comment out to see the "smoke and mirrors";

  // world
  scene = new THREE.Scene();
  campfireGroup = new THREE.Group();
  campfireGroup.position.set(0, 0, 0);
  scene.add(campfireGroup);
  
  const color = 0x000000;
  const density = 0.05;
  scene.fog = new THREE.FogExp2(color, density);
  
  campfire.children[0].castShadow = true;
  campfire.children[0].recieveShadow = true;
  campfire.castShadow = true;
  campfire.recieveShadow = true;
  campfire.scale.set(0.35, 0.35, 0.35);
  campfireGroup.add(campfire);

  // lights
  let directionalLight = new THREE.DirectionalLight(0x8f593f, .5);
  directionalLight.position.set(0, 15, 3.8);
  directionalLight.shadow.radius = 5;
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = 20;
  directionalLight.target = campfire;
  campfireGroup.add(directionalLight);
  
  light = new THREE.PointLight(0x8f593f, .5, 1, 2);
  light.position.set(0, 3, 0);
  light.castShadow = true;
  scene.add(light)

  light = new THREE.AmbientLight(0xffffff);
  campfireGroup.add(light);

  pointlight = new THREE.PointLight(0xff5400, 1, 1, 2);
  pointlight.position.set(0, 0, 0);
  pointlight.caseShadow = true;
  campfireGroup.add(pointlight);
  
  constantLight = new THREE.PointLight(0xff5400, 1, 1, 2);
  constantLight.position.set(0, 0, 0);
  constantLight.caseShadow = true;
  campfireGroup.add(constantLight);
  
  // heatLight = new THREE.PointLight(0xff0000, 1, .2, .1);
  // heatLight.position.set(0, 0, 0);
  // heatLight.caseShadow = true;
  // campfireGroup.add(heatLight);

  // Particles
  THREE.ImageUtils.crossOrigin = "";

  //
  innerFire = new SPE.Group({
    texture: {
      value: THREE.ImageUtils.loadTexture(
        "https://assets.codepen.io/40429/empty-flame.png"
      )
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    fog: true
  });
  emitter = new SPE.Emitter({
    particleCount: 250,
    maxParticleCount: 250,
    maxAge: {
      value: 2,
      spread: 5
    },
    position: {
      value: new THREE.Vector3(0, 0.3, 0),
      spread: new THREE.Vector3(1, 0, 1),
      radius: 0.2,
      distribution: SPE.distributions.SPHERE
    },
    velocity: {
      spread: new THREE.Vector3(0.05, 0.3, 0.05)
    },
    size: {
      value: [0, 3, 5, 1, 4, 2, 5]
    },
    opacity: {
      value: [0, 1, 0.2, 1, 0.3, 0]
    },
    wobble: {
      spread: 0.5
    },
    colorize: true,
    hasPerspective: false
  });
  innerFire.addEmitter(emitter);

  middleFire = new SPE.Group({
    texture: {
      value: THREE.ImageUtils.loadTexture(
        "https://assets.codepen.io/40429/empty-flame.png"
      )
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    fog: true
  });
  emitter = new SPE.Emitter({
    particleCount: 450,
    maxParticleCount: 450,
    maxAge: {
      value: 0.3,
      spread: 1.5
    },
    position: {
      value: new THREE.Vector3(0, -0.2, 0),
      radius: 0.4,
      distribution: SPE.distributions.SPHERE,
      randomise: true
    },
    rotation: {
      randomise: true
    },
    velocity: {
      value: new THREE.Vector3(0, 0.7, 0)
    },
    size: {
      spread: [8, 0]
    },
    opacity: {
      value: [0, 1, 0]
    },
    wiggle: {
      spread: 0.1
    },
    colorize: true,
    hasPerspective: false
  });
  middleFire.addEmitter(emitter);

  outterFire = new SPE.Group({
    texture: {
      value: THREE.ImageUtils.loadTexture(
        "https://assets.codepen.io/40429/flame-flip.png"
      )
    },
    transparent: true,
    blending: THREE.AdditiveBlending
  });
  emitter = new SPE.Emitter({
    particleCount: 45,
    maxParticleCount: 45,
    maxAge: {
      value: 2,
      spread: 4
    },
    position: {
      value: new THREE.Vector3(0, -1, 0),
      radius: 0.5,
      distribution: SPE.distributions.SPHERE,
      randomise: true
    },
    velocity: {
      spread: new THREE.Vector3(0, 0.5, 0)
    },
    size: {
      value: [10, 25]
    },
    opacity: {
      value: [0, 1, 0]
    },
    colorize: true,
    hasPerspective: false
  });
  outterFire.addEmitter(emitter);

  smoke = new SPE.Group({
    texture: {
      value: THREE.ImageUtils.loadTexture(
        "https://assets.codepen.io/40429/toppng.com-smoke-particle-texture-399x385.png"
      )
    },
    transparent: true,
    blending: THREE.AdditiveBlending
  });
  let _smokeCount = window.innerWidth / window.innerHeight >= 1.7 ? 1000 : 5000
  emitter = new SPE.Emitter({
    particleCount: _smokeCount,
    maxParticleCount: _smokeCount,
    maxAge: {
      value: 8,
      spread: 15
    },
    position: {
      value: new THREE.Vector3(0, 0, 0),
      radius: 0.5,
      distribution: SPE.distributions.SPHERE,
      randomise: true
    },
    velocity: {
      spread: new THREE.Vector3(0, 0.8, 0)
    },
    size: {
      value: [0, 5, 0]
    },
    opacity: {
      value: [0, 0.0042, 0]
    },
    wiggle: {
      spread: 2
    },
    colorize: true,
    hasPerspective: false
  });
  smoke.addEmitter(emitter);

  sparks = new SPE.Group({
    texture: {
      value: THREE.ImageUtils.loadTexture(
        "https://assets.codepen.io/40429/ember.png"
      )
    },
    transparent: true,
    blending: THREE.AdditiveBlending
  });
  emitter = new SPE.Emitter({
    particleCount: 50,
    maxParticleCount: 50,
    maxAge: {
      value: 0.5,
      spread: 10
    },
    position: {
      value: new THREE.Vector3(0, 0.5, 0),
      radius: 1,
      distribution: SPE.distributions.SPHERE,
      randomise: true
    },
    velocity: {
      spread: new THREE.Vector3(0, 3, 0)
    },
    size: {
      value: [0, 0.2, 0]
    },
    opacity: {
      value: [1, 0]
    },
    wiggle: {
      spread: 2
    },
    colorize: true,
    hasPerspective: false
  });
  sparks.addEmitter(emitter);

  campfireGroup.add(innerFire.mesh);
  campfireGroup.add(middleFire.mesh);
  campfireGroup.add(outterFire.mesh);
  campfireGroup.add(smoke.mesh);
  campfireGroup.add(sparks.mesh);

  // Floor
  let geometry = new THREE.PlaneGeometry(120, 120, 32);
  let material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
  let plane = new THREE.Mesh(geometry, material);
  plane.rotateX(-Math.PI / 2);
  plane.recieveShadow = true;
  scene.add(plane);

  // Ready to go!
  document.body.appendChild(renderer.domElement);
  render();
});
const randomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};
const render = () => {
  controls.update();
  var delta = clock.getDelta();
  innerFire.tick(delta);
  middleFire.tick(delta);
  //outterFire.tick(delta);
  smoke.tick(delta);
  sparks.tick(delta);
  pointlight.intensity = randomNumber(0.4, 1);
  constantLight.intensity = randomNumber(1, 3);
  // heatLight.intensity = randomNumber(.5, 1);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};