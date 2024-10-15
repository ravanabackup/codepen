console.clear();

class Demo {

  constructor() {
    this.raf = null;
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupControls();
    this.setupObjects();
    this.observe();
    this.onResize();
    this.loop();
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xff0000, 1, 200);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(75, 0, 0.001, 1000);
    this.camera.position.x = -10;
    this.camera.position.y = 10;
    this.camera.position.z = 10;
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true });

    this.renderer.setClearColor(0x000000);
    document.body.appendChild(this.renderer.domElement);
  }

  setupControls() {
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.2;
    this.controls.enableKeys = false;
  }

  setupObjects() {
    let ambientLight = new THREE.AmbientLight(0x222222);
    this.scene.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(100, 100, 0);
    directionalLight.target.position.set(0, 0, 0);
    this.scene.add(directionalLight);

    const size = 100;
    let geometry = new THREE.CubeGeometry(1, 1, 1);
    let material = new THREE.MeshLambertMaterial({
      flatShading: true });

    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        let mesh = new THREE.Mesh(geometry, material);
        let scale = Calc.rand(1, 10 * (x + z) / 100);
        mesh.position.x = x - size / 2 + 0.5;
        mesh.position.y = scale / 2;
        mesh.position.z = z - size / 2 + 0.5;
        mesh.scale.y = scale;
        this.scene.add(mesh);
      }
    }
  }

  update() {
    this.controls.update();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  observe() {
    window.addEventListener('resize', e => this.onResize(e));
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = window.devicePixelRatio > 1 ? 2 : 1;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(this.width, this.height);
  }

  loop() {
    this.update();
    this.render();
    this.raf = window.requestAnimationFrame(() => this.loop());
  }}



let demo = new Demo();