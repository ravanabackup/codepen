'use strict';

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var canvasCenter = canvas.width / 2;

//////////
//////////

function Clear() {

    this.update = function() {

        context.fillStyle = 'rgba(0, 0, 0, .1)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fill();
    };
}

function Line() {

    this.resolution = .4;
    this.counter = 0;
    this.deminish = 0.03;

    this.update = function() {

        this.draw();
        this.counter += 0.1;
    };

    this.draw = function() {

        var lineThickness = 0;
        var firstCounter = 0;
        var secondCounter = 0;

        var r = 0;
        var g = 150;
        var b = 100;

        for (var y = 60 ; y < canvas.height ; y += this.resolution) {

            var red = Math.random() < 0.001 ? true : false;
            var white = Math.random() < 0.0005 ? true : false;

            context.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', .1)';

            if (white) {
                context.fillStyle = 'rgba(255, 255, 255, 1)';
            } else if (red) {
                context.fillStyle = 'rgba(255, 0, 0, 1)';
            }

            context.beginPath();
            context.arc(
                canvasCenter + (
                    Math.cos(
                        Math.random() / 2 + firstCounter + this.counter
                    ) *
                    (50 - secondCounter)
                ),
                y,
                lineThickness,
                0, 2 * Math.PI, false
            );
            context.fill();

            firstCounter += 0.1;
            secondCounter += .23;

            if (lineThickness <= 2) {
                var add = true;
            }

            if (lineThickness >= 6) {
                add = false;
            }

            if (add) {
                lineThickness += this.deminish;
            } else {
                lineThickness -= this.deminish;
            }

            if (lineThickness < 0) {
                lineThickness = 0;
            }
        }
    };
}


function Stage() {

    this.clear = new Clear();
    this.line = new Line();

    var animate = function() {

        this.clear.update();
        this.line.update();

        requestAnimationFrame(animate);

    }.bind(this);

    animate();
}

new Stage();