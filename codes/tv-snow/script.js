const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
let w = canvas.width = window.innerWidth / 3;
let h = canvas.height = window.innerHeight / 3;
let imageData = ctx.getImageData(0, 0, w, h);

var fps = 30;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;

function snowFlakes() {
  window.requestAnimationFrame(snowFlakes);
  now = Date.now();
  delta = now - then;

  if (delta > interval) {
    then = now - delta % interval;

    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = 0;
      imageData.data[i + 1] = 0;
      imageData.data[i + 2] = 0;
      imageData.data[i + 3] = Math.random() * 255;
    }
    ctx.putImageData(imageData, 0, 0);
  }
}

window.addEventListener('resize', function () {
  w = canvas.width = window.innerWidth / 3;
  h = canvas.height = window.innerHeight / 3;
  imageData = ctx.getImageData(0, 0, w, h);
}, false);

snowFlakes();