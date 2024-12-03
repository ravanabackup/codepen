/*
forked
original:
Copyright (c) 2023 by Dennis Hadley (https://codepen.io/dennishadley/pen/KEXVWm)
*/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
70,
window.innerWidth / window.innerHeight,
0.1,
1000);


const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.gammaOutput = true;

document.body.appendChild(renderer.domElement);

scene.add(camera);

const light = new THREE.DirectionalLight(0xffffff, 0.7);
light.position.set(1, 1, 0).normalize();
scene.add(light);

const light2 = new THREE.DirectionalLight(0xff5566, 0.7);
light2.position.set(-3, -1, 0).normalize();
scene.add(light2);
scene.add(new THREE.AmbientLight(0xffffff, 0.3));

const fogColor = new THREE.Color(0xff5566);
scene.fog = new THREE.Fog(fogColor, 1, 200);

const clouds = new THREE.Group();

for (var i = 0; i < 300; i++) {
  let cloud = makeCloud();
  const scale = Math.random() * 1.15 + 0.5;
  cloud.position.x = Math.random() * 200 + 1;
  cloud.position.z = Math.random() * 200 + 1;
  cloud.position.y = Math.random() * 12 + 1;
  cloud.rotation.y += Math.random() * 0.002 + 0.001;
  cloud.scale.set(scale, scale, scale);

  clouds.add(cloud);
}

clouds.position.z = -50;
scene.add(clouds);

camera.position.set(170, 10, 50);

const render = function () {
  requestAnimationFrame(render);
  clouds.rotation.y -= 0.0001;
  renderer.render(scene, camera);
};

const resize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", resize);
requestAnimationFrame(render);

function makeCloud() {
  const getRandomInRange = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  const createTuft = function (baseCloudSize, tuftSize, farSide) {
    const calcTuftXPosition = function (cloudR, tuftR) {
      const minOffset = tuftR * 0.4;
      const maxOffset = tuftR;
      const offset = getRandomInRange(minOffset, maxOffset);
      return cloudR * 2 - (cloudR - tuftR) - offset;
    };

    const calcTuftZPosition = function (cloudR, tuftR) {
      const minOffset = tuftR * 0.4;
      const maxOffset = tuftR * 0.6;
      const offset = getRandomInRange(minOffset, maxOffset);
      const negative = Math.random() >= 0.5;
      return offset * negative ? -1 : 1;
    };

    const tuft = new THREE.SphereGeometry(tuftSize, 10, 10);
    const tuftXPos =
    calcTuftXPosition(baseCloudSize, tuftSize) * (farSide ? -1 : 1);
    const tuftZPos = calcTuftZPosition(baseCloudSize, tuftSize);

    tuft.translate(tuftXPos, 0, tuftZPos);

    return tuft;
  };

  const map = (val, smin, smax, emin, emax) =>
  (emax - emin) * (val - smin) / (smax - smin) + emin;
  const jitter = (geo, per) =>
  geo.vertices.forEach(v => {
    v.x += map(Math.random(), 0, 1, -per, per);
    v.y += map(Math.random(), 0, 1, -per, per);
    v.z += map(Math.random(), 0, 1, -per, per);
  });
  const chopBottom = (geo, bottom) =>
  geo.vertices.forEach(v => v.y = Math.max(v.y, bottom));
  const numTufts = 2;

  const minCloudSize = 1.2;
  const maxCloudSize = 2.2;

  const geo = new THREE.Geometry();

  const baseCloudSize = getRandomInRange(minCloudSize, maxCloudSize);
  const baseCloud = new THREE.SphereGeometry(baseCloudSize, 10, 10);

  baseCloud.translate(0, 0, 0);
  geo.merge(baseCloud);

  for (var i = 0; i < numTufts; i++) {
    const tuftSize = getRandomInRange(minCloudSize, baseCloudSize * 0.6);
    const tuft = createTuft(baseCloudSize, tuftSize, i % 2 == 0 ? false : true);
    geo.merge(tuft);
  }

  jitter(geo, 0.2);
  chopBottom(geo, -0.4);
  geo.computeFlatVertexNormals();

  return new THREE.Mesh(
  geo,
  new THREE.MeshLambertMaterial({
    color: "white",
    flatShading: true }));


}