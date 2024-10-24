var camera, controls,clock, scene, renderer;

window.addEventListener('load', init);
function init() {
  clock = new THREE.Clock();
  var meshList = [];
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas'),
    antialias:true
  });
  renderer.setPixelRatio(1);
  renderer.setSize(window.innerWidth , window.innerHeight);

  //camera
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight);
  camera.position.set(0, 0, -10);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  createControls( camera );


  //背景
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x000000 );
  // scene.fog = new THREE.Fog(0x000000, -100, 500);

  // //dat gui
  // var gui = new dat.GUI();
  // gui.add( params, 'snowfall', 0, 100 ).step( 1 );

  //リサイズ処理
  window.addEventListener( 'resize', function(){
    onWindowResize(camera, renderer);
  }, false );


  //スプライトを配置
  var mesh = new Sprites();
  scene.add(mesh);
  meshList.push(mesh);

  //パーティクルを配置
  // var particles = new Particles();
  // scene.add(particles);
  // meshList.push(particles);

  controls.update();

  //アニメーション
  tick();
  function tick() {
    controls.update();
    mesh.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
    // frame++;
    // if(frame % 2 == 0) { return; }
  }

}

function createControls( camera ) {
  controls = new THREE.TrackballControls( camera, renderer.domElement );
  controls.rotateSpeed = 5.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.keys = [ 65, 83, 68 ];
}

//光分子の作成
function generateSprite() {
    var canvas = document.createElement( 'canvas' );
    canvas.width = 50;
    canvas.height = 50;
    var context = canvas.getContext( '2d' );
    var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
    // gradient.addColorStop( 0, 'rgba(0,0,0,0.1)' );
    gradient.addColorStop( 0, 'rgba(203,245,72,1)' );
    gradient.addColorStop( 0.5, 'rgba(245,23,72,1)' );
    gradient.addColorStop( 1, 'rgba(0,0,0,1)' );
    context.fillStyle = gradient;
    context.fillRect( 0, 0, canvas.width, canvas.height );
    return canvas;
}



class Sprites extends THREE.Object3D {
  constructor() {
    super();
    this.particleList = [];
    this.angle = 0;

    var geometry = new THREE.BufferGeometry();

    var materials = [];

    //球面上に配置
    var vertices = [];
    var vertex = new THREE.Vector3();

    for (var i = 0; i < 100; i++) {
        materials = new THREE.PointsMaterial({
          size: Math.random()*0.3,
          map: new THREE.CanvasTexture( generateSprite() ),
          blending: THREE.AdditiveBlending,
          depthTest: false,
          transparent: true,
          fog: true
        } );

        //球面上に配置
        vertex.x = Math.random() * 2 - 1; //球面状にどう置くか
        vertex.y = Math.random() * 2 - 1; //球面状にどう置くか
        vertex.z = Math.random() * 1 - 1; //球面状にどう置くか
        //vertex.x = Math.sin(i*Math.PI/180); //球面状にどう置くか
        //vertex.y = Math.sin(i*Math.PI/180)*2; //球面状にどう置くか
        //vertex.z = Math.sin(Math.random()*Math.PI/180); //球面状にどう置くか


        vertex.normalize();
        //vertex.multiplyScalar(Math.random()*8-4);
        vertex.multiplyScalar(4);

        vertices.push( vertex.x, vertex.y, vertex.z );
        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

        var particles = new THREE.Points( geometry, materials );
        // particles.rotation.x = Math.random() * 360;
        // particles.rotation.y = Math.random() * 360;
        // particles.rotation.z = Math.random() * 360;
        this.add(particles);
        this.particleList.push(particles);
        this.particleList[i].rotation.x = i;
        this.particleList[i].rotation.z = i;

    }
  }

  update() {
    var delta = clock.getDelta();
    for (var i = 0; i < this.particleList.length; i++) {
      this.particleList[i].rotation.x += 0.0001;
      this.particleList[i].rotation.z += 0.001;
    }
  }
}



function onWindowResize(camera, renderer) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}


function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}