console.clear();

import { FragmentShader, Texture, Uniform } from 'https://cdn.skypack.dev/wtc-gl@1.0.0-beta.43';

const shaderF = document.querySelector('#fragShader').innerText;

const vertex = `#version 300 es
in vec3 position;
in vec2 uv;
out vec2 v_uv;
void main() {
gl_Position = vec4(position, 1.0);
v_uv = uv;
}
`

// Create the fragment shader wrapper
const FSWrapper = new FragmentShader({
  fragment: shaderF,
  vertex
});

const { gl, uniforms } = FSWrapper;

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