"use strict";
let dX = 1.0, // line width
h2, // height/2 calc in setup
h4, // height/4 calc in setup
mC = 1.25, // modifies cos(a) being raised to a power times this
mF = 0.0015, // multiplies by frameCount to simulate an angle
mS = 0.5, // modifies an angle being passed into a sin function
nF = 0.006, // noise from frameCount
nP = 0.5, // noise value must exceed this probability to flip the origin of drawn lines
nS = 0.4, // distance (noise) from 0 or 1 where we allow pink lines
nX = 0.005, // noise from x coordinate,
p = [], // holds pre-computed x coordinates and basic angle data
phase = 80; // width of a phase in pixels
const PHASE_WIDTH = Math.PI * 2 / phase; // radians per x-pixel basically
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    h2 = height / 2;
    h4 = height / 4;
    stroke(255);
    strokeWeight(1);
    for (let x = 0; x < width; x += dX) {
        p.push([x, x * PHASE_WIDTH]);
    }
}
function draw() {
    background(0);
    for (let i = 0; i < p.length; i++) {
        let x = p[i][0], c = p[i][1], y = h2 - h4 * cos(c ** abs(mC * sin(frameCount * mF))) * sin(c ** mS), n = noise(x * nX, frameCount * nF), o = n > nP ? 0 : height, s = n > 1 - nS || n < nS ? '#FF1EAD' : 'white';
        stroke(s);
        line(x, o, x, y);
    }
}