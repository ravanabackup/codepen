let scene, camera, cameraCtrl, renderer;
let width, height, cx, cy;
let objects = [];

const defaultConf = {
  white: false,
  nbVertexes: 5,
  nbObjects: 25,
  objectMinRadius: 1,
  objectRadiusCoef: 2,
  objectThickness: 0.5,
  objectDepth: 0.5,
  rotationX: 0,
  rotationY: 360,
  rotationZ: 360,
  animationDuration: 9,
  animationDelay: 0.1,
  cameraZ: 75 };


let demos = [
{ ...defaultConf, white: false, nbVertexes: 7, objectRadiusCoef: 4, objectThickness: 1, rotationX: 360, rotationY: 0, rotationZ: 0, animationDuration: 5 },
{ ...defaultConf, white: true, nbObjects: 50, objectRadiusCoef: 10, objectThickness: 0.2, objectDepth: 1, animationDuration: 11 },
{ ...defaultConf, objectRadiusCoef: 3, objectThickness: 1, objectDepth: 0.2, rotationY: 180 },
{ ...defaultConf, white: true, nbVertexes: 7, nbObjects: 70, objectRadiusCoef: 3, objectThickness: 0.2, objectDepth: 0.2, rotationX: 0, rotationY: 0, rotationZ: 360, animationDuration: 7 },
{ ...defaultConf, white: false, nbVertexes: 4, objectRadiusCoef: 10, objectThickness: 2, objectDepth: 0.5, rotationX: 0, rotationY: 360, rotationZ: 0, animationDuration: 7 }];

let conf = { ...demos[0] };

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  initScene();
  initGui();
  initEventHandlers();

  animate();
};

function initGui() {
  const gui = new dat.GUI();
  gui.add(conf, 'white').onChange(initScene).listen();
  gui.add(conf, 'nbVertexes', 3, 12, 1).onChange(initScene).listen();
  gui.add(conf, 'nbObjects', 10, 100, 1).onChange(initScene).listen();
  gui.add(conf, 'objectRadiusCoef', 1, 20, 0.2).onChange(initScene).listen();
  gui.add(conf, 'objectThickness', 0.2, 5, 0.2).onChange(initScene).listen();
  gui.add(conf, 'objectDepth', 0.2, 5, 0.2).onChange(initScene).listen();
  gui.add(conf, 'rotationX', 0, 720, 30).onChange(initScene).listen();
  gui.add(conf, 'rotationY', 0, 720, 30).onChange(initScene).listen();
  gui.add(conf, 'rotationZ', 0, 720, 30).onChange(initScene).listen();
  gui.add(conf, 'animationDuration', 2, 20, 1).onChange(initScene).listen();
  gui.add(conf, 'animationDelay', 0.1, 2, 0.1).onChange(initScene).listen();
  gui.close();
}

function initEventHandlers() {
  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);

  document.getElementById('demos').addEventListener('click', function (evt) {
    if (evt.target.className === 'demo') {
      let id = evt.target.getAttribute('data-id');
      for (let propertyName in demos[id]) {
        console.log(propertyName);
        conf[propertyName] = demos[id][propertyName];
      }
      initScene();
    }
  });
}

function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = conf.cameraZ;
  cameraCtrl = new THREE.OrbitControls(camera);

  if (conf.white) scene.background = new THREE.Color(0xffffff);else
  initLights();

  initObjects();
}

function initLights() {
  const lightIntensity = 0.5;
  const lightDistance = 200;

  scene.add(new THREE.AmbientLight(0xeeeeee));

  var light;

  light = new THREE.PointLight(randomColor(), lightIntensity, lightDistance);
  light.position.set(0, 100, 0);
  scene.add(light);
  light = new THREE.PointLight(randomColor(), lightIntensity, lightDistance);
  light.position.set(0, -100, 0);
  scene.add(light);

  light = new THREE.PointLight(randomColor(), lightIntensity, lightDistance);
  light.position.set(100, 0, 0);
  scene.add(light);
  light = new THREE.PointLight(randomColor(), lightIntensity, lightDistance);
  light.position.set(-100, 0, 0);
  scene.add(light);

  light = new THREE.PointLight(randomColor(), lightIntensity, lightDistance);
  light.position.set(0, 0, 100);
  scene.add(light);
  light = new THREE.PointLight(randomColor(), lightIntensity, lightDistance);
  light.position.set(0, 0, -100);
  scene.add(light);
}

function initObjects() {
  let geo, mat, mesh;
  if (!conf.white) mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, metalness: 0.9 });
  for (let i = 0; i < conf.nbObjects; i++) {
    geo = polygonGeometry(conf.nbVertexes, 0, 0, conf.objectMinRadius + conf.objectRadiusCoef * i, 0);
    if (conf.white) mat = new THREE.MeshBasicMaterial({ color: randomColor({ luminosity: 'light' }) });
    mesh = new THREE.Mesh(geo, mat);
    mesh.position.z = -conf.objectDepth * i;

    TweenMax.to(mesh.rotation, conf.animationDuration, {
      x: conf.rotationX * Math.PI / 180,
      y: conf.rotationY * Math.PI / 180,
      z: conf.rotationZ * Math.PI / 180,
      ease: Power1.easeInOut,
      repeat: -1,
      yoyo: true,
      delay: i * conf.animationDelay });


    scene.add(mesh);
  }
}

function animate() {
  requestAnimationFrame(animate);
  cameraCtrl.update();
  renderer.render(scene, camera);
};

function onWindowResize() {
  width = window.innerWidth;cx = width / 2;
  height = window.innerHeight;cy = height / 2;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function polygonGeometry(n, x, y, s, r) {
  let points = ppoints(n, x, y, s + conf.objectThickness, r);
  let shape = new THREE.Shape();
  points.forEach((p, i) => {
    if (i === 0) shape.moveTo(p[0], p[1]);else
    shape.lineTo(p[0], p[1]);
  });
  shape.lineTo(points[0][0], points[0][1]);

  points = ppoints(n, x, y, s, r);
  let hole = new THREE.Path();
  points.forEach((p, i) => {
    if (i === 0) hole.moveTo(p[0], p[1]);else
    hole.lineTo(p[0], p[1]);
  });
  hole.lineTo(points[0][0], points[0][1]);

  shape.holes.push(hole);

  let extrudeSettings = { steps: 1, depth: conf.objectDepth, bevelEnabled: false };
  let geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
  geometry.translate(0, 0, -conf.objectDepth / 2);
  return geometry;
}

function ppoints(n, x, y, s, r) {
  const dt = 2 * Math.PI / n;
  let points = [],t,px,py;
  for (let i = 0; i < n; i++) {
    t = Math.PI / 2 + r + i * dt;
    px = x + Math.cos(t) * s;
    py = y + Math.sin(t) * s;
    points.push([px, py]);
  }
  return points;
}

function rnd(max, negative) {
  return negative ? Math.random() * 2 * max - max : Math.random() * max;
}

init();