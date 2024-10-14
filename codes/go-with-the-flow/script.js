'use strict';

// --------------------
// Init
// --------------------

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --------------------
// Helpers
// --------------------

function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

// --------------------
// Drawing
// --------------------

function Clear() {

    this.update = function() {

        context.fillStyle = 'rgba(0, 40, 103, 1)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fill();
    };
}

function FlowField() {

    this.resolution = 10;
    this.flowLineLength = 30;
    this.counter = 0;
    this.perlin = new Perlin();
    this.cols = canvas.width / this.resolution;
    this.rows = canvas.height / this.resolution;

    this.update = function() {

        this.createFlowField();

        this.counter += 0.005;
    };

    this.createFlowField = function() {

        this.field = [];

        var xOff = 0;

        for (var x = 0 ; x < this.cols ; x++) {

            if (!Array.isArray(this.field[x])) {

                this.field[x] = new Array();
            }

            var yOff = 0;

            for (var y = 0 ; y < this.rows ; y++) {

                var theta = map(
                    this.perlin.get3d(
                        xOff,
                        yOff,
                        this.counter
                    ),0,1,0, (Math.PI * 2)
                );

                this.field[x][y] = new Vector(
                    Math.cos(theta),
                    Math.sin(theta)
                );

                yOff += 0.1;
            }

            xOff += 0.1;
        }

        this.draw();
    };

    this.draw = function() {

        for (var x in this.field) {

            for (var y in this.field[x]) {

                context.beginPath();

                var angle = (Math.PI * 2) - Math.atan2(
                        this.field[x][y].x,
                        this.field[x][y].y
                    );

                context.strokeStyle = '#000d1a';

                if (angle > 4 && angle < 5) {
                    context.strokeStyle = '#003366';
                } else if (angle > 5 && angle < 6) {
                    context.strokeStyle = '#004080';
                } else if (angle > 6 && angle < 7) {
                    context.strokeStyle = '#004d99';
                } else if (angle > 7 && angle < 8) {
                    context.strokeStyle = '#0066cc';
                }

                context.moveTo(
                    (x * this.resolution) - (this.flowLineLength / 2) * Math.cos(angle),
                    (y * this.resolution) - (this.flowLineLength / 2) * Math.sin(angle)
                );

                context.lineTo(
                    (x * this.resolution) + (this.flowLineLength / 2) * Math.cos(angle),
                    (y * this.resolution) + (this.flowLineLength / 2) * Math.sin(angle)
                );

                context.lineWidth = 1;
                context.stroke();
            }
        }

    };
}

// --------------------
// Animate
// --------------------

function Stage() {

    this.clear = new Clear();
    this.flowField = new FlowField();

    var animate = function() {

        this.clear.update();
        this.flowField.update();

        requestAnimationFrame(animate);

    }.bind(this);

    animate();
}

// --------------------
// Tools
// --------------------

function Vector(x, y) {

    this.x = x;
    this.y = y;
}

// Perlin Noise                                                                 
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

new Stage();