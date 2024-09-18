const canvas = document.createElement("canvas");
const c = canvas.getContext("2d");

let s = 0.5;
canvas.width = innerWidth * s;
canvas.height = innerHeight * s;
canvas.style.transformOrigin = "0 0";
canvas.style.scale = 1 / s;
canvas.style.imageRendering = "pixelated";
document.body.append(canvas);

const frame = document.createElement("canvas");
const fc = frame.getContext("2d");
frame.width = canvas.width;
frame.height = canvas.height;

const copy = document.createElement("canvas");
const cc = copy.getContext("2d");
copy.width = canvas.width;
copy.height = canvas.height;

frame.style.left = "100px";
frame.style.top = "100px";

fc.fillStyle = "red";
fc.fillRect(0, 0, 100, 100);

const _ = c.getImageData(0, 0, canvas.width, canvas.height);

const size = canvas.width * canvas.height * 4;

let mx = 0;
let my = 0;
let w = canvas.width;
let w2 = 1 / w;
var w10 = 1 / (w * 80);
let dx = 0;
let dy = 0;
let convert = Math.PI / 180;
let sin = 0;
let cos = 0;
let t = 0;

onpointermove = (e) => {
  mx = e.clientX;
  my = e.clientY;
};

function loop() { 
  dx += (mx * 5 - 3000 - dx) / 8;
  dy += (my * 4 - dy) / 8;

  for (let i = 0; i < size; i += 4) {
    let xp = ~~(i / 4) % canvas.width;
    let yp = ~~((i / 4) * w2);
    let col = 255; //((ox | oy) * mouseX / 20) % 255
    var xp2 = xp << 1;
    var t;
    t = ((yp | (xp + yp * 0.1)) * (xp + dx) * w10) % 6.14687;
    // compute sine
    // technique from http://lab.polygonal.de/2007/07/18/fast-and-accurate-sinecosine-approximation/
    // by Michael Baczynski
    if (t < 0) {
      sin = 1.27323954 * t + 0.405284735 * t * t;
    } else {
      sin = 1.27323954 * t - 0.405284735 * t * t;
    }

    // compute cosine
    t = ((xp2 | (yp + xp * 0.1 + dy)) * convert) % 6.28;
    t += 1.57079632;
    if (t > 3.14159265) {
      t -= 6.28318531;
    }
    if (t < 0) {
      cos = 1.27323954 * t + 0.405284735 * t * t;
    } else {
      cos = 1.27323954 * t - 0.405284735 * t * t;
    }
    var c1 = 31 * (sin - cos);
    if (c1 < 0) c1 = 256 - c1;
    c1 = ((c1 << 4) | c1) & 255;

    _.data[i] = c1;
    _.data[i + 1] = c1;
    _.data[i + 2] = c1;
    _.data[i + 3] = 255; 
  }

  c.globalCompositeOperation = "source-over";
  c.putImageData(_, 0, 0);

  fc.filter = `blur(0px)`;

  fc.setTransform(1, 0, 0, 1, 0, 0);
  fc.translate(0, canvas.height);
  fc.scale(1, -1);
  fc.drawImage(canvas, 0, 0, canvas.width, canvas.height);
  let __ = fc.getImageData(0, 0, frame.width, frame.height);
  for (let i = 0; i < size; i += 4) {
    __.data[i] = _.data[i] - __.data[i];
    __.data[i + 1] = _.data[i + 1] - __.data[i + 1];
    __.data[i + 2] = _.data[i + 2] - __.data[i + 2];
    __.data[i + 3] = 255;
  }
  c.putImageData(__, 0, 0);

  cc.filter = `blur(3px)`;
  cc.drawImage(canvas, 0, 0, canvas.width, canvas.height);

  c.globalCompositeOperation = "lighter";
  c.globalAlpha = 0.5;
  c.drawImage(copy, 0, 0, canvas.width, canvas.height);

  c.setTransform(1, 0, 0, 1, 0, 0);
  requestAnimationFrame(loop);
}
loop()