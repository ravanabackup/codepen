function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classPrivateFieldGet(receiver, privateMap) {var descriptor = privateMap.get(receiver);if (!descriptor) {throw new TypeError("attempted to get private field on non-instance");}if (descriptor.get) {return descriptor.get.call(receiver);}return descriptor.value;}function _classPrivateFieldSet(receiver, privateMap, value) {var descriptor = privateMap.get(receiver);if (!descriptor) {throw new TypeError("attempted to set private field on non-instance");}if (descriptor.set) {descriptor.set.call(receiver, value);} else {if (!descriptor.writable) {throw new TypeError("attempted to set read only private field");}descriptor.value = value;}return value;}import { Vec2, Vec3, Vec4, Mat2, Mat3, Mat4, Quat } from 'https://cdn.skypack.dev/wtc-math';
import { Camera, Renderer, Mesh, Program, Geometry, Triangle, FragmentShader, Uniform, Texture, RenderTarget } from 'https://cdn.skypack.dev/wtc-gl';

console.clear();var _readFB = new WeakMap();var _writeFB = new WeakMap();var _name = new WeakMap();var _width = new WeakMap();var _height = new WeakMap();var _pxRatio = new WeakMap();var _tiling = new WeakMap();var _texdepth = new WeakMap();var _data = new WeakMap();

class Framebuffer {

















  constructor(gl, {
    name = 'FBO',
    width = 2048,
    height = 2048,
    dpr = Math.min(window.devicePixelRatio, 2),
    tiling = Texture.IMAGETYPE_REGULAR,
    texdepth = Framebuffer.TEXTYPE_UNSIGNED_BYTE,
    data = null } =
  {}) {_readFB.set(this, { writable: true, value: void 0 });_writeFB.set(this, { writable: true, value: void 0 });_name.set(this, { writable: true, value: void 0 });_width.set(this, { writable: true, value: void 0 });_height.set(this, { writable: true, value: void 0 });_pxRatio.set(this, { writable: true, value: void 0 });_tiling.set(this, { writable: true, value: Framebuffer.IMAGETYPE_REGULAR });_texdepth.set(this, { writable: true, value: Framebuffer.TEXTYPE_UNSIGNED_BYTE });_data.set(this, { writable: true, value: void 0 });
    this.gl = gl;

    this.name = name;
    this.height = height;
    this.dpr = dpr;
    _classPrivateFieldSet(this, _tiling, tiling);
    _classPrivateFieldSet(this, _texdepth, texdepth);

    this.resize(width, height);
  }
  resize(width, height) {
    this.width = width;
    this.height = height;
    _classPrivateFieldSet(this, _readFB, this.createFrameBuffer());
    _classPrivateFieldSet(this, _writeFB, this.createFrameBuffer());
  }
  createFrameBuffer() {

    const t = this.type;
    console.log(this.gl.REPEAT);
    console.log(this.wrap);

    let internalFormat = this.gl.RGBA;

    if (t === this.gl.FLOAT) {
      internalFormat = this.gl.RGBA32F;
    }

    const FB = new RenderTarget(this.gl, {
      width: this.width * this.dpr,
      height: this.height * this.dpr,
      wrapS: this.wrap,
      wrapT: this.wrap,
      type: this.type,
      internalFormat: internalFormat });

    return FB;
  }
  swap() {
    const temp = _classPrivateFieldGet(this, _readFB);
    _classPrivateFieldSet(this, _readFB, _classPrivateFieldGet(this, _writeFB));
    _classPrivateFieldSet(this, _writeFB, temp);
  }
  render(renderer, {
    scene,
    camera,
    update = true,
    clear })
  {
    renderer.render({ scene, camera, target: _classPrivateFieldGet(this, _writeFB), update, clear });
    this.swap();
  }

  get wrap() {
    switch (_classPrivateFieldGet(this, _tiling)) {
      case Framebuffer.IMAGETYPE_REGULAR:
        return this.gl.CLAMP_TO_EDGE;
        break;
      case Framebuffer.IMAGETYPE_TILING:
        return this.gl.REPEAT;
        break;
      case Framebuffer.IMAGETYPE_MIRROR:
        return this.gl.MIRRORED_REPEAT;
        break;}

  }
  get type() {
    switch (_classPrivateFieldGet(this, _texdepth)) {
      case Framebuffer.TEXTYPE_FLOAT:
        return this.gl.FLOAT;
        break;
      case Framebuffer.TEXTYPE_UNSIGNED_BYTE:
        return this.gl.UNSIGNED_BYTE;
        break;
      case Framebuffer.TEXTYPE_HALF_FLOAT_OES:
        const e = this.gl.getExtension('OES_texture_half_float');
        // console.log(e.HALF_FLOAT_OES)
        if (this.gl.renderer.isWebgl2) {
        }
        // t = this.renderer.isWebgl2 ? this.ctx.HALF_FLOAT : e.HALF_FLOAT_OES;
        return (e === null || e === void 0 ? void 0 : e.HALF_FLOAT_OES) || this.gl.HALF_FLOAT;
        break;}

  }

  get read() {
    return _classPrivateFieldGet(this, _readFB);
  }
  get write() {
    return _classPrivateFieldGet(this, _writeFB);
  }

  set data(value) {
    if (value instanceof Float32Array) _classPrivateFieldSet(this, _data, value);
  }
  get data() {
    return _classPrivateFieldGet(this, _data) || null;
  }
  set width(value) {
    if (value > 0) _classPrivateFieldSet(this, _width, value);
  }
  get width() {
    return _classPrivateFieldGet(this, _width) || 1;
  }
  set height(value) {
    if (value > 0) _classPrivateFieldSet(this, _height, value);
  }
  get height() {
    return _classPrivateFieldGet(this, _height) || 1;
  }
  set pxRatio(value) {
    if (value > 0) _classPrivateFieldSet(this, _pxRatio, value);
  }
  get pxRatio() {
    return _classPrivateFieldGet(this, _pxRatio) || 1;
  }
  set tiling(value) {
    if ([Texture.IMAGETYPE_REGULAR, Texture.IMAGETYPE_TILE, Texture.IMAGETYPE_MIRROR].indexOf(value) > -1) _classPrivateFieldSet(this, _tiling, value);
  }
  get tiling() {
    return _classPrivateFieldGet(this, _tiling);
  }
  set texdepth(value) {
    if ([Framebuffer.TEXTYPE_FLOAT, Framebuffer.TEXTYPE_UNSIGNED_BYTE, Framebuffer.TEXTYPE_HALF_FLOAT_OES].indexOf(value) > -1) _classPrivateFieldSet(this, _texdepth, value);
  }
  get texdepth() {
    return _classPrivateFieldGet(this, _texdepth);
  }}_defineProperty(Framebuffer, "TEXTYPE_FLOAT", 0);_defineProperty(Framebuffer, "TEXTYPE_UNSIGNED_BYTE", 1);_defineProperty(Framebuffer, "TEXTYPE_HALF_FLOAT_OES", 2);_defineProperty(Framebuffer, "IMAGETYPE_REGULAR", 0);_defineProperty(Framebuffer, "IMAGETYPE_TILING", 1);_defineProperty(Framebuffer, "IMAGETYPE_MIRROR", 2);


const defaultShaderV = `
attribute vec3 position;
attribute vec2 uv;
varying vec2 v_uv;
void main() {
gl_Position = vec4(position, 1.0);
v_uv = uv;
}
`;

let lastTime = 0;
class ParticleShader extends FragmentShader {
  constructor({
    fragment,
    fragment2,
    dimensions = new Vec2(window.innerWidth, window.innerHeight),
    container = document.body,
    autoResize = true,
    uniforms = {},
    onBeforeRender = t => {},
    onAfterRender = t => {} } =
  {}) {
    super({
      fragment, dimensions, container, autoResize, uniforms, onBeforeRender, onAfterRender });


    const geometry = new Triangle(this.gl);
    this.mainProgram = new Program(this.gl, {
      vertex: defaultShaderV,
      fragment: fragment2,
      uniforms: this.uniforms });

    this.mainMesh = new Mesh(this.gl, { geometry, program: this.mainProgram });
    this.mainFBO = new Framebuffer(this.gl, {
      name: 'render',
      width: this.dimensions.width,
      height: this.dimensions.height,
      texdepth: Framebuffer.TEXTYPE_FLOAT,
      tiling: Framebuffer.IMAGETYPE_TILING });
  }
  resize() {
    this.dimensions = new Vec2(window.innerWidth, window.innerHeight);
    if (this.mainFBO) this.mainFBO.resize(window.innerWidth, window.innerHeight);
    this.u_resolution.value = this.dimensions.scaleNew(this.renderer.dpr).array;

    this.renderer.dimensions = this.dimensions;
  }
  render(t) {
    this.onBeforeRender(t);

    const diff = t - lastTime;
    lastTime = t;


    if (this.playing) {
      requestAnimationFrame(this.render);
    }

    const v = this.u_time.value;
    this.u_time.value = v + diff * 0.00005;

    this.mainMesh.program.uniforms[`b_${this.mainFBO.name}`] = new Uniform({
      name: this.mainFBO.name,
      value: this.mainFBO.read.texture,
      kind: 'texture' });


    this.mainFBO.render(this.renderer, { scene: this.mainMesh });

    this.mesh.program.uniforms['u_resolution'] = new Uniform({ name: 'res', value: this.dimensions.scaleNew(this.renderer.dpr).array, kind: 'vec2' });

    this.renderer.render({ scene: this.mesh, target: null });

    this.onAfterRender(t);
  }}


// Create the fragment shader wrapper
const FSWrapper = new ParticleShader({
  container: document.querySelector('.container'),
  autoResize: false,
  dimensions: new Vec2(1024, 1024),
  fragment2: document.querySelector('#fragShader').innerText,
  fragment: document.querySelector('#renderShader').innerText });


const { gl, uniforms, renderer } = FSWrapper;
const px = renderer.dpr;

// Set up mouse uniforms
(function () {
  const tarmouse = new Vec4(0, 0, 0, 0);
  const curmouse = tarmouse.clone();
  let pointerdown = false;
  uniforms.u_mouse = new Uniform({
    name: 'mouse',
    value: tarmouse.array,
    kind: 'float_vec4' });

  uniforms.u_iMouselength = new Uniform({
    name: 'iMouselength',
    value: 0,
    kind: 'float' });

  document.body.addEventListener('pointermove', e => {
    tarmouse.x = e.x * px;
    tarmouse.y = (window.innerHeight - e.y) * px;
    if (pointerdown) {
      tarmouse.z = e.x * px;
      tarmouse.w = (window.innerHeight - e.y) * px;
    }
  });
  document.body.addEventListener('pointerdown', e => {
    pointerdown = true;
    tarmouse.z = e.x * px;
    tarmouse.w = (window.innerHeight - e.y) * px;
  });
  document.body.addEventListener('pointerup', e => {
    pointerdown = false;
  });
  let oldTime;
  const animouse = d => {
    const factor = d - oldTime;
    oldTime = d;
    const diff = tarmouse.xy.subtractNew(curmouse.xy);
    uniforms.u_iMouselength.value = diff.length;
    curmouse.add(diff.scale(1. / factor * .05));
    uniforms.u_mouse.value = curmouse.array;
    requestAnimationFrame(animouse);
  };
  requestAnimationFrame(animouse);
})();

// Set up textures
(function () {
  // Create the texture
  const texture = new Texture(gl, {
    wrapS: gl.REPEAT,
    wrapT: gl.REPEAT });

  // Load the image into the uniform
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = "https://assets.codepen.io/982762/noise.png";
  img.onload = () => texture.image = img;

  uniforms.s_noise = new Uniform({
    name: "noise",
    value: texture,
    kind: "texture" });

})();