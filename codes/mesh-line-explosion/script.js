class World {

  constructor() {
    this.simplex = new SimplexNoise();
    this.resolution = {
      x: 0,
      y: 0 };

    this.explosions = [];

    this.setupScene();
    this.setupRenderer();
    this.setupCamera();
    //this.setupComposer();
    this.setupGrid();
    this.setupControls();
    this.reset();
    this.observe();
    this.loop();
  }

  reset() {
    this.onResize();

    if (this.vb.get('grid')) {
      this.addGrid();
    } else {
      this.removeGrid();
    }

    this.explosions.forEach(explosion => {
      explosion.destroy();
    });
    this.explosions.length = 0;
    this.setupExplosions();
  }

  observe() {
    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    this.dpr = window.devicePixelRatio >= 2 ? 2 : 1;
    //this.dpr = 1;
    this.resolution.x = window.innerWidth;
    this.resolution.y = window.innerHeight;

    this.camera.aspect = this.resolution.x / this.resolution.y;
    this.camera.updateProjectionMatrix();

    //this.composer.setSize(this.resolution.x * this.dpr, this.resolution.y * this.dpr);

    this.renderer.setSize(this.resolution.x, this.resolution.y);
    this.renderer.setPixelRatio(this.dpr);
  }

  setupScene() {
    this.scene = new THREE.Scene();
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true });

    document.body.appendChild(this.renderer.domElement);
  }

  setupCamera() {
    this.fov = 75;
    this.camera = new THREE.PerspectiveCamera(this.fov, 0, 0.1, 75);
    this.camera.position.set(-5, 3, 5);
    this.orbit = new THREE.OrbitControls(this.camera, this.renderer.domElement);
  }

  setupGrid() {
    this.grid_helper = new THREE.GridHelper(20, 20, 0x666666, 0x666666);
    this.grid_helper.material.transparent = true;
    this.grid_helper.material.opacity = 0.3;
  }

  addGrid() {
    this.scene.add(this.grid_helper);
  }

  removeGrid() {
    this.scene.remove(this.grid_helper);
  }

  setupComposer() {
    //this.composer = new THREE.EffectComposer(this.renderer);

    //this.render_pass = new THREE.RenderPass(this.scene, this.camera);
    //this.render_pass.renderToScreen = true;
    //this.composer.addPass(this.render_pass);

    // this.custom_shader = {
    //   uniforms: {
    //     tDiffuse: { value: null },
    //     u_brightness: { type: 'f', value: 1.0 },
    //     u_rgb_angle: { type: 'f', value: Math.PI / 4 },
    //     u_rgb_amount: { type: 'f', value: 0.002 }
    //   },
    //   vertexShader: `
    //     varying vec2 vUv;
    //     void main() {
    //       vUv = uv;
    //       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    //     }      
    //   `,
    //   fragmentShader: `
    //     uniform float u_brightness;
    //     uniform float u_rgb_angle;
    //     uniform float u_rgb_amount;
    //     uniform sampler2D tDiffuse;
    //     varying vec2 vUv;        
    //     void main() {
    //       float angle = u_rgb_angle;
    //       float amount = u_rgb_amount;
    //       vec2 offset = amount * vec2(cos(angle), sin(angle));
    //       vec4 cr = texture2D(tDiffuse, vUv + offset);
    //       vec4 cga = texture2D(tDiffuse, vUv);
    //       vec4 cb = texture2D(tDiffuse, vUv - offset);
    //       gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a) * u_brightness;
    //     }`
    // };

    //this.custom_pass = new THREE.ShaderPass(this.custom_shader);
    //this.custom_pass.renderToScreen = true;
    //this.composer.addPass(this.custom_pass);
  }

  setupControls() {
    this.vb_timeout = null;

    this.vb = new VariaBoard({
      container: document.body,
      title: 'Mesh Line Explosion',
      changeCallback: () => {
        clearTimeout(this.vb_timeout);
        this.vb_timeout = setTimeout(() => {
          this.reset();
        }, 250);
      } });


    this.vb.addRange({
      id: 'speed',
      title: 'Speed',
      description: 'Speed of animation',
      min: 0.001,
      max: 0.015,
      step: 0.001,
      default: 0.01,
      eased: false });


    this.vb.addRange({
      id: 'noise',
      title: 'Noise',
      description: 'Simplex noise change',
      min: 0.01,
      max: 0.5,
      step: 0.01,
      default: 0.3,
      eased: false });


    this.vb.addRange({
      id: 'total',
      title: 'Total',
      description: 'Total lines',
      min: 10,
      max: 200,
      step: 1,
      default: 100,
      eased: false });


    this.vb.addRange({
      id: 'trail',
      title: 'Trail',
      description: 'Trail permanence',
      min: 0.05,
      max: 1,
      step: 0.01,
      default: 0.2,
      eased: false });


    this.vb.addRange({
      id: 'thickness',
      title: 'Thickness',
      description: 'Line thickness',
      min: 0.03,
      max: 0.3,
      step: 0.01,
      default: 0.07,
      eased: false });


    this.vb.addRange({
      id: 'hue-1',
      title: 'Hue 1',
      description: 'Hue 1',
      min: 0,
      max: 360,
      step: 1,
      default: 300,
      eased: false });


    this.vb.addRange({
      id: 'hue-2',
      title: 'Hue 2',
      description: 'Hue 2',
      min: 0,
      max: 360,
      step: 1,
      default: 240,
      eased: false });


    this.vb.addButton({
      id: 'randomize',
      title: 'Randomize',
      description: 'Set all controls to random values',
      callback: () => {
        this.vb.randomize();
      } });


    this.vb.addBoolean({
      id: 'ghost-path',
      title: 'Ghost Path',
      description: 'Show a faded version of the line path',
      default: true,
      locked: true });


    this.vb.addBoolean({
      id: 'grid',
      title: 'Grid',
      description: 'Show a line grid',
      default: false,
      locked: true });


  }

  setupExplosions() {
    let explosion = new Explosion(this, new THREE.Vector3(0, -0.5, 0));
    this.explosions.push(explosion);
  }

  update() {
    this.orbit.update();
    //this.custom_pass.uniforms.u_brightness.value = 0.5 + this.explosions[0].p * 2;

    let i = this.explosions.length;
    while (i--) {
      this.explosions[i].update();
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    //this.composer.render();
  }

  loop() {
    this.update();
    this.render();
    window.requestAnimationFrame(() => this.loop());
  }}



class Explosion {

  constructor(world, origin) {
    this.world = world;
    this.origin = origin;
    this.line_group = new THREE.Object3D();
    this.world.scene.add(this.line_group);
    this.lines = [];
    this.total = this.world.vb.get('total');
    this.p = 0;
    this.p_e = 0;
    this.line_group.position.copy(this.origin);

    this.octahedron_geometry = new THREE.OctahedronBufferGeometry(0.4, 0);
    this.octahedron_material = new THREE.MeshBasicMaterial({
      blending: THREE.AdditiveBlending,
      color: 0xffffff,
      depthTest: false,
      transparent: true,
      wireframe: true });

    this.octahedron_mesh = new THREE.Mesh(this.octahedron_geometry, this.octahedron_material);
    this.octahedron_mesh.position.copy(this.origin);
    this.world.scene.add(this.octahedron_mesh);

    this.setupLines();
  }

  setupLines() {
    for (let i = 0; i < this.total; i++) {
      let material = new MeshLineMaterial({
        blending: THREE.AdditiveBlending,
        color: new THREE.Color(`hsl(${Calc.randArr([this.world.vb.get('hue-1'), this.world.vb.get('hue-2')])}, 80%, 50%)`),
        depthTest: false,
        opacity: 1,
        transparent: true,
        lineWidth: this.world.vb.get('thickness'),
        resolution: this.world.resolution });

      let line = new ExplosionLine(this.world, material);
      this.lines.push(line);
      if (this.world.vb.get('ghost-path')) {
        this.line_group.add(line.mesh_ghost);
      }
      this.line_group.add(line.mesh);
    }
  }

  update() {
    this.p += this.world.vb.get('speed');
    if (this.p > 1) {
      this.p = this.p - 1;
    }

    this.p_e = Ease.inOutExpo(this.p, 0, 1, 1);

    let scale = Calc.map(this.p, 0, 1, 0.0001, 4);
    this.line_group.scale.set(scale, scale, scale);
    this.line_group.position.y = this.origin.y + this.p * 1;
    this.line_group.rotation.y = Calc.map(this.p, 0, 1, 0, Math.PI / 4);

    scale = Calc.map(this.p_e, 0, 1, 0.0001, 4);
    this.octahedron_mesh.scale.set(scale, scale * 1.25, scale);
    this.octahedron_mesh.position.y = this.origin.y + this.p * 1;
    this.octahedron_mesh.rotation.y = Calc.map(this.p, 0, 1, 0, Math.PI / 2);
    this.octahedron_material.opacity = Calc.clamp(1 - this.p * 1, 0, 0.2);

    let i = this.lines.length;
    while (i--) {
      this.lines[i].update(this.p_e);
    }
  }

  destroy() {
    this.lines.forEach(line => {
      this.line_group.remove(line.mesh_ghost);
      this.line_group.remove(line.mesh);
      line.destroy();
    });
    this.world.scene.remove(this.line_group);
    this.line_group = null;
    this.world.scene.remove(this.octahedron_mesh);
    this.octahedron_geometry.dispose();
    this.octahedron_material.dispose();
  }}



class ExplosionLine {

  constructor(world, material) {
    this.world = world;
    this.material = material;
    this.points = [];
    this.total = 75;
    this.geometry = new THREE.Geometry();
    this.line = new MeshLine();
    this.offset = Calc.rand(0, 1000);
    this.vec = new THREE.Vector3();

    for (let i = 0; i < this.total; i++) {
      let p_g = i / (this.total - 1);
      let off = this.world.vb.get('noise');
      let mag = 1 * p_g;
      let x = this.world.simplex.noise2D((p_g + 0) * off, this.offset) * mag;
      let y = this.world.simplex.noise2D((p_g + 1000) * off, this.offset) * mag;
      let z = this.world.simplex.noise2D((p_g + 2000) * off, this.offset) * mag;
      this.vec.set(x, y, z);
      this.vec.normalize();
      this.vec.setLength(mag);
      this.points.push(this.vec.clone());
    }

    for (let i = 0; i < this.total; i++) {
      this.geometry.vertices.push(this.points[i]);
    }

    this.line.setGeometry(this.geometry, p => {
      let size = 1;
      let n = size - Math.abs(Calc.map(p, 0, 1, -size, size));
      return n;
    });

    this.mesh = new THREE.Mesh(this.line.geometry, this.material);
    this.mesh.frustumCulled = false;

    if (this.world.vb.get('ghost-path')) {
      this.geometry_ghost = this.line.geometry.clone();
      this.material_ghost = new MeshLineMaterial({
        blending: THREE.AdditiveBlending,
        color: new THREE.Color(`hsl(0, 0%, 10%)`),
        depthTest: false,
        lineWidth: 0.01,
        transparent: true,
        resolution: this.world.resolution });


      this.mesh_ghost = new THREE.Mesh(this.geometry_ghost, this.material_ghost);
      this.mesh_ghost.frustumCulled = false;
    }
  }

  update(p) {
    let len = 3 * (this.total * 3 * this.world.vb.get('trail'));
    let start = Calc.roundToNearestInterval(p * this.total * 6 - len + len * p, 3);
    let count = len;
    this.mesh.geometry.setDrawRange(start, count);
    //if(this.mesh_ghost) {
    //this.mesh_ghost.material.uniforms.opacity.value = Calc.clamp(3 - p * 3, 0, 1);
    //}
  }

  destroy() {
    this.material.dispose();
    if (this.material_ghost) {
      this.material_ghost.dispose();
    }
    if (this.geometry_ghost) {
      this.geometry_ghost.dispose();
    }
    this.geometry.dispose();
    if (this.geometry_ghost) {
      this.geometry_ghost = null;
    }
    this.geometry = null;
    this.line = null;
  }}



let world = new World();