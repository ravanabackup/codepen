/*
* get random number
*/

const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/*
* from here
* I don't know the details because I wrote this in a hury :)
*
*****
* You have to read this book.
* Referenced / 数学から創るジェネラティブアート
*****
*
*/

let canvas, ctx, width, height,
    splitNumber, size, scalar,
    rowA, columnA,
    colorYoko, colorTate,
    mtxA, mtxB, mtxC, mtxP;

const setup = () => {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  splitNumber = rand(50, 200);
  size = width > height ? width / splitNumber : height / splitNumber;
  scalar = size;
  rowA = splitNumber;
  columnA = rand(5, 30);
  mtxA = new Array(rowA);
  for(let i = 0; i < rowA; i++) {
    mtxA[i] = new Array(columnA).fill(0);
  }

  mtxB = new Array(columnA);
  for (let i = 0; i < columnA; i++) {
    mtxB[i] = new Array(columnA).fill(0);
  }

  mtxC = new Array(columnA);
  for (let i = 0; i < columnA; i++) {
    mtxC[i] = new Array(rowA).fill(0);  
  }

  mtxP = new Array(rowA);
  for (let i = 0; i < rowA; i++) {
    mtxP[i] = new Array(rowA).fill(0);  
  }
  repeat(mtxA);
  randomize(mtxB);
  mtxC = trMtx(mtxA);
};

const resetup = () => {
  splitNumber = rand(50, 200);
  size = width > height ? width / splitNumber : height / splitNumber;
  rowA = splitNumber;
  columnA = rand(5, 30);

  mtxA = new Array(rowA);
  for(let i = 0; i < rowA; i++) {
    mtxA[i] = new Array(columnA).fill(0);
  }

  mtxB = new Array(columnA);
  for (let i = 0; i < columnA; i++) {
    mtxB[i] = new Array(columnA).fill(0);
  }

  mtxC = new Array(columnA);
  for (let i = 0; i < columnA; i++) {
    mtxC[i] = new Array(rowA).fill(0);  
  }

  mtxP = new Array(rowA);
  for (let i = 0; i < rowA; i++) {
    mtxP[i] = new Array(rowA).fill(0);  
  }
  setup();
  draw();
};

const repeat = (mtx) => {
  for (let i = 0; i < rowA; i++) {
    for (let j = 0; j < columnA; j++) {
      mtx[i][j] = 0;
    }
  }
  for (let i = 0; i < rowA; i++) {
    let zigzag;
    if (Math.floor(i / columnA) % 2 == 0) {
      zigzag = Math.floor(i % columnA);
    } else {
      zigzag = columnA - Math.floor(i % columnA) - 1;
    }
    mtx[i][zigzag] = 1;
  }
};

const randomize = (mtx) => {
  for (let i = 0; i < mtx.length; i++) {
    for (let j = 0; j < mtx[0].length; j++) {
      mtx[i][j] = rand(0, 1);
    }
  }
  for (let i = 0; i < mtx.length; i++) {
    for (let j = i; j < mtx[0].length; j++) {
      mtx[j][i] = mtx[i][j];
    }
  }
  colorTate = 'hsl(' + rand(0, 360) + ', 80%, 60%)';
  colorYoko = 'hsl(' + rand(0, 360) + ', 80%, 30%)';
};

const draw = () => {
  mtxP = multMtx(multMtx(mtxA, trMtx(mtxB)), mtxC);
  //drawTable(mtxA, 0, columnA, 'black', 'white');
  //drawTable(mtxB, 0, 0, 'black', 'white');
  //drawTable(mtxC, columnA, 0, 'black', 'white');
  drawTable(mtxP, 0, 0, colorYoko, colorTate);
};

const drawTable = (mtx, x, y, c1, c2) => {
  ctx.strokeStyle = 'black';
  let posY = y * scalar;
  for (let i = 0; i < mtx.length; i++) {
    let posX = x * scalar;
    for (let j = 0; j < mtx[0].length; j++) {
      if (mtx[i][j] == 0) {
        ctx.fillStyle = c2;
      } else {
        ctx.fillStyle = c1;
      }
      ctx.fillRect(posX, posY, size, size);
      ctx.strokeRect(posX, posY, size, size);
      posX += size;
    }
    posY += size;
  }
};

const multMtx = (mtx1, mtx2) => {
  let newMtx = new Array(mtx1.length);
  for(let i = 0; i < mtx1.length; i++) {
    newMtx[i] = new Array(mtx2.length).fill(0);
  }
  for (let i = 0; i < mtx1.length; i++) {
    for (let j = 0; j < mtx2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < mtx2.length; k++) {
        sum += mtx1[i][k] * mtx2[k][j];
      }
      newMtx[i][j] = sum;
    }
  }
  return newMtx;
};

const trMtx = (mtx) => {
  let newMtx = new Array(mtx[0].length);
  for(let i = 0; i < mtx[0].length; i++) {
    newMtx[i] = new Array(mtx.length).fill(0);
  }
  for (let i = 0; i < mtx.length; i++) {
    for (let j = 0; j < mtx[0].length; j++) {
      newMtx[j][i] = mtx[i][j]; 
    }
  }
  return newMtx;
};

(() => {
  'use strict';
  setup();
  draw();
  
  setInterval(() => {
    resetup();
  }, 1600);
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    resetup();
  }, false);
})();