(() => {
  'use strict';
  window.addEventListener('DOMContentLoaded', () => {
    const CANVAS = document.getElementById('c'),
          C = CANVAS.getContext('2d');
    let w = CANVAS.width = window.innerWidth,
        h = CANVAS.height = window.innerHeight,
        hw = w / 2, // center width
        hh = h / 2, // center height
        version = 'particle', // version particle or line
        x = 0.1, // init x
        y = 0.1, // init y
        r = 2, // radius or line width
        s = 100, // scale
        itr = 1000, // number of iteration
        color = 0, // init color
        gco = 'lighter', // global composite operation value
        t = Date.now(), // time into math
        a = 1, // from here, variable using on formula
        b = 0,
        c = -1.9,
        d = -0.4;
    
    /**
     * draw particle.
     * @param {Number} x, y | Vectors
     */
    const particle = (x, y) => {
      C.beginPath();
      C.arc(x * s, y * s, r, 0, Math.PI * 2, false);
      C.fill();
    };
    
    /**
     * draw line.
     * @param {Number} x, y, i | Vectors, index
     */
    const line = (x, y, i) => {
      if (i === 0) {
        C.beginPath();
        C.moveTo(x * s, y * s);
      } else {
        C.lineTo(x * s, y * s);
      }
      if (i === itr - 1) C.stroke();
    };
    
    /**
     * draw all.
     */
    const draw = () => {
      C.save();
      C.fillStyle = 'hsl(' + color +', 80%, 60%)';
      C.strokeStyle = 'hsl(' + color +', 80%, 60%)';
      C.lineWidth = r;
      C.globalCompositeOperation = gco;
      C.translate(hw, hh);
      for (let i = 0; i < itr; i++) {
        if (version === 'particle') particle(x, y);
        if (version === 'line') line(x, y, i);
        /**
         * referenced formula.
         * nx, ny are meaning next x, next y.
         * @type {Number}
         */
        const A = a * (x * x + y * y) + b * x * (x * x - 3 * y * y) + c;
        const nx = A * x + d * (x * x - y * y);
        const ny = A * y - d * 2 * x * y;
        x = nx;
        y = ny;
      }
      C.restore();
    };
    
    /**
     * update parameters.
     */ 
    const update = () => {
      a = Math.sin(t / 1000) * 1;
      //b = Math.cos(t / 1000) * 1;
      //c = Math.cos(t / 1000) * 2;
      //d = Math.cos(t / 1000) * 1;
      x = Math.sin(t / 1000) * 0.1;
      y = Math.cos(t / 1000) * 0.1;
      s = Math.cos(t / 1000) * 50;
      //r = Math.sin(t / 1000) * 10 + 1;
      color = Math.sin(t / 1000) * 360;
      t = Date.now();
      /**
       * If value is negative, reverse these.
       */
      if (r < 0) r *= -1;
      if (color < 0) color *= -1;
    };
    
    /**
     * rendering.
     */
    const render = () => {
      /**
       * clear canvas.
       */
      //C.clearRect(0, 0, w, h);
      
      /**
       * If need after image.
       */
      C.globalCompositeOperation = 'darken';
      C.globalAlpha = 0.1;
      C.fillStyle = 'rgb(0, 0, 0)';
      C.fillRect(0, 0, w, h);
      C.globalCompositeOperation = 'source-over';
      C.globalAlpha = 1;
      draw();
      update();
      window.requestAnimationFrame(render);
    };
    
    render();
    
    /**
     * If window size is changed, change these.
     */
    window.addEventListener('resize', () => {
      w = CANVAS.width = window.innerWidth;
      h = CANVAS.height = window.innerHeight;
      hw = w / 2;
      hh = h / 2;
    }, false);
    
    /**
     * change particle or line
     */
    CANVAS.addEventListener('click', () => {
      if (version === 'particle') {
        version = 'line';
      } else {
        version = 'particle';
      }
    }, false);
  }, false);
})();