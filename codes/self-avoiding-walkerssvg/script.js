console.clear();
let scale = window.innerWidth > 700 ? 40 : 20;
let _w = Math.min(window.innerWidth, window.innerHeight) - 80;
_w = Math.min(_w, 1000);
_w = _w - (_w % scale);
let _h = _w;
document.querySelector('.container').style.width = _w + 'px';

let grid = [];
let paths = [];
const svg = document.querySelector('svg');
const svgGroup = document.querySelector('.paths');
const svgGrid = document.querySelector('.grid');
const xmlns = 'http://www.w3.org/2000/svg';
svg.setAttribute('viewBox', `0 0 ${_w} ${_w}`);

let gradient = chroma.scale(['#0D4FFF','#0C82E8','#00CBFF','#0CE8D9','#0DFFAA']);

function reset () {
  scale = window.innerWidth > 700 ? 40 : 20;
  _w = Math.min(window.innerWidth, window.innerHeight) - 80;
  _w = Math.min(_w, 1000);
  _w = _w - (_w % scale);
  _h = _w;
  document.querySelector('.container').style.width = _w + 'px';
  svg.setAttribute('viewBox', `0 0 ${_w} ${_w}`);
  grid = [];
  paths = [];
  
  gsap.killTweensOf('*');
  
  safe = 4000;
  tempPath = [];
  
  svgGroup.innerHTML = '';
  svgGrid.innerHTML = '';
  magic();
}
document.querySelector('button').addEventListener('click', () => {
  reset();
});
window.addEventListener('resize', () => {
  reset();
});
function magic () {
  for (let y = 0; y < _h; y+=scale) {
    let row = [];
    for (let x = 0; x < _w; x+=scale) {
      row.push({
        x: x,
        y: y,
        from: null,
        to: null
      });
    }
    grid.push(row);
  }
  
  startWalking(Math.floor(Math.random() * grid.length), Math.floor(Math.random() * grid[0].length));
  svgGroup.innerHTML = '';
  paths.forEach(p => {
    renderSVG(p);
  });
  gsap.set('.paths path', {
    strokeDashoffset: (i, path) => {
      return path.getTotalLength();
    },
    strokeDasharray: (i, path) => {
      return path.getTotalLength();
    },
    stroke: (i, path) => {
      const color = gradient(Math.random())
      path.style.filter = `drop-shadow(0px 0px 4px ${color.alpha(0.6).hex()})`;
      return color.hex();
    }
  });
  document.querySelectorAll('.paths path').forEach(p => {
    p.lastImg = -1;
    p.length = p.getTotalLength();
    gsap.timeline({
      repeat: -1,
      delay: Math.random() * 4,
      repeatDelay: Math.random()
    }).to(p, {
      strokeDashoffset: 0,
      duration: (i, path) => {
        return (Math.random() * 0.6 + 0.4) * (path.getTotalLength() * 0.02)
      }
    }).to(p, {
      strokeDashoffset: (i, path) => {
        return -path.getTotalLength();
      },
      duration: (i, path) => {
        return (Math.random() * 0.6 + 0.4) * (path.getTotalLength() * 0.02) * 0.5
      },
      delay: Math.random() * 3 + 2
    });
  })
  
  renderGrid();
}

function random (data) {
  if (typeof data === 'object') {
    return data[Math.floor(Math.random() * data.length)];
  }
}

let safe = 4000;
let tempPath = [];
function startWalking (row, col) {
  const cell = grid[row][col];
  safe--;
  if (safe < 0) {
    return;
  }
  // If the element is already moving to somewhere, return
  if (cell.stuck) {
    return;
  };
  // If four directions are not available, return from new place
  if (
    ((!grid[row - 1] || grid[row - 1][col].from !== null) &&
    (!grid[row + 1] || grid[row + 1][col].from !== null) &&
    (!grid[row][col + 1] || grid[row][col + 1].from !== null) &&
    (!grid[row][col - 1] || grid[row][col - 1].from !== null)) ||
    (cell.to !== null && cell.from !== null)
  ) {
    if (tempPath.length) {
      paths.push(tempPath);
    }
    tempPath = [];
    startWalking(Math.floor(Math.random() * grid.length), Math.floor(Math.random() * grid[0].length));
    cell.stuck = true;
    return;
  };
  
  // Give an angle to the start
  if (cell.from === null) {
    cell.from = random(['top', 'left', 'right', 'bottom']);
    tempPath.push(cell);
  }
  
  let hasWalked = false;
  // Find a direction (top/left/bottom/right);
  const to = random(['top', 'left', 'right', 'bottom'].filter(angle => angle !== cell.from));
  cell.to = to;
  // Check if top cell is available
  if (to === 'top') {
    if (grid[row - 1] && grid[row - 1][col].from === null && grid[row - 1][col].to === null) {
      grid[row - 1][col].from = 'bottom';
      tempPath.push(grid[row - 1][col]);
      startWalking(row - 1, col);
      hasWalked = true;
    }
  }
  // Check if bottom cell is available
  if (to === 'bottom') {
    if (grid[row + 1] && grid[row + 1][col].from === null && grid[row + 1][col].to === null) {
      grid[row + 1][col].from = 'top';
      tempPath.push(grid[row + 1][col]);
      startWalking(row + 1, col);
      hasWalked = true;
    }
  }
  // Check if right cell is available
  if (to === 'right') {
    if (grid[row][col + 1] && grid[row][col + 1].from === null && grid[row][col + 1].to === null) {
      grid[row][col + 1].from = 'left';
      tempPath.push(grid[row][col + 1]);
      startWalking(row, col + 1);
      hasWalked = true;
    }
  }
  // Check if left cell is available
  if (to === 'left') {
    if (grid[row][col - 1] && grid[row][col - 1].from === null && grid[row][col - 1].to === null) {
      grid[row][col - 1].from = 'right';
      tempPath.push(grid[row][col - 1]);
      startWalking(row, col - 1);
      hasWalked = true;
    }
  }
  if (!hasWalked) {
    cell.to = null;
    startWalking(row, col);
  }
}

function renderGrid () {
  grid.forEach(row => {
    row.forEach(cell => {
      const svgSquare = document.createElementNS(xmlns, 'rect');
      svgSquare.setAttribute('x', cell.x);
      svgSquare.setAttribute('y', cell.y);
      svgSquare.setAttribute('width', scale);
      svgSquare.setAttribute('height', scale);
      svgSquare.setAttribute('vector-effect', 'non-scaling-stroke');
      svgGrid.appendChild(svgSquare);
    });
  });
}

function renderSVG (data) {
  const path = document.createElementNS(xmlns, 'path');
  let d = '';
  let cell = data[0];
  
  if (cell.from === 'left' && cell.to === 'top' ||
      cell.from === 'left' && cell.to === 'right' ||
      cell.from === 'left' && cell.to === 'bottom') {
    d += `M ${cell.x} ${cell.y + scale / 2} `;
  }
  
  if (cell.from === 'right' && cell.to === 'top' ||
      cell.from === 'right' && cell.to === 'left' ||
      cell.from === 'right' && cell.to === 'bottom') {
    d += `M ${cell.x + scale} ${cell.y + scale / 2} `;
  }
  
  if (cell.from === 'top' && cell.to === 'bottom' ||
      cell.from === 'top' && cell.to === 'right' ||
      cell.from === 'top' && cell.to === 'left') {
    d += `M ${cell.x + scale / 2} ${cell.y} `;
  }
  
  if (cell.from === 'bottom' && cell.to === 'top' ||
      cell.from === 'bottom' && cell.to === 'right' ||
      cell.from === 'bottom' && cell.to === 'left') {
    d += `M ${cell.x + scale / 2} ${cell.y + scale} `;
  }
  
  
  data.forEach((cell, i) => {
    if (cell.from === 'left' && cell.to === 'right') {
      d += `l ${scale} ${0} `;
    } else if (cell.from === 'right' && cell.to === 'left') {
      d += `l ${-scale} ${0} `;
    } else if (cell.from === 'top' && cell.to === 'bottom') {
      d += `l ${0} ${scale} `;
    } else if (cell.from === 'bottom' && cell.to === 'top') {
      d += `l ${0} ${-scale} `;
    } else if (cell.from === 'top' && cell.to === 'left') {
      d += `a ${scale/2} ${scale/2} 0 0 1 ${-scale/2} ${scale/2} `;
    } else if (cell.from === 'left' && cell.to === 'top') {
      d += `a ${scale/2} ${scale/2} 0 0 0 ${scale/2} ${-scale/2} `; 
    } else if (cell.from === 'top' && cell.to === 'right') {
      d += `a ${scale/2} ${scale/2} 0 0 0 ${scale/2} ${scale/2} `;
    } else if (cell.from === 'right' && cell.to === 'top') {
      d += `a ${scale/2} ${scale/2} 0 0 1 ${-scale/2} ${-scale/2} `; 
    } else if (cell.from === 'bottom' && cell.to === 'left') {
      d += `a ${scale/2} ${scale/2} 0 0 0 ${-scale/2} ${-scale/2} `;
    } else if (cell.from === 'left' && cell.to === 'bottom') {
      d += `a ${scale/2} ${scale/2} 0 0 1 ${scale/2} ${scale/2} `; 
    }else if (cell.from === 'bottom' && cell.to === 'right') {
      d += `a ${scale/2} ${scale/2} 0 0 1 ${scale/2} ${-scale/2} `;
    } else if (cell.from === 'right' && cell.to === 'bottom') {
      d += `a ${scale/2} ${scale/2} 0 0 0 ${-scale/2} ${scale/2} `;
    }
  });
  path.setAttribute('d', d);
  svgGroup.appendChild(path);
}

magic();