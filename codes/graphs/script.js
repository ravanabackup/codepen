// Base element used mostly to dry things up
class Base {
  constructor(options) {
    this._canvas = options.canvas;
    this._ctx = options.ctx;
  }}


// Board
class Board extends Base {
  constructor(options) {
    super(options);
    let _base = 500;

    // Base props
    this._props = {
      x: this._canvas.width / 2 - _base / 2,
      y: this._canvas.height / 2 - _base / 2,
      height: _base,
      width: _base,
      thickness: 2,
      offset: 60,
      grid: 20 };


    // Balls
    this._x_ball = {
      max_x: this._props.x + this._props.width - this._props.offset * 3,
      min_x: this._props.x + this._props.offset * 3,
      x: this._props.x + this._props.offset * 3,
      y: this._canvas.height / 2,
      radius: 10,
      speed: 2,
      counter: 0 };

    this._y_ball = {
      max_y: this._props.y + this._props.height - this._props.offset * 3,
      min_y: this._props.y + this._props.offset * 3,
      x: this._canvas.width / 2,
      y: this._props.y + this._props.height - this._props.offset * 3,
      radius: 10,
      speed: 2,
      counter: 0 };


  }

  // Update
  update() {
    let _i = Math.PI * 2 / 100;
    let _x = Math.sin(this._x_ball.counter) / 3 + this._x_ball.speed;
    let _y = Math.cos(this._y_ball.counter) / 3 + this._y_ball.speed;

    this._x_ball.x = _x * this._x_ball.min_x - this._x_ball.min_x + this._props.offset;
    this._x_ball.counter += _i;

    this._y_ball.y = _y * this._y_ball.min_y - this._y_ball.min_y + this._props.offset;
    this._y_ball.counter += _i;
  }

  // Render
  render() {
    let _g;

    // Create the Glow
    this._ctx.shadowBlur = 10;
    this._ctx.shadowColor = "white";

    //////////////////////////////////////////////////
    //
    //  Grid Lines
    //
    //////////////////////////////////////////////////
    let _spacer = (this._props.height - this._props.offset * 2) / this._props.grid;

    this._ctx.save();

    // Horizontal Lines
    for (let i = 0; i < this._props.grid; i++) {
      this._ctx.beginPath();

      this._ctx.moveTo(
      this._props.x + this._props.offset,
      this._props.y + this._props.offset + _spacer * i);

      this._ctx.lineTo(
      this._props.x + this._props.width - this._props.offset,
      this._props.y + this._props.offset + _spacer * i);


      this._ctx.strokeStyle = "rgba(255,255,255,.2)";
      this._ctx.stroke();
    }

    // Vertical Lines
    for (let i = 0; i < this._props.grid; i++) {
      this._ctx.beginPath();

      this._ctx.moveTo(
      this._props.x + this._props.offset + _spacer * i,
      this._props.y + this._props.offset);

      this._ctx.lineTo(
      this._props.x + this._props.offset + _spacer * i,
      this._props.y + this._props.height - this._props.offset);


      this._ctx.strokeStyle = "rgba(255,255,255,.2)";
      this._ctx.stroke();
    }
    this._ctx.restore();

    // Dots
    for (let i = 1; i < this._props.grid; i++) {
      for (let r = 1; r < this._props.grid; r++) {
        let _x = this._props.x + this._props.offset + _spacer * i,
        _y = this._props.y + this._props.offset + _spacer * r;

        this._ctx.save();
        this._ctx.beginPath();
        this._ctx.arc(_x, _y, 1, Math.PI * 2, false);
        this._ctx.fillStyle = "rgba(255,255,255,1)";
        this._ctx.fill();
        this._ctx.restore();
      }
    }

    //////////////////////////////////////////////////
    //
    //  Left & Right Walls
    //
    //////////////////////////////////////////////////
    // Wall left
    this._ctx.save();
    this._ctx.beginPath();
    _g = this._ctx.createLinearGradient(
    0,
    0,
    0,
    this._canvas.height);


    _g.addColorStop(.1, "rgba(255,255,255,0)");
    _g.addColorStop(.2, "rgba(255,255,255,1)");
    _g.addColorStop(.8, "rgba(255,255,255,1)");
    _g.addColorStop(.9, "rgba(255,255,255,0)");
    this._ctx.fillStyle = _g;

    this._ctx.rect(
    this._props.x + this._props.offset,
    this._props.y,
    this._props.thickness,
    this._props.height);


    // Wall right
    this._ctx.rect(
    this._props.x + this._props.width - this._props.offset,
    this._props.y,
    this._props.thickness,
    this._props.height);


    // Wall Center
    this._ctx.rect(
    this._canvas.width / 2 - this._props.thickness,
    this._props.y,
    this._props.thickness * 2,
    this._props.height);


    this._ctx.fill();
    this._ctx.restore();

    //////////////////////////////////////////////////
    //
    //  Top & Bottom walls
    //
    //////////////////////////////////////////////////
    // Wall Top
    this._ctx.save();
    this._ctx.beginPath();
    _g = this._ctx.createLinearGradient(
    0,
    0,
    this._canvas.width,
    0);


    _g.addColorStop(.1, "rgba(255,255,255,0)");
    _g.addColorStop(.2, "rgba(255,255,255,1)");
    _g.addColorStop(.8, "rgba(255,255,255,1)");
    _g.addColorStop(.9, "rgba(255,255,255,0)");
    this._ctx.fillStyle = _g;

    this._ctx.rect(
    this._props.x,
    this._props.y + this._props.offset,
    this._props.width,
    this._props.thickness);


    // Wall bottom
    this._ctx.rect(
    this._props.x,
    this._props.y + this._props.height - this._props.offset,
    this._props.width,
    this._props.thickness);


    // Wall Mid
    this._ctx.rect(
    this._props.x,
    this._canvas.height / 2 - this._props.thickness,
    this._props.width,
    this._props.thickness * 2);


    this._ctx.fill();
    this._ctx.restore();

    //////////////////////////////////////////////////
    //
    //  Balls
    //
    //////////////////////////////////////////////////
    this._ctx.fillStyle = "#222222";
    this._ctx.strokeStyle = "white";

    this._ctx.beginPath();
    this._ctx.arc(this._x_ball.x, this._x_ball.y, this._x_ball.radius, Math.PI * 2, false);
    this._ctx.fill();
    this._ctx.stroke();

    this._ctx.beginPath();
    this._ctx.arc(this._y_ball.x, this._y_ball.y, this._y_ball.radius, Math.PI * 2, false);
    this._ctx.fill();
    this._ctx.stroke();
  }}


// Background
class Background extends Base {
  constructor(options) {
    super(options);
    this._props = {
      gradient_start: "#cfcf9c",
      gradient_mid: "#acd3bd",
      gradient_end: "#327a8c" };

    this._gradient = this._ctx.createLinearGradient(-100, -550, this._canvas.width, this._canvas.height);
    this._gradient.addColorStop(0, this._props.gradient_start);
    this._gradient.addColorStop(.6, this._props.gradient_mid);
    this._gradient.addColorStop(1, this._props.gradient_end);
  }

  render() {
    this._ctx.beginPath();
    this._ctx.rect(0, 0, this._canvas.width, this._canvas.height);
    this._ctx.fillStyle = this._gradient;
    this._ctx.fill();
  }}


// Fuzz Texture
class Fuzz extends Base {
  constructor(options) {
    super(options);

    this._src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/40429/noise.jpg";
    this._img = null;
    this._alpha = .09;

  }

  preload(callback) {
    let _img = new Image();
    _img.onload = () => {
      this._img = _img;
      callback();
    };
    _img.src = this._src;
  }

  render() {
    this._ctx.save();
    this._ctx.globalAlpha = this._alpha;
    this._ctx.drawImage(this._img, 0, 0, this._canvas.width, this._canvas.height);
    this._ctx.restore();
  }}


// Core Scene
class Scene {
  constructor() {

    // Create Canvas & CTX
    this._canvas = document.createElement('canvas');
    this._ctx = this._canvas.getContext('2d');

    // A buffer canvas for drawing in memory
    this._buffer_canvas = document.createElement('canvas');
    this._buffer_ctx = this._buffer_canvas.getContext('2d');

    // Sizing
    this._canvas.height = 600;
    this._canvas.width = 600;
    this._buffer_canvas.height = 600;
    this._buffer_canvas.width = 600;

    // Background
    this._background = new Background({
      canvas: this._buffer_canvas,
      ctx: this._buffer_ctx });


    // Background
    this._fuzz = new Fuzz({
      canvas: this._buffer_canvas,
      ctx: this._buffer_ctx });


    // Board
    this._board = new Board({
      canvas: this._buffer_canvas,
      ctx: this._buffer_ctx });


    // Quick load the fuzz and start
    this._fuzz.preload(() => {
      this.build();
    });

  }

  // Build
  build() {

    // Append the canvas to the body
    document.body.appendChild(this._canvas);

    // Kick off the render
    this.render();
  }

  // Update
  update() {

    // Update the board
    this._board.update();
    this.render();

  }

  // Draw all of the things
  render() {

    // Clear the canvas
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    // Background
    this._background.render();

    // Board
    this._board.render();

    // Fuzz
    this._fuzz.render();

    // Draw the current state of the buffer canvas to our main canvas
    this._ctx.drawImage(this._buffer_canvas, 0, 0, this._canvas.width, this._canvas.height);

    // Animate
    requestAnimationFrame(() => this.update());
  }}


new Scene();