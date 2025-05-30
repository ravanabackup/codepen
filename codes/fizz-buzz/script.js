console.clear();

const twodWebGL = new WTCGL(
document.querySelector('canvas#webgl'),
document.querySelector('script#vertexShader').textContent,
document.querySelector('script#fragmentShader').textContent,
window.innerWidth,
window.innerHeight,
2);

twodWebGL.startTime = -100 + Math.random() * 50;

window.addEventListener('resize', () => {
  twodWebGL.resize(window.innerWidth, window.innerHeight);
});





// track mouse move
let mousepos = [0, 0];
let position = [1., 1.];
let zoom = 5.;
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
window.addEventListener('wheel', e => {
  scalechange = -e.wheelDeltaY * .01;
  position[0] -= position[0] * scalechange * .5;
  position[1] -= position[1] * scalechange * .5;
  zoom -= e.wheelDeltaY * .01;
  if (zoom < 1.) zoom = 1.;
  twodWebGL.addUniform('zoom', WTCGL.TYPE_FLOAT, zoom);
  e.preventDefault();
});
let updatePositions = delta => {
  requestAnimationFrame(updatePositions);
  position[0] += mousepos[0] * .01;
  position[1] += mousepos[1] * .01;
  twodWebGL.addUniform('position', WTCGL.TYPE_V2, position);
};
requestAnimationFrame(updatePositions);









// Load all our textures. We only initiate the instance once all images are loaded.
const textures = [
{
  name: 'noise',
  url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png',
  type: WTCGL.IMAGETYPE_TILE,
  img: null },
{
  name: 'font',
  url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/font.png',
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

loadTextures(textures).then(
result => {
  twodWebGL.initTextures();
  // twodWebGL.render();
  twodWebGL.addUniform('zoom', WTCGL.TYPE_FLOAT, zoom);
  twodWebGL.running = true;
},
error => {
  console.log('error');
});