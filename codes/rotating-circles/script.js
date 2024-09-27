class World {

  constructor() {
    this.circles = [];

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0x222222);
    document.body.appendChild(this.renderer.domElement);
    this.resize();

    this.addCube();
    this.addLight();

    requestAnimationFrame(this.render.bind(this));
    window.addEventListener('resize', this.resize.bind(this));
  }

  addLight() {
    let light1 = new THREE.PointLight(0xffffff, 1);
    light1.position.set(0, 0, 100);
    this.scene.add(light1);

    let light2 = new THREE.AmbientLight(0x111111); // soft white light
    this.scene.add(light2);
  }

  addCube() {
    let colors = [0xf7a510, 0x219ca5, 0xef4239];
    let j = 0;

    for (let i = 0; i < 10; i++) {
      var cube_geometry = new THREE.CylinderGeometry(4.5 + j, 4.5 + j, 5, 100);
      var cube_mesh = new THREE.Mesh(cube_geometry);
      cube_mesh.position.x = -7;
      var cube_bsp = new ThreeBSP(cube_mesh);
      var sphere_geometry = new THREE.CylinderGeometry(3 + j, 3 + j, 6, 100);
      var sphere_mesh = new THREE.Mesh(sphere_geometry);
      sphere_mesh.position.x = -7;
      var sphere_bsp = new ThreeBSP(sphere_mesh);

      var subtract_bsp = cube_bsp.subtract(sphere_bsp);
      var circle = subtract_bsp.toMesh(new THREE.MeshLambertMaterial({
        shading: THREE.FlatShading,
        color: colors[i % 3] }));
      circle.scale.set(.5, .5, .5);
      circle.rotation.x = Math.PI / 2;
      circle.position.x += 5;
      circle.geometry.computeVertexNormals();
      this.scene.add(circle);

      let dir = i % 2 ? 1 : -1;
      let dir2 = i % 3 ? 1 : -1;
      TweenMax.to(circle.rotation, 1, { x: Math.PI * 1.5, z: Math.PI * dir, repeat: -1, repeatDelay: 1, delay: i / 7 });

      this.circles.push(circle);

      j += 3;
    }
  }

  render() {
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 100;

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }}


var _w = new World();