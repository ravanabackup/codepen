/**
 * Referenced
 * https://wgld.org/
 * https://github.com/doxas/minMatrix.js/blob/master/README.md
 */

/**
 * Canvas
 */
class Canvas {
  constructor() {
    // create canvas
    this.canvas = 
      document.getElementsByTagName("body")[0].
      appendChild(document.createElement("canvas"));
    // canvas style
    this.canvas.style.position = 'fixed';
    this.canvas.style.display = 'block';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    // parameter
    this.time = null;
    this.elapsedTime = null;
    this.gl = null;
    this.height = null;
    this.width = null;
    this.mouse = {x: null, y: null};
    // to shader - vs, fs
    this.uniLocation = null;
    this.attLocation = null;
    this.stride = null;
    this.vPosArray = null;
  }
  
  init() {
    this.gl = this.canvas.getContext("webgl");
    this.width = this.canvas.width = Math.floor(window.innerWidth);
    this.height = this.canvas.height = Math.floor(window.innerHeight);
    this.gl.viewport(0, 0, this.width, this.height);
    this.time = Date.now();
    this.elapsedTime = 0;
    
    // create shader
    const vShader = this.createShader('vs');
    const fShader = this.createShader('fs');
    const prg = this.createProgram(vShader, fShader);
    // attribute location
    this.attLocation = new Array();
	  this.attLocation[0] = this.gl.getAttribLocation(prg, 'position');
    this.stride = new Array();
    this.stride[0] = 3;
    // uniform location
    this.uniLocation = new Array();
    this.uniLocation[0] = this.gl.getUniformLocation(prg, 'time');
    this.uniLocation[1] = this.gl.getUniformLocation(prg, 'mouse');
    this.uniLocation[2] = this.gl.getUniformLocation(prg, 'resolution');
    
    // vertex array
    const position = [
      -1.0,  1.0,  0.0,
      1.0,  1.0,  0.0,
      -1.0, -1.0,  0.0,
      1.0, -1.0,  0.0
    ];
    const index = [
      0, 2, 1,
      1, 2, 3
    ];
    
    // create buffer object
    const vPosition = this.createVbo(position);
    this.vPosArray = [vPosition];
    const vIndex = this.createIbo(index);
    
    this.setAttribute(this.vPosArray, this.attLocation, this.stride);
    // bind index buffer object
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, vIndex);
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
  }
  
  render() {
    // time
    this.elapsedTime = (Date.now() - this.time) * 0.001;
    // reset canvas
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // uniforms
    this.setAttribute(this.vPosArray, this.attLocation, this.stride);
    this.gl.uniform1f(this.uniLocation[0], this.elapsedTime);
    this.gl.uniform2fv(this.uniLocation[1], [this.mouse.x, this.mouse.y]);
    this.gl.uniform2fv(this.uniLocation[2], [this.width, this.height]);
    // draw
    this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
    this.gl.flush();
    requestAnimationFrame(() => {
      this.render();
    });
  }
  
  resize() {
    this.init();
  }
  
  createShader(id) {
    let shader;
    const scriptElement = document.getElementById(id);
    if (!scriptElement) {
      return;
    }
    if (scriptElement.type === 'x-shader/x-vertex') {
      shader = this.gl.createShader(this.gl.VERTEX_SHADER);
    }
    if (scriptElement.type === 'x-shader/x-fragment') {
      shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    }
    this.gl.shaderSource(shader, scriptElement.text);
    this.gl.compileShader(shader);
    if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      return shader;
    } else {
      alert(this.gl.getShaderInfoLog(shader));
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
      alert(this.gl.getProgramInfoLog(program));
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
  
  setAttribute(vbo, attL, attS) {
    for (let i in vbo) {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo[i]);
      this.gl.enableVertexAttribArray(attL[i]);
      this.gl.vertexAttribPointer(attL[i], attS[i], this.gl.FLOAT, false, 0, 0);
    }
  }
  
  mousemove(e) {
    this.mouse.x = (e.clientX - this.canvas.offsetLeft - this.width / 2.0) / this.width * 2.0;
    this.mouse.y = -(e.clientY - this.canvas.offsetTop - this.height / 2.0) / this.height * 2.0;
  }
}

/**
 * run
 */
(() => {
  window.addEventListener('load', () => {
    console.clear();
    const canvas = new Canvas();
    canvas.init();
    canvas.render();
    
    // resize
    window.addEventListener("resize", () => {
      canvas.resize();
    }, false);
    
    canvas.canvas.addEventListener('mousemove', (e) => {
      canvas.mousemove(e);
    }, false);
  }, false);
})();