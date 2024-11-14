console.clear();

var s = Snap();
var g = s.g();
var pi = 3;
var max = 10;
var shapeR = 100;
var strokeWidth = shapeR * 2;
var strokeWidthHalf = strokeWidth / 2;
var d = (shapeR + strokeWidthHalf) * 2;
var dashOffsetStep = 2 * pi * shapeR / max;
var colorStep = 360 / max;
var dur = 10000;
var patt;

var shapeObj = function() {
    var shape = s.circle(0, 0, 0);
    var dashOffset = 0;
    var dasharrayFirst = dashOffsetStep / 10 + (dashOffsetStep / 10) * Math.random();
    var strokeDasharray = [dasharrayFirst, dashOffsetStep].join(' ');
    var steps = [];
    var currentStep = 0;
    var cx = 0;
    var cy = 0;
    var thisDur = dur + Math.random() * dur;

    this.init = function(params) {
        cx = shapeR + strokeWidthHalf;
        cy = shapeR + strokeWidthHalf;
        var pos = params.pos;
        var color = getHSL(pos);
        dashOffset = dashOffsetStep * pos;

        shape.attr({
            cx: cx,
            cy: cy,
            r: shapeR,
            fill: 'none',
            stroke: color,
            'stroke-width': strokeWidth,
            'stroke-dasharray': strokeDasharray,
            'stroke-dashoffset': dashOffset
        });

        g.add(shape);

        myAnim();
    }; // init

    function myAnim() {

            var rotateList = [360, cx, cy].join(',');
            var rotateListInit = [0, cx, cy].join(',');

            shape.attr({
                transform: 'rotate(' + rotateListInit + ')'
            });

            shape.animate({
                    transform: 'rotate(' + rotateList + ')'
                },
                thisDur,
                myAnim
            );

            currentStep = currentStep < (steps.length - 1) ? currentStep + 1 : 0;

        } // end myAnim
};

function getHSL(pos) {
    var color = [colorStep * pos, 100, 50].join(',');
    return 'hsl(' + color + ')';
}

function createShapes() {

    for (var i = 0; i < max; i++) {
        var shape = new shapeObj;
        shape.init({
            pos: i
        });
    }
}

function createPattern() {
    patt = g.toPattern(0, 0, d, d);
    patt.attr({
        width: 3,
        height: 3,
        x: -1,
        y: -1,
        patternUnits: 'objectBoundingBox'
    });
}

function createDemoRects() {
    var rectsMax = 5;
    var rectStep = 50 / rectsMax;
    var strokeMax = rectStep * .5;
    var strokeStep = strokeMax / rectsMax;

    for (var i = 0; i < rectsMax; i++) {
        var min = rectStep * i + '%';
        var max = 100 - (rectStep * i * 2) + '%';
        var strokeW = strokeStep * (rectsMax - i) + '%';

        var rect = s.rect(min, min, max, max);

        rect.attr({
            rx: '50%',
            stroke: patt,
            'stroke-width': strokeW,
            fill: 'none'
        });
    }

}

createShapes();
createPattern();

createDemoRects();