"use strict";
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
let dScale = 5;
let w = 0; // wiewport width
let h = 0; // wiewport height
let s = w * h;
let data1;
let data2;
let d1;
let d2;
let interval = 0;
function p2xy(p) {
    p /= 4;
    const x = p % w;
    const y = (p - x) / w;
    return [x, y];
}
function xy2p(x, y) {
    x = ((x % w) + w) % w;
    y = ((y % h) + h) % h;
    return (y * w + x) * 4;
}
let max = 0;
function nextPixelStep(life, x) {
    if (x > 2.5 && x < 3.5)
        return 1;
    return x > 1.5 && x < 2.5 && life ? 1 : 0;
}
function drawPixel(p) {
    const [x, y] = p2xy(p);
    let t = 0;
    for (let nx = -1; nx <= 1; nx++)
        for (let ny = -1; ny <= 1; ny++) {
            if (nx === 0 && ny === 0)
                continue;
            const px = x + nx;
            const py = y + ny;
            const pos = xy2p(px, py);
            t += d1[pos] & 1;
        }
    const d = d1[p] / 0xff;
    d2[p] = nextPixelStep(d, t) * 0xff;
    d2[p + 1] = !d1[p] ? 0 : d1[p + 1] + 1;
    d2[p + 2] = d2[p] < d1[p] ? 127 : d1[p + 2] - 1;
}
function draw() {
    for (let p = 0; p < s; p++) {
        drawPixel(p * 4);
    }
    context.putImageData(data2, 0, 0, 0, 0, w, h);
    [data1, data2] = [data2, data1];
    [d1, d2] = [d2, d1];
}
function init() {
    context.fillStyle = '#003';
    context.fillRect(0, 0, w, h);
    context.fillStyle = '#f08';
    for (let x = 0; x < w; x++)
        for (let y = 0; y < h; y++) {
            if (Math.random() > 0.85)
                context.fillRect(x, y, 1, 1);
        }
    data1 = context.getImageData(0, 0, w, h);
    data2 = structuredClone(data1);
    d1 = data1.data;
    d2 = data2.data;
}
function loop() {
    draw();
    setTimeout(loop, 1.3 ** interval - 1);
}
function resize() {
    const scale = 1.2 ** dScale;
    const newWidth = Math.max(1, Math.floor(window.innerWidth / scale));
    const newHeight = Math.max(1, Math.floor(window.innerHeight / scale));
    if (h === newHeight && w === newWidth)
        return;
    w = canvas.width = newWidth;
    h = canvas.height = newHeight;
    s = w * h;
    init();
}
function wheel(e) {
    if (e.shiftKey)
        changeSpeed(e);
    else
        zoom(e);
}
function changeSpeed(e) {
    e.preventDefault();
    const d = Math.sign(e.deltaY);
    interval = Math.max(0, Math.min(interval - d, 30));
}
function zoom(e) {
    const oldDScale = dScale;
    const d = Math.sign(e.deltaY);
    dScale = Math.max(0, dScale - d);
    if (oldDScale === dScale)
        return;
    e.preventDefault();
    resize();
}
window.addEventListener('resize', resize);
window.addEventListener('wheel', wheel, { passive: false });
window.addEventListener('click', init);
resize();
loop();
document.body.append(canvas);