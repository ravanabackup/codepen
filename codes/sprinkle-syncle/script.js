const RPA = Math.PI / 180; // radians per angle for unit conversion

const settings = {
  backgroundColor: 'black',
  lineColor: 'rainbow', // if this says "rainbow" it will do something special
  lineWidth: 2,
  tileWidth: 20,
  maxAngleRate: 1 };


class Tile {
  constructor(x, y, l, lineColor, lineWidth, angle, angleRate, cxt) {
    this.x0 = x;
    this.y0 = y;
    this.l = l / 2; // more convenient to calculate line parts with half of the length, but better to let user specify the line length as a whole
    this.cx = x + this.l; // map to new centerpoint
    this.cy = y + this.l; // also map to centerpoint
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.angle = angle;
    this.angleRate = angleRate;
    this.cxt = cxt;
  }
  update() {
    this.angle += this.angleRate;
    let radians = this.angle * RPA;
    let sinCalc = Math.sin(radians) * this.l;
    let cosCalc = Math.cos(radians) * this.l;
    this.x0 = this.cx - cosCalc;
    this.y0 = this.cy - sinCalc;
    this.x1 = this.cx + cosCalc;
    this.y1 = this.cy + sinCalc;
  }
  display() {
    this.cxt.beginPath();
    this.cxt.lineCap = 'round';
    this.cxt.strokeStyle = this.lineColor;
    this.cxt.lineWidth = this.lineWidth;
    this.cxt.moveTo(this.x0, this.y0);
    this.cxt.lineTo(this.x1, this.y1);
    this.cxt.stroke();
    this.cxt.closePath();
  }}


class Controller {
  constructor(settings) {
    this.settings = settings;
    this.canv = document.getElementById('canvas');
    this.cxt = this.canv.getContext('2d');
    this.angle = 0;
    this.animationFrame = undefined;
    window.addEventListener('resize', this.resize.bind(this), false);
  }
  setup() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canv.width = this.w;
    this.canv.height = this.h;

    this.tiles = [];
    var wTiles = Math.ceil(this.w / this.settings.tileWidth);
    var hTiles = Math.ceil(this.h / this.settings.tileWidth);
    for (var i = 0; i < wTiles; i++) {
      for (var j = 0; j < hTiles; j++) {
        let x = i * this.settings.tileWidth;
        let y = j * this.settings.tileWidth;
        let lineColor = this.settings.lineColor === 'rainbow' ?
        'hsl(' + Math.floor(360 * x / this.w) + ',' + (110 - Math.floor(100 * y / this.h)) + '%, 50%)' :
        this.settings.lineColor;
        let angleRate = randIntBetween(-this.settings.maxAngleRate, this.settings.maxAngleRate);
        if (angleRate !== 0) {
          this.tiles.push(new Tile(x, y, this.settings.tileWidth, lineColor, this.settings.lineWidth, 0, angleRate, this.cxt));
        }
      }
    }
  }
  resize() {
    this.setup();
    cancelAnimationFrame(this.animationFrame);
    this.render();
  }
  render() {
    this.angle++;
    this.angle = this.angle === 360 ? 0 : this.angle;
    this.fillCanvas();
    this.tiles.forEach(function (e, i) {
      e.update();
      e.display();
    });
    this.animationFrame = requestAnimationFrame(this.render.bind(this));
  }
  fillCanvas() {
    this.cxt.beginPath();
    this.cxt.fillStyle = this.settings.backgroundColor;
    this.cxt.rect(0, 0, this.w, this.h);
    this.cxt.fill();
    this.cxt.closePath();
  }}


function randIntBetween(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}

(function () {
  var controller = new Controller(settings);

  controller.setup();

  console.log(controller.cxt.canvas.width);
  controller.render();
})();