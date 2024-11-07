var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 0.1, 1000 );
var mesh;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// add icosahedron
var geometry = new THREE.OctahedronGeometry( 20 );
var color = new THREE.Color( "#7833aa" );
console.log(color.getHex());


var textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = true;
textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/4268-bump.jpg', function(texture) {
    var material = new THREE.MeshPhongMaterial( {color: color.getHex(), bumpMap: texture} );
  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  
  render();
});

camera.position.z = 100;

var light = new THREE.PointLight( 0xFFFFFF , 1.5);
light.position.set( 10, 0, 80 );
scene.add( light );

var light = new THREE.PointLight( 0xFFFFFF , 1.5);
light.position.set( 25, 0, -80 );
scene.add( light );

var render = function () {
  requestAnimationFrame( render );
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
};