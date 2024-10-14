const canvas = document.getElementById('c');
const gpu = new GPU({
  canvas: canvas,
  mode: 'gpu'
});

const size = Math.min(window.innerWidth,window.innerHeight) * 0.67;

function popcorn(x, y, h, t0, t1, t2, t3) {

  const N = 20;
  let x_ = x
  let y_ = y


  for (let i = 0; i < N; i++) {
    x_ = x;
    x = x - h * Math.sin(t2 + Math.sin((t3 + y * Math.PI)));
    y = y - h * Math.sin(t0 + Math.cos((t3 + x_ * Math.PI)));
  }

  return [x, y]
}
gpu.addFunction(popcorn);

const calculate = gpu.createKernel(function(size, scale, param) {
  let sum = 0;
  let x = Math.floor(this.thread.x / scale) * scale
  let y = Math.floor(this.thread.y / scale) * scale
  // normalize (0..1)
  let xn = x / size // + 0.07 * Math.cos(param * Math.PI)
  let yn = y / size // - 0.07 * Math.sin(param * Math.PI)
  // mirror
  if (xn > yn) {
  	var d = xn - yn
  	xn = xn - d
    yn = yn + d
  }
  // zoom
  let zoom = 8.1;
  let xz = xn * zoom
  let yz = yn * zoom
  let r = [xz, yz];

  // changes the contrast, not good to changee while running
  let h = 0.2;
  let t0 = 92.14 // 0.54 + Math.atan2(1/param) * 10.13;
  let t1 = 1.34 + Math.cos(param) * 0.4;
  let t2 = 26 + Math.sin(param/5) * 20
  let t3 = 6 + Math.cos(param/2)

  r = popcorn(r[0], r[1], h, t0, t1, t2, t3);
  let r0 = [r[0], r[1]]
  r = popcorn(r[0], r[1], h, t0, -t1, -t2, t3);

  let rx = r[0]
  let ry = r[1]

  let v0 = Math.cos(r0[0]);
  let v1 = Math.cos(r0[1]);
  let v2 = Math.cos(r[0]) * param + Math.cos(r[1]) * (1 - param);
  let v3 = 1 - Math.cos(r0[0]*0.1) + Math.cos(r0[1*0.1]);
  
  
  this.color(
    v3* 0.48 + v2 * 0.16 + 0.2,
    v3* 0.71 + v2 * 0.1 + 0.1,
    v0* 0.81 + v2 * 0.17 + 0.2,
    1
  );
}).setOutput([size, size]).setGraphical(true);


let param = 1;

const draw = () => {
  let exp = [];
  let paramNorm;

  function update() {
    param = (param + 0.007) % (Math.PI * 2)
    paramNorm = Math.cos(param) / 2 + 0.5
    calculate(size, 1, paramNorm);
    window.requestAnimationFrame(update);
    // setTimeout(update, 50)
  }
  window.requestAnimationFrame(update);
};

draw()