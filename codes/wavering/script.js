'use strict';

// --------------------
// Init
// --------------------

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var grd = context.createLinearGradient(0.000, 150.000, 450.000, 150.000);
grd.addColorStop(0.000, 'rgba(142, 15, 15, .9)');
grd.addColorStop(0.514, 'rgba(255, 255, 255, .6)');
grd.addColorStop(1.000, 'rgba(208, 237, 242, .2)');
context.strokeStyle = grd;

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

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
// Helpers
// --------------------

function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function constrain(value, min, max) {
    return value > max ? max : value < min ? min : value;
}

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

function Line(fromX, fromY, toX, toY, length) {

    this.counter = 0;
    this.fromX = fromX;
    this.fromY = fromY;
    this.toX = toX;
    this.toY = toY;
    this.length = length;
    if (this.length > 500) {
        this.length = 500;
    }
    this.add = 0;
    this.resolution = 2;
}

Line.prototype.update = function() {

    this.draw();

    this.counter += 0.03;
};

Line.prototype.draw = function() {

    var counter = 0;
    context.lineWidth = 1;

    if (mouseDown) {
        this.add += 1;
        if (this.add >= 55) {
            this.add = 55;
        }
    } else {
        this.add -= 1;
        if (this.add <= 0) {
            this.add = 0;
        }
    }

    var from = Math.random() * 100;
    if (!mouseDown) {
        from = 0;
    }

    context.beginPath();
    for (var i = 0 ; i < this.length ; i+=this.resolution) {

        if (i > from) {
            var x = this.toX - ((this.toX - this.fromX) / this.length) * i;
            var y = this.toY - ((this.toY - this.fromY) / this.length) * i;

            context.lineTo(
                x + (p.get3d(1, counter + (!mouseDown ? this.counter : (this.counter * 8)), 1) * 20),
                y +
                (p.get3d(1, counter + (!mouseDown ? this.counter : (this.counter * 4)), 1) * 30) +
                Math.sin(this.counter + counter) * 30 +
                (Math.sin(this.counter - (counter * counter)) * 20)
            );
        }

        counter += (this.length / 40000 * this.resolution);
    }
    context.stroke();
};

function Lines() {

    this.lines = [];

    this.counter = 0;

    var length = (canvas.width / 4.5) * 3;
    var start = 2;
    var count = 200;
    for (var i = 0 ; i < count ; i++) {

        var fromX = (canvas.width / 2) + (Math.cos(((Math.PI * 2) / count) * i) * start);
        var fromY = (canvas.height / 2) + (Math.sin(((Math.PI * 2) / count) * i) * start);
        var toX = fromX + (Math.cos(((Math.PI * 2) / count) * i) * length);
        var toY = fromY + (Math.sin(((Math.PI * 2) / count) * i) * length);

        this.lines[i] = new Line(fromX, fromY, toX, toY, length);
    }
}

Lines.prototype.update = function() {

    for (var i in this.lines) {
        this.lines[i].update();
    }

    this.counter += 0.04;
};

// --------------------
// Animate
// --------------------

function Stage() {

    this.clear = new Clear();
    this.lines = new Lines();

    var animate = function() {

        this.clear.update();
        this.lines.update();

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