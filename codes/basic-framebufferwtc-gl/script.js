console.clear();

import { Vec2, Vec3, Vec4, Mat2, Mat3, Mat4, Quat } from 'https://cdn.skypack.dev/wtc-math';
import { Camera, Renderer, Mesh, Program, Geometry, Triangle, FragmentShader, Uniform, Texture, RenderTarget, Framebuffer } from 'https://cdn.skypack.dev/wtc-gl@1.0.0-beta.43';

let mainFBO = null;
let onBeforeRender = function() {
  if(mainFBO) {
    this.uniforms[`b_render`].value = mainFBO.read.texture;
    mainFBO.render(this.renderer, { scene: mainMesh });
  }
}

// Create the fragment shader wrapper
const FSWrapper = new FragmentShader({
  fragment: document.querySelector('#renderShader').innerText,
  onBeforeRender,
  uniforms: { 'b_render': new Uniform({
      name: 'render',
      value: null,
      kind: 'texture'
    }) }
});

const { gl, uniforms, dimensions, renderer } = FSWrapper;

const geometry = new Triangle(gl)
const mainProgram = new Program(gl, {
  vertex: `attribute vec3 position;attribute vec2 uv;varying vec2 v_uv;void main() {gl_Position = vec4(position, 1.0);v_uv = uv;}`,
  fragment: document.querySelector('#fragShader').innerText,
  uniforms: uniforms
})
const mainMesh = new Mesh(gl, { geometry, program: mainProgram })
mainFBO = new Framebuffer(gl, { dpr: renderer.dpr, name: 'render', width: dimensions.width, height: dimensions.height, texdepth: Framebuffer.TEXTYPE_FLOAT });

let resizeTimer;
window.addEventListener('resize', (e) => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    uniforms.u_resolution.value = FSWrapper.dimensions.scaleNew(renderer.dpr).array;
    mainFBO.resize(FSWrapper.dimensions.width, FSWrapper.dimensions.height);
  }, 100);
})

uniforms.u_resolution.value = FSWrapper.dimensions.scaleNew(renderer.dpr).array;

// Create the texture
const texture = new Texture(gl, {
  wrapS: gl.REPEAT,
  wrapT: gl.REPEAT
});
// Load the image into the uniform
const img = new Image();
img.crossOrigin = "anonymous";
img.src = "https://assets.codepen.io/982762/noise.png";
img.onload = () => (texture.image = img);

uniforms.s_noise = new Uniform({
  name: "noise",
  value: texture,
  kind: "texture"
});