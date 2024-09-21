import Vector from 'https://codepen.io/yukulele/pen/EjmqBM.js';

let balls, win, surf;
let fail = 0;
let hue;
let minDist;
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
(window.onclick = window.onresize = function () {
  balls = [];
  hue = Math.floor(Math.random() * 360);
  minDist = Math.random() ** 1.5 * 30 + 3;
  win = new Vector(
  canvas.width = window.innerWidth,
  canvas.height = window.innerHeight);


  ctx.globalCompositeOperation = 'xor';
  surf = win.x * win.y;
})();
document.body.appendChild(canvas);
function drawBall(ball) {
  //ctx.fillStyle = "hsl(0,0%,"+(Math.pow(ball.r/300,.5)*100)+"%)";
  //ctx.fillStyle = "rgba(255,255,255,.1)";
  ctx.fillStyle = `hsla(${hue},70%,40%,${.8 + Math.random() / 5})`;
  // ctx.strokeStyle = `hsla(${hue+30},100%,50%,${Math.random()*.4})`
  ctx.strokeStyle = `hsla(${hue + 180},100%,62%,0.5)`;
  ctx.lineWidth = (ball.r / 20) ** .5;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);

  ctx.globalCompositeOperation = 'xor';
  ctx.fill();
  ctx.globalCompositeOperation = 'destination-over';
  ctx.stroke();
}
function addBall(a = 1) {
  const time = Date.now();
  do {
    const ball = new Vector(Math.random() * win.x, Math.random() * win.y);
    ball.r = balls.reduce(
    (a, b) => Math.min(a, Math.abs(ball.dist(b) - b.r)),
    Math.min(win.y - ball.y, win.x - ball.x, ball.x, ball.y)) -
    minDist;
    if (ball.r > 0) {
      balls.push(ball);
      drawBall(ball);
      fail--;
      if (fail < 0) {
        fail = 0;
      }
    } else {
      fail++;
    }
    console.clear();
    console.log(fail);
  } while (Date.now() - time < 1000 / 30);
  if (a && fail > 10000) {
    fail = 0;
    window.onclick();
    addBall(0);
  }
}
;(function loop() {
  addBall();
  requestAnimationFrame(loop);
})();