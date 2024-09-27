class World {

  constructor() {
    this.godray = { enabled: false };
    this.materialDepth = new THREE.MeshDepthMaterial();

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x000000, 2000, 4000);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0x000000);
    this.renderer.sortObjects = false;
    document.body.appendChild(this.renderer.domElement);

    this.resize();

    if (this.godray.enabled) {
      this.initGodray();
    }

    this.composer = new THREE.EffectComposer(this.renderer);

    if (this.godray.enabled) {

      /*
      this.composer.addPass( new THREE.RenderPass( this.godray.scene, this.godray.camera ) ); 
      this.composer.reset(this.godray.rtTextureColors);
      
      this.composer.addPass( new THREE.RenderPass( this.scene, this.camera ) ); 
      this.composer.reset(this.godray.rtTextureColors);
      
      this.composer.addPass( new THREE.RenderPass( this.scene, this.camera, true ) ); 
      this.composer.reset(this.godray.rtTextureDepth);
      
      this.composer.addPass( new THREE.RenderPass( this.godray.scene, this.godray.camera ) ); 
      this.composer.reset(this.godray.rtTextureGodRays2);         
       this.composer.addPass( new THREE.RenderPass( this.godray.scene, this.godray.camera ) ); 
      this.composer.reset(this.godray.rtTextureGodRays1);  
       this.composer.addPass( new THREE.RenderPass( this.godray.scene, this.godray.camera ) ); 
      this.composer.reset(this.godray.rtTextureGodRays2);  
      
      this.composer.addPass( new THREE.RenderPass( this.godray.scene, this.godray.camera ) ); 
      */



    } else {
      this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));
    }


    let hblur = new THREE.ShaderPass(THREE.HorizontalBlurShader);
    let vblur = new THREE.ShaderPass(THREE.VerticalBlurShader);

    hblur.uniforms['h'].value = 1 / window.innerWidth;
    vblur.uniforms['v'].value = 1 / window.innerHeight;

    // set this shader pass to render to screen so we can see the effects
    vblur.renderToScreen = true;

    this.composer.addPass(vblur);
    this.composer.addPass(hblur);

    this.addCube();
    this.addLight();

    let plane = new THREE.Mesh(new THREE.PlaneGeometry(20000, 20000, 100, 100), new THREE.MeshLambertMaterial({
      color: 0xffffff }));

    plane.rotation.x = 90 * Math.PI / 180;
    plane.position.y = 200;
    plane.recieveShadow = true;
    this.scene.add(plane);



    requestAnimationFrame(this.render.bind(this));
    window.addEventListener('resize', this.resize.bind(this));
  }

  update() {
    this.obj.rotation.y += 0.04;
  }

  addLight() {
    let light2 = new THREE.AmbientLight(0x111111);
    this.scene.add(light2);

    let light1 = new THREE.DirectionalLight(0xffffff, 1.5);
    light1.position.set(0, 500, 0);
    this.scene.add(light1);

    let light3 = new THREE.PointLight(0xffffff, 7);
    light3.position.y = 100;
    this.scene.add(light3);

    let light4 = new THREE.DirectionalLight(0xff607a, 1);
    light4.position.set(400, -200, 50);
    this.scene.add(light4);
  }

  addCube() {
    var circ = 10;
    var rad = 1200;

    this.obj = new THREE.Object3D();
    this.obj.position.y = 200;
    this.obj.castShadow = true;
    this.scene.add(this.obj);

    for (var j = 0; j < circ; j += 1) {
      var x = j * rad / circ;
      this.drawSpiral(x, rad, j);
    }
  }

  drawSpiral(x, _rad, k) {
    var length = 1000;
    var geometry = new THREE.BoxGeometry(30, 100, 30);

    for (var i = 0; i < length; i += 1) {

      var c1 = { r: 144, g: 17, b: 28 };
      var c2 = { r: 239, g: 232, b: 39 };
      var t = 1 - i / length;
      t = t * t * t;
      t *= Math.sin(i * 0.1 + k * 0.5);

      var c = {
        r: c1.r + t * (c2.r - c1.r),
        g: c1.g + t * (c2.g - c1.g),
        b: c1.b + t * (c2.b - c1.b) };


      var color = new THREE.Color(c.r / 255, c.g / 255, c.b / 255);

      var material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 1.1,
        shininess: 100,
        shading: THREE.FlatShading
        //transparent: true,
        //opacity: 0.3,
        //blending: THREE.AdditiveBlending
      });

      var cube = new THREE.Mesh(geometry, material);

      var radius = (length - i) * _rad / length;

      var _t = i / length;
      var ease = --_t * _t * _t + 1;
      radius *= 1 - ease;

      var betaX = x + i * 0.1;

      var _x = Math.sin(betaX) * radius;
      var _y = -i * 2;
      var _z = Math.cos(betaX) * radius;
      cube.position.set(_x, _y, _z);
      this.obj.add(cube);
    }
  }

  initGodray() {
    this.godray.scene = new THREE.Scene();

    this.godray.camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -10000, 10000);
    this.godray.camera.position.z = 100;

    this.godray.scene.add(this.godray.camera);

    var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat };
    this.godray.rtTextureColors = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, pars);

    // Switching the depth formats to luminance from rgb doesn't seem to work. I didn't
    // investigate further for now.
    // pars.format = THREE.LuminanceFormat;

    // I would have this quarter size and use it as one of the ping-pong render
    // targets but the aliasing causes some temporal flickering

    this.godray.rtTextureDepth = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, pars);

    // Aggressive downsize god-ray ping-pong render targets to minimize cost

    var w = window.innerWidth / 4.0;
    var h = window.innerHeight / 4.0;
    this.godray.rtTextureGodRays1 = new THREE.WebGLRenderTarget(w, h, pars);
    this.godray.rtTextureGodRays2 = new THREE.WebGLRenderTarget(w, h, pars);

    // god-ray shaders

    var godraysGenShader = THREE.ShaderGodRays["godrays_generate"];
    this.godray.godrayGenUniforms = THREE.UniformsUtils.clone(godraysGenShader.uniforms);
    this.godray.materialGodraysGenerate = new THREE.ShaderMaterial({
      uniforms: this.godray.godrayGenUniforms,
      vertexShader: godraysGenShader.vertexShader,
      fragmentShader: godraysGenShader.fragmentShader });


    var godraysCombineShader = THREE.ShaderGodRays["godrays_combine"];
    this.godray.godrayCombineUniforms = THREE.UniformsUtils.clone(godraysCombineShader.uniforms);
    this.godray.materialGodraysCombine = new THREE.ShaderMaterial({
      uniforms: this.godray.godrayCombineUniforms,
      vertexShader: godraysCombineShader.vertexShader,
      fragmentShader: godraysCombineShader.fragmentShader });


    var godraysFakeSunShader = THREE.ShaderGodRays["godrays_fake_sun"];
    this.godray.godraysFakeSunUniforms = THREE.UniformsUtils.clone(godraysFakeSunShader.uniforms);
    this.godray.materialGodraysFakeSun = new THREE.ShaderMaterial({
      uniforms: this.godray.godraysFakeSunUniforms,
      vertexShader: godraysFakeSunShader.vertexShader,
      fragmentShader: godraysFakeSunShader.fragmentShader });


    this.godray.godraysFakeSunUniforms.bgColor.value.setHex(0x000000);
    this.godray.godraysFakeSunUniforms.sunColor.value.setHex(0xffffff);
    this.godray.godrayCombineUniforms.fGodRayIntensity.value = 0.6;

    this.godray.quad = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight),
    this.godray.materialGodraysGenerate);

    this.godray.quad.position.z = -9900;
    this.godray.scene.add(this.godray.quad);
  }

  render() {

    this.update();

    if (this.godray.enabled) {
      // Find the screenspace position of the sun
      //let screenSpacePosition = new THREE.Vector3(3, 1000, 0);
      let screenSpacePosition = new THREE.Vector3();
      screenSpacePosition.copy(new THREE.Vector3(0, 5000, 0)).project(this.camera);

      //let screenSpacePosition = {x: 0, y: 0};
      screenSpacePosition.x = (screenSpacePosition.x + 1) / 2;
      screenSpacePosition.y = (screenSpacePosition.y + 1) / 2;

      // Give it to the god-ray and sun shaders

      this.godray.godrayGenUniforms["vSunPositionScreenSpace"].value.x = screenSpacePosition.x;
      this.godray.godrayGenUniforms["vSunPositionScreenSpace"].value.y = screenSpacePosition.y;

      this.godray.godraysFakeSunUniforms["vSunPositionScreenSpace"].value.x = screenSpacePosition.x;
      this.godray.godraysFakeSunUniforms["vSunPositionScreenSpace"].value.y = screenSpacePosition.y;

      // -- Draw sky and sun --

      // Clear colors and depths, will clear to sky color

      this.renderer.clearTarget(this.godray.rtTextureColors, true, true, false);

      // Sun render. Runs a shader that gives a brightness based on the screen
      // space distance to the sun. Not very efficient, so i make a scissor
      // rectangle around the suns position to avoid rendering surrounding pixels.

      var sunsqH = 0.74 * window.innerHeight; // 0.74 depends on extent of sun from shader
      var sunsqW = 0.74 * window.innerHeight; // both depend on height because sun is aspect-corrected

      screenSpacePosition.x *= window.innerWidth;
      screenSpacePosition.y *= window.innerHeight;

      this.renderer.setScissor(screenSpacePosition.x - sunsqW / 2, screenSpacePosition.y - sunsqH / 2, sunsqW, sunsqH);
      this.renderer.setScissorTest(true);

      this.godray.godraysFakeSunUniforms["fAspect"].value = window.innerWidth / window.innerHeight;

      this.godray.scene.overrideMaterial = this.godray.materialGodraysFakeSun;
      this.renderer.render(this.godray.scene, this.godray.camera, this.godray.rtTextureColors);

      this.renderer.setScissorTest(false);

      // -- Draw scene objects --

      // Colors

      this.scene.overrideMaterial = null;
      this.renderer.render(this.scene, this.camera, this.godray.rtTextureColors);

      // Depth

      this.scene.overrideMaterial = this.materialDepth;
      this.renderer.render(this.scene, this.camera, this.godray.rtTextureDepth, true);

      // -- Render god-rays --

      // Maximum length of god-rays (in texture space [0,1]X[0,1])

      var filterLen = 1.0;

      // Samples taken by filter

      var TAPS_PER_PASS = 6.0;

      // Pass order could equivalently be 3,2,1 (instead of 1,2,3), which
      // would start with a small filter support and grow to large. however
      // the large-to-small order produces less objectionable aliasing artifacts that
      // appear as a glimmer along the length of the beams

      // pass 1 - render into first ping-pong target

      var pass = 1.0;
      var stepLen = filterLen * Math.pow(TAPS_PER_PASS, -pass);

      this.godray.godrayGenUniforms["fStepSize"].value = stepLen;
      this.godray.godrayGenUniforms["tInput"].value = this.godray.rtTextureDepth;

      this.godray.scene.overrideMaterial = this.godray.materialGodraysGenerate;

      this.renderer.render(this.godray.scene, this.godray.camera, this.godray.rtTextureGodRays2);

      // pass 2 - render into second ping-pong target

      pass = 2.0;
      stepLen = filterLen * Math.pow(TAPS_PER_PASS, -pass);

      this.godray.godrayGenUniforms["fStepSize"].value = stepLen;
      this.godray.godrayGenUniforms["tInput"].value = this.godray.rtTextureGodRays2;

      this.renderer.render(this.godray.scene, this.godray.camera, this.godray.rtTextureGodRays1);

      // pass 3 - 1st RT

      pass = 3.0;
      stepLen = filterLen * Math.pow(TAPS_PER_PASS, -pass);

      this.godray.godrayGenUniforms["fStepSize"].value = stepLen;
      this.godray.godrayGenUniforms["tInput"].value = this.godray.rtTextureGodRays1;

      this.renderer.render(this.godray.scene, this.godray.camera, this.godray.rtTextureGodRays2);


      // final pass - composite god-rays onto colors

      this.godray.godrayCombineUniforms["tColors"].value = this.godray.rtTextureColors;
      this.godray.godrayCombineUniforms["tGodRays"].value = this.godray.rtTextureGodRays2;

      this.godray.scene.overrideMaterial = this.godray.materialGodraysCombine;

      this.renderer.render(this.godray.scene, this.godray.camera);
      this.godray.scene.overrideMaterial = null;

    } else {
      this.composer.render();
    }

    //this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }

  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 5000);
    this.camera.position.set(0, -900, 2000);
    this.camera.lookAt(new THREE.Vector3(0, 100, 0));

    this.controls = new THREE.OrbitControls(this.camera);

  }}


var _w = new World();