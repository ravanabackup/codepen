let createClasses;

let initialise = function () {

  let application = new Application();
  // application.addActor(new Creature(0, 0));
  // application.addActor(new Arrow(window.innerWidth / 2, window.innerHeight / 2, 10, 10));
  let vfield = new VectorField();

  application.addActor(vfield);

  let creatures = 50;
  let i = 0;
  while (i < creatures) {
    let creature = new Creature(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 10, 5);
    creature.field = vfield;
    application.addActor(creature);
    i++;
  }


  let stage = application.stage;
  document.body.appendChild(stage);
  application.onPointerMove({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
  application.render();
  application.animating = true;

  return;
};


class Creature extends Pill {
  constructor(x = 200, y = 200, w = 40, h = 20) {
    super(x, y, w, h);

    // this.onPointerMove = this.onPointerMove.bind(this);
    this.onAnimate = this.onAnimate.bind(this);

    // document.addEventListener('application-pointermove', this.onPointerMove, false);
    document.addEventListener('application-animate', this.onAnimate, false);

    this.friction = 0.99;
    this.momentum = new Vector(1, 0);
  }

  onPointerMove(e) {
    this.targetPos = e.detail.pointer;
  }

  onAnimate(e) {
    if (this.field) {
      let force = this.field.solveForPosition(this.position).multiplyScalar(0.005);
      let app = e.detail.application;

      this.momentum.add(force);
      this.momentum.multiplyScalar(this.friction);
      if (this.momentum.length < 1) this.momentum.length = 1;
      if (this.momentum.length > 10) this.momentum.length = 10;
      this.position.add(this.momentum);

      if (this.position.x < -this.dimensions.width * 2) {
        this.position.x = app.dimensions.width + this.dimensions.width;
      } else if (this.position.x > app.dimensions.width + this.dimensions.width * 2) {
        this.position.x = -this.dimensions.width;
      }
      if (this.position.y < -this.dimensions.height * 2) {
        this.position.y = app.dimensions.height + this.dimensions.height;
      } else if (this.position.y > app.dimensions.height + this.dimensions.height * 2) {
        this.position.y = -this.dimensions.height;
      }

      this.angle = this.momentum.angle;
      this.drawShape();
    } else if (this.targetPos) {
      let diff = this.position.subtractNew(this.targetPos);
      let step = diff.multiplyScalarNew(0.05);

      this.position = this.position.subtractNew(step);

      this.angle = step.angle;

      this.drawShape();
    }
  }

  preDraw() {
    this.context.translate(this.squareScalar / 2, this.squareScalar / 2);
    this.context.rotate(this.angle);
    this.context.translate(-this.squareScalar / 2, -this.squareScalar / 2);
  }
  postDraw() {
    this.context.setTransform(1, 0, 0, 1, 0, 0);
  }

  set targetPos(value) {
    if (value instanceof Vector) {
      this.oldTargetPos = this._targetPos;
      this._targetPos = value;
      // this.difference = this.position.subtractNew(value);
      // this.angle = this.difference.angle;

      // this.drawShape();
    }
  }
  get targetPos() {
    return this._targetPos || new Vector(0, 0);
  }

  set field(value) {
    if (value instanceof VectorField) {
      this._field = value;
    }
  }
  get field() {
    return this._field || null;
  }}


class VectorField extends Actor {
  constructor(x = 0, y = 0, w = 0, h = 0) {
    super(x, y, w, h);

    this.helpers = [];

    this.mousepos = new Vector(0, 0);

    this.onResize = this.onResize.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);

    document.addEventListener('application-pointermove', this.onPointerMove, false);
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  render(application) {
    this.helpers.forEach(helper => {
      helper.render(application);
    });
  }

  preDraw() {}
  postDraw() {}

  solveForPosition(v) {
    if (!v instanceof Vector) return;

    let diff = this.centerpoint.subtractNew(v);

    // v.subtract(this.centerpoint);
    // console.log(this.centerpoint);
    let normlisedPosition = diff.divideScalarNew(this.dimensions.length);

    // normlisedPosition.multiplyScalar(-1);
    normlisedPosition.multiplyScalar(normlisedPosition.length);
    normlisedPosition.multiplyScalar(400);

    return normlisedPosition;
  }

  onPointerMove(e) {
    this.mousepos = e.detail.pointer;

    this.helpers.forEach(helper => {
      helper.vector = this.solveForPosition(helper.position);
    });
  }

  onResize(e) {
    this.helpers.forEach(helper => {
      helper.destroy();
    });
    this.helpers = [];

    this.dimensions = new Vector(window.innerWidth, window.innerHeight);
    this.centerpoint = this.dimensions.multiplyScalarNew(.5);

    let w = this.sampleWidth;
    let curpos = new Vector(0, 0);

    while (curpos.y < window.innerHeight + w) {
      curpos.x = 0;
      while (curpos.x < window.innerWidth + w) {
        this.helpers.push(new Arrow(curpos.x, curpos.y, 10, 10, this.solveForPosition(curpos)));
        curpos.x += w;
      }
      curpos.y += w;
    }
  }

  set sampleWidth(value) {
    if (value > 0) this._sampleWidth = value;
  }
  get sampleWidth() {
    return this._sampleWidth || 30;
  }

  set mousepos(value) {
    if (value instanceof Vector) this._mousepos = value;
  }
  get mousepos() {
    return this._mousepos || new Vector(0, 0);
  }

  get strokeStyle() {
    return 'black';
  }

  get strokeWidth() {
    return 0;
  }}


class Application {
  constructor() {
    this.stage = document.createElement('canvas');

    this.animate = this.animate.bind(this);

    this.onResize = this.onResize.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerup = this.onPointerup.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);

    this.initialiseEvents();
  }

  initialiseEvents() {
    window.addEventListener('resize', this.onResize, false);
    document.addEventListener('pointerdown', this.onPointerDown, false);
    document.addEventListener('pointerup', this.onPointerup, false);
    document.addEventListener('pointermove', this.onPointerMove, false);
  }

  deInitialiseEvents() {
    window.removeEventListener('resize', this.onResize, false);
    document.removeEventListener('pointerdown', this.onPointerDown, false);
    document.removeEventListener('pointerup', this.onPointerup, false);
    document.removeEventListener('pointermove', this.onPointerMove, false);
  }

  addActor(actor) {
    if (actor instanceof Actor) {
      this.actors.push(actor);
    }
  }

  animate() {
    this.now = Date.now();
    let interval = this.now - this.then;

    this.triggerEvent('application-animate', { now: this.now, then: this.then, interval: interval, application: this });

    this.render();

    this.then = this.now;

    if (this.animating) {
      requestAnimationFrame(this.animate);
    }
  }

  render() {
    let dims = this.dimensions;

    // this.context.clearRect(0, 0, dims.width, dims.height);
    this.context.fillStyle = 'rgba(255,255,255,.5)';
    this.context.fillRect(0, 0, dims.width, dims.height);

    this.actors.forEach(actor => {
      actor.render(this);
    });
  }

  onResize(e) {
    this.dimensions = new Vector(window.innerWidth, window.innerHeight);
  }
  onPointerDown(e) {

  }
  onPointerup(e) {

  }
  onPointerMove(e) {
    let pointer = new Vector(e.clientX, e.clientY);
    this.triggerEvent('application-pointermove', { pointer: pointer });
  }

  triggerEvent(event, data) {
    if (window.CustomEvent) {
      var event = new CustomEvent(event, { detail: data });
    } else {
      var event = document.createEvent('CustomEvent');
      event.initCustomEvent(event, true, true, data);
    }

    document.dispatchEvent(event);
  }

  get actors() {
    if (!this._actors) this._actors = [];

    return this._actors;
  }

  set dimensions(value) {
    if (value instanceof Vector) {
      this.stage.width = value.width;
      this.stage.height = value.height;
      this._dimensions = value;
    }
  }
  get dimensions() {
    return this._dimensions || new Vector(0, 0);
  }

  set stage(value) {
    if (value instanceof HTMLCanvasElement) {
      value.className = this.className;
      this._stage = value;
      this.context = this.stage.getContext('2d');
      this.onResize();
    }
  }
  get stage() {
    return this._stage || null;
  }

  set now(value) {
    if (!isNaN(value)) this._now = value;
  }
  get now() {
    return this._now || 0;
  }

  set then(value) {
    if (!isNaN(value)) this._then = value;
  }
  get then() {
    return this._then || 0;
  }

  set animating(value) {
    if (value === true && this.animating !== true) {
      this._animating = true;

      this.now = Date.now();
      this.then = this.now;

      requestAnimationFrame(this.animate);
    }
  }
  get animating() {
    return this._animating === true;
  }

  get className() {
    return 'drawer';
  }}



window.addEventListener('load', () => {
  initialise();
});