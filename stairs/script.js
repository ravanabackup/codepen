console.clear();

import { FragmentShader, Texture, Uniform } from 'https://cdn.skypack.dev/wtc-gl@1.0.0-beta.23';

const shaderF = document.querySelector('#fragShader').innerText;

// Create the fragment shader wrapper
const FSWrapper = new FragmentShader({
  fragment: shaderF
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