/*--------------------
Vars
--------------------*/
let ball;
let pattern;
let palettes;
const win = { w: window.innerWidth, h: window.innerHeight };
const mouse = { x: win.w * 0.5, y: win.h * 0.5 };


/*--------------------
Utils
--------------------*/
const lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t;


/*--------------------
Pattern Generator
--------------------*/
class Pattern {
  constructor(obj) {
    Object.assign(this, obj);
    this.init();
  }

  init() {
    this.canvas = document.querySelector(`#${this.id}`) || document.createElement('canvas');
    this.canvas.id = this.id;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.generate();
  }

  random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
  }

  generate() {
    let randomPalette = this.random(0, 100);
    // randomPalette = 65
    this.palette = palettes[randomPalette];
    console.log('palette ---->', randomPalette);
    let start = 0;
    while (start < this.height + this.maxStroke) {
      const off = this.random(this.minStroke, this.maxStroke);
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.palette[this.random(0, 5)];
      this.ctx.lineWidth = off;
      this.ctx.moveTo(-this.maxStroke, start);
      this.ctx.lineTo(this.width + this.maxStroke, start);
      this.ctx.stroke();
      this.ctx.closePath();
      start += off;
    }

    if (ball) {
      ball.material.map.needsUpdate = true;
    }
  }}



/*--------------------
Ball
--------------------*/
class Ball {
  constructor(obj) {
    Object.assign(this, obj);
    this.init();
    this.events = this.events.bind(this);
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, transparent: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.scene = new THREE.Scene();

    this.createLights();
    this.createGeo();

    this.events();
    this.render();
  }

  createLights() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, .7);
    this.scene.add(this.ambientLight);
    this.ambientLight.castShadow = true;

    this.light = new THREE.SpotLight(0xffffff, .5);
    this.light.position.set(0, 0, 10);
    this.light.castShadow = true;

    this.scene.add(this.light);
    this.scene.add(this.ambientLight);
  }

  createGeo() {
    this.texture = new THREE.Texture(document.getElementById(this.textureID));
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;

    const path = 'https://threejs.org/examples/textures/cube/SwedishRoyalCastle/';
    const format = '.jpg';
    const urls = [
    `${path}px${format}`, `${path}nx${format}`,
    `${path}py${format}`, `${path}ny${format}`,
    `${path}pz${format}`, `${path}nz${format}`];

    this.cubeTexture = new THREE.CubeTextureLoader().load(urls);
    this.cubeTexture.mapping = THREE.CubeRefractionMapping;

    console.log(this.cubeTexture);
    this.geo = new THREE.SphereBufferGeometry(1.5, 100, 100);
    this.material = new THREE.MeshStandardMaterial({
      roughness: 0.1,
      metalness: 0.2,
      emissive: 0x111111,
      map: this.texture,
      envMap: this.cubeTexture,
      reflectivity: 0,
      refractionRatio: 0.8 });

    this.material.map.needsUpdate = true;

    this.material.onBeforeCompile = function (shader) {
      shader.uniforms.time = { value: 0 };

      shader.vertexShader = `
      uniform float time; 
      ${shader.vertexShader}`;
      shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
          #include <begin_vertex>
          mat3 mat = mat3(
            vec3(1. + sin(time + position.y * 2.) * .5, 0., 0.),
            vec3(0., 1. + cos(time - position.z * 1.5) * .5, 0.),
            vec3(0., 0., 1. + sin(time + position.x * 2.) * .5)
          );
          transformed *= mat;
          vNormal *= mat;
        `);

      this.userData.shader = shader;
    };
    this.material.castShadow = true;
    this.material.receiveShadow = true;

    this.box = new THREE.Mesh(this.geo, this.material);
    this.scene.add(this.box);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));

    const time = performance.now() / 1000;

    if (this.material.userData) {
      this.material.userData.shader.uniforms.time.value = time;
      this.material.map.offset.y = time * 0.1;
    }
    this.box.rotation.y = lerp(this.box.rotation.z, -mouse.x * 0.005, 0.08);
    this.box.rotation.z = lerp(this.box.rotation.y, mouse.y * 0.005, 0.08);
    this.box.rotation.x -= 0.005;

    this.light.position.x = lerp(this.light.position.x, -10 + mouse.x / win.w * 20, 0.08);
    this.light.position.y = lerp(this.light.position.y, 10 + mouse.y / win.h * -20, 0.08);
    this.light.position.z = lerp(this.light.position.z, -10 + Math.sin(mouse.x / win.w * Math.PI) * 20, 0.08);
  }

  handleMouse(e) {
    mouse.x = e.clientX || e.touches[0].clientX;
    mouse.y = e.clientY || e.touches[0].clientY;
  }

  events() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);

      win.w = window.innerWidth;
      win.h = window.innerHeight;
    });

    window.addEventListener('touchmove', e => {this.handleMouse(e);});
    window.addEventListener('mousemove', e => {this.handleMouse(e);});
  }}



/*--------------------
Init
--------------------*/
fetch('https://cdn.jsdelivr.net/npm/nice-color-palettes@3.0.0/100.json').
then(response => response.json()).
then(data => {
  palettes = data;

  pattern = new Pattern({
    id: 'canvas-pattern',
    width: 1024,
    height: 1024,
    minStroke: 2,
    maxStroke: 6 });


  ball = new Ball({
    textureID: 'canvas-pattern' });

});


/*--------------------
Listeners
--------------------*/
document.body.addEventListener('click', () => {pattern.generate();});