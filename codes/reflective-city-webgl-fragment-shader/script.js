function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // Mouse Class for movments and attaching to dom //
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
let tmouse = [0, 0, 0, 0];

// RENDER LOOP
const render = time => {
  twgl.resizeCanvasToDisplaySize(gl.canvas, 1.0);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  const ms = mouse.pointer();
  const factor = 0.15;
  umouse = [mouse.x, mouse.y, 0];
  tmouse[0] = tmouse[0] - (tmouse[0] - umouse[0]) * factor;
  tmouse[1] = tmouse[1] - (tmouse[1] - umouse[1]) * factor;
  tmouse[2] = mouse.drag ? 1 : 0;

  let uniforms = {
    u_time: time * 0.0008,
    u_resolution: [gl.canvas.width, gl.canvas.height],
    u_mouse: tmouse };


  gl.useProgram(programInfo.program);
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  twgl.setUniforms(programInfo, uniforms);
  twgl.drawBufferInfo(gl, bufferInfo);

  requestAnimationFrame(render);
};
//

// DOM READY
window.addEventListener("DOMContentLoaded", event => {
  requestAnimationFrame(render);
});