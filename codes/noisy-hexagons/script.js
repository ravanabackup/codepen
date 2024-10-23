function App() {
  const canvas = document.getElementById('canvas'),ctx = canvas.getContext('2d');
  let width, height;

  const simplex = new SimplexNoise();
  const pix2 = Math.PI * 2;
  const pane = new Tweakpane({ title: 'Params' });

  let rows = [],hexagons = [];
  let nCols, nRows;

  const params = {
    background: '#fff',
    c0: '#000',
    c1: '#000',
    c2: '#000',
    tSize: 35,
    tNoise: 25,
    tCircle: 3,
    lineWidth: 2.5,
    lineWidth1: 0.2,
    lineWidth2: 0.15,
    scale: 0.8,
    xyCoef: 0.003,
    timeCoef: 0.0002,
    composite: 'source-over',
    margin: 20 };


  init();

  function init() {
    updateParams();
    initAnim();

    pane.expanded = false;
    pane.addButton({ title: 'Random' }).on('click', value => {randomGrid();});

    let pf = pane.addFolder({ title: 'Drawing' });
    pf.addInput(params, 'tSize', { min: 10, max: 100, step: 1 }).on('change', value => {
      updateParams();
      initGrid();
    });
    pf.addInput(params, 'tCircle', { min: 0, max: 20, step: 0.1 });
    pf.addInput(params, 'scale', { min: 0.3, max: 2, step: 0.01 });
    pf.addInput(params, 'lineWidth', { min: 0, max: 5, step: 0.01 });
    pf.addInput(params, 'lineWidth1', { min: 0, max: 5, step: 0.01 });
    pf.addInput(params, 'lineWidth2', { min: 0, max: 5, step: 0.01 });
    pf.addInput(params, 'background', { input: 'color' }).on('change', value => {updateParams();});
    pf.addInput(params, 'c0', { input: 'color' }).on('change', value => {updateParams();});
    pf.addInput(params, 'c1', { input: 'color' }).on('change', value => {updateParams();});
    pf.addInput(params, 'c2', { input: 'color' }).on('change', value => {updateParams();});
    pf = pane.addFolder({ title: 'Noise' });
    pf.addInput(params, 'tNoise', { min: 0, max: 50, step: 0.1 });
    pf.addInput(params, 'xyCoef', { min: 0, max: 0.05, step: 0.0001 });
    pf.addInput(params, 'timeCoef', { min: 0, max: 0.001, step: 0.00005 });
  }

  function initAnim() {
    onResize();
    window.addEventListener('resize', onResize, false);

    canvas.addEventListener('click', () => {
      randomGrid();
    });

    requestAnimationFrame(animate);
  }

  function randomGrid() {
    randomParams();
    initGrid();
  }

  function randomParams() {
    const p = params;
    p.c0 = chroma.random().hex();
    p.c1 = chroma.random().hex();
    p.c2 = chroma.random().hex();
    p.background = rnd() > 0.5 ? '#000' : '#fff';
    p.composite = randomComposite();
    p.tSize = rnd(30, 70);
    p.tNoise = rnd(5, 20);
    p.tCircle = rnd(0, 5);
    p.lineWidth = rnd(-0.5, 3);
    p.lineWidth1 = rnd(-0.5, 3);
    p.lineWidth2 = rnd(-0.5, 3);
    p.scale = rnd(0.3, 1.5);
    p.xyCoef = rnd(0.001, 0.05);
    p.timeCoef = rnd(0.00005, 0.0003);
    updateParams();
    pane.refresh();
  }

  function randomComposite() {
    const ops = ['source-over', 'lighter', 'darker']; // firefox is slow with other ops
    return ops[Math.floor(Math.random() * ops.length)];
  }

  function updateParams() {
    const p = params;
    p.cscale = chroma.scale([p.c0, p.c1, p.c2]);
    document.body.style.background = p.background;
  }

  function initGrid() {
    const w = params.tSize,h = w * Math.sqrt(3) / 2;
    rows = [];
    nCols = Math.floor((width - params.margin) / w);
    nRows = Math.floor((height - params.margin) / h);
    const mx = (width - (nCols - 1) * w) / 2;
    const my = (height - (nRows - 1) * h) / 2;
    for (let i = 0; i < nRows; i++) {
      const x0 = mx + i % 2 * (-w / 2);
      const y0 = my + i * h;
      const row = [];
      for (let j = 0; j < nCols + i % 2; j++) {
        const x = x0 + j * w,y = y0;
        row.push({ x, y, ox: x, oy: y, i: 1 });
      }
      rows.push(row);
    }

    hexagons = [];
    for (let i = 1; i < nRows - 1; i++) {
      const di = i % 2 ? 1 : -1;
      const n = Math.floor((nCols + di) / 3);
      for (let j = 0; j < n; j++) {
        const di1 = i % 2,di2 = (i + 1) % 2;
        const j0 = j * 3 + 1 + di2;
        const hex = [
        rows[i][j0],
        rows[i - 1][j0 - di1],
        rows[i - 1][j0 + di2],
        rows[i][j0 + 1],
        rows[i + 1][j0 + di2],
        rows[i + 1][j0 - di1],
        rows[i][j0 - 1]];

        hexagons.push(hex);
      }
    }
  }

  function updateGrid() {
    const { tNoise, timeCoef, xyCoef } = params;
    const t = Date.now() * timeCoef;
    for (let i = 0; i < nRows; i++) {
      for (let j = 0; j < nCols + i % 2; j++) {
        const p = rows[i][j];
        const ox = p.ox * xyCoef,oy = p.oy * xyCoef;
        const nx = simplex.noise2D(ox + t, oy + t);
        const ny = simplex.noise2D(oy + t, ox + t);
        p.x = p.ox + nx * tNoise;p.y = p.oy + ny * tNoise;
        p.i = (nx + ny + 2) / 4;
      }
    }
  }

  function drawGrid() {
    for (let i = 0; i < hexagons.length; i++) {
      drawHexagon(hexagons[i]);
    }

    for (let i = 0; i < nRows; i++) {
      for (let j = 0; j < nCols + i % 2; j++) {
        const p = rows[i][j];
        ctx.fillStyle = params.cscale(1).css();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.i * params.tCircle, 0, pix2);
        ctx.fill();
      }
    }
  }

  function drawHexagon(h) {
    for (let i = 1; i < 7; i++) {
      translatePoint(h[0], h[i]);
      translatePoint(h[0], h[i % 6 + 1]);
      if (params.lineWidth > 0) {
        drawHexLine(h[0], h[i], h[i % 6 + 1]);
      }
    }

    if (params.lineWidth1 > 0) {
      for (let i = 1; i < 7; i++) {
        drawLine1(h[i], h[i % 6 + 1]);
      }
    }

    if (params.lineWidth2 > 0) {
      for (let i = 1; i < 7; i++) {
        drawLine2(h[0], h[i]);
      }
    }
  }

  function drawHexLine(p0, p1, p2) {
    ctx.strokeStyle = params.cscale((p1.i + p2.i) / 2).css();
    ctx.lineWidth = (p1.i + p2.i) * params.lineWidth;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(p1.tx, p1.ty);
    ctx.lineTo(p2.tx, p2.ty);
    ctx.stroke();
  }

  function drawLine1(p1, p2) {
    ctx.strokeStyle = params.cscale((p1.i + p2.i) / 2).css();
    ctx.lineWidth = (p1.i + p2.i) * params.lineWidth1;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  function drawLine2(p1, p2) {
    ctx.strokeStyle = params.cscale((p1.i + p2.i) / 2).css();
    ctx.lineWidth = (p1.i + p2.i) * params.lineWidth2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.tx, p2.ty);
    ctx.stroke();
  }

  function translatePoint(p0, p1) {
    p1.tx = p0.x + (p1.x - p0.x) * params.scale;
    p1.ty = p0.y + (p1.y - p0.y) * params.scale;
  }

  function animate() {
    requestAnimationFrame(animate);
    updateCanvas();
  }

  function updateCanvas() {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = params.composite;
    updateGrid();
    drawGrid();
  }

  function onResize() {
    width = window.innerWidth;height = window.innerHeight;
    canvas.width = width;canvas.height = height;
    initGrid();
  }

  function rnd(min, max) {
    if (min === undefined) {min = 0;}
    if (max === undefined) {max = 1;}
    return Math.random() * (max - min) + min;
  }
}

App();