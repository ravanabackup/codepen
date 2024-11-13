(() => {
  'use strict';
  window.addEventListener('load', () => {
    const CANVAS = document.getElementById('c'),
          C = CANVAS.getContext('2d');
    let ww = window.innerWidth,
        wh = window.innerHeight,
        r = 1.5,
        w = CANVAS.width = Math.floor(ww / r),
        h = CANVAS.height = Math.floor(wh / r),
        i = C.createImageData(w, h),
        t = Date.now(), // time into math
        a = 0, // from here, variable using on formula
        b = 0,
        c = 0,
        d = 0;
    
    /*
     * get color.
     */
    const getColor = (cx, cy, nx, ny) => {
      const index = (cy * w + cx) * 4;
      const A = a * (nx * nx + ny * ny) + b * nx * (nx * nx - 3 * ny * ny) + c;
      const x = A * nx + d * (nx * nx - ny * ny);
      const y = A * ny - d * 2 * nx * ny;
      const z = Math.floor(x * x + y * y);
      i.data[index] = 0x00;
      i.data[index + 1] = 0x00;
      i.data[index + 2] = 0x00;
      if (z % 4 === 0) {
        i.data[index + 3] = 0x00;
      } else {
        i.data[index + 3] = 0xff; 
      }
    };
    
    /**
     * draw.
     */
    const draw = () => {
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const ny = 2 / h * y - 1;
          const nx = 2 / w * x - 1;
          getColor(x, y, nx, ny);
        }
      }
      C.putImageData(i, 0, 0);
    };
    
    /**
     * update parameters.
     */ 
    const update = () => {
      a = Math.sin(t / 1000) * 5;
      b = Math.cos(t / 1000) * 5;
      c = Math.sin(t / 1000) * 5;
      d = Math.cos(t / 1000) * 5;
      t = Date.now();
    };
    
    /**
     * rendering.
     */
    const render = () => {
      draw();
      update();
      window.requestAnimationFrame(render);
    };
    
    render();
    
    /**
     * If window size is changed, change these.
     */
    window.addEventListener('resize', () => {
      ww = window.innerWidth;
      wh = window.innerHeight;
      w = CANVAS.width = Math.floor(ww / r);
      h = CANVAS.height = Math.floor(wh / r);
      i = C.createImageData(w, h);
    }, false);
  }, false);
})();