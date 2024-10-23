function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}console.clear();

setTimeout(() => {init();}, 0);

class RenderBuffer {












  constructor(options) {_defineProperty(this, "fb1", null);_defineProperty(this, "fb2", null);_defineProperty(this, "activeFB", null);_defineProperty(this, "wtcgl", null);_defineProperty(this, "buffername", null);_defineProperty(this, "textype", WTCGL.IMAGETYPE_REGULAR);_defineProperty(this, "texdepth", WTCGL.TEXTYPE_HALF_FLOAT_OES);_defineProperty(this, "width", 1024);_defineProperty(this, "height", 1024);_defineProperty(this, "textureRegister", 5);
    if (options.wtcgl) this.wtcgl = options.wtcgl;else
    throw new Error('You need to provide a WTCGL Instance');
    if (options.buffername) this.buffername = options.buffername;else
    throw new Error('You need to provide a Buffer name');
    if (options.textype) this.textype = options.textype;
    if (options.texdepth) this.texdepth = options.texdepth;
    if (options.width) this.width = options.width;
    if (options.height) this.height = options.height;
    this.textureRegister = RenderBuffer.textureRegisterBase++;

    this.fb1 = this.wtcgl.addFrameBuffer(this.width, this.height, this.textype, this.texdepth);
    this.fb2 = this.wtcgl.addFrameBuffer(this.width, this.height, this.textype, this.texdepth);
    this.activeFB = this.fb1;
  }
  resize(width, height) {
    this.width = width;
    this.height = height;
    this.fb1 = this.wtcgl.addFrameBuffer(this.width, this.height, this.textype, this.texdepth);
    this.fb2 = this.wtcgl.addFrameBuffer(this.width, this.height, this.textype, this.texdepth);
    this.activeFB = this.fb1;
  }
  render() {
    let _ctx = this.wtcgl._ctx;

    // find the active texture based on the index
    let uniform = _ctx.getUniformLocation(this.wtcgl._program, `u_b_${this.buffername}`);
    if (!window.uniform) window.uniform = _ctx[`TEXTURE${this.textureRegister}`];
    // console.log(uniform)
    // Set the texture unit to the uniform
    _ctx.uniform1i(uniform, this.textureRegister);
    _ctx.activeTexture(_ctx[`TEXTURE${this.textureRegister}`]);
    // Finally, bind the texture
    _ctx.bindTexture(_ctx.TEXTURE_2D, this.activeFB.frameTexture);
    this.activeFB = this.activeFB === this.fb1 ? this.fb2 : this.fb1;

    this.wtcgl.addUniform(`${this.buffername}_pass`, WTCGL.TYPE_BOOL, true);
    this.wtcgl.render(this.activeFB);
    this.wtcgl.addUniform(`${this.buffername}_pass`, WTCGL.TYPE_BOOL, false);
  }}_defineProperty(RenderBuffer, "textureRegisterBase", 5);


const init = () => {
  const twodWebGL = new WTCGL(
  document.querySelector('canvas#webgl'),
  document.querySelector('script#vertexShader').textContent,
  document.querySelector('script#fragmentShader').textContent,
  window.innerWidth,
  window.innerHeight,
  2);

  twodWebGL.startTime = -100 + Math.random() * 50;

  let buffer = new RenderBuffer({
    width: window.innerWidth,
    height: window.innerHeight,
    buffername: 'buffer',
    textype: WTCGL.IMAGETYPE_REGULAR,
    texdepth: WTCGL.TEXTYPE_HALF_FLOAT_OES,
    wtcgl: twodWebGL });


  let timeout;

  window.addEventListener('resize', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      twodWebGL.resize(window.innerWidth, window.innerHeight);
      buffer.resize(window.innerWidth, window.innerHeight);
    }, 100);
  });

  let frame = 0;
  const render = function () {
    let _ctx = twodWebGL._ctx;

    buffer.render();

    twodWebGL.addUniform('frame', WTCGL.TYPE_INT, frame);
    frame += 1;
  };
  twodWebGL.onRun = delta => {
    render();
    render();
    // render();
  };




  // track mouse move
  let mousepos = [0, 0];
  const u_mousepos = twodWebGL.addUniform('mouse', WTCGL.TYPE_V2, mousepos);
  const u_oldmouse = twodWebGL.addUniform('oldmouse', WTCGL.TYPE_V2, mousepos);
  window.addEventListener('pointermove', e => {
    let ratio = window.innerHeight / window.innerWidth;
    twodWebGL.addUniform('oldmouse', WTCGL.TYPE_V2, [mousepos[0], mousepos[1]]);
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

  loadTextures(textures).then(
  result => {
    twodWebGL.initTextures();
    // twodWebGL.render();
    twodWebGL.running = true;
  },
  error => {
    console.log('error');
  });

};