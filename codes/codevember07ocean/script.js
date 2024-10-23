let canvas, ctx;
let render, init;
let surface;

class Surface {
  constructor(points = 5) {
    this.stage = document.createElement('canvas');
    this.stage.id = "surfaceCanvas";

    this.initialise();

    this.onMouseMove = this.onMouseMove.bind(this);

    window.addEventListener('pointermove', this.onMouseMove);

    this.numPoints = points;

    this.running = true;
  }

  initialise() {
    this.points = [];
    for (let i = 0; i <= this.numPoints; i++) {
      this.points.push(new SurfacePoint(i, undefined, Math.random() * 2));
    }

    // window.p = this.points[50];
  }

  render(delta) {
    let ctx = this.stage.getContext('2d');

    let y = this.height / 2;
    // ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillStyle = 'RGBA(220,220,220,' + (Math.sin(delta * .0001) * .08 + .1) + ')';
    ctx.rect(0, 0, this.width, this.height);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, y);

    // let right = this.points[1];
    this.points.forEach((point, index) => {

      let left1 = this.points[index - 1];
      let right1 = this.points[index + 1];
      let left2 = this.points[index - 2];
      let right2 = this.points[index + 2];

      let left1Height = left1 ? left1.height : 0;
      let right1Height = right1 ? right1.height : 0;
      let left2Height = left2 ? left2.height : 0;
      let right2Height = right2 ? right2.height : 0;

      // acceleration
      point.acceleration = (-0.3 * point.height + (left1Height - point.height) + (right1Height - point.height)) * this.elasticity - point.speed * this.friction;
      point.acceleration += (-0.3 * point.height + (left2Height - point.height) + (right2Height - point.height)) * (this.elasticity / 2) - point.speed * this.friction;

      // speed
      point.speed += point.acceleration * 5;

      // height
      point.height += point.speed * 10;

      let p1 = new Vector(this.segWidth * (index - 1), y + left1Height);
      let p2 = new Vector(this.segWidth * index, y + point.height);
      var xc = (p1.x + p2.x) / 2;
      var yc = (p1.y + p2.y) / 2;
      ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
    });

    let p1 = new Vector(this.segWidth * this.numPoints, y + this.points[this.points.length - 1].height);
    let p2 = new Vector(this.segWidth * this.numPoints + 1, y);
    var xc = (p1.x + p2.x) / 2;
    var yc = (p1.y + p2.y) / 2;
    ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);

    ctx.lineTo(this.width, this.height);
    ctx.lineTo(0, this.height);
    ctx.closePath();
    ctx.fillStyle = this.colour;
    ctx.fill();
    // ctx.stroke();

    if (this.running) {
      window.requestAnimationFrame(this.render.bind(this));
    }
  }

  onMouseMove(e) {

    e.preventDefault();

    let mousePos = new Vector(e.clientX + 250, e.clientY); // The 250 here is just to make up for the offset on screen

    let difference = this.oldMousePos.subtractNew(mousePos);
    let offset = this.stage.getBoundingClientRect();

    let normalisedPos1 = mousePos.y - (offset.top + this.height / 2);
    let normalisedPos2 = this.oldMousePos.y - (offset.top + this.height / 2);

    let changed = normalisedPos1 * normalisedPos2 < 0;

    if (changed) {
      let closestPointIndex = Math.round(mousePos.x / (this.width / this.numPoints));
      let closestPoint = this.points[closestPointIndex];
      let power = difference.y * .02;
      if (power > 5) {
        power = 5;
      } else if (power < -5) {
        power = -5;
      }
      closestPoint.speed += -power;
    }

    this.oldMousePos = mousePos;
  }

  set oldMousePos(value) {
    if (value instanceof Vector) {
      this._oldMousePos = value;
    }
  }
  get oldMousePos() {
    return this._oldMousePos instanceof Vector ? this._oldMousePos : new Vector(0, 0);
  }

  set elasticity(value) {
    if (typeof value === 'number') {
      this._elasticity = value;
    }
  }
  get elasticity() {
    return this._elasticity || 0.0001;
  }
  set friction(value) {
    if (typeof value === 'number') {
      this._friction = value;
    }
  }
  get friction() {
    return this._friction || 0.0015;
  }

  set numPoints(value) {
    let oldNumPoints = this._numPoints;
    if (typeof value == 'number' && oldNumPoints != value) {
      this._numPoints = value;
      this.initialise();
    }
  }
  get numPoints() {
    return this._numPoints;
  }

  set running(value) {
    let oldValue = this._running;
    this._running = value === true;
    if (value === true && oldValue !== true) {
      this.render();
    }
  }
  get running() {
    return this._running === true;
  }

  set stage(element) {
    if (element instanceof HTMLElement) {
      this._stage = element;
    }
  }
  get stage() {
    return this._stage;
  }

  get segWidth() {
    return this.width / this.numPoints;
  }

  set width(value) {
    if (typeof value == 'number') {
      this._width = value;
      this.stage.width = this._width;
    }
  }
  get width() {
    return this._width || window.innerWidth;
  }
  set height(value) {
    if (typeof value == 'number') {
      this._height = value;
      this.stage.height = this._height;
    }
  }
  get height() {
    return this._height || window.innerHeight;
  }

  set colour(value) {
    this._colour = value;
  }
  get colour() {
    return this._colour || "#18d618";
  }}


class SurfacePoint {
  constructor(index, acceleration, speed, height) {
    this.index = index;
    this.acceleration = acceleration;
    this.speed = speed;
    this.height = height;
  }

  set height(value) {
    if (typeof value == 'number') {
      this._height = value;
      // this._height = value > 300 ? 300 : (value < -300 ? -300 : value);
    }
  }
  get height() {
    return typeof this._height == 'number' ? this._height : 0;
  }
  set speed(value) {
    if (typeof value == 'number') {
      this._speed = value;
    }
  }
  get speed() {
    return typeof this._speed == 'number' ? this._speed : 0;
  }
  set acceleration(value) {
    if (typeof value == 'number') {
      this._acceleration = value;
    }
  }
  get acceleration() {
    return typeof this._acceleration == 'number' ? this._acceleration : 0;
  }}


surface = new Surface(window.innerWidth / 50);
surface.colour = '#000000';

window.addEventListener('resize', () => {
  surface.width = window.innerWidth + 500;
  surface.height = window.innerHeight;
});

init = function () {
  document.body.appendChild(surface.stage);
  surface.width = window.innerWidth + 500;
  surface.height = window.innerHeight;
};

init();