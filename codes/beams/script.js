/*

Beams.
Author: Drew Dahlman 2016

*/

// Main elements
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');

// Vars
let beams_count = 0,
beams = [];

// Size and set the stage
canvas.height = 759;
canvas.width = 572;

// Build the stage
document.body.appendChild(canvas);

// Platform
class Platform {

  /*
  ------------------------------------------
  | constructor:void (-)
  |
  | Construct.
  ------------------------------------------ */
  constructor() {
    this.color = '#ffffdc';
    this.width = 162;
    this.height = 162;
    this.segments = this.width / 10;

    this.position = {
      x: canvas.width / 2 - 325 / 2,
      y: canvas.height / 2 - 325 / 2,
      rot: 0 };


    // Points for the grid
    this.points = [];
    for (let i = 0; i < 10; i++) {
      let p = this.segments * i;
      this.points.push(p);
    }

  }

  /*
  ------------------------------------------
  | update:void (-)
  |
  | update.
  ------------------------------------------ */
  update() {
    this.position.rot += .01;
  }

  /*
  ------------------------------------------
  | draw:void (-)
  |
  | Draw.
  ------------------------------------------ */
  draw() {
    let offset_x = this.position.x + this.width / 2,
    offset_y = this.position.y + this.height / 2;
    ctx.save();

    // Translate & rotate platform
    ctx.translate(offset_x, offset_y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;

    // Transform the canvas to give perspective
    ctx.setTransform(1, -.13, 1.7, .1, this.position.x + this.width, this.position.y + 75);

    // Rotate
    ctx.rotate(this.position.rot);

    // Draw X
    for (let i = 0; i < this.points.length; i++) {
      let x = this.points[i] - this.width / 2,
      half = this.height - this.height / 2;

      ctx.beginPath();
      ctx.moveTo(x, -(this.width / 2));
      ctx.lineTo(x, half);
      ctx.closePath();

      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.stroke();
    }

    // drawy Y
    for (let i = 0; i < this.points.length; i++) {
      let y = this.points[i] - this.width / 2,
      half = this.width - this.width / 2;

      ctx.beginPath();
      ctx.moveTo(-half, y);
      ctx.lineTo(half, y);
      ctx.closePath();

      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.stroke();
    }

    // Draw the rect
    ctx.rect(-(this.width / 2), -(this.height / 2), this.width, this.height);

    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Stroke & reset
    ctx.stroke();
    ctx.restore();
  }}


// Beams
class Beam {

  /*
  ------------------------------------------
  | constructor:void (-)
  |
  | Construct.
  ------------------------------------------ */
  constructor(init_obj) {

    // Config
    this.color = '#ffffdc';
    this.range_x = [canvas.width / 2 - 15, canvas.width / 2 + 15];
    this.range_y = [canvas.height / 2, -50];

    // Generate random width
    this.width = () => {
      return Math.random() * (2 - 1) + 1;
    };

    // Generate a random target height
    this.height = Math.random() * (25 - 55) + 25;

    // Start X & Y
    this.start_x = Math.random() * (this.range_x[0] - this.range_x[1]) + this.range_x[1];
    this.start_y = Math.random() * (canvas.height / 2 - 5) - canvas.height / 2 + canvas.height / 2;

    // Growth & Speed
    this.growth = Math.random() * (1 - 3) + 1;
    this.speed = Math.random() * (1 - 2) + 2;

    // Opacity
    this.opacity = 1;

    // Current settings
    this.current_x = this.start_x;
    this.current_y = this.start_y;
    this.current_h = Math.random() * 50;
    this.current_o = this.opacity;
  }

  /*
  ------------------------------------------
  | update:void (-)
  |
  | Update.
  ------------------------------------------ */
  update() {

    this.current_h > this.height ? this.current_h = this.height : this.current_h += this.growth;
    this.current_y -= this.speed;

  }

  /*
  ------------------------------------------
  | draw:void (-)
  |
  | Draw.
  ------------------------------------------ */
  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = this.width();
    ctx.moveTo(this.current_x, this.current_y);
    ctx.lineTo(this.current_x, this.current_y + this.current_h);
    ctx.strokeStyle = this.color;

    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }}


// Sphere
class Sphere {

  /*
  ------------------------------------------
  | constructor:void (-)
  |
  | Construct.
  ------------------------------------------ */
  constructor(init_obj) {

    this.colors = init_obj.colors;
    this.radius = init_obj.radius;
    this.position = {
      x: init_obj.x,
      y: init_obj.y };


  }

  /*
  ------------------------------------------
  | update:void (-)
  |
  | Update.
  ------------------------------------------ */
  update() {

  }

  /*
  ------------------------------------------
  | draw:void (-)
  |
  | Draw.
  ------------------------------------------ */
  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);

    let grd = ctx.createRadialGradient(
    this.position.x,
    this.position.y - (this.radius + this.radius * 2),
    2,
    this.position.x,
    this.position.y - (this.radius + this.radius / 2),
    this.radius * 2);


    grd.addColorStop(0, this.colors[1]);
    grd.addColorStop(1, this.colors[0]);

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.restore();
  }}


// Background
class Background {

  /*
  ------------------------------------------
  | constructor:void (-)
  |
  | Construct.
  ------------------------------------------ */
  constructor() {

    // Colors
    this.colors = {
      start: '#ffaa8a',
      stop: '#864a51' };


  }

  /*
  ------------------------------------------
  | draw:void (-)
  |
  | Draw.
  ------------------------------------------ */
  draw() {
    let grd = ctx.createRadialGradient(
    canvas.width / 2,
    300,
    0,
    canvas.width / 2,
    -400,
    canvas.width * 2);

    grd.addColorStop(0, this.colors.start);
    grd.addColorStop(1, this.colors.stop);

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }}


// Scene
class Scene {

  /*
  ------------------------------------------
  | constructor:void (-)
  |
  | Construct.
  ------------------------------------------ */
  constructor() {

    // Background
    this.bg = new Background();

    // Sphere
    this.sphere = new Sphere({
      colors: ['#3c3949', '#b4645d'],
      radius: 88,
      x: canvas.width / 2,
      y: canvas.height / 2 + 60 });


    // Small Sphere
    this.small_sphere = new Sphere({
      colors: ['#3c3949', '#b4645d'],
      radius: 10,
      x: canvas.width / 2 + 110,
      y: canvas.height / 2 - 40 });


    // Beams - put in a delay so randomness happens
    let beam_maker = setInterval(() => {
      if (beams.length < 25) {
        beams.push(new Beam());
        beams_count++;
      } else {
        clearInterval(beam_maker);
      }
    }, 250);

    // Platform
    this.g_platform = new Platform();

    // kick things off
    this.init();
  }

  /*
  ------------------------------------------
  | init:void (-)
  |
  | Init.
  ------------------------------------------ */
  init() {
    this.update();
  }

  /*
  ------------------------------------------
  | update:void (-)
  |
  | If we need to update anything...
  |
  | Update.
  ------------------------------------------ */
  update() {

    // Update Spheres
    this.sphere.update();
    this.small_sphere.update();

    // Create new beams
    for (let i = beams.length; i < 200; i++) {
      beams.push(new Beam());
    }

    // Update Beams
    for (let i = 0; i < beams.length; i++) {
      if (beams[i].current_y < beams[i].range_y[1]) {
        beams.splice(i, 1);
      } else {
        beams[i].update();
      }
    }

    // Update Platform
    this.g_platform.update();

    // Draw
    this.draw();
  }

  /*
  ------------------------------------------
  | draw:void (-)
  |
  | Draw.
  ------------------------------------------ */
  draw() {
    // Clear the stage
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the bg
    this.bg.draw();

    // Spheres
    this.sphere.draw();
    this.small_sphere.draw();

    // Platform
    this.g_platform.draw();

    // Beams
    for (let i = 0; i < beams.length; i++) {
      beams[i].draw();
    }

    // Animate!
    requestAnimationFrame(() => this.update());
  }}


// Setup
new Scene();