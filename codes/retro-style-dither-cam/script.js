import GLea from 'https://cdn.skypack.dev/glea';

// this is just for code highlighting in VSCode
// via the glsl-literal extension
const glsl = x => x;

const frag = glsl`
precision highp float;

uniform float width;
uniform float height;
uniform float time;

uniform sampler2D texture0;
uniform sampler2D texture1;
uniform int dithering;

// normalize coords and correct for aspect ratio
vec2 normalizeScreenCoords()
{
  float aspectRatio = width / height;
  vec2 result = 2.0 * (gl_FragCoord.xy / vec2(width, height) - 0.5);
  result.x *= aspectRatio;
  return result;
}

float deform(vec2 p, float factor) {
  return sin(time * .1 + factor * p.x) * cos(time * .1 + factor * p.y);
}

vec4 invert(vec4 color) {
  return vec4(1.0 - color.rgb, 1.0);
}

vec4 grey(vec4 color) {
  float val = (color.x + color.y + color.z) / 3.0;

  return vec4(vec3(pow(val, .125)), 1.0);
}

vec2 getTexCoords(vec2 position) {
  return 1.0 - position.xy / vec2(width, height);
}

// dumb closest color strategy
vec4 closestColor(vec4 color) {
  return vec4(
    clamp(floor(color.x * 4. + .5) * 85., 0., 255.) / 255.,
    clamp(floor(color.y * 4. + .5) * 85., 0., 255.) / 255.,
    clamp(floor(color.z * 4. + .5) * 85., 0., 255.) / 255.,
    1.
  );
}

// luminance strategy: (TODO)
float luminance(vec4 color) {
  return 0.2126*color.x + 0.7152*color.y + 0.0722*color.z;
}

vec4 getEgaColor(int index) {
  float fi = float(index);
  float b = clamp((2. * mod(fi, 2.) + mod(floor(fi / 8.), 2.)) * (1./3.), 0., 1.);
  float g = clamp((2. * mod(floor(fi / 2.), 2.) + mod(floor(fi / 16.), 2.)) * (1./3.), 0., 1.);
  float r = clamp((2. * mod(floor(fi / 4.), 2.) + mod(floor(fi / 32.), 2.)) * .333, 0., 1.);
  return vec4(r, g, b, 1.);
}

vec4 closestColorLum(vec4 color) {
  float l = luminance(color);
  float lResult = 9999.0;
  vec4 result = vec4(0.);
  for (int i = 0; i < 64; i++) {
    vec4 colorI = getEgaColor(i);
    float lI = luminance(colorI);
    if (abs(lI - l) < abs(lResult - l)) {
      lResult = lI;
      result = colorI;
    }
  }
  return result;
}

// hue distance strategy (TODO)

// rgb2hsl by Inigo Quilez
const float eps = 0.0000001;
vec3 rgb2hsl(vec3 col)
{
    float minc = min( col.r, min(col.g, col.b) );
    float maxc = max( col.r, max(col.g, col.b) );
    vec3  mask = step(col.grr,col.rgb) * step(col.bbg,col.rgb);
    vec3 h = mask * (vec3(0.0,2.0,4.0) + (col.gbr-col.brg)/(maxc-minc + eps)) / 6.0;
    return vec3( fract( 1.0 + h.x + h.y + h.z ),              // H
                 (maxc-minc)/(1.0-abs(minc+maxc-1.0) + eps),  // S
                 (minc+maxc)*0.5 );                           // L
}

float hueDistance(vec3 h1, vec3 h2) {
    float diff = abs((h1.x - h2.x));
    return min(abs((1.0 - diff)), diff);
}

vec4 closestColorHue(vec4 color) {
  vec3 h = rgb2hsl(vec3(color));
  vec3 hResult = vec3(9999.0);
  vec4 result = vec4(0.);
  for (int i = 0; i < 64; i++) {
    vec4 colorI = getEgaColor(i);
    vec3 hI = rgb2hsl(vec3(colorI));
    if (hueDistance(hI, h) < hueDistance(hResult, h)) {
      hResult = hI;
      result = colorI;
    }
  }
  return result;
}



void main() {
  vec2 p = normalizeScreenCoords();
  vec2 coord = 1.0 - gl_FragCoord.xy / vec2(width, height);
  bool isEven = mod(gl_FragCoord.x + gl_FragCoord.y, 2.) < 1.;
/*  gl_FragColor = closestColor(step(
    texture2D(texture0, gl_FragCoord.xy / 8.).r,
    isEven ? closestColor(texture2D(texture1, coord)) : 
             closestColorLum(texture2D(texture1, coord))
  ));*/

  vec4 color = isEven ? 
    closestColor(texture2D(texture1, coord)) : 
    closestColorLum(texture2D(texture1, coord))
  ;

  gl_FragColor = (dithering == 1) ? 
    closestColor(step(
      texture2D(texture0, gl_FragCoord.xy / 8.).r,
      color
    )) : color;
}
`

const vert = glsl`
precision mediump float;
attribute vec2 position;

void main () {
  gl_Position = vec4(position, 0, 1.0);
}
`

let video = document.querySelector('video');
let fallbackImage = null;

let texture0 = null;
let texture1 = null;

const dithering = document.querySelector('#dithering');


const glea = new GLea({
  glOptions: {
    preserveDrawingBuffer: true
  },
  shaders: [
    GLea.fragmentShader(frag),
    GLea.vertexShader(vert)
  ],
  buffers: {
    'position': GLea.buffer(2, [1, 1,  -1, 1,  1,-1,  -1,-1])
  }
}).create();

window.addEventListener('resize', () => {
  glea.resize();
});

function loop(time) {
  const { gl } = glea;
  // Upload the image into the texture.
  // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video || fallbackImage);
  if (video) {
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, video);  
  }
  
  glea.clear();
  glea.uni('width', glea.width);
  glea.uni('height', glea.height);
  glea.uni('time', time * .005);
  glea.uniI('dithering', dithering.checked ? 1 : 0);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  requestAnimationFrame(loop);
}

function accessWebcam(video) {
  return new Promise((resolve, reject) => {
    const mediaConstraints = { audio: false, video: { width: 1280, height: 720, brightness: {ideal: 2} } };
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(mediaStream => {
      video.srcObject = mediaStream;
      video.onloadedmetadata = (e) => {
        video.play();
        resolve(video);
      }
    }).catch(err => {
      reject(err);
    });
  });
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(img);
    };
  });
}

function takeScreenshot() {
  const { canvas } = glea;
  const anchor = document.createElement('a');
  anchor.setAttribute('download', 'selfie.jpg');
  anchor.setAttribute('href', canvas.toDataURL('image/jpeg', 0.92));
  anchor.click();
}

function createBayerImageData() {
  const imageData = new ImageData(8, 8);
  // TODO: figure out the wikipedia pseudocode for generating this
  // https://en.wikipedia.org/wiki/Ordered_dithering
  const bayer = [
    0 , 48 , 12 , 60 ,  3 , 51 , 15 , 63,
    32 , 16 , 44 , 28 , 35 , 19 , 47 , 31,
    8 , 56 ,  4 , 52 , 11 , 59 ,  7 , 55,
    40 , 24 , 36 , 20 , 43 , 27 , 39 , 23,
    2 , 50 , 14 , 62 ,  1 , 49 , 13 , 61,
    34 , 18 , 46 , 30 , 33 , 17 , 45 , 29,
    10 , 58 ,  6 , 54 ,  9 , 57 ,  5 , 53,
    42 , 26 , 38 , 22 , 41 , 25 , 37 , 21
  ];
  for (let i = 0; i < 64; i++) {
    imageData.data[i * 4 + 0] = bayer[i] * 4;
    imageData.data[i * 4 + 1] = bayer[i] * 4;
    imageData.data[i * 4 + 2] = bayer[i] * 4;
    imageData.data[i * 4 + 3] = 255;
  }
  return imageData;
}

async function setup() {
  const { gl } = glea;
  try {
    await accessWebcam(video);
  } catch (ex) {
    video = null;
    console.error(ex.message);
  }
  if (! video) {
    try {
      fallbackImage = await loadImage('https://placekitten.com/1280/720')
    } catch (ex) {
      console.error(ex.message);
      return false;
    }
  }
  texture0 = glea.createTexture(0, {
    textureWrapS: 'repeat',
    textureWrapT: 'repeat',
    textureMinFilter: 'nearest',
    textureMagFilter: 'nearest'
  });
  const bayerData = createBayerImageData();
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bayerData);
  texture1 = glea.createTexture(1);

  // Upload the image into the texture.
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video || fallbackImage);

  glea.uniI('texture0', 0);
  glea.uniI('texture1', 1);  
  loop(0);
}

setup();