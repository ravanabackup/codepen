function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // Mouse Class for movments and attaching to dom //
class Mouse {
  constructor(element) {_defineProperty(this, "reset",



















    () => {
      this.x =
      ~~(document.documentElement.clientWidth, window.innerWidth || 0) / 2;
      this.y =
      ~~(document.documentElement.clientHeight, window.innerHeight || 0) / 2;
    });this.element = element || window;this.drag = false;this.x = ~~(document.documentElement.clientWidth, window.innerWidth || 0) / 2;this.y = ~~(document.documentElement.clientHeight, window.innerHeight || 0) / 2;this.pointer = this.pointer.bind(this);this.getCoordinates = this.getCoordinates.bind(this);this.events = ["mouseenter", "mousemove"];this.events.forEach(eventName => {this.element.addEventListener(eventName, this.getCoordinates);});this.element.addEventListener("mousedown", () => {this.drag = true;});this.element.addEventListener("mouseup", () => {this.drag = false;});}
  getCoordinates(event) {
    event.preventDefault();
    const x = event.pageX;
    const y = event.pageY;
    if (this.drag) {
      this.x = x;
      this.y = y;
    }
  }
  pointer() {
    return {
      x: this.x,
      y: this.y };

  }}


const woodTexture = "https://assets.codepen.io/163598/tile01.jpg";
const rockTexture = "https://assets.codepen.io/163598/texture3.jpg";
const stoneTexture = "https://assets.codepen.io/163598/texture2.jpg";
const textureList = [stoneTexture, woodTexture, rockTexture];

// Boostrap for WebGL and Attaching Shaders //
// Fragment & Vertex Shaders in HTML window //
class Render {
  constructor() {_defineProperty(this, "createShader",

























































    (type, source) => {
      const shader = this.gl.createShader(type);
      this.gl.shaderSource(shader, source);
      this.gl.compileShader(shader);
      const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
      if (!success) {
        console.log(this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
        return false;
      }
      return shader;
    });_defineProperty(this, "createWebGL",

    (vertexSource, fragmentSource, images) => {
      // Setup Vertext/Fragment Shader functions
      this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
      this.fragmentShader = this.createShader(
      this.gl.FRAGMENT_SHADER,
      fragmentSource);


      // Setup Program and Attach Shader functions
      this.program = this.gl.createProgram();
      this.gl.attachShader(this.program, this.vertexShader);
      this.gl.attachShader(this.program, this.fragmentShader);
      this.gl.linkProgram(this.program);
      this.gl.useProgram(this.program);

      if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
        console.warn(
        "Unable to initialize the shader program: " +
        this.gl.getProgramInfoLog(this.program));

        return null;
      }

      // Create and Bind buffer //
      const buffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);

      this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([-1, 1, -1, -1, 1, -1, 1, 1]),
      this.gl.STATIC_DRAW);


      const vPosition = this.gl.getAttribLocation(this.program, "vPosition");

      this.gl.enableVertexAttribArray(vPosition);
      this.gl.vertexAttribPointer(
      vPosition,
      2, // size: 2 components per iteration
      this.gl.FLOAT, // type: the data is 32bit floats
      false, // normalize: don't normalize the data
      0, // stride: 0 = move forward size * sizeof(type) each iteration to get the next position
      0 // start at the beginning of the buffer
      );

      this.clearCanvas();
      this.importUniforms(images);
    });_defineProperty(this, "isPowerOf2",




    value => {
      return (value & value - 1) == 0;
    });_defineProperty(this, "getImage",

    url => {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.crossOrigin = "Anonymous";
        img.addEventListener("load", e => resolve(img));
        img.addEventListener("error", () => {
          reject(new Error(`Failed to load image's URL: ${url}`));
        });
        img.src = url;
      });
    });_defineProperty(this, "loadTexture",

    textureList => {
      const lockNames = [
      this.gl.TEXTURE0,
      this.gl.TEXTURE1,
      this.gl.TEXTURE2,
      this.gl.TEXTURE3];

      const textureOptions = [
      [this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE],
      [this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE],
      [this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST],
      [this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST]];


      let promises = textureList.map(item => this.getImage(item));

      Promise.all(promises).then(images => {
        const amount = images.length;
        let textures = [];
        for (let ii = 0; ii < amount; ++ii) {
          const texture = this.gl.createTexture();
          this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
          // Upload the image into the texture.
          this.gl.texImage2D(
          this.gl.TEXTURE_2D,
          0,
          this.gl.RGBA,
          this.gl.RGBA,
          this.gl.UNSIGNED_BYTE,
          images[ii]);


          if (
          this.isPowerOf2(images[ii].width) &&
          this.isPowerOf2(images[ii].height))
          {
            this.gl.generateMipmap(this.gl.TEXTURE_2D);
          } else {
            // Set the parameters so we can render any size image.
            this.gl.texParameteri(...textureOptions[0]);
            this.gl.texParameteri(...textureOptions[1]);
            this.gl.texParameteri(...textureOptions[2]);
            this.gl.texParameteri(...textureOptions[3]);
          }

          // add the texture to the array of textures.
          textures.push(texture);
        }

        // lookup the sampler locations.
        const u_image0Location = this.gl.getUniformLocation(
        this.program,
        "iChannel0");

        const u_image1Location = this.gl.getUniformLocation(
        this.program,
        "iChannel1");

        const u_image2Location = this.gl.getUniformLocation(
        this.program,
        "iChannel2");

        // set which texture units to render with.
        this.gl.uniform1i(u_image0Location, 0); // texture unit 0
        this.gl.uniform1i(u_image1Location, 1); // texture unit 1
        this.gl.uniform1i(u_image2Location, 2); // texture unit 1

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, textures[0]);
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, textures[1]);
        this.gl.activeTexture(this.gl.TEXTURE2);
        this.gl.bindTexture(this.gl.TEXTURE_2D, textures[2]);
      });

      console.log("done loading textures");
    });_defineProperty(this, "clearCanvas",
    () => {
      this.gl.clearColor(0, 0, 0, 0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    });_defineProperty(this, "importUniforms",

    images => {
      const width = ~~(document.documentElement.clientWidth,
      window.innerWidth || 0);
      const height = ~~(document.documentElement.clientHeight,
      window.innerHeight || 0);
      this.resolution = new Float32Array([width, height]);
      this.gl.uniform2fv(
      this.gl.getUniformLocation(this.program, "resolution"),
      this.resolution);

      // get the uniform ins from the shader fragments
      this.ut = this.gl.getUniformLocation(this.program, "time");
      this.ms = this.gl.getUniformLocation(this.program, "mouse");
      this.loadTexture(images);
    });_defineProperty(this, "updateUniforms",

    () => {
      let tm = (Date.now() - this.start) / 1000;
      //prevent time from getting too big
      if (tm > 2000) this.start = Date.now();
      this.gl.uniform1f(this.ut, (Date.now() - this.start) / 1000);
      const mouse = this.mouse.pointer();
      this.umouse = [mouse.x, this.canvas.height - mouse.y, 0];

      const factor = 0.15;
      this.tmouse[0] =
      this.tmouse[0] - (this.tmouse[0] - this.umouse[0]) * factor;
      this.tmouse[1] =
      this.tmouse[1] - (this.tmouse[1] - this.umouse[1]) * factor;
      this.tmouse[2] = this.mouse.drag ? 1 : 0;

      this.gl.uniform4fv(this.ms, this.tmouse);

      this.gl.drawArrays(
      this.gl.TRIANGLE_FAN, // primitiveType
      0, // Offset
      4 // Count
      );
    });_defineProperty(this, "init",


    () => {
      this.createWebGL(
      document.getElementById("vertexShader").textContent,
      document.getElementById("fragmentShader").textContent,
      textureList);

      this.renderLoop();
    });_defineProperty(this, "renderLoop",

    () => {
      this.updateUniforms();
      this.animation = window.requestAnimationFrame(this.renderLoop);
    });this.start = Date.now();this.umouse = [0.0, 0.0, 0.0, 0.0];this.tmouse = [0.0, 0.0, 0.0, 0.0]; // Setup WebGL canvas and surface object //
    // Make Canvas and get WebGl2 Context //
    let _width = this.width = ~~(document.documentElement.clientWidth, window.innerWidth || 0);let _height = this.height = ~~(document.documentElement.clientHeight, window.innerHeight || 0);const canvas = this.canvas = document.createElement("canvas");const container = document.getElementById("container");canvas.id = "GLShaders";canvas.width = _width;canvas.height = _height;this.mouse = new Mouse(canvas);document.body.appendChild(canvas);const gl = this.gl = canvas.getContext("webgl2");if (!gl) {console.warn("WebGL 2 is not available.");return;} // WebGl and WebGl2 Extension //
    this.gl.getExtension("OES_standard_derivatives");this.gl.getExtension("EXT_shader_texture_lod");this.gl.getExtension("OES_texture_float");this.gl.getExtension("WEBGL_color_buffer_float");this.gl.getExtension("OES_texture_float_linear");this.gl.viewport(0, 0, canvas.width, canvas.height); // always nice to let people resize
    window.addEventListener("resize", () => {let width = ~~(document.documentElement.clientWidth, window.innerWidth || 0);let height = ~~(document.documentElement.clientHeight, window.innerHeight || 0);this.mouse.reset();this.canvas.width = width;this.canvas.height = height;this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);this.resolution = new Float32Array([width, height]);this.gl.uniform2fv(this.gl.getUniformLocation(this.program, "resolution"), this.resolution);this.clearCanvas();}, false);this.init();} // Shader Bootstrap code //
}const demo = new Render(document.body);