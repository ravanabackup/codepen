import React, {
useState,
useMemo,
useEffect,
useRef,
useCallback } from
"https://esm.sh/react@18";
import ReactDOM from "https://esm.sh/react-dom@18";
import { useControls } from "https://esm.sh/leva@0.9.35";
import { createNoise3D } from "https://esm.sh/simplex-noise@4.0.1";

const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

const getCol = () => {
  const min = 0;
  const max = 360;
  const excludeMin = 50;
  const excludeMax = 180;
  // Cut greens
  const range = Math.random() * (max - (excludeMax - excludeMin));
  if (range > excludeMin) return excludeMax + range;
  return range;
};

const rand = (min, max) => min + Math.random(max - min);

const opt = {
  size: 2,
  cols: 300,
  rows: 300,
  speed: 2,
  rot: 2 };


const Canvas = () => {
  const $canvas = useRef();
  const $ctx = useRef();
  const $bg = useRef();
  const mouse = useRef({ x: window.innerWidth * .5, y: window.innerHeight * .5, prevX: 0, prevY: 0, speed: 0 });
  const win = useRef({ w: 0, h: 0 });

  const grid = useRef([]);
  const line = useRef([]);
  const rafID = useRef();
  const noise = createNoise3D();

  /*--------------------
  Click
  --------------------*/
  const handleClick = e => {
    mouse.current.x = e.touches ? e.touches[0].clientX : e.clientX || win.current.w * .5;
    mouse.current.y = e.touches ? e.touches[0].clientY : e.clientY || win.current.h * .5;
    init();
  };

  /*--------------------
  Lines
  --------------------*/
  const lines = () => {
    const $c = $ctx.current;
    $c.globalCompositeOperation = 'screen';
    $c.lineWidth = 1;
    line.current.forEach((l, i) => {
      l.forEach(({ x, y }) => {
        const x1 = x - (win.current.w - opt.size * opt.cols) * .5;
        const y1 = y - (win.current.h - opt.size * opt.rows) * .5;

        if (x1 > 0 && x1 < opt.size * opt.cols && y1 > 0 && y1 < opt.size * opt.rows) {

          $c.save();
          $c.beginPath();
          $c.translate(x, y);
          const id = getCell(x1, y1);
          $c.moveTo(0, 0);


          const { rot } = grid.current[id + (i % 3 * Math.random() > .5 ? 1 : -1)];
          const newX = Math.sin(rot + Math.PI * .5) * opt.speed;
          const newY = Math.cos(rot - Math.PI * .5) * opt.speed;
          $c.lineTo(newX, newY);
          $c.stroke();
          $c.restore();

          if (!l.drawed) {
            line.current.push([{
              x: x + newX, y: y + newY }]);

            l.drawed = true;
          }
        }
      });
    });
  };

  /*--------------------
  Debug
  --------------------*/
  const debug = () => {
    const $c = $ctx.current;
    grid.current.forEach(({ x, y, rot }) => {
      $c.save();
      $c.fillStyle = 'rgba(255, 255, 255, .2)';
      $c.translate(x + opt.size * .5, y + opt.size * .5);
      $c.rotate(rot);
      $c.fillText('→', 0, 0);
      $c.restore();
    });
  };

  /*--------------------
  Draw
  --------------------*/
  const draw = () => {
    const $c = $ctx.current;
    if (!$c) return;
    $c.clearRect(0, 0, win.current.w, win.current.h);

    // debug()
    lines();

    rafID.current = requestAnimationFrame(draw);
  };

  /*--------------------
  Get Cell
  --------------------*/
  const getCell = (x, y) => {
    const id = Math.floor(y / opt.size) * opt.rows + Math.floor(x / opt.size);
    return id;
  };

  /*--------------------
  Create Grid
  --------------------*/
  const createGrid = () => {
    grid.current = [];
    let i = 0;
    const zoom = 0.005 + Math.random() * 0.01;
    const offset = Math.random() * 10;
    for (let y = 0; y < opt.rows; y++) {
      for (let x = 0; x < opt.cols; x++) {
        const gx = win.current.w * .5 - opt.size * opt.cols * .5 + x * 2;
        const gy = win.current.h * .5 - opt.size * opt.rows * .5 + y * 2;
        const rot = noise(x * zoom, y * zoom, offset) * Math.PI * opt.rot;
        grid.current.push({
          id: i,
          x: gx,
          y: gy,
          rot });

        i++;
      }
    }
  };

  /*--------------------
  Init
  --------------------*/
  const init = () => {
    if (!$canvas.current) return;
    const dpr = window.devicePixelRatio || 1;
    win.current.w = window.innerWidth;
    win.current.h = window.innerHeight;
    $canvas.current.width = win.current.w * dpr;
    $canvas.current.height = win.current.h * dpr;

    $ctx.current = $canvas.current.getContext('2d');
    $ctx.current.strokeStyle = 'rgba(255, 255, 255, .15)';
    $ctx.current.scale(dpr, dpr);

    $bg.current.style.background = `linear-gradient(${Math.random() * 360}deg, ${`hsl(${getCol()}, 90%, 40%, 1)`}, ${`hsl(${getCol()}, 90%, 40%, 1)`})`;

    line.current = [];
    createGrid();
    if (rafID.current) cancelAnimationFrame(rafID.current);
    draw();

    const triangleHeight = 300;
    const triangleWidth = Math.sqrt(3) * triangleHeight / 1.5;

    // Calcola le coordinate dei vertici del triangolo
    const vertices = [
    { x: -triangleWidth / 2, y: triangleHeight / 2 },
    { x: triangleWidth / 2, y: triangleHeight / 2 },
    { x: 0, y: -triangleHeight / 2 }];


    const n = 100;
    Array(n).fill('').forEach((_, i) => {
      const t = i / n;
      line.current.push([{
        x: window.innerWidth * .5 + lerp(vertices[0].x, vertices[1].x, t),
        y: window.innerHeight * .5 + lerp(vertices[0].y, vertices[1].y, t) }]);

    });
    Array(n).fill('').forEach((_, i) => {
      const t = i / n;
      line.current.push([{
        x: window.innerWidth * .5 + lerp(vertices[1].x, vertices[2].x, t),
        y: window.innerHeight * .5 + lerp(vertices[1].y, vertices[2].y, t) }]);

    });
    Array(n).fill('').forEach((_, i) => {
      const t = i / n;
      line.current.push([{
        x: window.innerWidth * .5 + lerp(vertices[2].x, vertices[0].x, t),
        y: window.innerHeight * .5 + lerp(vertices[2].y, vertices[0].y, t) }]);

    });
  };

  /*--------------------
  Start
  --------------------*/
  useEffect(() => {
    $ctx.current = $canvas.current.getContext('2d');
    window.addEventListener('resize', init);
    window.addEventListener('click', handleClick);
    init();

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(rafID.current);
    };
  }, []);

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("canvas", { className: "canvas", ref: $canvas }), /*#__PURE__*/
    React.createElement("div", { className: "bg", ref: $bg })));


};

const App = () => {
  return /*#__PURE__*/(
    React.createElement(Canvas, null));

};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));