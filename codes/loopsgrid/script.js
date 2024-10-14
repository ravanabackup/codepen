//////////////////////////////////
  //       CONFIG
  //////////////////////////////////
  var config = {
    num_rows: 10,
    num_cols: 10,
  }
  //////////////////////////////////
  //       UTILITY FUNCTIONS
  //////////////////////////////////
  var util = {
    // fill entire canvas with a preset color
    fill: function(rgb, amt) {
      ctx.beginPath(); // start path
      ctx.rect(- canvas.width / 2, - canvas.height / 2, canvas.width, canvas.height) // set rectangle to be the same size as the window
      ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${amt})` // use the rgb array/color for fill, and amt for opacity
      ctx.fill() // do the drawing
    },
    // draw a circle
    drawCircle: function(x, y, r, color) {
      ctx.beginPath()
      ctx.arc(x, y, r, 0, 2 * Math.PI)
      ctx.fillStyle = color || 'white'
      ctx.fill()
      ctx.closePath()
    },
    /**
    * @param {Array} points x and y coordinates [[x, y], [x, y], etc...]
    * @param {Boolean} close close the path, or leave open?
    */
    path: function (points, close) {
      // move to 1st point
      ctx.moveTo(...points[0])
      for (let i = 1; i < points.length; i++) {
        // draw line to every point
        ctx.lineTo(...points[i]);
      }

      if (close === true) {
        // and then close the path
        ctx.lineTo(...points[0]);
      }
    },
    /**
    * @param {Number} x x coordinate
    * @param {Number} y y coordinate
    * @param {Number} w width
    * @param {Number} h height
    */
    rect: function (x, y, w, h) {
      // move to 1st point
      ctx.moveTo(x, y)
      ctx.lineTo(x + w, y);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x, y + h);
      ctx.lineTo(x, y);
    },
    /**
     * @param {Number} h hue [0..360]
     * @param {Number} s saturation [1..0]
     * @param {Number} l lightness [0..1]
     * @param {Number} a alpha [0..1]
     */
    hsla(h, s, l, a) {
      return 'hsla(' + h + ',' + s * 100 + '%,' + l * 100 + '%,' + a +')';
    },
    rgba(r, g, b, a) {
      return 'rgba('+r+','+g+','+b+','+a+')';
    }
  };
  
  //////////////////////////////////
  //       INITIALIZE
  //////////////////////////////////

  // create a canvas element
  var canvas = document.createElement("canvas")

  // get the canvas context (this is the part we draw to)
  var ctx = canvas.getContext("2d")

  // attach element to DOM, this way I don't need to rely on the canvas already being there
  document.getElementsByTagName("body")[0].appendChild(canvas)

  // background color [r, g, b] 
  // I define color this way because it's easy to convert to a rgba color using the array spread operator
  var bg = [20, 0, 30]

  // setup a default size using height, this will be updated soon.
  // wh is used to store the width or the height, whichever is smaller
  // this way the content can shrink to fit
  var wh = window.innerHeight;
  var l1 = {
    max: 360,
    counter: 0,
    value: 0,
    sin: 0,
    sinNorm: 0,
    update: function(){
      this.counter = (this.counter + 1) % this.max;
      this.value = this.counter / this.max;
      this.sin = Math.sin(this.value * Math.PI * 2) // get sine value [0, 2PI]
      this.sinNorm = (this.sin + 1) / 2 // normalize sine to [0,1]
    }
  }

  // define setup function
  // this function runs initially, and every time the window resizes
  function setup() {
    // update the canvas size to match the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // update size to get minimum of windo width or height
    wh = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
    wh -= 40; // add some padding

    // set the 0,0 point to the middle of the canvas, this is not necessary but it can be handy
    ctx.translate(canvas.width / 2, canvas.height / 2);

    util.fill(bg, 1);
  }

  // run initial setup
  setup();

  // re-setup canvas when the size of the window changes 
  window.addEventListener("resize", setup)

  // initialize a set of rows
  var elements = [];
  for (var i = 0; i < config.num_rows; i++) {
    elements.push(new Row(i))
  }

  function draw() {
    // update looper
    l1.update();

    // fill context with background color 
    util.fill(bg, 1)

    // update all the elements
    for (var i = 0; i < elements.length; i++) {
      elements[i].draw() // do it once per element
    }
    // this is a draw loop, this will execute regularily and is comparable to EnterFrame on other platform
    window.requestAnimationFrame(function () { draw() })

  }

  // start enterFrame loop
  window.requestAnimationFrame(draw);

  //////////////////////////////////
  //           ELEMENTS
  //////////////////////////////////
  function Row(row_num) {
    this.row_num = row_num;
    this.row_norm = row_num / config.num_rows; // normalized to [0..1]
    this.row_norm2 = (row_num + 1) / config.num_rows; // upper gate normalized to [0..1]
    this.x = 0;
    this.y = 0;
    this.h = 0;
    this.m = 12;
    this.f = 6;
    this.f2 = 12;
    this.offset = Math.random();
    this.amt = 0.07;
    this.draw = function () {
      var amt = wh * this.amt;
      var _n1 = (Math.sin(this.row_norm  * Math.PI * this.f + l1.sin) + 1)/2
      var _n2 = (Math.sin(this.row_norm2 * Math.PI * this.f + l1.sin) + 1)/2

      this.y  = this.row_num === 0 ? - wh / 2                 : this.row_norm  * wh + _n1 * amt - wh/2;
      this.y2 = this.row_num === config.num_rows - 1 ? wh / 2 : this.row_norm2 * wh + _n2 * amt - wh/2;
      this.h = this.y2 - this.y;

      // cols
      var c_norm1 = 0;
      var c_norm2 = 0;
      var x1;
      var x2;
      var w;
      var _nc1;
      var _nc2;
      var c;
      for (c = 0; c < config.num_cols; c++) {
        c_norm1 = c / config.num_cols;
        c_norm2 = (c + 1) / config.num_cols;
        _nc1 = (Math.cos((c_norm1) * Math.PI * this.f2 + this.offset * l1.sin * 9) + 1) / 2;
        _nc2 = (Math.cos((c_norm2) * Math.PI * this.f2 + this.offset * l1.sin * 9) + 1) / 2;
        x1 = c === 0 ? 0                    : c_norm1 * wh + _nc1 * amt;
        x2 = c === config.num_cols - 1 ? wh : c_norm2 * wh + _nc2 * amt;
        w = x2 - x1;
        
        
        ctx.beginPath();
        // ctx.strokeStyle = util.rgba(220, 80 + 180 * this.row_norm, 100 * (c_norm2 - c_norm1), 1);
        ctx.strokeStyle = util.hsla(0, 0, 1, 1);
        ctx.fillStyle = util.hsla(0, 0, 1, 1);
        ctx.lineCap = 'round';
        ctx.lineWidth = 2;
        util.rect(
          x1 - wh / 2,
          this.y,
          w - this.m,
          this.h - this.m
        );
        // util.rect(x1 - this.m / 2, this.y - this.m / 2, w - this.m, this.h - this.m);
        ctx.stroke();
        if ((c + this.row_num) % 2 === 1) {
        } else {
          ctx.fill();
        }
        ctx.closePath();
      }
    }
  }