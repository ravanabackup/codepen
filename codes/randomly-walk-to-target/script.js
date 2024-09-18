const canvas = document.createElement('canvas');
const c = canvas.getContext('2d');
 
let targetX, targetY, startX, startY;
const rectSize = 20;
const maxStep = 10;
 
const matchStep = maxStep / 2;
const halfRectSize = rectSize / 2;
let matchTime = 0;
const resetTime = 20;
 
function randX() {
  return innerWidth * 0.8 * Math.random() + innerWidth * 0.1;
}
function randY() {
  return innerHeight * 0.8 * Math.random() + innerHeight * 0.1;
}
 
function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  reset();
}
window.addEventListener('resize', resize);
resize();
 
document.body.appendChild(canvas);
document.body.style.margin = 0;
 
function reset() {
  matchTime = 0;
  targetX = randX();
  targetY = randY();
  startX = randX();
  startY = randY();
  c.fillStyle = '#ccc';
  c.fillRect(0, 0, innerWidth, innerHeight);
 
  c.fillStyle = '#c79500';
  c.fillRect(
    targetX - halfRectSize,
    targetY - halfRectSize,
    rectSize,
    rectSize
  );
 
  c.fillStyle = '#4e82c7';
  c.fillRect(startX - halfRectSize, startY - halfRectSize, rectSize, rectSize);
}
 
function loop() {
  c.strokeStyle = 'black';
  c.beginPath();
  c.moveTo(startX, startY);
  if (startX < targetX) {
    startX += Math.random() * maxStep;
  } else if (startX > targetX) {
    startX -= Math.random() * maxStep;
  }
  if (startY < targetY) {
    startY += Math.random() * maxStep;
  } else if (startY > targetY) {
    startY -= Math.random() * maxStep;
  }
 
  c.lineTo(startX, startY);
  c.stroke();
 
  if (
    Math.abs(startX - targetX) < matchStep &&
    Math.abs(startY - targetY) < matchStep
  ) {
    matchTime++;
    if (matchTime > resetTime) {
      reset();
    }
  }
 
  window.requestAnimationFrame(loop);
}
loop();