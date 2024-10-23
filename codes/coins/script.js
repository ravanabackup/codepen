var scene, camera, renderer;
var material, light;
var light1, light2;
var cubes = [];
var object, id;
var stats, wrapper;
var jsonLoader;

var isAnimation = true;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
  // camera.position.z = 120;
  camera.position.y = 40;
  camera.position.x = 120;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000);
  document.body.appendChild(renderer.domElement);

  light = new THREE.PointLight(0x999999, 0.5);
  light.position.set(100, 100, 100);
  light.lookAt(new THREE.Vector3());
  scene.add(light);

  light2 = new THREE.PointLight(0x999999, 0.5);
  light2.position.set(-100, 100, 100);
  light2.lookAt(new THREE.Vector3());
  scene.add(light2);

  light2.lookAt(new THREE.Vector3());

  var gridHelper = new THREE.GridHelper(100, 10);
  //scene.add(gridHelper);


  jsonLoader = new THREE.JSONLoader();
  jsonLoader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/13842/coin.json", onJsonLoad);


  TweenMax.ticker.addEventListener('tick', animate);
}

var coins = [];

var uniforms = THREE.UniformsUtils.merge([
THREE.UniformsLib["lights"],
{
  diffuse: { type: 'c', value: new THREE.Color(0xf2cb01) },
  uTime: { value: 0 } }]);




function onJsonLoad(geo, mat) {
  geo.computeVertexNormals();
  geo.computeBoundingBox();

  var xx, zz;
  console.log(geo);
  console.log(geo.boundingBox.max.z);

  for (xx = -24; xx < 20; xx++) {
    for (zz = -4; zz < 5; zz++) {
      coins.push(createCoin(geo, xx, zz));
    }
  }

}
var mat = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: document.getElementById("vertex").textContent,
  fragmentShader: document.getElementById('fragment').textContent,
  side: THREE.DoubleSide,
  lights: true });


function createCoin(geo, xx, zz) {
  mat.shading = THREE.FlatShading;
  var coin = new THREE.Mesh(geo, mat);



  coin.position.z = geo.boundingBox.max.z * 10 * 2.4 * (2 * zz - Math.abs(xx) % 2);
  coin.position.x = geo.boundingBox.max.x * 10 * 2 * xx;
  var distance = Math.sqrt(coin.position.z * coin.position.z + coin.position.x * coin.position.x);
  coin.animationDelay = distance * 0.015 + 0.3;
  coin.position.y = -10;
  coin.scale.set(6, 6, 6);
  scene.add(coin);
  tweenAnimation(coin);


  return coin;
}

function tweenAnimation(coin) {
  TweenMax.to(coin.position, 3, { y: 25, ease: Elastic.easeOut, delay: coin.animationDelay });
  TweenMax.to(coin.rotation, 0.6, { y: 2 * Math.PI, ease: Quint.easeInOut, delay: coin.animationDelay });
  TweenMax.to(coin.position, 2.4, { y: -10, ease: Elastic.easeIn, delay: coin.animationDelay + 1.5 });
  TweenMax.to(coin.rotation, 0.8, { y: 4 * Math.PI, ease: Quint.easeInOut, delay: coin.animationDelay + 3.1, onComplete: repeatTweenAnimation.bind(window, coin) });
}

function repeatTweenAnimation(coin) {
  coin.rotation.y = 0;
  TweenMax.to(coin.position, 3, { y: 25, ease: Elastic.easeOut, delay: 3 });
  TweenMax.to(coin.rotation, 0.6, { y: 2 * Math.PI, ease: Quint.easeInOut, delay: 3 });
  TweenMax.to(coin.position, 2.4, { y: -10, ease: Elastic.easeIn, delay: 3 + 2 });
  TweenMax.to(coin.rotation, 0.8, { y: 4 * Math.PI, ease: Quint.easeInOut, delay: 3 + 2 + 1.6, onComplete: repeatTweenAnimation.bind(window, coin) });
}

function animate() {


  renderer.render(scene, camera);


}

window.addEventListener('keydown', function (ev) {
  if (ev.keyCode == 27) {
    if (isAnimation) TweenMax.ticker.addEventListener('tick', animate);else
    TweenMax.ticker.removeEventListener('tick', animate);

    isAnimation = !isAnimation;
  }
});

init();