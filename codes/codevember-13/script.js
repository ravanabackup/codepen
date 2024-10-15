function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}console.clear();

const global = {
  tlActive: false,
  tl: null,
  loadManager: null,
  texLoader: null,
  texSrc: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/46992/noise.png',
  texture: null,
  world: null,
  swing: null,
  balls: [],
  radiusSwing: 25,
  radiusBall: 5,
  shadows: true,
  orange: 0xff4e00 };


const init = () => {
  initLoader();
  loadTexture();
};


// ================================== load assets
const initLoader = () => {
  global.loadManager = new THREE.LoadingManager();
  global.texLoader = new THREE.TextureLoader(global.loadManager);
  global.texLoader.setCrossOrigin('anonymous');
  global.loadManager.onLoad = function () {
    createComposition();
    render();
    initTl();
    createAnimation();
  };
};

const loadTexture = () => {
  global.texLoader.load(global.texSrc, function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 5);
    global.texture = texture;
  });
};



// ================================== composition components
const initLights = container => {

  const shadowLight = new THREE.SpotLight(0xffffff);
  shadowLight.intensity = 0.2, // 0.2;
  shadowLight.distance = 300;
  shadowLight.decay = 1.0;
  shadowLight.penumbra = 1.0;
  shadowLight.angle = Math.PI * 0.4;
  shadowLight.position.set(-50, 150, -25);
  shadowLight.castShadow = true;
  shadowLight.shadow.mapSize.width = 1024;
  shadowLight.shadow.mapSize.height = 1024;
  shadowLight.shadow.camera.near = 50.0;
  shadowLight.shadow.camera.far = 250;
  shadowLight.shadow.radius = 2.0;
  if (global.shadows) container.scene.add(shadowLight);
  // container.scene.add(new THREE.CameraHelper(shadowLight.shadow.camera));

  const sunLight = new THREE.DirectionalLight(0xffffff, 0.6);
  sunLight.position.set(25, 100, 100);
  container.scene.add(sunLight);

  const light = new THREE.AmbientLight(0xffffff, 0.3);
  container.scene.add(light);
};

class Swing {




















  constructor(opts) {_defineProperty(this, "mesh", null);_defineProperty(this, "path", null);_defineProperty(this, "shape", null);
    this.opts = { ...Swing.defaultOpts, ...opts };
    this.init();
    return this.mesh;
  }

  init() {
    this.createPath();
    this.createShape();
    this.createMesh();
  }

  createMesh() {
    const material = new THREE.MeshStandardMaterial({
      color: this.opts.color,
      metalness: this.opts.metalness,
      roughness: this.opts.roughness,
      emissive: this.opts.emissive });

    material.flatShading = false;

    const props = {
      steps: this.opts.steps,
      extrudePath: this.path,
      bevelEnabled: false,
      curveSegments: this.opts.curveSegments };


    const geometry = new THREE.ExtrudeGeometry(this.shape, props);
    geometry.center();
    const bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);

    this.mesh = new THREE.Mesh(bufferGeometry, material);
    this.mesh.receiveShadow = this.opts.receiveShadow;
    this.mesh.castShadow = this.opts.castShadow;
  }

  createShape() {
    const radius = this.opts.radiusTube;
    const v = this.opts.volumeTube;
    const outerShape = new THREE.Shape();
    outerShape.moveTo(radius, radius);
    // x, y, radius, startAngle, endAngle, clockwise
    outerShape.absarc(0, radius, radius, 0, Math.PI, false);

    const innerShape = new THREE.Shape();
    innerShape.moveTo(radius - v, radius);
    innerShape.absarc(0, radius, -radius - v, 0, Math.PI, true);

    const pointsOuter = outerShape.extractPoints(100);
    const pointsInner = innerShape.extractPoints(100);
    const p = [...pointsOuter.shape, ...pointsInner.shape];
    this.shape = new THREE.Shape(p);
  }


  createPath() {
    const radius = this.opts.radiusSwing;
    this.path = new THREE.CurvePath();

    this.path.curves = [
    new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-radius * 0.5, 0, 0),
    new THREE.Vector3(-radius * 0.5, 0, -radius * 0.5),
    new THREE.Vector3(0, 0, -radius * 0.5)),

    new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0, -radius * 0.5),
    new THREE.Vector3(radius * 0.5, 0, -radius * 0.5),
    new THREE.Vector3(radius * 0.5, 0, 0))];


  }}_defineProperty(Swing, "defaultOpts", { color: 0xffffff, metalness: 0.0, roughness: 0.7, emissive: 0x333333, receiveShadow: false, castShadow: false, curveSegments: 16, steps: 40, radiusTube: 10, volumeTube: 0.5, radiusSwing: 25 });



class Ball {

















  constructor(opts) {_defineProperty(this, "mesh", null);
    this.opts = { ...Ball.defaultOpts, ...opts };
    this.createMesh();
    return this.mesh;
  }

  createMesh() {
    const scale = this.opts.scale;
    const geometry = new THREE.SphereGeometry(this.opts.radius, this.opts.segments, this.opts.segments);

    geometry.faces.forEach(face => {
      if (face.normal.y > 0) {
        face.color.setHex(this.opts.color1);
      } else {
        face.color.setHex(this.opts.color2);
      }
    });

    const material = new THREE.MeshStandardMaterial({
      vertexColors: THREE.FaceColors,
      roughness: this.opts.roughness,
      metalness: this.opts.metalness,
      emissive: this.opts.emissive });


    if (this.opts.bumpMap) {
      material.bumpMap = this.opts.bumpMap;
      material.bumpScale = this.opts.bumpScale;
    }

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.scale.set(this.opts.scale, this.opts.scale, this.opts.scale);
    this.mesh.receiveShadow = this.opts.receiveShadow;
    this.mesh.castShadow = this.opts.castShadow;
  }}_defineProperty(Ball, "defaultOpts", { radius: 20, segments: 32, scale: 1, color1: 0xffffff, color2: 0x000000, roughness: 1.0, metalness: 0.4, emissive: 0x333333, bumpMap: null, bumpScale: 0.05, receiveShadow: false, castShadow: false });


class Environment {














  constructor(opts) {_defineProperty(this, "group", new THREE.Group());_defineProperty(this, "material", null);
    this.opts = { ...Environment.defaultOpts, ...opts };
    this.init();
    return this.group;
  }

  init() {
    this.group.rotation.set(0, Math.PI * 0.25, 0);
    this.createMaterial();
    this.createGround();
    this.createLeftBox();
    this.createRightBox();
  }

  createMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: this.opts.color,
      roughness: this.opts.roughness,
      metalness: this.opts.metalness,
      emissive: this.opts.emissive });

  }

  createGround() {
    const geometry = new THREE.BoxBufferGeometry(400, 2, 400);
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(50, -40, -50);
    this.group.add(mesh);
  }

  createLeftBox() {
    const geometry = new THREE.BoxBufferGeometry(200, 100, 50);
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(-40, 20, -100);
    mesh.receiveShadow = this.opts.receiveShadow;
    mesh.castShadow = this.opts.castShadow;
    this.group.add(mesh);
  }

  createRightBox() {
    const geometry = new THREE.BoxBufferGeometry(50, 100, 300);
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(100, 20, 0);
    this.group.add(mesh);
  }}_defineProperty(Environment, "defaultOpts", { color: 0x000000, roughness: 1.0, metalness: 0.4, emissive: 0x333333, bumpMap: null, bumpScale: 0.05, receiveShadow: false, castShadow: false });


const animate = () => {

  const tl = new TimelineMax({
    repeat: -1 });

  global.tl.add(tl);
};



// ================================== assemble the whole composition
const createComposition = () => {

  global.world = new World({
    container: document.querySelector(`[data-stage]`),
    camPosition: new THREE.Vector3(0, 200, 550),
    camFov: 10,
    camNear: 1,
    camFar: 1000 });


  global.world.renderer.shadowMap.enabled = true;
  global.world.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  initLights(global.world);

  global.swing = new Swing({
    color: 0x333333,
    metalness: 0.1,
    roughness: 1.0,
    emissive: 0x000000,
    receiveShadow: false,
    castShadow: global.shadows,

    curveSegments: 16,
    steps: 150,

    radiusTube: 10,
    volumeTube: 1.5,
    radiusSwing: global.radiusSwing });

  global.swing.position.set(0, -20, 0);
  global.swing.rotation.set(-Math.PI * 0.5, 0, 0);

  for (let i = 0; i < 2; i++) {
    const ball = new Ball({
      radius: global.radiusBall,
      color1: global.orange,
      color2: 0xffffff,
      roughness: 0.4,
      metalness: 0.0,
      emissive: 0x333333,
      bumpMap: global.texture,
      bumpScale: 0.5,
      receiveShadow: false,
      castShadow: global.shadows });

    global.balls.push(ball);
  }

  const env = new Environment({
    color: 0x333333,
    roughness: 1.0,
    metalness: 0.4,
    emissive: 0x000000,
    receiveShadow: global.shadows,
    castShadow: false });

  global.world.scene.add(env);

};

const createAnimation = () => {

  const composition = new THREE.Group();
  composition.rotation.set(0, Math.PI * 0.15, 0);
  composition.add(global.swing);
  global.world.scene.add(composition);

  const rot = [0, 0.5];
  const tlBalls = [];
  const radius = global.radiusSwing + global.radiusBall * 0.5;
  const yStart = 50;

  for (let i = 0; i < rot.length; i++) {
    const group = new THREE.Group();
    group.add(global.balls[i]);
    group.rotation.set(0, Math.PI * rot[i], 0);
    global.balls[i].position.set(-radius, yStart, 0);
    composition.add(group);

    const tlBall = new TimelineMax();

    tlBall.add('down').
    to(global.balls[i].position, 5, {
      y: 0,
      ease: Linear.easeNone },
    'down').
    to(global.balls[i].rotation, 5, {
      z: Math.PI * -2.5,
      ease: Linear.easeNone },
    'down').

    add('curve').
    to(global.balls[i].position, 5, {
      bezier: {
        type: "quadratic",
        values: [
        { x: -radius, y: 0 },
        { x: 0, y: -radius * 2.2 },
        { x: radius, y: 0 }] },


      timeResolution: 0,
      ease: Linear.easeNone },
    'curve').
    to(global.balls[i].rotation, 5, {
      z: Math.PI * -8,
      ease: Linear.easeNone },
    'curve').

    add('up').
    to(global.balls[i].position, 5, {
      y: yStart,
      ease: Linear.easeNone },
    'up').
    to(global.balls[i].rotation, 5, {
      z: Math.PI * -10.5,
      ease: Linear.easeNone },
    'up');

    tlBall.paused(true);
    tlBalls.push(tlBall);
  }

  const tlSwing = new TimelineMax({ repeat: -1, delay: 4 });
  for (let i = 0; i < 4; i++) {
    tlSwing.to(global.swing.rotation, 1.5, {
      z: Math.PI * (0.5 * (i + 1)),
      ease: CustomEase.create("custom", "M0,0,C0.458,0,0.41,0.809,0.746,1,0.834,1.05,0.942,1,1,1") }).

    to({}, 1.5, {});
  }

  const tl = new TimelineMax();
  tl.to(tlBalls[0], 6, {
    progress: 1,
    ease: CustomEase.create("custom", "M0,0 C0.698,0 0.3,1 1,1"),
    repeat: -1,
    yoyo: true },
  0).
  add(tlSwing, 0).
  to(tlBalls[1], 6, {
    progress: 1,
    ease: CustomEase.create("custom", "M0,0 C0.698,0 0.3,1 1,1"),
    repeat: -1,
    yoyo: true },
  3);
  tl.timeScale(3);

  global.tl.add(tl);




};


// ================================== render logic
const update = () => {
  global.world.renderer.render(global.world.scene, global.world.camera);
};

const render = () => {
  requestAnimationFrame(render);
  if (global.tlActive) return;
  update();
};

const initTl = () => {
  global.tl = new TimelineMax({
    onStart: () => {
      global.tlActive = true;
    },
    onUpdate: () => {
      update();
    },
    onComplete: () => {
      global.tlActive = false;
    } });

};


// ================================== fire up
init();