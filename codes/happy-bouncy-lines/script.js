// canvas settings
var viewWidth = 512,
    viewHeight = 512,
    canvas = document.getElementById("drawing_canvas"),
    ctx,
    timeStep = (1/60),
    time = 0;

var vertices = [],
    lines = [];

window.onload = function() {
    initCanvas();
    createLines();
    requestAnimationFrame(loop);
};

function initCanvas() {
    canvas.width = viewWidth;
    canvas.height = viewHeight;
    ctx = canvas.getContext('2d');
}

function createLines() {
    var count = 256,
        step = 4;

    // create points
    var phi = Math.PI * (3 - Math.sqrt(5)),
        theta, r, x, y;

    for (var i = 0; i < count; i+=step) {
        theta = i * phi;
        r = Math.sqrt(i) / Math.sqrt(count);
        x = r * Math.cos(theta) * 196;
        y = r * Math.sin(theta) * 196;

        vertices.push(new Point(x, y));
    }

    // create lines
    var start, end, color,
        lineCount = (count  / step) - 2;

    for (var j = 1; j < lineCount; j++) {
        start = vertices[j];
        end = getNext(start, vertices);

        color = 'hsl(' + Math.floor(j / lineCount * 360) + ',100%,50%)';
        lines[j] = new Line(start, end, color, Ease.easeOutBack, Ease.easeOutCubic);
    }
}

function update() {
    lines.forEach(function(l) {
        l.update();

        if (l.complete) {
            l.time = 0;
            l.complete = false;

            var temp = l.start;
            l.start = l.end;
            l.end = temp;
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, viewWidth, viewHeight);

    ctx.save();
    ctx.translate(256, 256);
    ctx.rotate((time % 24) / 24 * Math.PI * 2);

    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    lines.forEach(function(l) {
        l.draw();
    });

    ctx.restore();
}

function loop() {
    update();
    draw();
    time += timeStep;
    requestAnimationFrame(loop);
}
//////////////////////////
// Line and Point
//////////////////////////
function Line(p0, p1, color, ease0, ease1) {
    this.start = p0;
    this.end = p1;
    this.p0 = new Point();
    this.p1 = new Point();
    this.color = color;
    this.ease0 = ease0;
    this.ease1 = ease1;

    this.duration = 1;
    this.complete = false;
}
Line.prototype = {
    update:function() {
        if (this.time + timeStep <= this.duration) {
            this.time += timeStep;
        }
        else {
            this.time = this.duration;
            this.complete = true;
        }
    },
    draw:function() {
        var t0 = this.ease0(this.time, 0, 1, this.duration);
        var t1 = this.ease1(this.time, 0, 1, this.duration);

        lerp(this.start, this.end, t0, this.p0);
        lerp(this.start, this.end, t1, this.p1);

        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.p0.x, this.p0.y);
        ctx.lineTo(this.p1.x, this.p1.y);
        ctx.stroke();
    }
};

function Point(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}
//////////////////////////////
// utils
//////////////////////////////
function lerp(p0, p1, t, tp) {
    tp = tp || new Point();

    tp.x = p0.x + t * (p1.x - p0.x);
    tp.y = p0.y + t * (p1.y - p0.y);

    return tp;
}

function getNext(item, array) {
    var i = array.indexOf(item) + 1;
    if (i === array.length) i = 0;
    return array[i];
}
//////////////////////////
// EASING (functions from jQuery github)
//////////////////////////
Ease = {
    easeInQuad: function (t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function (t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function (t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function (t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function (t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function (t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function (t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function (t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function (t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function (t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function (t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (t, b, c, d) {
        return c - Ease.easeOutBounce (d-t, 0, c, d) + b;
    },
    easeOutBounce: function (t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function (t, b, c, d) {
        if (t < d/2) return Ease.easeInBounce (t*2, 0, c, d) * .5 + b;
        return Ease.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
};