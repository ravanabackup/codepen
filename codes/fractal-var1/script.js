const canvas = document.getElementById("c");

const width = Math.min(window.innerWidth, 800);
const height = Math.min(window.innerHeight, 800);

const gpu = new GPU({
  canvas: canvas,
  mode: 'gpu'
});

function popcorn(x, y, h, t0, t1, t2, t3) {
  
  const N = 18;
  for (let i = 0; i < N; i++) {
    //x = x - h * Math.sin(t2 + x + Math.atan((t1 + t3 / y / Math.PI)) / t0);
    //y = y - h * Math.sin(t0 + y + Math.atan((t3 + t1 / x / Math.PI)) / t2);
    
    x = x - h * Math.cos(t0 + x -  Math.cos(t1 + y * Math.PI) + Math.sin(t2 + y * Math.PI * 2) * y * 0.5);
    y = y - h * Math.cos(t2 + y - Math.cos(t3 + x * Math.PI) + Math.sin(t0 + x * Math.PI * 2) * x * 0.5);
  }
  return [x, y]
}
gpu.addFunction(popcorn);

const calculate = gpu.createKernel(function(width, height, scale, param) {
  let sum = 0;
  let x = Math.floor(this.thread.x / scale) * scale;
  let y = Math.floor(this.thread.y / scale) * scale;
  
  // normalize (0..1)
  let xn = x / width;
  let yn = y / height;
  
  // mirror
  if (xn < 0.5) xn = 1 - xn
  
  // zoom
  let zoom = 4.9 + param *2;
  let xz = xn * zoom
  let yz = yn * zoom
  let r = [xz, yz];
  
  // changes the contrast, not good to changee while running
  let h = 0.027;
  let t0 = 11 + Math.tan(param + 5)*3;
  let t1 = 8.1 + Math.atan(param/14)*3;
  let t2 = 3.1 + Math.cos(param) * 2;
  let t3 = 30.6 / (4 + param);
  
  r = popcorn(r[1], r[0], h, t0, t1, t2, t3);
  let r0 = [r[0] * param * 4, r[1]  * param * 3]
  r = popcorn(r[0], r[1], h, t0, t1 * 8, t2, t3);
  r = popcorn(r[0], r[1], h, t0, t1 * 16, t2, t3);
  
  let rx = r[1] 
  let ry = r[0]
  
  let v0 = Math.cos(r0[0]);
  let v1 = Math.cos(r0[1]);
  let v2 = Math.cos(r[0]) * param + Math.cos(r[1]) * (1- param * 0.1);
  let v3 = 1 - Math.cos(r0[0])/2 + Math.cos(r0[1])/2;
  this.color(
    1 - v3 * 0.32 + v2 * 0.21 - v0 * 0.13,
    1 - v3 * 0.71 + v2 * 0.21 - v0 * 0.13,
    1 - v3 * 0.74 + v2 * 0.10 - v0 * 0.22,
    1
  );
}).setOutput([width, height]).setGraphical(true);


let param = 1;

const draw = () => {
  let exp = [];
	let paramNorm;
  function update() {
    param = (param + 0.02) % (Math.PI * 2)
    paramNorm = Math.cos(param) /2 + 0.5
    calculate(width, height, 1, paramNorm);
    setTimeout(update, 50)
  }
  window.requestAnimationFrame(update);
};

draw()