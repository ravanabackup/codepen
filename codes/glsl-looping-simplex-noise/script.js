console.clear();

const twodWebGL = new WTCGL(
document.querySelector('canvas#webgl'),
document.querySelector('script#vertexShader').textContent,
document.querySelector('script#fragmentShader').textContent,
window.innerWidth,
window.innerHeight,
2);

twodWebGL.startTime = -1000 + Math.random();

window.addEventListener('resize', () => {
  twodWebGL.resize(window.innerWidth, window.innerHeight);
});






// track mouse move
let mousepos = [0, 0];
const u_mousepos = twodWebGL.addUniform('mouse', WTCGL.TYPE_V2, mousepos);
window.addEventListener('pointermove', e => {
  let ratio = window.innerHeight / window.innerWidth;
  if (window.innerHeight > window.innerWidth) {
    mousepos[0] = (e.pageX - window.innerWidth / 2) / window.innerWidth;
    mousepos[1] = (e.pageY - window.innerHeight / 2) / window.innerHeight * -1 * ratio;
  } else {
    mousepos[0] = (e.pageX - window.innerWidth / 2) / window.innerWidth / ratio;
    mousepos[1] = (e.pageY - window.innerHeight / 2) / window.innerHeight * -1;
  }
  twodWebGL.addUniform('mouse', WTCGL.TYPE_V2, mousepos);
});









// Load all our textures. We only initiate the instance once all images are loaded.
const textures = [
{
  name: 'noise',
  url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png',
  type: WTCGL.IMAGETYPE_TILE,
  img: null }];


const loadImage = function (imageObject) {
  let img = document.createElement('img');
  img.crossOrigin = "anonymous";

  return new Promise((resolve, reject) => {
    img.addEventListener('load', e => {
      imageObject.img = img;
      resolve(imageObject);
    });
    img.addEventListener('error', e => {
      reject(e);
    });
    img.src = imageObject.url;
  });
};
const loadTextures = function (textures) {
  return new Promise((resolve, reject) => {
    const loadTexture = pointer => {
      if (pointer >= textures.length || pointer > 10) {
        resolve(textures);
        return;
      };
      const imageObject = textures[pointer];

      const p = loadImage(imageObject);
      p.then(
      result => {
        twodWebGL.addTexture(result.name, result.type, result.img);
      },
      error => {
        console.log('error', error);
      }).finally(e => {
        loadTexture(pointer + 1);
      });
    };
    loadTexture(0);
  });

};


let capturer = new CCapture({
  verbose: true,
  framerate: 30,
  // motionBlurFrames: 4,
  quality: 90,
  format: 'webm',
  workersPath: 'js/' });

let capturing = false;

isCapturing = function (val) {
  console.log(val);
  if (val === false && capturing === true) {
    capturer.stop();
    capturer.save();
  } else if (val === true && capturing === false) {
    capturer.start();
  }
  capturing = val;
};
toggleCapture = function () {
  isCapturing(!capturing);
};
window.addEventListener('keyup', function (e) {if (e.keyCode == 68) toggleCapture();});


loadTextures(textures).then(
result => {
  twodWebGL.initTextures();
  twodWebGL.onRun = function (delta) {
    if (capturing) {
      capturer.capture(this._el);
    }
  };
  // twodWebGL.render();
  twodWebGL.running = true;
},
error => {
  console.log('error');
});