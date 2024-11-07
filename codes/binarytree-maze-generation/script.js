function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class BinaryMaze {
  constructor(_cols, _rows) {_defineProperty(this, "getRandom",








    value => {
      return ~~(Math.random() * value);
    });_defineProperty(this, "getExpandex",


    (x, y) => {
      const index = this.cc + 1 + x * 2 + this.cc * 2 * y;
      return index;
    });_defineProperty(this, "generateMaze",

    (cols, rows) => {
      this.cellData = [];
      this.tCells = null;
      this.rows = rows;
      this.cols = cols;
      this.cr = 2 * rows + 1;
      this.cc = 2 * cols + 1;
      this.tCells = this.cr * this.cc;
      let str;
      // clear data set out //
      for (let d = 0; d < this.tCells; d += 1) {
        const x = d % this.cc;
        const y = (d - x) / this.cc;
        const oddCell = d & 1;
        const evenRow = y % 2;
        str = oddCell && evenRow ? 1 : oddCell ? 1 : evenRow ? 0 : 1;
        this.cellData[d] = str;
      }

      for (let r = 0; r < this.rows; r++) {
        for (let x = 0; x < this.cols; x++) {
          const y = this.rows - r - 1;
          // test cases //
          const canGoUp = y > 0;
          const canGoLeft = x < this.cols - 1;
          const coinFlip = this.getRandom(100) > 50;
          // get data cell based on array //
          const expandex = this.getExpandex(x, y);

          if (canGoUp && !canGoLeft || canGoUp && coinFlip) {
            this.cellData[expandex - this.cc] = 0;
          }
          if (!canGoUp && canGoLeft || canGoLeft && !coinFlip) {
            this.cellData[expandex + 1] = 0;
          }
        }
      }

      return this.cellData;
    });this.rows;this.cols;this.cr;this.cc;this.tCells;this.cellData = [];}}


const Can = new Canvas();
/** Parent Render Class */
class Render {
  constructor(element) {_defineProperty(this, "createGUI",



















    () => {
      this.options = {
        cols: this.cols,
        rows: this.rows,
        size: this.size };

      this.gui = new dat.GUI();
      const folderRender = this.gui.addFolder('Render Options');
      folderRender.add(this.options, 'rows', 1, 100).step(1).
      onFinishChange(value => {
        this.options.rows = value;
        this.setOptions(this.options);
      });
      folderRender.add(this.options, 'cols', 1, 100).step(1).
      onFinishChange(value => {
        this.options.cols = value;
        this.setOptions(this.options);
      });
      folderRender.add(this.options, 'size', 1, 50).step(1).
      onFinishChange(value => {
        this.options.size = value;
        this.setOptions(this.options);
      });
      // folderRender.open();
      this.setOptions(this.options);
    });_defineProperty(this, "setOptions",

    options => {
      this.mazeReturn = null;
      window.cancelAnimationFrame(this.animation);
      this.rows = options.rows || this.rows;
      this.cols = options.cols || this.cols;
      this.size = options.size || this.size;
      this.mazeReturn = this.maze.generateMaze(this.cols, this.rows);
      this.mazeWidth = this.maze.cc * this.size;
      this.mazeHeight = this.maze.cr * this.size;
      this.renderLoop();
    });_defineProperty(this, "resetCanvas",

    () => {
      window.cancelAnimationFrame(this.animation);
      const canvasReturn = Can.setViewport(this.canvas);
      this.canvas = canvasReturn.canvas;
      this.surface = canvasReturn.surface;
      this.width = canvasReturn.width;
      this.height = canvasReturn.height;
      this.renderLoop();
    });_defineProperty(this, "drawSquare",

    (point, color) => {
      const size = this.size;
      const xOffset = ~~(this.width / 2 - this.mazeWidth / 2);
      const yOffset = ~~(this.height / 2 - this.mazeHeight / 2);
      this.surface.fillStyle = color;
      this.surface.fillRect(
      xOffset + point.x * size,
      yOffset + point.y * size,
      size,
      size);

    });_defineProperty(this, "drawMap",

    () => {
      for (let d = 0; d < this.mazeReturn.length; d += 1) {
        const x = d % this.maze.cc;
        const y = ~~((d - x) / this.maze.cc);
        const hue =
        Math.sin(x * 0.015 + y * 0.015 + this.time * Math.PI / 180) * 360;
        const bc = this.mazeReturn[d] === 2 ?
        "#F0f0F0" :
        this.mazeReturn[d] === 1 ? "#000" : `hsl(${hue}, 100%, 50%)`;
        this.drawSquare({ x, y }, bc);
      }
      this.time += 0.1;
    });_defineProperty(this, "renderLoop",

    () => {
      this.surface.clearRect(0, 0, this.width, this.height);
      this.drawMap();
      this.animation = window.requestAnimationFrame(this.renderLoop);
    });this.element = element;this.size = 15;this.time = 0;this.maze = new BinaryMaze();const _canvasReturn = Can.createCanvas("canvas");this.canvas = _canvasReturn.canvas;this.surface = _canvasReturn.surface;this.width = _canvasReturn.width;this.height = _canvasReturn.height; // generate maze based on screen size //
    this.space = this.size * 2;this.rows = ~~((this.height - 100) / this.space);this.cols = ~~((this.width - 100) / this.space);this.createGUI();this.renderLoop(); // attach resize handler //
    window.addEventListener("resize", this.resetCanvas);}}
window.onload = () => {
  const demo = new Render(document.body);
};