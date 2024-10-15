/*
  Johan Karlsson, 2023
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/
let canvas;
let ctx;
let w, h;
let cellSize;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", () => {
    resize();
    draw();
  });
  canvas.addEventListener("click", draw);
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function setupGrid(width, height) {
  let grid = [];
  for (let x = 0; x < width; x++) {
    grid[x] = [];
    for (let y = 0; y < height; y++) {
      grid[x][y] = {
        x,
        y,
        walls: {
          l: true,
          r: true,
          u: true,
          d: true } };


    }
  }
  return grid;
}

function generateMaze() {
  const min = Math.min(w, h);
  cellSize = Math.round(min / 100);
  const cols = Math.floor(w / cellSize);
  const rows = Math.floor(h / cellSize);
  let grid = setupGrid(cols, rows);
  depthFirst(grid, grid[0][0]);
  return grid;
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
  let grid = generateMaze();
  drawGrid(grid);
}

function depthFirst(grid, start) {
  let visited = new Set([start]);

  const stack = [start];
  let current;
  while (stack.length > 0) {
    current = stack.pop();
    for (let neighbor of getNeighbors(grid, current.x, current.y)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        removeWalls(grid, current, neighbor);
        stack.push(neighbor);
      }
    }
  }
}

function removeWalls(grid, cell1, cell2) {
  const xdiff = cell2.x - cell1.x;
  const ydiff = cell2.y - cell1.y;
  if (xdiff === -1) {
    cell1.walls.l = false;
    cell2.walls.r = false;
  } else if (xdiff === 1) {
    cell1.walls.r = false;
    cell2.walls.l = false;
  } else if (ydiff === -1) {
    cell1.walls.u = false;
    cell2.walls.d = false;
  } else if (ydiff === 1) {
    cell1.walls.d = false;
    cell2.walls.u = false;
  }
}

function getNeighbors(grid, x, y) {
  let neighbors = [];
  // down
  if (y < grid[x].length - 1) {
    neighbors.push(grid[x][y + 1]);
  }
  // left
  if (x > 0) {
    neighbors.push(grid[x - 1][y]);
  }
  // up
  if (y > 0) {
    neighbors.push(grid[x][y - 1]);
  }
  // right
  if (x < grid.length - 1) {
    neighbors.push(grid[x + 1][y]);
  }
  if (Math.random() > 0.3) {
    shuffle(neighbors);
  }
  return neighbors;
}

// https://stackoverflow.com/a/2450976/6469130
function shuffle(array) {
  let currentIndex = array.length,randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function drawGrid(grid) {
  ctx.fillStyle = "white";
  const s = cellSize;
  const t = 1;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const walls = grid[x][y].walls;
      // right
      if (walls.r) {
        ctx.fillRect(x * s + s, y * s, t, s);
      }
      // down
      if (walls.d) {
        ctx.fillRect(x * s, y * s + s, s, t);
      }
      // left
      if (walls.l) {
        ctx.fillRect(x * s, y * s, t, s);
      }
      // up
      if (walls.u) {
        ctx.fillRect(x * s, y * s, s, t);
      }
    }
  }
}

setup();
draw();