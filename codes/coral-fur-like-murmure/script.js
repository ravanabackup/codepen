//////////////////////////////////////////////////////////////////////////
//                       //                                             //
//   -~=Manoylov AC=~-   //          Coral Fur (like Murmure)           //
//                       //                                             //
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// Contacts:                                                            //
//    http://manoylov.tumblr.com/                                       //
//    https://codepen.io/Manoylov/                                      //
//    https://www.openprocessing.org/user/23616/                        //
//    https://twitter.com/ManoylovAC                                    //
//    https://www.facebook.com/epistolariy                              //
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// inspired by https://murmure.me/en/  and other similar works          //
//////////////////////////////////////////////////////////////////////////

'use strict';
(function() {
  let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    mouseX = 0,  mouseY = 0,
    width = 600, height = 600,
    isMouseMove = false, isMousePressed = false;

  var imagesPathsArr =
    [ 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QN6aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MiA3OS4xNjA5MjQsIDIwMTcvMDcvMTMtMDE6MDY6MzkgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZTlkMzIzOWItZjkwNi0zODRkLTliMDktMDA3NzBkN2UzYjY0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZDQUUzMjMxRTA0QzExRTg4RUU3RDg1REE1OEFDQjFEIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZDQUUzMjMwRTA0QzExRTg4RUU3RDg1REE1OEFDQjFEIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDplOWQzMjM5Yi1mOTA2LTM4NGQtOWIwOS0wMDc3MGQ3ZTNiNjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZTlkMzIzOWItZjkwNi0zODRkLTliMDktMDA3NzBkN2UzYjY0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3Jk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'
    ];
  var img;
  let TAU = 2 * Math.PI;
  let furCloud;
  let isNervousMode = false;
  let isPaintingMode = false;

  function start() {
    preloadImages(imagesPathsArr).done(function(images){
      img = images[0];
      setup();
    });
  }

  function setup() {
    canvas.width  = width;
    canvas.height = height;
    img.resize(width);
    furCloud = new FurSystem(ctx);
    background('#121212');
    setEventListeners();
    draw();
  }

  function draw() {
    if (!isPaintingMode) {
      background('#121212');
    }
    furCloud.update(isNervousMode, isMouseMove);
    isMouseMove = false;
    window.requestAnimationFrame(draw);
  }

  function setEventListeners() {
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('touchstart', mouseDown);
    canvas.addEventListener('mouseup', mouseUp);
    canvas.addEventListener('touchend', mouseUp);
    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('touchmove', mouseMove);
    document.addEventListener('mouseout',  mouseOut );

    function mouseDown() {
      isMousePressed = true;
    }
    function mouseUp() {
      isMousePressed = false;
    }
    function mouseMove(evt) {
      var mousePos = getMousePos(canvas, evt);
      mouseX = mousePos.x;
      mouseY = mousePos.y;
      isMouseMove = true;
    }
    function mouseOut () {
      isMouseMove = false;
    }

    let nerv_switcer = document.getElementById('nervous-switch');
    if (nerv_switcer) {
      nerv_switcer.addEventListener('click', function () {
        isNervousMode = nerv_switcer.checked;
      });
    }

    let painting_switcher = document.getElementById('painting-switch');
    if (painting_switcher) {
      painting_switcher.addEventListener('click', function () {
        isPaintingMode = painting_switcher.checked;
      });
    }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Classes ////////////////////////////////////////////////////////////////////////////////////////////////

  function FurSystem(ctx) {
    this.ctx = ctx;
    this.radius = 220;
    this.countOfparticles = 3000;
    this.particles = [];
    this.createParticles();
  }
  FurSystem.prototype.update = function (isNervousMode, isMouseMove) {
    for (let i = 0; i < this.particles.length; ++i) {
      this.particles[i].calcForces(mouseX, mouseY, isMouseMove);
      this.particles[i].update(isNervousMode);
      this.particles[i].draw();
    }
  };
  FurSystem.prototype.createParticles = function () {
    for (let i = 0; i < this.countOfparticles; i++) {
      let radius = Math.sqrt(random(this.radius * this.radius));
      let angle = random(TAU);
      let x = width  / 2 + radius * Math.sin(angle);
      let y = height / 2 + radius * Math.cos(angle);
      let clr = img.getColor(x, y);
      this.particles.push(new Wool(this.ctx, x, y, clr));
    }
  };


  // one particle
  function Wool (ctx, x, y, clr) {
    this.ctx = ctx;
    this.currPos = SVector.createPoint(x, y);
    this.origPos = SVector.createPoint(x, y);
    this.shifted = SVector.createPoint(x + random(-2, 2), y + random(-2, 2));
    this.vel = SVector.createPoint(random(-1, 1), random(-1, 1));
    this.acc = SVector.createPoint(0, 0);
    this.maxSpeed = 8;
    this.maxForce = .04;
    this.affectRds = 50;
    this.clr = clr;
    this.endSize = .5;
    this.isNervous = false;
    this.isMouseMove = false;
  }
  Wool.prototype.calcForces = function (x, y, isMouseMove) {
    this.isMouseMove = isMouseMove;

    let fleeForce = this.flee(x, y);
    let arriveForce = this.arrive();
    this.applyForce(fleeForce);
    this.applyForce(arriveForce);
  };
  Wool.prototype.applyForce = function (force) {
    this.acc = SVector.add(this.acc, force);
  };
  Wool.prototype.flee = function (x,y) {
    let mousePos = SVector.createPoint(x, y);
    var distVector = SVector.subtract(mousePos, this.currPos);

    if (SVector.len(distVector) < this.affectRds && (this.isMouseMove || isMousePressed)) {
      let magnitude = SVector.calcMag(distVector, this.maxSpeed);
      let scaleVec = SVector.scale(magnitude, -1);

      let fleeforce = SVector.subtract(scaleVec, this.vel);
      fleeforce = SVector.limit(fleeforce, this.maxForce);
      return fleeforce;
    }

    return SVector.createPoint(0, 0);
  };
  Wool.prototype.arrive = function () {
    let distVector = SVector.subtract(this.origPos, this.currPos);
    let distance = SVector.len(distVector);
    let speedRatio = 10;

    if (distance < this.affectRds + 10) {
      speedRatio = this.maxSpeed * distance / (this.affectRds + 10);
    }

    if (!this.isNervous) {
      distVector = SVector.calcMag(distVector, speedRatio);
    }

    let force = SVector.subtract(distVector, this.vel);
    force = SVector.limit(force, this.maxForce);
    return force;
  };
  Wool.prototype.update = function (isNervousMode) {
    this.isNervous = isNervousMode || false;
    this.maxSpeed = isNervousMode ? 4 : 8;
    this.currPos = SVector.add(this.currPos, this.vel);
    this.vel = SVector.add(this.vel, this.acc);
    this.acc = SVector.scale(this.acc, 0);
  };
  Wool.prototype.draw = function () {
    let dist = SVector.len(SVector.subtract(this.origPos, this.currPos));
    this.endSize = map(dist, 0, this.affectRds, 2, 5);

    this.ctx.beginPath();
    this.ctx.fillStyle = this.clr;
    this.ctx.strokeStyle = this.clr;
    this.ctx.moveTo(this.currPos.x, this.currPos.y);
    this.ctx.lineTo(this.shifted.x, this.shifted.y);
    this.ctx.fillRect(this.currPos.x - this.endSize/2, this.currPos.y - this.endSize/2, this.endSize, this.endSize);
    this.ctx.stroke();
    this.ctx.closePath();
  };


  // Vector functions
  function SVector() { }
  SVector.add = function (a, b) {
    return {x: a.x + b.x, y: a.y + b.y};
  };
  SVector.subtract = function (a, b) {
    return {x: a.x - b.x, y: a.y - b.y};
  };
  SVector.scale = function (a, b) {
    return {x: a.x * b, y: a.y * b};
  };
  SVector.len = function (a) {
    return Math.sqrt(a.x * a.x + a.y * a.y);
  };
  SVector.createPoint = function (x, y) {
    return {x: x, y: y};
  };
  SVector.calcMag = function(vv, rt) {
    var r = vv.x * vv.x + vv.y * vv.y;

    if (r > 0) {
      r = 1 / Math.sqrt(r);
      return {x: vv.x * r * rt, y: vv.y * r * rt};
    }

    return  vv;
  };
  SVector.limit = function(vv, rt) {
    var r = vv.x * vv.x + vv.y * vv.y;

    if (r > rt * rt) {
      return {x: vv.x * rt, y: vv.y * rt};
    }
    return vv;
  };

  // RImage Class
  function RImage (img) {
    this.img = img;
    this.width = img.width;
    this.height = img.height;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.drawingContext = this.canvas.getContext('2d');
    this.drawingContext.drawImage(this.img, 0, 0);

    this.pixels = this.drawingContext.getImageData(0, 0, this.width, this.height);
  }
  RImage.prototype.getColor = function(x, y, alpha) {
    x = Math.floor(x || 0);
    y = Math.floor(y || 0);

    if(x < 0 || y < 0 || x > this.width || y > this.height){
      return [0, 0, 0, 255];
    }

    var targetIdx = (y * this.width * 4 + x * 4);

    function rgba2str (rgba) {
      return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
    }

    return rgba2str({
      r: this.pixels.data[targetIdx],
      g: this.pixels.data[targetIdx + 1],
      b: this.pixels.data[targetIdx + 2],
      a: alpha || this.pixels.data[targetIdx + 3]
    });
  };
  RImage.prototype.resize = function(w, h) {
    if (!h) {
      h = this.height / (this.width / w);
    }

    this.canvas.width = this.width = w;
    this.canvas.height = this.height = h;
    this.drawingContext.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.canvas.width, this.canvas.height);
    this.pixels = this.drawingContext.getImageData(0, 0, this.width, this.height);

    return this;
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Helper Functions //////////////////////////////////////////////////////////////////////////////////////////

  function getMousePos(block, evt) {
    let rect = block.getBoundingClientRect();
    return {
      x: evt.touches ? evt.touches[0].clientX - rect.left: evt.clientX - rect.left,
      y: evt.touches ? evt.touches[0].clientY - rect.top:  evt.clientY - rect.top
    };
  }

  function random (min, max){
    if (!min && min !== 0) {
      return Math.random();
    } else if (!max) {
      return Math.random() * min;
    }

    return Math.random() * (max - min) + min;
  }

  function map (target, start1, stop1, start2, stop2) {
    return ((target - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  }

  function background(clr, alpha) {
    ctx.save();
    if (alpha) {
      ctx.globalAlpha = alpha;
    }
    ctx.fillStyle = clr || "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  function loadImage (path, successCallback, failureCallback) {
    var img = new Image();

    if(path.indexOf('data:image/') !== 0) {
      img.crossOrigin = 'Anonymous';
    }

    img.onload = function() {
      var rImg = new RImage(img);
      if (typeof successCallback === 'function') {
        successCallback(rImg);
      }
    };

    img.onerror = function(e) {
      console.log('img load error');
      if (typeof failureCallback === 'function') {
        failureCallback(e);
      }
    };

    img.src = path;
  }
  function preloadImages(pathArr){
    var newimages = [], loadedimages = 0;
    var postaction = function() {};
    var arr = (typeof pathArr != "object") ? [pathArr] : pathArr;

    function imageloadpost(loadedImg){
      ++loadedimages;
      newimages.push(loadedImg);

      if (loadedimages == arr.length){
        postaction(newimages); //call postaction and pass in newimages array as parameter
      }
    }
    for (var i = 0; i < arr.length; i++){
      loadImage(arr[i], function (loadedImg) {
        imageloadpost(loadedImg);
      });
    }
    return { 
      done: function(f){
        postaction = f || postaction; 
      }
    }
  }

  start();
})();