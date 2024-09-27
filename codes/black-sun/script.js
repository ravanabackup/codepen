var start = Date.now();

var d = 0;
var size = 7500;
var detail = 200;

function lerp(a, b, f) {
  return a + f * (b - a);
}

class World {

  constructor() {
    this.mouse = { x: 0, y: 0 };

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xd3dccd, 0.0005);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0xd3dccd);
    this.renderer.autoClear = false;
    document.body.appendChild(this.renderer.domElement);

    this.resize();
    this.addCube();
    this.addLight();

    let rtParameters = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBFormat,
      stencilBuffer: true };


    var copyPass = new THREE.ShaderPass(THREE.CopyShader);
    copyPass.renderToScreen = true;

    this.composerScene = new THREE.EffectComposer(this.renderer, new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, rtParameters));
    this.composerScene.addPass(new THREE.RenderPass(this.scene, this.camera));

    this.renderScene = new THREE.TexturePass(this.composerScene.renderTarget2.texture);

    this.composer = new THREE.EffectComposer(this.renderer, new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, rtParameters));
    this.composer.addPass(this.renderScene);
    this.composer.addPass(new THREE.FilmPass(0.35, 0.025, 648, false));
    this.composer.addPass(copyPass);


    this.renderScene.uniforms["tDiffuse"].value = this.composerScene.renderTarget2.texture;

    requestAnimationFrame(this.render.bind(this));
    window.addEventListener('resize', this.resize.bind(this));
    this.renderer.domElement.addEventListener('mousemove', this.mousemove.bind(this));
  }

  mousemove(e) {
    this.mouse.x = e.pageX;
    this.mouse.y = e.pageY;

  }

  update() {
    d += 0.005;
    this.updateMesh();
    this.controls.update();
  }

  updateMesh() {

    var vertices = this.geometry.vertices;

    for (var i = 0; i < vertices.length; i++) {

      let a = 2 * Math.PI * this.verts[i].x / (size - 1);

      let myd = 0.5 + Math.sin(d) * 0.5;
      //let myd = this.mouse.y - (window.innerHeight / 2) / 500;

      let delta = Math.min(myd, 1);
      delta = Math.max(delta, 0);
      let radius = size / 4;

      var x = lerp(this.verts[i].x, Math.sin(a) * radius + Math.sin(a) * (this.verts[i].z / 1.2) / 2, delta);
      var y = lerp(this.verts[i].z, -radius + Math.cos(a) * radius + Math.cos(a) * (this.verts[i].z / 1.2) / 2, delta);

      var vert = vertices[i];
      vert.setX(x);
      vert.setZ(-y);
    }

    this.geometry.verticesNeedUpdate = true;
  }

  addLight() {
    let light1 = new THREE.PointLight(0xa39893, 2, 500);
    light1.position.set(-100, 100, -500);
    //this.scene.add(light1);

    let light2 = new THREE.AmbientLight(0x404040); // soft white light
    this.scene.add(light2);

    let directionalLight = new THREE.DirectionalLight(0xa99c9a, 1);
    directionalLight.position.set(1, 0.5, 1);
    this.scene.add(directionalLight);

  }

  addCube() {
    this.geometry = new THREE.PlaneGeometry(size, size, detail, detail);

    var material = new THREE.MeshPhongMaterial({
      color: 0x5a4545,
      specular: 0x9c8c8a,
      shininess: 15,
      shading: THREE.FlatShading });


    var simplex = new SimplexNoise();
    var vertices = this.geometry.vertices;

    for (var i = 0; i < vertices.length; i++) {
      var vert = vertices[i];
      var z = simplex.noise2D(vert.x / 1000, vert.y / 1000) * 500;
      z *= 1 + simplex.noise2D(vert.x, vert.y) / 2;
      vert.setZ(z);
    }

    this.verts = [];
    for (var i = 0; i < vertices.length; i += 1) {
      this.verts.push(vertices[i].clone());
    }

    this.cube = new THREE.Mesh(this.geometry, material);
    this.cube.position.set(0, -600, 0);
    this.cube.rotation.set(-90 * Math.PI / 180, 0, 0);
    this.scene.add(this.cube);
  }

  render() {
    this.update();
    requestAnimationFrame(this.render.bind(this));

    //this.renderer.render(this.scene, this.camera);

    this.composerScene.render();
    this.composer.render(0.02);

  }

  resize() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
    //this.camera.position.y = 100;
    this.camera.position.z = -1000;

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.controls = new THREE.OrbitControls(this.camera);
    this.controls.target.set(0, 0, 0);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 2;
    this.controls.panSpeed = 0.8;
    this.controls.maxPolarAngle = 90 * Math.PI / 180;

    this.controls.keys = [65, 83, 68];
  }}


var _w = new World();