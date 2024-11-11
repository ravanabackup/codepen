"use strict";
var w = window.innerWidth, h = window.innerHeight;
function setup() {
    createCanvas(w, h, WEBGL);
    // noStroke();
    strokeWeight(1);
    stroke(125, 125, 125);
    ambientLight(50, 50, 50);
    directionalLight(0, 0, 255, -1, -1, 0);
    directionalLight(255, 0, 150, 1, 1, 0);
}
function draw() {
    staticDraw();
    pointLight(0, 255, 0, mouseX - w / 2, mouseY - h / 2, 0);
    specularMaterial(55);
    rotateY(frameCount * 0.0005);
    rotateX(frameCount * 0.005);
    push();
    for (var j = 0; j < 5; j++) {
        rotateX(frameCount * 0.0005);
        rotateY(frameCount * 0.0025);
        rotateZ(frameCount * 0.0016);
        for (var i = 0; i < 30; i++) {
            push();
            rotateY(i / 30 * Math.PI * 2);
            translate(0, 0, (j + 1) * 40);
            var n = noise(frameCount * 0.005, i * 0.5, j * 0.5);
            let l = n * 40;
            rotateZ(frameCount * 0.01);
            box(5, 5, l);
            pop();
        }
    }
    pop();
}
function staticDraw() {
    background(0);
    orbitControl();
}