/*
 * A speed-improved perlin and simplex noise algorithms for 2D.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 * Converted to Javascript by Joseph Gentle.
 *
 * Version 2012-03-09
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.
 *
 */

class Grad {
  constructor(x, y, z) {
    this.x = x; this.y = y; this.z = z;
    this.dot2 = this.dot2.bind(this);
    this.dot3 = this.dot3.bind(this);
  }
  dot2(x, y) {
    const value = this.x * x + this.y * y;
    return value;
  };
  dot3(x, y, z) {
    const value = this.x * x + this.y * y + this.z * z;
    return value;
  };
}

class Generator {
  constructor(value) {
    this.grad3 = [new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0),
                 new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1),
                 new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)];
    this.p = [151, 160, 137, 91, 90, 15,
    131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
    190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
    88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
    77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
    102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
    135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
    5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
    223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
    129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
    251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
    49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
    138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];
    // To remove the need for index wrapping, double the permutation table length
    this.perm = new Array(512);
    this.gradP = new Array(512);
    this.F2 = 0.5 * (Math.sqrt(3) - 1);
    this.G2 = (3 - Math.sqrt(3)) / 6;
    this.F3 = 1 / 3;
    this.G3 = 1 / 6;
    this.simplex3 = this.simplex3.bind(this);
    this.simplex2 = this.simplex2.bind(this);
    this.seedFunc = this.seedFunc.bind(this);
   
    this.seedFunc = this.seedFunc(value);
  }

  seedFunc(value) {
    let seed = value;
    if (seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 65536;
    }

    seed = ~~(seed);
    if (seed < 256) {
      seed |= seed << 8;
    }

    for (let i = 0; i < 256; i++) {
      let v;
      if (i & 1) {
        v = this.p[i] ^ (seed & 255);
      } else {
        v = this.p[i] ^ ((seed >> 8) & 255);
      }

      this.perm[i] = this.perm[i + 256] = v;
      this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];
    }
  };

  simplex2(xin, yin) {
    let { n0, n1, n2 } = 0; // Noise contributions from the three corners
    // Skew the input space to determine which simplex cell we're in
    const s = (xin + yin) * this.F2; // Hairy factor for 2D
    let i = ~~(xin + s);
    let j = ~~(yin + s);
    const t = (i + j) * this.G2;
    const x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
    const y0 = yin - j + t;
    // For the 2D case, the simplex shape is an equilateral triangle.
    // Determine which simplex we are in.
    let { i1, j1 } = 0; // Offsets for second (middle) corner of simplex in (i,j) coords
    if (x0 > y0) { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
      i1 = 1; j1 = 0;
    } else {    // upper triangle, YX order: (0,0)->(0,1)->(1,1)
      i1 = 0; j1 = 1;
    }
    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
    // c = (3-sqrt(3))/6
    const x1 = x0 - i1 + this.G2; // Offsets for middle corner in (x,y) unskewed coords
    const y1 = y0 - j1 + this.G2;
    const x2 = x0 - 1 + 2 * this.G2; // Offsets for last corner in (x,y) unskewed coords
    const y2 = y0 - 1 + 2 * this.G2;
    // Work out the hashed gradient indices of the three simplex corners
    i &= 255;
    j &= 255;
    const gi0 = this.gradP[i + this.perm[j]];
    const gi1 = this.gradP[i + i1 + this.perm[j + j1]];
    const gi2 = this.gradP[i + 1 + this.perm[j + 1]];
    // Calculate the contribution from the three corners
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 < 0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot2(x0, y0);  // (x,y) of grad3 used for 2D gradient
    }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 < 0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot2(x1, y1);
    }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 < 0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot2(x2, y2);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 64 * (n0 + n1 + n2);
  };

  // 3D simplex noise
  simplex3(xin, yin, zin) {
    let { n0, n1, n2, n3 } = 0; // Noise contributions from the four corners

    // Skew the input space to determine which simplex cell we're in
    const s = (xin + yin + zin) * this.F3; // Hairy factor for 2D
    let i = ~~(xin + s);
    let j = ~~(yin + s);
    let k = ~~(zin + s);

    const t = (i + j + k) * this.G3;
    const x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
    const y0 = yin - j + t;
    const z0 = zin - k + t;

    // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
    // Determine which simplex we are in.
    let { i1, j1, k1 } = 0; // Offsets for second corner of simplex in (i,j,k) coords
    let { i2, j2, k2 } = 0; // Offsets for third corner of simplex in (i,j,k) coords
    if (x0 >= y0) {
      if (y0 >= z0) {
        i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0;
      } else if (x0 >= z0) {
        i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1;
      } else {
        i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1;
      }
    } else {
      if (y0 < z0) {
        i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1;
      } else if (x0 < z0) {
        i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1;
      } else {
        i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0;
      }
    }
    // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
    // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
    // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
    // c = 1/6.
    const x1 = x0 - i1 + this.G3; // Offsets for second corner
    const y1 = y0 - j1 + this.G3;
    const z1 = z0 - k1 + this.G3;

    const x2 = x0 - i2 + 2 * this.G3; // Offsets for third corner
    const y2 = y0 - j2 + 2 * this.G3;
    const z2 = z0 - k2 + 2 * this.G3;

    const x3 = x0 - 1 + 3 * this.G3; // Offsets for fourth corner
    const y3 = y0 - 1 + 3 * this.G3;
    const z3 = z0 - 1 + 3 * this.G3;

    // Work out the hashed gradient indices of the four simplex corners
    i &= 255;
    j &= 255;
    k &= 255;
    const gi0 = this.gradP[i + this.perm[j + this.perm[k]]];
    const gi1 = this.gradP[i + i1 + this.perm[j + j1 + this.perm[k + k1]]];
    const gi2 = this.gradP[i + i2 + this.perm[j + j2 + this.perm[k + k2]]];
    const gi3 = this.gradP[i + 1 + this.perm[j + 1 + this.perm[k + 1]]];

    // Calculate the contribution from the four corners
    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 < 0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot3(x0, y0, z0);  // (x,y) of grad3 used for 2D gradient
    }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 < 0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
    }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 < 0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
    }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 < 0) {
      n3 = 0;
    } else {
      t3 *= t3;
      n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 32 * (n0 + n1 + n2 + n3);
  };
}

/* simplex noise funciton */

/*
 * p5js fly by demo | paul j karlik
 * Simplex noise generated landscape
 */

// Setup Simplex Noise Generator
var generator;
generator = new Generator(10);
// settings for screen and grid
var width = 640;
var height = 640;
var width_half = width / 2;
var height_half = height / 2;
var grid;
var spacing = ~~(width / grid);
var spacer = 0;
// setting items for render
var time = 0;
var timeNoise = 0;
var iteration = 0.5;
var strength;
var speed = 10;
var shaderType;
var radius = 10;
// setting color vars
var r = 0;
var g = 0;
var b = 0;
var op = 255;
var colorset = [0, 0, 0];
// setting items for movement
var timeout = false;
var waveSpeed = 0.0005;
var zOffset = 0;
var offsetX = 0;
var offsetY = 0;
var zoom = -50;
var camX = width_half;
var camY = height_half;
var tempX = width_half;
var tempY = height_half;
var thisX = width_half;
var thisY = height_half;
var lastHigh = 0;
// building arrays
var vertices = new Array(spacing);
for (var i = 0; i < spacing; i++) {
  vertices[i] = new Array(spacing * 2);
}

// p5.js setup function
function setup() {
  createCanvas(640, 640, WEBGL);
  frameRate(60);
  createGUI();
  // set camera view
  var fov = 60 / 180 * Math.PI;
  var cameraZ = height_half / Math.tan(fov / 2.0);
  perspective(60 / 180 * Math.PI, width / height, cameraZ * 0.1, cameraZ * 10);
  // turn on lighting
  lighting();
};

function setOptions(options) {
  // set options from dat.gui
  speed = options.speed / 10;
  iteration = options.iteration / 100;
  waveSpeed = options.waveSpeed / 10000;

  shaderType = options.shaderType;
  strength = options.strength;
};

function setResolution(options) {
  // set resolution from dat.gui
  grid = options.resolution || grid;
  spacing = ~~(width / grid);
  vertices = new Array(spacing);
  for (var i = 0; i < spacing; i++) {
    vertices[i] = new Array(spacing);
  }
};

function draw() {
  // advance time and tick draw loop for time segment
  var size = ~~(width / spacing);
  var length = ~~(size * 1.25);
  spacer = spacer + speed;
  if (spacer > length) {
    // the time phase of the noise wave moves
    // once the cubes moved one space
    time += 1;
    spacer = 0;
  }

  generateMesh();
  viewPort();

  // move to center to start drawing grid
  translate(-width_half, -height, 200);

  for (var j = 0; j < spacing * 2; j++) {
    for (var i = 0; i < spacing; i++) {
      // generate color values - I need I and J for iterations
      var noiseValue = vertices[i][j].n * 0.3;
      var colorset = shader(vertices[i][j].n, i, j);
      // do a sampling of the highest point to keep camera above
      if (vertices[i][j].n > lastHigh && j == 8) {
        lastHigh = vertices[i][j].n;
      }
      // push and move 3D object into place
      push();
      translate(i * size, j * length - spacer, -noiseValue * 2);
      ambientMaterial(colorset.r, colorset.g, colorset.b, colorset.op);
      box(size, length, 50);
      pop();
    }
  }
};

function generateMesh() {
  timeNoise += 1;
  const timeStop = time * iteration;
  for (var j = 0; j < spacing * 2; j++) {
    for (var i = 0; i < spacing; i++) {
      var nPoint = Math.abs(
        generator.simplex3(iteration * i,
          iteration * j + timeStop, timeNoise * waveSpeed)
      ) * strength;
      var zVector = nPoint * 10;
      vertices[i][j] = {
        n: zVector
      };
    }
  }
};

function shader(noise, i, j) {
  switch (shaderType) {
    case 'octal':
      // octal render color mode - red and cyan
      const m = Math.cos(noise * Math.PI / 180);
      const o = Math.sin(noise * 4 * Math.PI / 180);
      r = ~~(m * 155);
      b = ~~(o * 255);
      g = 0;
      op = 255;
      break;
    case 'rainbow':
      // rainbow render color mode
      var mult = 0.004;
      r = ~~(255 - 255 * (1 - Math.sin((noise * mult) * j)) / 2);
      g = ~~(255 - 255 * (1 + Math.cos((noise * mult) * i)) / 2);
      b = Math.cos(noise * 5 * Math.PI / 180 - (time * 0.03)) * 255;
      op = Math.abs(((noise * 255) - 0.01) / (255 - 0.01));
      break;
    case 'hashing':
      // original render color mode
      r = Math.cos(noise * 3 * Math.PI / 180 - (time * 0.01)) * 255;
      g = r;
      b = g;
      op = 255;
      break;
    case 'offset':
      // offset - three waves of render color
      b = Math.cos(noise * 3 * Math.PI / 180 + (j * 0.01)) * 255;
      g = Math.sin(i *  Math.PI / grid + (time * 0.1)) * 255;
      r = Math.cos(j * Math.PI / grid + (time * 0.05)) * 255;
      op = 255;
      break;
    case 'java':
      // java render color mode
      b = Math.cos(noise * Math.PI / 180 + (time * 0.2)) * 255;
      r = 255 - b; 
      // Math.sin(1 + noise * Math.PI / 180 - (time * 0.01)) * 255;
      g = Math.cos(2 - noise * 2 * Math.PI / 180) * 255;
      op = 255;
      break;
    case 'default':
      // original render color mode
      r = 255 - Math.cos(noise * Math.PI / 180) * 255;
      g = r;
      b = g;
      op = g;
      break;
  }
  return {
    r,
    g,
    b,
    op
  };
};

pauseChange = function() {
  timeout = true;
  setTimeout(() => {
    timeout = false;
  }, 5000);
};

function viewPort() {
  // set viewport, background, and lighting
  background(0, 0, 0);
  // move into position to draw grid
  translate((width / 2) - (spacing * grid / 2), -100, zoom);
  checkForChange();
  moveVectors();
  rotateX(90 + camY);
  rotateZ(camX);
};

checkForChange = function() {
  // get random x and y - if set cause timeout to prevent too many moves
  if (random(1, 255) > 254 && !timeout) {
    tempX = width_half - (width - random(1, width * 2));
    pauseChange();
  }
  if (random(1, 255) > 243 && !timeout) {
    tempY = height_half - (lastHigh / 8) - (60 - random(1, 110));
    pauseChange();
  }
};

function moveVectors() {
  thisX = thisX - (thisX - tempX) * 0.006;
  thisY = thisY - (thisY - tempY) * 0.006;
  camX = (width_half - thisX) * 0.006;
  camY = (height_half - thisY) * 0.008;
};

function mouseWheel(event) {
  //move the square according to the vertical scroll amount
  zoom += event.delta;
  //uncomment to block page scrolling
  return false;
};

function lighting() {
  // function incase I want to animate lights
  directionalLight(250, 250, 250, 1, 1, 0);
  directionalLight(160, 160, 160, 1, -1, 1);
  directionalLight(160, 160, 160, 0, 1, -1);
};

// Dat GUI Stuff //
createGUI = () => {
  this.options = {
    iteration: 3.4,
    strength: 40,
    resolution: 35,
    speed: 200,
    waveSpeed: 25,
    shaderType: 'java',
  };
  this.gui = new dat.GUI();
  const folderRender = this.gui.addFolder('Render Options');
  folderRender.add(this.options, 'iteration', 0, 10).step(0.1)
    .onFinishChange((value) => {
      this.options.iteration = value;
      this.setOptions(this.options);
    });
  folderRender.add(this.options, 'strength', 1, 50).step(1)
    .onFinishChange((value) => {
      this.options.strength = value;
      this.setOptions(this.options);
    });
  folderRender.add(this.options, 'speed', 1, 1000).step(1)
    .onFinishChange((value) => {
      this.options.speed = value;
      this.setOptions(this.options);
    });
  folderRender.add(this.options, 'waveSpeed', 1, 100).step(1)
    .onFinishChange((value) => {
      this.options.waveSpeed = value;
      this.setOptions(this.options);
    });
  folderRender.add(this.options, 'resolution', 25, 125).step(5)
    .onFinishChange((value) => {
      this.options.resolution = value;
      this.setResolution(this.options);
    });
  folderRender.add(this.options, 'shaderType', [
    'java', 'octal', 'offset', 'rainbow', 'hashing','default'
  ])
    .onFinishChange((value) => {
      this.options.shaderType = value;
      this.setOptions(this.options);
    });
  // folderRender.open();

  this.setOptions(this.options);
  this.setResolution(this.options);
};