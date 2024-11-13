(() => {
  'use strict';
  window.addEventListener('load', () => {
    const CANVAS = document.getElementById('c'),
          C = CANVAS.getContext('2d');
    let ww = window.innerWidth,
        wh = window.innerHeight,
        r = 2,
        w = CANVAS.width = Math.floor(ww / r),
        h = CANVAS.height = Math.floor(wh / r),
        dl = Math.sqrt(w * w + h * h),
        cw = w / 2,
        cw2 = w / 2,
        ch = h / 2,
        ch2 = h / 2,
        i = C.createImageData(w, h),
        t = Date.now(), // time into math
        a = 0, // from here, variable using on formula
        b = 0,
        c = 0,
        d = 0,
        n = 10,
        mod1 = 5,
        mod2 = 3,
        mod3 = 4,
        mod4 = 2;
    
    /**
     * get color.
     */
    const getColor = (cx, cy, nx, ny) => {
      const index = (cy * w + cx) * 4;
      const t = 0.4 - 6 / (1 + nx * nx + ny * ny);
      const x = a + b * (nx * Math.cos(t) - ny * Math.tan(t));
      //const y = b * (nx * Math.sin(t) + ny * Math.cos(t));
      const A = a * (nx * nx + ny * ny) + b * nx * (nx * nx - 3 * ny * ny) + c;
      //const x = A * nx + d * (nx * nx - ny * ny);
      const y = A * ny - d * 2 * nx * ny;
      const z = Math.floor(x * x + y * y);
      /**
       * Referenced / Dillon-san
       * added mod r, g, b.
       * URL / https://codepen.io/Dillo/pen/RwowyrM?editors=0010
       */
      i.data[index] = z % mod1 === 0 ? 0x00 : 0xff;
      i.data[index + 1] = z % mod2 === 0 ? 0x00 : 0xff;
      i.data[index + 2] = z % mod3 === 0 ? 0x00 : 0xff;
      i.data[index + 3] = z % mod4 === 0 ? 0xff : 0x00;
    };
    
    /**
     * draw.
     */
    const draw = () => {
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = y * w + x;
          const ny = 1 / h * y - 0.5;
          const nx = 1 / w * x - 0.5;
          let dy, dx;
          if (i % 2 === 0) {
            dy = ch2 - y;
            dx = cw2 - x;
          } else {
            dy = ch - y;
            dx = cw - x;
          }
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ratio = (dl - dist) / dl;
          getColor(x, y, nx * nx * ratio, ny * ny * ratio);
        }
      }
      C.putImageData(i, 0, 0);
    };
    
    /**
     * update parameters.
     */ 
    const update = () => {
      a = Math.sin(t / 30000) * 10;
      b = Math.cos(t / 30000) * 10;
      c = Math.sin(t / 10000) * 10;
      d = Math.cos(t / 10000) * 10;
      ch = Math.sin(t / 2000) * 100;
      cw = Math.cos(t / 2000) * 200;
      ch2 = Math.cos(t / 2000) * 300;
      cw2 = Math.sin(t / 2000) * 400;
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
      dl = Math.sqrt(w * w + h * h);
      cw = w / 2;
      ch = h / 2;
      cw2 = cw;
      ch2 = ch;
      i = C.createImageData(w, h);
    }, false);
  }, false);
})();