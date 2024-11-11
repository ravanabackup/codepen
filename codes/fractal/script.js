var pi = Math.PI;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth / 3;
canvas.height = document.body.clientHeight / 3;
var cols = canvas.width;
var rows = canvas.height;
var canvasData = ctx.getImageData(0, 0, cols, rows);
var maxItr = 35;
var frames = 0;

function createGrid() {

  cells = new Array(cols);
  for (i = 0; i < cols; ++i) {
    cells[i] = new Array(rows);
    for (j = 0; j < rows; ++j) {
      a = -2 * cols / rows + cols / rows * 2 / (cols - 1) * i * 2;
      b = -2 + 4 / (rows - 1) * j;
      cells[i][j] = new Cell(a, b);
    }
  }
}

function Cell(a, b) {
  this.a = a, this.b = b, this.x = a, this.y = b, this.oa = a, this.ob = b;
  this.itr = this.col = this.esc = 0;
}

function renderFractal() {

  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      c = cells[i][j];
      while (!c.esc && c.itr < maxItr - 1) {
        x = c.itr ? c.x * c.x - c.y * c.y + c.a : c.a;
        y = c.itr ? 2 * c.x * c.y + c.b : c.b;
        if (x * x + y * y > 4) {
          c.esc = true;
          c.col = c.itr ? pi * 2 / maxItr * c.itr : -.1;
        } else {
          c.x = x;
          c.y = y;
          c.itr++;
        }
      }
    }
  }
}

function drawPixel(x, y, r, g, b, a) {

  var index = (x + y * canvas.width) * 4;
  canvasData.data[index + 0] = r;
  canvasData.data[index + 1] = g;
  canvasData.data[index + 2] = b;
  canvasData.data[index + 3] = a;
}

function draw() {

  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      if (cells[i][j].col) {
        r = 128 + Math.sin(cells[i][j].col + frames / 10) * 128;
        g = 128 + Math.cos(cells[i][j].col + frames / 10) * 128;
        b = 128 - Math.sin(cells[i][j].col + frames / 10) * 128;
      } else {
        r = g = b = 0;
      }
      drawPixel(i, j, r, g, b, 255);
    }
  }
  ctx.putImageData(canvasData, 0, 0);
}

function modifyFractal(x, y, z) {

  for (i = 0; i < cols; ++i) {
    for (j = 0; j < rows; ++j) {
      cells[i][j].x = cells[i][j].a = cells[i][j].oa * z + x;
      cells[i][j].y = cells[i][j].b = cells[i][j].ob * z + y;
      cells[i][j].itr = cells[i][j].esc = cells[i][j].col = 0
    }
  }
}
z = 1;

function frame() {

  requestAnimationFrame(frame);
  renderFractal();
  draw();
  if (z > .0045) {
    z = 1 - frames / 100 / (1 + Math.pow(frames + 1, 4) / 960000000);
  } else {
    frames = 0;
    z = 1;
  }
  x = .4255;
  y = .22001;
  modifyFractal(x, y, z);
  frames++;
}

createGrid();
frame();