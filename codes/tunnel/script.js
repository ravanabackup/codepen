const [ww, wh] = [window.innerWidth, window.innerHeight];
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 1000);
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });

// Function tested here -> https://codepen.io/josephrexme/pen/gRrOJW?editors=0010
const coordToArray = (str) =>
str.trim().split(' ').map(s => s.split(',').map(s => +s));


const route = document.getElementById('route');
const pointsArray = coordToArray(route.getAttribute('points'));
// Join the lines by adding first point again
pointsArray.push(pointsArray[0]);

const points = pointsArray.map((point) =>
new THREE.Vector3(point[0], 0, point[1]));

const path = new THREE.CatmullRomCurve3(points);
camera.position.z = 500;

renderer.setSize(ww, wh);

const geometry = new THREE.TubeGeometry(path, 300, 2, 20, false);
const light = new THREE.PointLight(0xffffff, 1, 100);

const textureURL = 'https://cdn.rawgit.com/josephrexme/csa/824f115d/images/brickpaint.jpg';
const textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = true;
textureLoader.load(textureURL, texture => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(25, 3);
  const material = new THREE.MeshLambertMaterial({
    map: texture,
    side: THREE.BackSide });

  const tube = new THREE.Mesh(geometry, material);

  scene.add(tube);
  scene.add(light);

  let percentage = 0;
  const render = () => {
    percentage += 0.001;
    const p1 = path.getPointAt(percentage % 1);
    const p2 = path.getPointAt((percentage + 0.01) % 1);
    camera.position.set(p1.x, p1.y, p1.z);
    camera.lookAt(p2);
    light.position.set(p2.x, p2.y, p2.z);
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  };
  render();
});