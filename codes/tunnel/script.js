const global = {
  scene: null,
  camera: null,
  renderer: null,
  loadManager: null,
  texLoader: null,
  texSrc: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/304639/folds.jpg' };


const config = {
  radius: 3,
  shape: null,
  texture: null,
  plus: null };


const init = () => {
  initScene();
  initLight();
  initLoader();
  loadTexture();
  createShape();
};

const initScene = () => {

  global.scene = new THREE.Scene();

  global.camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  1,
  1000);

  global.camera.position.set(0, -40, -120);
  global.camera.lookAt(global.scene.position);
  global.scene.add(global.camera);

  global.renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    logarithmicDepthBuffer: true });

  global.renderer.setSize(window.innerWidth, window.innerHeight);
  global.renderer.shadowMap.enabled = true;
  global.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  document.querySelector('[data-stage]').appendChild(global.renderer.domElement);
};

const initLight = () => {

  const shadowLight = new THREE.SpotLight(0xffffff);
  shadowLight.intensity = 0.4;
  shadowLight.distance = 0;
  shadowLight.angle = Math.PI * 0.15;
  shadowLight.penumbra = 0.5;
  shadowLight.decay = 2.0;
  shadowLight.position.set(0, 130, -50);
  shadowLight.castShadow = true;
  shadowLight.shadow.mapSize.width = 1024;
  shadowLight.shadow.mapSize.height = 1024;
  shadowLight.shadow.camera.near = 0.5;
  shadowLight.shadow.camera.far = shadowLight.position.y * 2;
  global.scene.add(shadowLight);

  const sunLight = new THREE.PointLight(0xffffff, 0.4, 1000, 1);
  sunLight.position.set(0, 0, 700);
  global.scene.add(sunLight);
  global.light = sunLight;
};

const createTunnel = () => {

  const material = new THREE.MeshStandardMaterial({
    color: 0x333333,
    metalness: 0.6,
    roughness: 0.4,
    side: THREE.DoubleSide,
    bumpMap: config.texture,
    bumpScale: 20.0 });

  const geometry = new THREE.CylinderBufferGeometry(80, 80, 700, 32, 1, true, 0, Math.PI * 2);

  const tunnel = new THREE.Mesh(geometry, material);
  tunnel.receiveShadow = true;
  tunnel.rotation.set(Math.PI * -0.5, 0, 0);
  tunnel.position.set(0, 0, 100);
  global.scene.add(tunnel);
};

const initLoader = () => {
  global.loadManager = new THREE.LoadingManager();
  global.texLoader = new THREE.TextureLoader(global.loadManager);
  global.texLoader.setCrossOrigin('anonymous');
  global.loadManager.onLoad = function () {
    createTunnel();
    createMesh(animate);
  };

};

const loadTexture = () => {
  global.texLoader.load(global.texSrc, function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    config.texture = texture;
  });
};

const createShape = () => {

  const shape = new THREE.Shape();
  shape.moveTo(config.radius, 0);
  shape.absarc(0, 0, config.radius, 0, Math.PI * 2, false);

  const hole = new THREE.Path();
  hole.moveTo(config.radius * 0.3, 0);
  hole.absarc(0, 0, config.radius * 0.3, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  config.shape = shape;
};

const createPath = nth => {

  const length = 40 - nth * config.radius * 4;
  const curveRadius = 2;

  const top = new THREE.LineCurve3(
  new THREE.Vector3(0, length, 0),
  new THREE.Vector3(0, curveRadius, 0));

  const curve = new THREE.QuadraticBezierCurve3(
  new THREE.Vector3(0, curveRadius, 0),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(curveRadius, 0, 0));

  const right = new THREE.LineCurve3(
  new THREE.Vector3(curveRadius, 0, 0),
  new THREE.Vector3(length, 0, 0));


  const path = new THREE.CurvePath();
  path.curves = [top, curve, right];

  return path;
};

const createSegment = (offset, num) => {
  const group = new THREE.Group();

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.7,
    roughness: 0.4 });

  material.flatShading = false;

  for (let i = 0; i < num; i++) {
    const path = createPath(i);
    const props = {
      steps: 80,
      extrudePath: path,
      bevelEnabled: false,
      curveSegments: 16 };

    const geometry = new THREE.ExtrudeGeometry(
    config.shape,
    props);


    const bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);

    const x = config.radius + i * config.radius * 2;
    const y = config.radius + i * config.radius * 2;
    const mesh = new THREE.Mesh(bufferGeometry, material);
    mesh.position.set(x, y, offset * config.radius * 2);
    mesh.castShadow = true;
    group.add(mesh);
  }

  return group;
};

const createUnit = () => {

  const group = new THREE.Group();

  for (let i = 0; i < 4; i++) {
    const segment = createSegment(i, 2);
    group.add(segment);
  }

  return group;
};

const createMesh = callback => {

  const group = new THREE.Group();

  for (let i = 0; i < 4; i++) {
    const unit = createUnit();
    unit.position.set(0, 0, -config.radius * 3);
    unit.rotation.set(0, 0, Math.PI * 0.5 * i);
    group.add(unit);
  }

  config.plus = group;
  callback();
};

const animate = () => {

  const container = new THREE.Group();
  container.add(config.plus);
  container.rotation.set(0, Math.PI * 0.2, 0);
  global.scene.add(container);

  const time = 0.8;
  const delay = '+=1.5';
  let pr = 0;
  const tl = new TimelineMax({
    onUpdate: () => {
      container.rotation.y -= 0.0005;
      container.rotation.z -= 0.001;
      pr = tl.progress();
      tlLight.progress(pr);
      tlContainer.progress(pr);
      render();
    },
    onComplete: () => {
      tl.restart();
    } });


  const steps = {
    x: Math.PI,
    z: Math.PI * 0.5,
    y: Math.PI };


  Object.entries(steps).map(([key, value]) => {
    tl.to(config.plus.rotation, time, {
      [key]: value,
      ease: Power4.easeIn },
    delay).
    to(global.camera.position, 0.1, {
      x: -1,
      y: -39,
      ease: RoughEase.ease.config({
        strength: 2,
        points: 5,
        template: Linear.easeNone,
        randomize: true }) }).


    to(global.camera.position, 0.1, {
      x: 0,
      y: -40,
      ease: RoughEase.ease.config({
        strength: 2,
        points: 5,
        template: Linear.easeNone,
        randomize: true }) });


  });

  const tlContainer = new TimelineMax();
  tlContainer.to(container.position, time, {
    y: -5,
    z: -10,
    ease: Power1.easeInOut }).

  to(container.position, time, {
    y: 0,
    z: 0,
    ease: Power1.easeInOut });

  tlContainer.paused();

  const tlLight = new TimelineMax();
  tlLight.to(global.light, time, {
    intensity: 0.08,
    ease: Power1.easeInOut }).

  to(global.light, time, {
    intensity: 0.4,
    ease: Power1.easeInOut });

  tlLight.paused();
};

window.addEventListener('resize', resizeHandler);

const render = () => {
  global.renderer.render(global.scene, global.camera);
};

function resizeHandler() {
  global.renderer.setSize(window.innerWidth, window.innerHeight);
  global.camera.aspect = window.innerWidth / window.innerHeight;
  global.camera.updateProjectionMatrix();
}


//////// >>>>>>>> fire
init();