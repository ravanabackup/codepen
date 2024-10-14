'use strict';

// --------------------
// Init
// --------------------

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

context.globalCompositeOperation = 'lighten';

var mousePos = {x: canvas.width / 2, y: canvas.height / 2};
var mouseDown = false;

canvas.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(canvas, evt);
}, false);

canvas.addEventListener('mousedown', function(evt) {
    mouseDown = true;
}, false);

canvas.addEventListener('mouseup', function(evt) {
    mouseDown = false;
});

// --------------------
// Drawing
// --------------------

function Clear() {

    this.update = function() {

        context.fillStyle = 'rgba(0, 0, 0, 1)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fill();
    };
}

function Flow() {

    this.counter = 0;
}

Flow.prototype.update = function() {

    this.counter += 0.04;

    this.draw();
};

Flow.prototype.draw = function() {

    context.beginPath();

    var start = (canvas.height / 2) + (Math.sin(this.counter) * ((canvas.height / 5) * 3));

    for (var i = 0 ; i < canvas.width ; i++) {
        context.lineTo(
            i,
            start +
            (Math.sin(i / 100) * 100) +
            (p.get3d(i / 100, start / 140, 1) * 20) +
            (p.get3d(this.counter + (i / 100), 100 + (start / 100), 1) * Math.random() * 20) +
            (p.get3d(i / 150, 200 + (start / 100), 1) * Math.random() * 40)
        );
        context.lineWidth = 2;
    }

    var white = (Math.random() < .3);
    context.strokeStyle = 'rgba(' + Math.floor(this.counter) + ', ' + (255 - Math.floor(this.counter)) + ', 255, .1)';
    if (white) {
        context.strokeStyle = 'rgba(255, 255, 255, .1)';
    }
    context.stroke();
};


// --------------------
// Animate
// --------------------

function Stage() {

    this.clear = new Clear();
    this.flow = new Flow();

    var animate = function() {

        this.clear.update();
        this.flow.update();

        requestAnimationFrame(animate);

    }.bind(this);

    animate();
}

// from: http://www.xna-connection.com/post/Algorithme-de-Perlin-Noise-en-C
var Perlin = function () {
    var mask = 0xff;
    var size = mask + 1;
    var values = new Uint8Array(size * 2);
    for (var i = 0; i < size; i++) {
        values[i] = values[size + i] = 0|(Math.random() * 0xff);
    }

    var lerp = function (t, a, b) {
        return a + t * (b - a);
    };
    var fade = function (t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    };

    var grad3d = function (hash, x, y, z) {
        var h = hash & 15;
        var u = h < 8 ? x : y;
        var v = h < 4 ? y : (h === 12 || h === 14 ? x : z);
        return ((h & 1) === 0 ? u : -u) + ((h & 1 === 0) ? v : -v);
    };

    var noise3d = function (x, y, z) {
        var intX = (0|x) & mask;
        var intY = (0|y) & mask;
        var intZ = (0|z) & mask;
        var fracX = x - (0|x);
        var fracY = y - (0|y);
        var fracZ = z - (0|z);
        var r1 = values[intX] + intY;
        var r11 = values[r1] + intZ;
        var r12 = values[r1 + 1] + intZ;
        var r2 = values[intX + 1] + intY;
        var r21 = values[r2] + intZ;
        var r22 = values[r2 + 1] + intZ;
        var t1 = fade(fracX);
        var t2 = fade(fracY);
        var t3 = fade(fracZ);

        var a11 = grad3d(values[r11], fracX, fracY, fracZ);
        var b11 = grad3d(values[r21], fracX - 1, fracY, fracZ);
        var a12 = grad3d(values[r12], fracX, fracY - 1, fracZ);
        var b12 = grad3d(values[r22], fracX - 1, fracY - 1, fracZ);

        var a21 = grad3d(values[r11 + 1], fracX, fracY, fracZ - 1);
        var b21 = grad3d(values[r21 + 1], fracX - 1, fracY, fracZ - 1);
        var a22 = grad3d(values[r12 + 1], fracX, fracY - 1, fracZ - 1);
        var b22 = grad3d(values[r22 + 1], fracX - 1, fracY - 1, fracZ - 1);

        return lerp(t3,
            lerp(t2, lerp(t1, a11, b11), lerp(t1, a12, b12)),
            lerp(t2, lerp(t1, a21, b21), lerp(t1, a22, b22)));
    };

    return {
        get3d: noise3d
    }
};

var p = new Perlin();

new Stage();