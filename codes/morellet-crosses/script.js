"use strict";
console.clear();
'use strict';
// https://www.reddit.com/r/proceduralgeneration/comments/ampqo3/morellet_crosses_with_javascript/ 
// https://en.wikipedia.org/wiki/Fran%C3%A7ois_Morellet
// configurable params
let ambientLightIntensity = 100, backgroundColor = '#222', camDistance = 5000, camTrackingSpeed = 0.008, crossThickness = 125, directionalLightIntensity = 225, gridSize = 6, maxCrossHeight = 1000, palette = ['royalblue', 'MediumSeaGreen ', 'firebrick'], phaseOffsetScale = 0.001, waveSpeed = 0.02;
// precomputes/deferred inits (either here or in setup)
let cam, camDistanceThird = camDistance / 3, crossWidth = crossThickness * 3, grid = [], initTransform = -crossWidth * gridSize * 0.75;
function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    noStroke();
    smooth();
    cam = createCamera();
    setCamera(cam);
    ambientLight(ambientLightIntensity);
    directionalLight(directionalLightIntensity, directionalLightIntensity, directionalLightIntensity, 0, 0, -0.75);
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize * 5; j++) {
            let c = palette[j % 3], x = i * crossThickness * 5 + mod5Map(j % 5) * crossThickness, y = j * crossThickness;
            grid.push([x, y, c]);
        }
    }
}
function draw() {
    let a = frameCount * camTrackingSpeed, camX = camDistanceThird * sin(a), camY = camDistanceThird * cos(a), f = frameCount * waveSpeed;
    cam.setPosition(camX, camY, camDistance);
    cam.lookAt(0, 0, -camDistance);
    //orbitControl();
    background(backgroundColor);
    translate(initTransform, initTransform, 0);
    for (let i = 0; i < grid.length; i++) {
        let h = 1 + maxCrossHeight * (1 + cos(f + (grid[i][0] + grid[i][1]) * phaseOffsetScale));
        push();
        translate(grid[i][0], grid[i][1], h >> 1);
        specularMaterial(grid[i][2]);
        box(crossThickness, crossWidth, h);
        box(crossWidth, crossThickness, h);
        pop();
    }
}
const mod5Map = (m) => {
    let o;
    switch (m) {
        case 1:
            o = 3;
            break;
        case 2:
            o = 1;
            break;
        case 3:
            o = -1;
            break;
        case 4:
            o = 2;
            break;
        default:
            o = 0;
            break;
    }
    return o;
};