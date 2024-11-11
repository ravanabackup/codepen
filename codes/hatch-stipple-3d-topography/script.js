'use strict';
console.clear();
let boxHeight = 500, boxLength = 25, boxThickness = 2, lineWeight = 4, maxSphereSize = 8, minAxisPoints = 50, planeSize = 1000;
let beachColor = '#BFBF3F', bgColor = '#FFF', bhh = boxHeight / 2, groundColor = '#19936F', peakColor = '#FFF', points, psh = planeSize / 2, skyColor = '#000020', waterColor = '#0F557F';
function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    smooth();
    let spacing = planeSize / minAxisPoints;
    noStroke();
    points = [];
    camera(0, -boxHeight * 4, boxHeight * 2, 0, 0, 0, 0, 1, 0);
    for (let i = 0; i < planeSize; i += spacing) {
        for (let j = 0; j < planeSize; j += spacing) {
            var n = noise(i * 0.0025, j * 0.0025);
            points.push([i, j, n]);
        }
    }
    directionalLight(190, 190, 190, 0.5, 0.5, -1);
    directionalLight(190, 190, 190, -0.5, 0.5, -1);
}
function draw() {
    orbitControl();
    background(skyColor);
    rotateY(frameCount * 0.0025);
    translate(-psh, -bhh, -psh);
    for (let i = 0; i < points.length; i++) {
        push();
        translate(points[i][0], 0, points[i][1]);
        if (points[i][2] > 0.5) {
            if (points[i][2] > 0.75) {
                ambientMaterial(peakColor);
            }
            else if (points[i][2] > 0.53) {
                ambientMaterial(groundColor);
            }
            else {
                ambientMaterial(beachColor);
            }
            rotateY(QUARTER_PI);
            let h = points[i][2] * boxHeight;
            translate(0, -h, 0);
            box(boxLength, points[i][2] * boxHeight, boxThickness);
        }
        else {
            ambientMaterial(waterColor);
            let wNoise = noise(points[i][0] * 0.003, points[i][1] * 0.003, frameCount * 0.01);
            let waveHeight = wNoise * bhh;
            translate(0, -boxHeight + waveHeight, 0);
            sphere(wNoise * maxSphereSize);
        }
        pop();
    }
}