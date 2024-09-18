// requestAnimationFrame shim
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
// particle "class"
function Particle(x, y, r) {
    this.x = x; // x position
    this.y = y; // y position
    this.r = r; // radius
    //=========
    this.vx = 0; // x velocity
    this.vy = 0; // y velocity
    this.image = null; // this stores the canvas element 
}
Particle.prototype = { 
    init: function () { // could be done in constructor... but I like init functions... 
      // for performance reasons we need to draw the canvas ahead of time for each particle
      // creating radialGradients and fillStyle is expensive. 
        var can = document.createElement('canvas'),
            ctx = can.getContext('2d');
        can.height = can.width = this.r * 2;
        var grad = ctx.createRadialGradient(this.r, this.r, 1, this.r, this.r, this.r);
        grad.addColorStop(0, 'rgba(' + particle_settings.color.r + ',' + particle_settings.color.g + ',' + particle_settings.color.b + ',1)');
        grad.addColorStop(1, 'rgba(' + particle_settings.color.r + ',' + particle_settings.color.g + ',' + particle_settings.color.b + ',0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.r, this.r, this.r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        this.image = can;
    },
    update: function () { // the update function controls positioning
        this.vx += particle_settings.gravity_x; // apply gravity 
        this.vy += particle_settings.gravity_y;
        this.x += this.vx; // update the current position
        this.y += this.vy;
        // correct for off screen
        if (this.x + this.r > width) {
            this.x = width - this.r;
        }
        if (this.x - this.r < 0) {
            this.x = 0 + this.r
        }
        if (this.y + this.r > height) {
            this.y = height - this.r;
        }
        if (this.y - this.r < 0) {
            this.y = 0 + this.r;
        }
    },
    attract: function (x, y) { // attraction the 'force' behind it all
        // we need to find the distance from the position passed to the current particle
        var dist_x = this.x - x,
            dist_y = this.y - y,
            dist = Math.sqrt(dist_x * dist_x + dist_y * dist_y);
        var cos = dist_x / dist;
        var sin = dist_y / dist;
      // cheating here, applying some trial and error velocity modifications
        this.vx += -cos * 2;
        this.vy += -sin * 2;
        // once we get X close to the source we need to slow down.
        if (dist < this.r * particle_settings.attraction_influence) {
            this.vx *= .89;
            this.vy *= .89;
        }

    },
  // all particles are rendered to the mcontex (meta context)
    render: function (context) {
        mcontext.drawImage(this.image, this.x - this.r, this.y - this.r);
    }
};
// this takes care of the metaball effect and the colour change
function metabolize(color) {
    var image = mcontext.getImageData(0, 0, width, height), // get the image data
        data = image.data;
    for (var i = 0, l = data.length; i < l; i += 4) { // loop it, rgba is stored in a 1d array so we jump 4 positions at a time
        if (color) { // apply color change
            data[i] = color.r;
            data[i + 1] = color.g;
            data[i + 2] = color.b;
        }
        if (data[i + 3] < 210) { // this value (and general method) was stolen from Loktar ;) 
            data[i + 3] /= 6; // played with this, 6 is good
        }
    }
    context.putImageData(image, 0, 0); // put it to the display canvas
}

function render() { // render loop
    requestAnimFrame(render);
    mcontext.clearRect(0, 0, width, height);
    for (var i = 0, l = particles.length; i < l; i++) {
        particles[i].render();
    }
    metabolize(color_modifier); // color_modifier is contoller in update_time()
}

function update_particles() { // update particles
    var f = forces.slice(0, particles.length); // this is a cheap way to ensure  I never trigger more force points than particles.
    for (var i = 0, l = particles.length; i < l; i++) {
        particles[i].update();
        if (f[i]) { // only trigger force points on the first N particles
            particles[i].attract(f[i].x, f[i].y);
        } else { // the rest can jitter around the number they will change next. 
            var d = new Date(),
                xpos = 0;
            if (d.getSeconds() > 0) {
                xpos = (width / 2) + (width / 3) | 0;
            } else if (d.getMinutes() > 0) {
                xpos = (width / 2) + (width / 8) | 0;
            } else {
                xpos = (width / 2.5) | 0;
            }
            particles[i].attract(Math.random() * (xpos / 2) + (xpos / 2), height);
        }
    }
    setTimeout(update_particles, 1000 / 60);
}

function update_forces() { // this updates the forces
    var image = tcontext.getImageData(0, 0, width, height), // further down we draw the time string to a canvas, now we need the data.
        data = image.data;
    forces = [];
    for (var x = 0; x < width; x += resolution) { //  resolution is how many square pixles we want to 'search' by.
        for (var y = 0; y < height; y += resolution) {
            var offset = x * 4 + y * 4 * image.width; // take into consideration 1d array
            if (data[offset + 3] > 210) { // offset as offset = r, offset + 1 = g, ..b. .. a.
                forces.push({
                    x: x,
                    y: y
                });
            }
        }
    }
    setTimeout(update_forces, 1000 / 60);
}

function update_time() {
    var now = Date.now();
    if (now - ctime > 1000) { // best '1 second' we can get
        ctime = now;
        tcontext.clearRect(0, 0, width, height);
        var t = new Date().toLocaleTimeString(); // this makes thing super easy
        if (!guio.show_ampm) {
            t = t.substring(0, 8); // trim am/pm
        }
        var w = tcontext.measureText(t).width; // need the width of the text
        tcontext.fillText(t, (width - w) / 2, height / 2);
        var d = new Date(); // for color modification
      // 12 / 255 (with padding)
        color_modifier.r = d.getHours() * 20.25 | 0;
      // 60 / 255 (with visible padding)
        color_modifier.g = d.getMinutes() * 4.25 + 60 | 0;
      // 60 / 255 (with padding)
        color_modifier.b = d.getSeconds() * 3.25 | 0;
    }

    setTimeout(update_time, 4); // this needs to happen as fast as the browser will let it
}

function run() { // this is triggered onload
    tcontext.font = "bold 72px Arial"; // set font
  // start update loops
    update_time();
    update_forces();
    update_particles();
    render();
}
// variables
var canvas = document.getElementById('canvas'), // display canvas
    context = canvas.getContext('2d'),
    mcanvas = document.createElement('canvas'), // meta canvas
    mcontext = mcanvas.getContext('2d'),
    tcanvas = document.createElement('canvas'), // time canvas
    tcontext = tcanvas.getContext('2d'),
    height = canvas.height = mcanvas.height = tcanvas.height = 200,
    width = canvas.width = mcanvas.width = tcanvas.width = 600,
    forces = [],
    particles = [],
    particle_settings = {
        gravity_x: 0,
        gravity_y: .5,
        attraction_influence: 50,
        color: {
            r: 0,
            g: 0,
            b: 255
        },
        size: 8
    },
    gui = new dat.GUI(),
    resolution = 4,
    color_modifier = {
        r: 0,
        g: 0,
        b: 0
    },
    ctime = Date.now(),
    guio = {
        show_ampm: false
    };
// create the initial particles to be used in the demo. 555 was a trial and error settlement.
for (var i = 0; i < 555; i++) {
    var particle = new Particle(Math.random() * width, Math.random() * height, particle_settings.size);
    particle.init();
    particles.push(particle);
}
gui.add(guio, 'show_ampm');
run();