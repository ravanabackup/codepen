/**
 * Referenced
 * https://wgld.org/
 * Thank you so much :)
 */

/**
 * Time class
 */
class Time {
  constructor(sketch) {
    this.sketch = sketch;
    
    this.initialize();  
  }
  
  initialize() {
    this.setupCanvas();
    
    const time = Date.now();
    
    this.startTime = time;
    this.lastTime = time;  
  }
  
  setupCanvas() {
    document
      .getElementsByTagName("body")[0]
      .appendChild(document.createElement("canvas"));
  
    this.canvas = document.getElementsByTagName('canvas')[1];
    this.ctx = this.canvas.getContext('2d');
    
    this.ctx.font = '16px sans-serif';
    const metrics = this.ctx.measureText('000 FPS');
    
    this.width = this.canvas.width = metrics.width;
    this.height = this.canvas.height = 16;
    
    this.canvas.style.position = 'fixed';
    this.canvas.style.zIndex = '9999';
    this.canvas.style.background = 'black';
    this.canvas.style.display = 'block';
    this.canvas.style.bottom = '0';
    this.canvas.style.right = '0';
  }
  
  calculateTime() {
    const time = Date.now();
    
    this.elapsedTime = time - this.startTime;
    this.fps = 1000 / (time - this.lastTime);
    this.lastTime = time;
  }
  
  drawFPS() {
    const ctx = this.ctx;
    
    ctx.clearRect(0, 0, this.width, this.height);
    
    ctx.save();
    
    ctx.fillStyle = 'rgb(2, 230, 231)';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(this.fps.toFixed() + ' FPS', this.width, this.height);
    
    ctx.restore();
  }
  
  getElapsedTime() {
    
    return this.elapsedTime;
  }
}

/**
 * Dat class
 */
class Dat {
  constructor(sketch) {
    this.sketch = sketch;
    
    this.initialize();
  }
  
  initialize() {
    this.gui = new dat.GUI();
    this.parameters = this.setParameters();
    this.controller = this.setController();
    this.gui.close();    
  }
  
  setParameters() {
    let parameters;
  
    parameters = {
      number: 800,
      beta1: 0.0,
      beta2: 0.0,
      gamma: 344.9,
      alpha: 2.1,
      modf: 2.0
    };

    return parameters; 
  }
  
  setController() {
    let controller;

    controller = {
      number: this.gui.add(this.parameters, 'number', 0.01, 1000.0, 0.01),
      beta1: this.gui.add(this.parameters, 'beta1', -100, 100.0, 0.01),
      beta2: this.gui.add(this.parameters, 'beta2', -100, 100.0, 0.01),
      gamma: this.gui.add(this.parameters, 'gamma', 0.01, 1000.0, 0.01),
      alpha: this.gui.add(this.parameters, 'alpha', 0.01, 100.0, 0.01),
      modf: this.gui.add(this.parameters, 'modf', 2.0, 5.0, 0.1)
    };

    return controller;    
  }
}

/**
 * vector3 class
 * If you want to function please add function.
 */
class Vector3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

/**
 * Mouse class
 */
class Mouse {
  constructor(sketch) {
    this.sketch = sketch;
    
    this.initialize();
  }
  
  initialize() {
    this.mouse = new Vector3(0, 0, 0);
    this.touchStart = new Vector3(0, 0, 0);
    this.touchMove = new Vector3(0, 0, 0);
    this.touchEnd = new Vector3(0, 0, 0);
    
    this.num = 0;
    
    this.setupEvents();
  }
  
  setupEvents() {
    this.sketch.canvas.addEventListener('mousemove', this.onMousemove.bind(this), false);
    this.sketch.canvas.addEventListener('touchstart', this.onTouchstart.bind(this), false);
    this.sketch.canvas.addEventListener('touchmove', this.onTouchmove.bind(this), false);
    this.sketch.canvas.addEventListener('touchend', this.onTouchend.bind(this), false);
  }
  
  onMousemove(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.mouse.z = 0;
  }
  
  onTouchstart(e) {
    const touch = e.targetTouches[0];
  
    this.touchStart.x = touch.pageX;
    this.touchStart.y = touch.pageY;
    this.touchStart.z = 0.0;

    this.mouse.x = (touch.pageX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(touch.pageY / window.innerHeight) * 2 + 1;
    this.mouse.z = 0;
  }
  
  onTouchmove(e) {
    const touch = e.targetTouches[0];

    this.touchMove.x = touch.pageX;
    this.touchMove.y = touch.pageY;
    this.touchMove.z = 0.0;

    this.touchEnd.x = this.touchStart.x - this.touchMove.x;
    this.touchEnd.y = this.touchStart.y - this.touchMove.y;
    this.touchEnd.z = 0.0;

    this.mouse.x = (touch.pageX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(touch.pageY / window.innerHeight) * 2 + 1;
    this.mouse.z = 0;
  }
  
  onTouchend(e) {
    this.touchStart.x = null;
    this.touchStart.y = null;
    this.touchStart.z = null;

    this.touchMove.x = null;
    this.touchMove.y = null;
    this.touchMove.z = null;

    this.touchEnd.x = null;
    this.touchEnd.y = null;
    this.touchEnd.z = null;
  }
}

/**
 * Sketch class
 */

class Sketch {
  constructor() {
    this.setupCanvas();
    this.setupEvents();

    this.dat = new Dat(this);
    this.time = new Time(this);
    this.mouse = new Mouse(this);
    
    this.initialize();
  }
  
  initialize() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.gl = this.canvas.getContext("webgl");
    this.width = this.canvas.width = Math.ceil(window.innerWidth);
    this.height = this.canvas.height = Math.ceil(window.innerHeight);
    this.gl.viewport(0, 0, this.width, this.height);
    
    this.shader = new Shader(this);
    
    this.draw();
  }
  
  setupCanvas() {
    document
      .getElementsByTagName("body")[0]
      .appendChild(document.createElement("canvas"));
  
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.canvas.style.background = '#000';
    this.canvas.style.display = 'block';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
  }
  
  setupEvents() {
    window.addEventListener('resize', this.onResize.bind(this), false);
  }
  
  onResize() {
    this.initialize();
  }
  
  draw() {
    this.time.calculateTime();
    this.time.drawFPS();
    
    this.shader.render(this.time.getElapsedTime() * 0.001);
    
    this.animationId = requestAnimationFrame(this.draw.bind(this));
  }
}

/**
 * Shader class
 */
class Shader {
  constructor(sketch) {
    this.sketch = sketch;
    this.mouse = this.sketch.mouse;
    this.gl = this.sketch.gl;
    
    this.position = [
      -1.0,  1.0,  0.0,
       1.0,  1.0,  0.0,
      -1.0, -1.0,  0.0,
       1.0, -1.0,  0.0
    ];
    
    this.index = [
      0, 2, 1,
      1, 2, 3
    ];
    
    this.initialize();
  }
  
  initialize() {
    this.vertexShader = this.createShader('vs');
    this.fragmentShader = this.createShader('fs');
    this.program = this.createProgram(this.vertexShader, this.fragmentShader);
    
    this.vertexIndex = this.createIbo(this.index);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.vertexIndex);
    
    this.vertexPosition = this.createVbo(this.position);
    this.setAttributes({
      position: {
        location: this.gl.getAttribLocation(this.program, 'position'),
        size: 3,
        buffer: this.vertexPosition
      }
    });
    
    this.uniLocation = new Array();
    this.uniLocation[0] = this.gl.getUniformLocation(this.program, 'time');
    this.uniLocation[1] = this.gl.getUniformLocation(this.program, 'mouse');
    this.uniLocation[2] = this.gl.getUniformLocation(this.program, 'resolution');
    this.uniLocation[3] = this.gl.getUniformLocation(this.program, 'number');
    this.uniLocation[4] = this.gl.getUniformLocation(this.program, 'beta1');
    this.uniLocation[5] = this.gl.getUniformLocation(this.program, 'beta2');
    this.uniLocation[6] = this.gl.getUniformLocation(this.program, 'gamma');
    this.uniLocation[7] = this.gl.getUniformLocation(this.program, 'alpha');
    this.uniLocation[8] = this.gl.getUniformLocation(this.program, 'modf');

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
  }
  
  render(time) {
    // reset canvas
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
    // pass uniforms
    this.gl.uniform1f(this.uniLocation[0], time);
    this.gl.uniform2fv(this.uniLocation[1], [this.mouse.mouse.x, this.mouse.mouse.y]);
    this.gl.uniform2fv(this.uniLocation[2], [this.sketch.width, this.sketch.height]);
    this.gl.uniform1f(this.uniLocation[3], this.sketch.dat.parameters.number);
    this.gl.uniform1f(this.uniLocation[4], this.sketch.dat.parameters.beta1);
    this.gl.uniform1f(this.uniLocation[5], this.sketch.dat.parameters.beta2);
    this.gl.uniform1f(this.uniLocation[6], this.sketch.dat.parameters.gamma);
    this.gl.uniform1f(this.uniLocation[7], this.sketch.dat.parameters.alpha);
    this.gl.uniform1f(this.uniLocation[8], this.sketch.dat.parameters.modf);
    
    // draw
    this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
    this.gl.flush();
  }
  
  createShader(id) {
    let shader;
    
    const scriptElement = document.getElementById(id);
    
    if (!scriptElement) {
      console.log('not script element.');
      
      return;
    }
    
    if (scriptElement.type === 'x-shader/x-vertex') {
      shader = this.gl.createShader(this.gl.VERTEX_SHADER);
    }
    
    if (scriptElement.type === 'x-shader/x-fragment') {
      shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    }
    
    this.gl.shaderSource(shader, scriptElement.textContent);
    this.gl.compileShader(shader);
    
    if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      
      return shader;
    } else {
      console.log(this.gl.getShaderInfoLog(shader));
    }
  }
  
  createProgram(vs, fs) {
    const program = this.gl.createProgram();
    
    this.gl.attachShader(program, vs);
    this.gl.attachShader(program, fs);
    this.gl.linkProgram(program);
    
    if (this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      this.gl.useProgram(program);
      
      return program;
    } else {
      console.log(this.gl.getProgramInfoLog(program));
    }
  }
  
  createVbo(data) {
    const vbo = this.gl.createBuffer();
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    
    return vbo;
  }
  
  createIbo(data) {
    const ibo = this.gl.createBuffer();
    
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, ibo);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    
    return ibo;
  }
  
  setAttributes(attributes) {
    Object.keys(attributes).forEach((name) => {
      const attribute = attributes[name];
      
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attribute.buffer);
      this.gl.enableVertexAttribArray(attribute.location);
      this.gl.vertexAttribPointer(attribute.location, attribute.size, this.gl.FLOAT, false, 0, 0);
    });
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  }
}

(() => {
  window.addEventListener('DOMContentLoaded', () => {
    console.clear();
    
    new Sketch();
  });
})();