var fsCanvas = document.getElementById("canvas"),
    ctx;

var glitchImageData,
    originalImageData,
    pixels;

var patternWidth = 96,
    patternHeight = 96,
    patternCanvas,
    patternContext,
    pattern;

var cosCache0 = [],
    cosCache1 = [];

// these control glitching, and are in turn controlled by TweenMax
var gvars = {
    waveAmp0:0,
    waveFrq0:4,
    waveOfs0:0,
    waveAmp1:0,
    waveFrq1:4,
    waveOfs1:0,
    pos0:0,
    pos1:0
};

window.onload = function() {
    createPatternImage();
    initFullScreenCanvas();
    createImageData();
    processImageData();
    setupTweens();

    requestAnimationFrame(loop);
};

function createPatternImage() {
    var canvas = document.createElement('canvas'),
        c = canvas.getContext('2d');

    canvas.width = patternWidth;
    canvas.height = patternHeight;

    c.fillStyle = '#000';
    c.fillRect(0, 0, patternWidth, patternHeight);
    c.fillStyle = '#fff';
    c.beginPath();
    c.arc(patternWidth * 0.5, patternHeight * 0.5, patternHeight * 0.25, 0, Math.PI * 2);
    c.fill();

//    c.fillRect(32, 32, patternWidth - 64, patternHeight - 64);

    patternCanvas = canvas;
    patternContext = c;
}

function initFullScreenCanvas() {
    ctx = fsCanvas.getContext('2d');
}

function createImageData() {
    originalImageData = patternContext.getImageData(0, 0, patternWidth, patternHeight);
    glitchImageData = patternContext.getImageData(0, 0, patternWidth, patternHeight);
}

function processImageData() {
    var data = originalImageData.data,
        pixelCount = data.length / 4,
        pixelIndex = 0,
        x, y;

    pixels = [];

    for (var i = 0; i < pixelCount; i++) {
        pixelIndex = i * 4;
        x = i % patternWidth;
        y = Math.floor(i / patternHeight);

        if (!pixels[y]) pixels[y] = [];

        pixels[y][x] = [
            data[pixelIndex + 0],
            data[pixelIndex + 1],
            data[pixelIndex + 2]
        ];
    }
}

function setupTweens() {
    var ts = 1; // for testing

    var tl0 = new TimelineMax({repeat:-1, yoyo:true});
    tl0.to(gvars, 2, {waveAmp0:4, waveFrq0:12, waveOfs0:32, ease:Cubic.easeInOut, delay:0.25});
    tl0.timeScale(ts);

    var tl1 = new TimelineMax({repeat:-1, yoyo:true});
    tl1.to(gvars, 2.5, {waveAmp1:6, waveFrq1:8, waveOfs1:16, ease:Cubic.easeInOut, delay:0.25});
    tl1.timeScale(ts);

    var tl2 = new TimelineMax({repeat:-1, yoyo:true});
    tl2.to(gvars, 3, {pos0:196, ease:Cubic.easeInOut, delay:0});
    tl2.timeScale(ts);

    var tl3 = new TimelineMax({repeat:-1, yoyo:true});
    tl3.to(gvars, 3, {pos1:-196, ease:Expo.easeInOut, delay:0.5});
    tl3.timeScale(ts);
}

function update() {
    var data = glitchImageData.data,
        row,
        pixelIndex = 0;
    var fx, fy;

    var rx, ry,
        gx, gy,
        bx, by;

    var wave0Sin,
        wave1Sin,
        wave0Cos,
        wave1Cos,
        pos0,
        pos1;

    cosCache0.length = 0;
    cosCache1.length = 0;

    for (var y = 0; y < patternHeight; y++) {
        row = pixels[y];
        fy = y / patternHeight;

        wave0Sin = Math.sin(gvars.waveOfs0 + gvars.waveFrq0 * fy) * gvars.waveAmp0;
        wave1Sin = Math.sin(gvars.waveOfs1 + gvars.waveFrq1) * gvars.waveAmp1;
        pos0 = gvars.pos0;
        pos1 = gvars.pos1;

        for (var x = 0; x < patternWidth; x++) {
            pixelIndex = (y * patternWidth + x) * 4;
            fx = x / patternWidth;

            if (cosCache0[x] === undefined) {
                cosCache0[x] = wave0Cos = Math.cos(gvars.waveOfs0 + gvars.waveFrq0 * fx) * gvars.waveAmp0;
            }
            else {
                wave0Cos = cosCache0[x];
            }

            if (cosCache1[x] === undefined) {
                cosCache1[x] = wave1Cos = Math.cos(gvars.waveOfs1 + gvars.waveFrq1) * gvars.waveAmp1;
            }
            else {
                wave1Cos = cosCache1[x];
            }

            rx = x + wave0Sin * wave1Sin + pos0;
            ry = y + wave1Cos;
            gx = x + wave0Cos;
            gy = y + wave1Sin * wave0Cos + pos1;
            bx = x - wave1Cos * wave0Sin - pos0;
            by = y + wave0Cos;

            data[pixelIndex + 0] = getChannel(rx, ry, 0);
            data[pixelIndex + 1] = getChannel(gx, gy, 1);
            data[pixelIndex + 2] = getChannel(bx, by, 2);
        }
    }
}

var screenScale = 1;

function draw() {
    patternContext.putImageData(glitchImageData, 0, 0);
    pattern = ctx.createPattern(patternCanvas, 'repeat');

    var w = window.innerWidth,
        h = window.innerHeight;

    // resizing the canvas also clears the context
    if (w !== fsCanvas.width || h !== fsCanvas.height) {
        screenScale = w / (Math.ceil(w / patternWidth) * patternWidth);
        fsCanvas.width = w;
        fsCanvas.height = h;
    }
    else {
        ctx.clearRect(0, 0, w, h);
    }

    ctx.save();
    ctx.scale(screenScale, screenScale);

    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, w * (1/screenScale), h * (1/screenScale));

    ctx.restore();
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

function getChannel(x, y, c) {
    function wrap(v, min, max) {
        return (((v - min) % (max - min)) + (max - min)) % (max - min) + min;
    }

    x = wrap(x, 0, patternWidth - 1) | 0;
    y = wrap(y, 0, patternHeight - 1) | 0;

    return pixels[y][x][c];
}