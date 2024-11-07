function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const woodTexture = "https://assets.codepen.io/163598/texture13.jpg";
const stoneTexture = "https://assets.codepen.io/163598/texture12.jpg";
const textureList = [woodTexture, stoneTexture];
// Mouse
class Mouse {
  constructor(element) {_defineProperty(this, "reset",

















    () => {
      this.x =
      ~~(document.documentElement.clientWidth, window.innerWidth || 0) / 2;
      this.y =
      ~~(document.documentElement.clientHeight, window.innerHeight || 0) / 2;
    });this.element = element || window;this.drag = false;this.x = 0;this.y = 0;this.pointer = this.pointer.bind(this);this.getCoordinates = this.getCoordinates.bind(this);this.events = ["mouseenter", "mousemove"];this.events.forEach(eventName => {this.element.addEventListener(eventName, this.getCoordinates);});this.element.addEventListener("mousedown", () => {this.drag = true;});this.element.addEventListener("mouseup", () => {this.drag = false;});}
  getCoordinates(event) {
    event.preventDefault();
    if (this.drag) {
      this.x = event.pageX;
      this.y = event.pageY;
    }
  }
  pointer() {
    return {
      x: this.x,
      y: this.y };

  }}


// WEBGL BOOTSTRAP
const glcanvas = document.getElementById("canvas");
const gl = glcanvas.getContext("webgl2");
const programInfo = twgl.createProgramInfo(gl, [
"vertexShader",
"fragmentShader"]);


const arrays = {
  position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0] };


const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
const mouse = new Mouse(glcanvas);
let umouse = [0, 0, 0, 0];
let tmouse = umouse;

// TEXTURE LOADING
let texts;
const getImage = url => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.crossOrigin = "anonymous";
    img.addEventListener("load", e => resolve(img));
    img.addEventListener("error", () => {
      reject(new Error(`Failed to load image's URL: ${url}`));
    });
    img.src = url;
  });
};
const loadTexture = imageList => {
  console.log("loading images");
  let promises = imageList.map(item => getImage(item));

  Promise.all(promises).then(images => {
    const txtImages = images.map(item => {
      return { src: item, mag: gl.NEAREST };
    });
    texts = twgl.createTextures(gl, {
      iChannel0: txtImages[0],
      iChannel1: txtImages[1] });

    let uniforms = {
      iChannel0: texts.iChannel0,
      iChannel1: texts.iChannel1 };

    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    twgl.drawBufferInfo(gl, bufferInfo);
  });
};

// RENDER LOOP
const render = time => {
  twgl.resizeCanvasToDisplaySize(gl.canvas, 1.0);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  const factor = 0.15;
  umouse = [mouse.x, mouse.y, 0];
  tmouse[0] = tmouse[0] - (tmouse[0] - umouse[0]) * factor;
  tmouse[1] = tmouse[1] - (tmouse[1] - umouse[1]) * factor;
  tmouse[2] = mouse.drag ? 1 : 0;
  let uniforms = {
    u_time: time * 0.0015,
    u_resolution: [gl.canvas.width, gl.canvas.height],
    u_mouse: tmouse };


  gl.useProgram(programInfo.program);
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  twgl.setUniforms(programInfo, uniforms);
  twgl.drawBufferInfo(gl, bufferInfo);

  requestAnimationFrame(render);
};

// DOM READY
window.addEventListener("DOMContentLoaded", event => {
  loadTexture(textureList);
  requestAnimationFrame(render);
});