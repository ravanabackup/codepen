function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const swidth = 800;
const sheight = 450;
// Fragment & Vertex Shaders in HTML window //

// Mouse Class for movments and attaching to dom //
class Mouse {
  constructor(element) {
    this.element = element || window;
    this.drag = false;
    this.cx = swidth / 2;
    this.cy = sheight / 2;
    this.x = this.cx;
    this.y = this.cy;
    this.pointer = this.pointer.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.events = ["mouseenter", "mousemove"];
    this.events.forEach(eventName => {
      this.element.addEventListener(eventName, this.getCoordinates);
    });
    this.element.addEventListener("mousedown", () => {
      this.drag = true;
    });
    this.element.addEventListener("mouseup", () => {
      this.drag = false;
    });
  }

  getCoordinates(event) {
    event.preventDefault();
    var rect = this.element.getBoundingClientRect();
    const x = event.pageX - rect.left;
    const y = event.pageY - rect.top;
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


// Boostrap for WebGL and Attaching Shaders //
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

    (vertexSource, fragmentSource) => {
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
      this.importUniforms();
    });_defineProperty(this, "clearCanvas",

    () => {
      this.gl.clearColor(0, 0, 0, 0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    });_defineProperty(this, "importUniforms",


    () => {
      const width = swidth;
      const height = sheight;
      this.resolution = new Float32Array([width, height]);
      this.gl.uniform2fv(
      this.gl.getUniformLocation(this.program, "resolution"),
      this.resolution);

      // get the uniform ins from the shader fragments
      this.ut = this.gl.getUniformLocation(this.program, "time");
      this.ms = this.gl.getUniformLocation(this.program, "mouse");
    });_defineProperty(this, "updateUniforms",


    () => {
      let tm = (Date.now() - this.start) / 1000;
      //prevent time from getting too big
      if (tm > 2000) this.start = Date.now();
      // this.gl.uniform1f(this.ut,150.230);
      this.gl.uniform1f(this.ut, (Date.now() - this.start) / 1000);
      const mouse = this.mouse.pointer();
      this.umouse = [mouse.x, mouse.y, 0];

      const factor = 0.15;
      this.tmouse[0] =
      this.tmouse[0] - (this.tmouse[0] - this.umouse[0]) * factor;
      this.tmouse[1] =
      this.tmouse[1] - (this.tmouse[1] - this.umouse[1]) * factor;
      this.tmouse[2] = mouse.z ? 1 : 0;

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
      document.getElementById("fragmentShader").textContent);

      this.renderLoop();
    });_defineProperty(this, "renderLoop",

    () => {
      this.updateUniforms();
      this.animation = window.requestAnimationFrame(this.renderLoop);
    });this.start = Date.now();this.umouse = [0.0, 0.0, 0.0, 0.0];this.tmouse = [0.0, 0.0, 0.0, 0.0]; // Setup WebGL canvas and surface object //
    // Make Canvas and get WebGl2 Context //
    let _width = swidth; //(this.width = ~~(document.documentElement.clientWidth,window.innerWidth || 0));
    let _height = sheight; //(this.height = ~~(document.documentElement.clientHeight,window.innerHeight || 0));
    const canvas = this.canvas = document.createElement("canvas");const container = document.getElementById("container");canvas.id = "GLShaders";canvas.width = _width;canvas.height = _height;this.mouse = new Mouse(canvas);document.body.appendChild(canvas);const gl = this.gl = canvas.getContext("webgl2");if (!gl) {console.warn("WebGL 2 is not available.");return;} // WebGl and WebGl2 Extension //
    this.gl.getExtension("OES_standard_derivatives");this.gl.getExtension("EXT_shader_texture_lod");this.gl.getExtension("OES_texture_float");this.gl.getExtension("WEBGL_color_buffer_float");this.gl.getExtension("OES_texture_float_linear");this.gl.viewport(0, 0, canvas.width, canvas.height);this.init();} // Shader Bootstrap code //
}const demo = new Render(document.body);