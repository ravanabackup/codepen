/*
------------------------------------------

Inspired by: https://www.youtube.com/watch?v=AkoML0_FiV4

"Sonder. You are the main character—the protagonist—the star at the center of your own unfolding story. You're surrounded by your supporting cast: friends and family hanging in your immediate orbit. 

Scattered a little further out, a network of acquaintances who drift in and out of contact over the years. 

But there in the background, faint and out of focus, are the extras. The random passersby. Each living a life as vivid and complex as your own. 

They carry on invisibly around you, bearing the accumulated weight of their own ambitions, friends, routines, mistakes, worries, triumphs and inherited craziness. 

When your life moves on to the next scene, theirs flickers in place, wrapped in a cloud of backstory and inside jokes and characters strung together with countless other stories you'll never be able to see. That you'll never know exists. 

In which you might appear only once. As an extra sipping coffee in the background. As a blur of traffic passing on the highway. As a lighted window at dusk."

------------------------------------------ */

// People
class Human {
  constructor(canvas, ctx) {
    this._canvas = canvas;
    this._ctx = ctx;

    this._props = {
      x: 0,
      y: 0,
      opacity: 0,
      size: 0,
      color: [255, 255, 255],
      speed: Math.random() * 1 + .3,
      rotate: Math.random() * 360 };


  }

  draw() {
    this._ctx.beginPath();

    // Dirty hack for breaking things
    if (this._props.size < 0) {
      this._props.size = 0;
    };
    if (this._props.opacity < 0) {
      this._props.opacity = 0;
    };

    this._ctx.fillStyle = "rgba(" + this._props.color[0] + "," + this._props.color[1] + "," + this._props.color[2] + "," + this._props.opacity + ")";

    if (this._props.orbit) {
      this.orbit();
    } else {

      this._ctx.arc(
      this._props.x,
      this._props.y,
      this._props.size,
      Math.PI * 2,
      false);


      this._ctx.fill();
    }

  }

  orbit() {

    this._ctx.save();
    this._ctx.translate(this._props.friend._props.x, this._props.friend._props.y);
    this._ctx.rotate(this._props.rotate * Math.PI / 180);

    this._ctx.arc(
    this._props.friend._props.x - this._props.x,
    this._props.friend._props.y - this._props.y,
    this._props.size,
    Math.PI * 2,
    false);

    this._ctx.fill();

    this._ctx.translate(0, 0);
    this._ctx.restore();

    if (this._props.ring) {
      let o = this._props.opacity / 12;

      this._ctx.beginPath();
      this._ctx.strokeStyle = "rgba(255,255,255, " + o + ")";
      this._ctx.lineWidth = .3;
      this._ctx.arc(
      this._props.friend._props.x,
      this._props.friend._props.y,
      this._props.distance,
      Math.PI * 2,
      false);

      this._ctx.stroke();
    }

    this._props.rotate += this._props.speed;

  }}


// You
class You extends Human {
  constructor(canvas, ctx) {
    super(canvas, ctx);

    this._props = {
      x: this._canvas.width / 2,
      y: this._canvas.height / 2,
      opacity: 0,
      color: [255, 255, 255],
      size: 0 };

  }

  draw() {
    super.draw();
  }}


// Reality
class Reality {
  constructor() {

    // Globals
    this._animation = null;
    this._state = "";
    this._$play = $("#play");
    this._$intro = $("#intro-wrapper");
    this._$life = $("#life");

    // Elements
    this._canvas = document.createElement('canvas');
    this._ctx = this._canvas.getContext('2d');

    // Set the size
    this.size();

    // Start
    this._$life.append(this._canvas);

    // What makes things
    this._extras = [];
    this._outsideExtras = [];
    this._friends = [];
    this._family = [];
    this._passers = [];
    this._you = new You(this._canvas, this._ctx);

    // Time goes, that's it.
    this._timecodes = [{
      time: 9,
      state: 'intro' },
    {
      time: 16,
      state: 'start' },
    {
      time: 18,
      state: 'star' },
    {
      time: 29,
      state: 'family' },
    {
      time: 33,
      state: 'friends' },
    {
      time: 36,
      state: 'aquentencies' },
    {
      time: 49,
      state: 'extras' },
    {
      time: 84,
      state: 'scene2' },
    {
      time: 105,
      state: 'fade' },
    {
      time: 120,
      state: 'dusk' },
    {
      time: 128,
      state: 'resolve' },
    {
      time: 131,
      state: 'end' },
    {
      time: 135,
      state: 'intro' }];


    // That voice in yer head
    this._VO = new VO(() => {}, this._timecodes);

    // Start things - used mostly for Mobile
    this._$play.on('click', () => {
      this._$intro.removeClass('ready');
      this._$play.hide();
      this._VO._player.play();
    });

    this.createLife();

    // Hold state before start
    this._VO._state = "extras";
    this.update();

    this.observe();
  }

  createLife() {

    // family
    for (let i = this._family.length; i < 6; i++) {
      let center_x = this._canvas.width / 2,
      center_y = this._canvas.height / 2,
      angle = Math.random() * 360,
      distance = 45 + 10 * this._family.length;

      let x = center_x + distance * Math.cos(-angle * Math.PI / 180);
      let y = center_y + distance * Math.sin(-angle * Math.PI / 180);

      let f = new Human(this._canvas, this._ctx);
      f._props.x = x;
      f._props.y = y;
      f._props.opacity = 0;
      f._props.size = 0;
      f._props.distance = distance;
      f._props.angle = angle;
      f._props.friend = this._you;
      f._props.orbit = true;
      f._props.ring = true;
      f._props.base_speed = f._props.speed;

      this._family.push(f);
    }

    // Friends
    for (let i = this._friends.length; i < 8; i++) {
      let center_x = this._canvas.width / 2,
      center_y = this._canvas.height / 2,
      angle = Math.random() * 360,
      distance = 135 + 15 * this._friends.length;

      let x = center_x + distance * Math.cos(-angle * Math.PI / 180);
      let y = center_y + distance * Math.sin(-angle * Math.PI / 180);

      let f = new Human(this._canvas, this._ctx);
      f._props.x = x;
      f._props.y = y;
      f._props.opacity = 0;
      f._props.size = 0;
      f._props.distance = distance;
      f._props.angle = angle;
      f._props.friend = this._you;
      f._props.orbit = true;
      f._props.speed = Math.random() * 2;
      f._props.base_speed = f._props.speed;
      f._props.ring = true;

      this._friends.push(f);
    }

    // aquentencies
    for (let i = this._extras.length; i < 25; i++) {
      let center_x = this._canvas.width / 2,
      center_y = this._canvas.height / 2,
      angle = Math.random() * 360,
      distance = 270 + 15 * this._extras.length;

      let x = center_x + distance * Math.cos(-angle * Math.PI / 180);
      let y = center_y + distance * Math.sin(-angle * Math.PI / 180);

      let f = new Human(this._canvas, this._ctx);
      f._props.x = x;
      f._props.y = y;
      f._props.opacity = 0;
      f._props.size = 0;
      f._props.distance = distance;
      f._props.angle = angle;
      f._props.friend = this._you;
      f._props.orbit = true;
      f._props.speed = Math.random() * 2;
      f._props.base_speed = f._props.speed;
      f._props.ring = false;

      this._extras.push(f);
    }

    // Extras
    for (let i = this._outsideExtras.length; i < 100; i++) {
      let center_x = this._canvas.width / 2,
      center_y = this._canvas.height / 2,
      angle = Math.random() * 360,
      distance = 95 + Math.random() * (this._canvas.width / 2);

      let x = center_x + distance * Math.cos(-angle * Math.PI / 180);
      let y = center_y + distance * Math.sin(-angle * Math.PI / 180);

      let f = new Human(this._canvas, this._ctx);
      f._props.x = x;
      f._props.y = y;
      f._props.opacity = 0;
      f._props.size = Math.random() * 3;
      f._props.distance = distance;
      f._props.angle = angle;
      f._props.friend = this._you;
      f._props.orbit = true;
      f._props.speed = Math.random() * .2;
      f._props.base_speed = f._props.speed;
      f._props.ring = false;
      f._props.maxBright = Math.random() * .5;

      this._outsideExtras.push(f);
    }
  }

  // Update
  update() {

    // Check the time
    this._VO.update();

    // If things change, change with it
    if (this._VO._state != this._state) {
      this._state = this._VO._state;
    }

    // Check where you're at
    switch (this._state) {
      case "intro":
        this.intro();
        break;
      case "start":
        this.start();
        break;
      case "":
        break;
      default:
        this[this._state]();
        break;}


    // Draw
    this.draw();
  }

  // Paint a picture of the world around you
  draw() {

    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    // Background
    this._ctx.beginPath();
    this._ctx.fillStyle = "#222222";
    this._ctx.rect(0, 0, this._canvas.width, this._canvas.height);
    this._ctx.fill();

    this._ctx.beginPath();

    let g = this._ctx.createRadialGradient(
    this._canvas.width / 2,
    this._canvas.height / 2,
    this._canvas.width / 4,
    this._canvas.width / 2,
    this._canvas.height / 2,
    this._canvas.width * 1.5);


    g.addColorStop(0, "rgba(22,26,33, 1)");
    g.addColorStop(1, "rgba(8,10,12,1)");

    this._ctx.fillStyle = g;
    this._ctx.rect(0, 0, this._canvas.width, this._canvas.height);
    this._ctx.fill();

    this._ctx.shadowBlur = 20;
    this._ctx.shadowColor = "#fff";

    // You
    this._you.draw();

    // Friends
    this._friends.forEach(friend => {
      friend.draw();
    });

    // Family
    this._family.forEach(family => {
      family.draw();
    });

    // Extras
    this._extras.forEach(extra => {
      extra.draw();
    });

    this._ctx.shadowBlur = 25;
    this._ctx.shadowColor = "#fff";

    // Outisde extras
    this._outsideExtras.forEach(extra => {
      extra.draw();
    });

    // Do it all over again
    this._animation = requestAnimationFrame(() => this.update());
  }

  // States of animation
  intro() {
    this._$intro.addClass('play').removeClass('out');

  }

  start() {
    this._$intro.removeClass('play').addClass('out');
    this._outsideExtras.forEach(extra => {

      if (extra._props.opacity > 0) {
        extra._props.opacity -= .1;
      }

    });
  }

  star() {

    // Bump opacity for you
    if (this._you._props.opacity < 1) {
      this._you._props.opacity += .01;
    }

    // Grow
    if (this._you._props.size < 25) {
      this._you._props.size += .03;
    }

  }

  family() {

    this._family.forEach(family => {

      if (family._props.opacity < 1) {
        family._props.opacity += Math.random() * .1;
      }

      if (family._props.size < 3) {
        family._props.size += .1;
      }

    });
  }

  friends() {
    this._friends.forEach(friend => {

      if (friend._props.opacity < .8) {
        friend._props.opacity += Math.random() * .1;
      }

      if (friend._props.size < 2) {
        friend._props.size += .1;
      }

    });
  }

  aquentencies() {
    this._extras.forEach(extra => {

      if (extra._props.opacity < .5) {
        extra._props.opacity += Math.random() * .1;
      }

      if (extra._props.size < 1) {
        extra._props.size += .1;
      }

    });
  }

  extras() {
    this._outsideExtras.forEach(extra => {

      if (extra._props.opacity < extra._props.maxBright) {
        extra._props.opacity += .01;
      }

    });
  }

  scene2() {
    if (this._you._props.size < this._canvas.width) {
      this._you._props.size += 5;
    }

    if (this._you._props.opacity > 0) {
      this._you._props.opacity -= .003;
    }

    this._family.forEach(family => {
      family._props.speed += .05;
    });

    this._friends.forEach(friends => {
      friends._props.speed += .05;
    });

    this._extras.forEach(extras => {
      extras._props.speed += .05;
    });

    this._outsideExtras.forEach(outsideExtras => {
      outsideExtras._props.speed += .08;
    });
  }

  fade() {

    this._you._props.size = 15;

    if (this._you._props.opacity < 1) {
      this._you._props.opacity += .01;
    }

    this._family.forEach(family => {
      family._props.speed = family._props.base_speed;
    });

    this._friends.forEach(friends => {
      friends._props.speed = friends._props.base_speed;
    });

    this._extras.forEach(extras => {
      extras._props.speed = extras._props.base_speed;
    });

    this._outsideExtras.forEach(outsideExtras => {
      outsideExtras._props.speed = outsideExtras._props.base_speed;
    });

    this._extras.forEach(extra => {

      if (extra._props.opacity > 0) {
        extra._props.opacity -= .002;
      }

    });

  }

  dusk() {
    this._friends.forEach(friend => {

      if (friend._props.opacity > 0) {
        friend._props.opacity -= .01;
      }

    });

  }

  resolve() {

    this._family.forEach(family => {

      if (family._props.opacity > 0) {
        family._props.opacity -= .01;
      }
    });

  }

  end() {

    if (this._you._props.opacity > .5) {
      this._you._props.opacity -= .01;
    }

    if (this._you._props.size > 1) {
      this._you._props.size -= .06;
    }

  }

  observe() {
    window.onresize = () => this.size();
  }

  size() {
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
  }}



// Our Audio and VO
class VO {
  constructor(loaded, events) {

    // Source
    this._url = "https://assets.codepen.io/40429/Sonder+The+Realization+That+Everyone+Has+A+Story.mp3";

    // Alias our loaded callback
    this._loaded = loaded;
    this._events = events;
    this._state = "";

    // Make a player
    this._player = document.createElement('audio');

    this.observe();
  }

  update() {
    this._events.forEach(event => {
      if (Math.round(this._player.currentTime) >= event.time - 1 && Math.round(this._player.currentTime) <= event.time + 1) {
        this._state = event.state;
      }
    });
  }

  observe() {

    // Onloaded callback
    this._player.onloadeddata = () => {
      this._loaded();
    };

    // Set the source
    this._player.src = this._url;
  }}



// And boom goes the dynamite
new Reality();