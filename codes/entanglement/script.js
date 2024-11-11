"use strict";
console.clear();
var h = window.innerHeight, w = window.innerWidth;
// var h = 1080,
//     w = 1080;
var lineWeightInner = 2, lineWeightOuter = 5, tileWidthMax = 25, tileWidthMin = 400;
var lineColorInner, lineColorOuter, tileGraphics = [], tileWidth, tileWidthHalf;
function setup() {
    createCanvas(w, h);
    lineColorInner = color(random(255), random(255), random(255));
    lineColorOuter = color(random(255), random(255), random(255));
    tileWidth = round(random(tileWidthMin, tileWidthMax));
    tileWidthHalf = tileWidth;
    let t0 = tile0(createGraphics(tileWidth, tileWidth));
    let t1 = tile1(createGraphics(tileWidth, tileWidth));
    let t2 = tile2(createGraphics(tileWidth, tileWidth));
    let t3 = tile3(createGraphics(tileWidth, tileWidth));
    let t4 = tile4(createGraphics(tileWidth, tileWidth));
    tileGraphics = [];
    // comment out to see various tiling combinations
    tileGraphics.push(t0);
    tileGraphics.push(t1);
    tileGraphics.push(t2);
    tileGraphics.push(t3);
    tileGraphics.push(t4);
    smooth();
    noLoop();
}
function draw() {
    background(lineColorOuter);
    let tileMax = tileGraphics.length - Number.EPSILON;
    for (let i = 0; i < w; i += tileWidth) {
        for (let j = 0; j < h; j += tileWidth) {
            let index = Math.floor(Math.random() * tileMax);
            push();
            translate(i + tileWidth / 2, j + tileWidth / 2);
            let r = Math.floor(Math.random() * 3);
            let a;
            switch (r) {
                case 0:
                    a = TAU;
                    break;
                case 1:
                    a = HALF_PI;
                    break;
                case 2:
                    a = PI;
                    break;
                case 3:
                    a = 3 * QUARTER_PI;
                    break;
                default:
                    a = TAU;
                    break;
            }
            rotate(a);
            translate(-tileWidth / 2, -tileWidth / 2);
            image(tileGraphics[index], 0, 0);
            pop();
        }
    }
}
// 2 small arcs top right, bottom left.  2 big crossing arcs in middle.
function tile0(pg) {
    pg.noFill();
    strokedLine(0, pg.height / 3, pg.width / 2, pg.height / 3, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedArc(pg.width / 2, pg.height / 2, pg.width / 3, pg.height / 3, -HALF_PI, 0, OPEN, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedLine(pg.width / 2, 2 * pg.height / 3, pg.width, 2 * pg.height / 3, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedArc(pg.width / 2, pg.height / 2, pg.width / 3, pg.height / 3, HALF_PI, PI, OPEN, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedLine(2 * pg.height / 3, pg.height / 2, 2 * pg.width / 3, pg.height, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedLine(pg.height / 3, 0, pg.width / 3, pg.height / 2, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedArc(pg.width, 0, 2 * pg.width / 3, 2 * pg.height / 3, HALF_PI, PI, OPEN, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedArc(0, pg.height, 2 * pg.width / 3, 2 * pg.height / 3, -HALF_PI, 0, OPEN, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    return pg;
}
// medium arcs in each corner
function tile1(pg) {
    pg.noFill();
    strokedArc(0, 0, 2 * pg.width / 3, 2 * pg.height / 3, 0, HALF_PI, OPEN, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedArc(0, pg.height, 2 * pg.width / 3, 2 * pg.height / 3, -HALF_PI, 0, OPEN, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedArc(pg.width, 0, 2 * pg.width / 3, 2 * pg.height / 3, HALF_PI, PI, OPEN, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedArc(pg.width, pg.height, 2 * pg.width / 3, 2 * pg.height / 3, PI, 3 * HALF_PI, OPEN, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    return pg;
}
// 2x2 lattice
function tile2(pg) {
    pg.noFill();
    strokedLine(0, pg.height / 3, pg.width / 2, pg.height / 3, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedLine(pg.width / 3, 0, pg.width / 3, pg.height, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedLine(0, 2 * pg.height / 3, pg.width, 2 * pg.height / 3, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedLine(2 * pg.width / 3, 0, 2 * pg.width / 3, pg.height, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedLine(pg.width / 2, pg.height / 3, pg.width, pg.height / 3, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    return pg;
}
// 4 small semicircles, one centered on each edge
function tile3(pg) {
    pg.noFill();
    strokedArc(pg.width / 2, 0, pg.width / 3, pg.height / 3, 0, PI, OPEN, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedArc(pg.width, pg.height / 2, pg.width / 3, pg.height / 3, HALF_PI, 3 * HALF_PI, OPEN, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedArc(pg.width / 2, pg.height, pg.width / 3, pg.height / 3, PI, TAU, OPEN, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedArc(0, pg.height / 2, pg.width / 3, pg.height / 3, -HALF_PI, HALF_PI, OPEN, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    return pg;
}
// 2 horizontal crossing bezier curves, 2 semicircles on top && bottom edges
function tile4(pg) {
    pg.noFill();
    strokedArc(pg.width / 2, 0, pg.width / 3, pg.height / 3, 0, PI, OPEN, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedArc(pg.width / 2, pg.height, pg.width / 3, pg.height / 3, PI, TAU, OPEN, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedBezier(0, pg.height / 3, pg.width / 2, pg.height / 3, pg.width / 2, 2 * pg.height / 3, pg.width, 2 * pg.height / 3, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    strokedBezier(0, 2 * pg.height / 3, pg.width / 2, 2 * pg.height / 3, pg.width / 2, pg.height / 3, pg.width, pg.height / 3, lineWeightOuter, lineWeightInner, lineColorOuter, lineColorInner, pg);
    return pg;
}
function strokedArc(x, y, w, h, start, stop, mode, w1, w2, c1, c2, pg) {
    pg.strokeCap(SQUARE);
    pg.strokeWeight(w1);
    pg.stroke(c1);
    pg.arc(x, y, w, h, start, stop, mode);
    pg.strokeCap(PROJECT);
    pg.strokeWeight(w2);
    pg.stroke(c2);
    pg.arc(x, y, w, h, start, stop, mode);
}
function strokedBezier(x1, y1, x2, y2, x3, y3, x4, y4, w1, w2, c1, c2, pg) {
    pg.strokeCap(SQUARE);
    pg.strokeWeight(w1);
    pg.stroke(c1);
    pg.bezier(x1, y1, x2, y2, x3, y3, x4, y4);
    pg.strokeCap(PROJECT);
    pg.strokeWeight(w2);
    pg.stroke(c2);
    pg.bezier(x1, y1, x2, y2, x3, y3, x4, y4);
}
function strokedLine(x1, y1, x2, y2, w1, w2, c1, c2, pg) {
    pg.strokeCap(SQUARE);
    pg.strokeWeight(w1);
    pg.stroke(c1);
    pg.line(x1, y1, x2, y2);
    pg.strokeCap(PROJECT);
    pg.strokeWeight(w2);
    pg.stroke(c2);
    pg.line(x1, y1, x2, y2);
}
document.addEventListener('click', (e) => { setup(); draw(); });