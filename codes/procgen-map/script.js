'use strict';
console.clear();
let h, w, grid;
function init() {
    h = window.innerHeight;
    w = window.innerWidth;
    noiseSeed(random(Number.MAX_SAFE_INTEGER));
    grid = new Grid(900, 900, 201, 201);
}
function setup() {
    init();
    createCanvas(w, h);
    noLoop();
    background(0);
}
function draw() {
    background(0);
    grid.display();
}
class SquareTile {
    constructor(exits, x, y) {
        let c = round(noise(x * 0.009, y * 0.009) * 255);
        if (c < 75) {
            c = color('midnightblue');
        }
        else if (c < 100) {
            c = color('blue');
        }
        else if (c < 105) {
            c = color('darkkhaki');
        }
        else if (c < 110) {
            c = color('khaki');
        }
        else if (c < 130) {
            c = color('limegreen');
        }
        else if (c < 170) {
            c = color('darkgreen');
        }
        else if (c < 200) {
            c = color('gray');
        }
        else if (c < 210) {
            c = color('lightgray');
        }
        else {
            c = color('white');
        }
        this.exits = exits;
        this.color = c;
        this.x = x;
        this.y = y;
    }
}
class Grid {
    constructor(w, h, i, j) {
        this.w = w;
        this.h = h;
        this.i = i;
        this.j = j;
        this.l_x = w / i;
        this.l_y = h / j;
        this.tiles = [];
        this.generateGrid();
    }
    display() {
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                let t = this.tiles[i][j];
                push();
                translate(t.x, t.y);
                noStroke();
                fill(t.color);
                rect(0, 0, this.l_x, this.l_y);
                pop();
            }
        }
    }
    generateGrid() {
        for (let i = 0; i < this.i; i++) {
            this.tiles.push([]);
            for (let j = 0; j < this.j; j++) {
                this.tiles[i].push(new SquareTile([0, 1, 2, 3], i * this.l_x, j * this.l_y));
            }
        }
    }
}
function mousePressed() {
    init();
    redraw();
}