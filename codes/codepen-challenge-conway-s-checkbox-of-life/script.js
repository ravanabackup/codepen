// The is i the classname of the root element
const ROOTCLASSNAME = 'checkbox_gameoflife';
// The regex for the cell index
const CELLINDEXREGEX = /cell-(\d+)-(\d+)/;
// This is just the default state for the board. Sets up a basic initial condition with yields a decent animation
const DEFAULTBOARD = JSON.parse(`
[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]`);

/**
 * The Game class.
 *
 * We use Getters/setters for both principle properties (x & y).
 *
 * @class Game
 * @author Liam Egan <liam@wethecollective.com>
 * @version 0.1.0
 * @created July 16, 2018
 */
class Game {

  /**
   * The Game constructor.
    *
    * If width and height aren't set it will default to 20 x 20.
    * These units are basically the number of checkboxes in each column.
   *
   * @constructor
   * @param {number} w 				The board width, in whole numbers.
   * @param {number} h 				The board height, in whole numbers.
   */
  constructor(w, h) {

    if (w > 0) {
      this._width = w;
    }
    if (h > 0) {
      this._height = h;
    }

    this.init();
  }

  /**
   * Initialises the game board.
   * This is called both on construction and whenever the board dimensions are changed.
   *
   * @public
  */
  init() {
    this._grid = [];
    for (let i = 0; i < this.height; i++) {
      this._grid[i] = [];
      for (let j = 0; j < this.width; j++) {
        try {
          this._grid[i][j] = DEFAULTBOARD[i][j];
        } catch (e) {}
      }
    }
  }

  /**
   * Retrieves an "alive" state for an index in its current generation.
   * If the index is outside of the board's limits, it returns 0 (or "dead")
   *
   * @public
  * @param {number} x 				The x coord
  * @param {number} y 				The y coord
   */
  getItemForIndex(x, y) {
    // This just wraps the coordinates around.
    // If you want the boundaries of the simulation to null the
    // animation instead, just comment the following if/thens out
    if (x >= this.width) {
      x = -1 + x - this.width + 1.;
    } else if (x < 0) {
      x = this.width + x;
    }
    if (y >= this.width) {
      y = -1 + y - this.width + 1.;
    } else if (y < 0) {
      y = this.width + y;
    }

    // This retrieves the stat for a valid grid position, or else returns 0
    if (this._grid[y] != undefined) {
      if (this._grid[y][x] != undefined) {
        return this._grid[y][x];
      }
    }
    return 0;
  }

  /**
   * Sets an "alive" state for an index.
   *
   * @public
  * @param {number} x 				The x coord
  * @param {number} y 				The y coord
  * @param {number} value 		The alive state, 0 or 1
   */
  setItemForIndex(x, y, value) {
    if (value >= 0 || value <= 1) {
      this._grid[y][x] = value;

      this.getStateForIndex(x, y);
    }
  }

  /**
   * Retrieves a calculated "alive" state for an index.
   * This can be considered the next generation from now.
   * basically what we're doing here is looping through all of the neighbours for this
   * cell and then determining whether this cell should be alive or dead based on the results.
   *
   * @public
  * @param {number} x 				The x coord
  * @param {number} y 				The y coord
   */
  getStateForIndex(x, y) {
    let state = this.getItemForIndex(x, y);
    let neighbours = 0;

    // Loop through the 8 neighbouring cells and add their state to the neighbour index
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let _x = x + j;
        let _y = y + i;

        if (_x !== x || _y !== y) {
          neighbours += this.getItemForIndex(_x, _y);
        }
      }
    }

    // If this cell is alive and we have fewer than two (starvation) or 
    // greater than 3 (overpopulation) neighbours, kill this cell.
    if (state === 1) {
      if (neighbours < 2 || neighbours > 3) {
        state = 0;
      }

      // If this cell is empty and we have exactly 3 neighbours
      // come alive.
    } else if (state === 0) {
      if (neighbours === 3) {
        state = 1;
      }
    }

    return state;
  }

  /**
   * Toggle the playing state on or off.
   *
   * @public
   */
  togglePlaying() {
    this.playing = !this.playing;
    return this.playing;
  }

  /**
   * Loop through the whole grid and solve for the next generation.
   *
   * @public
   */
  solve() {
    let newgrid = [];
    for (let i = 0; i < this.height; i++) {
      newgrid[i] = [];
      for (let j = 0; j < this.width; j++) {
        // Get the next generation's state for this index
        newgrid[i][j] = this.getStateForIndex(j, i);
        // Find the checkbox for this index
        let checkbox = document.querySelector(`.${ROOTCLASSNAME}__row__cell.cell-${j}-${i}`);
        // if it exists, set its checked state
        if (checkbox) {
          checkbox.checked = newgrid[i][j] === 1;
        }
      }
    }

    // Finally, set the current grid with this new generation.
    this._grid = newgrid;
  }

  /**
   * Render the simulation.
   * This function should only ever be called as a part of a request
   *  animation frame system.
   *
   * @private
  * @param {number} delta 		The delta value passed to the function from Request animation frame
   */
  render(delta) {
    // This pattern just limits the rendering to a specific timeframe.
    let time = delta - this.lastTime;
    if (time > this.speed) {
      this.lastTime = delta;

      this.solve();
    }

    if (this.playing) {
      requestAnimationFrame(this.render.bind(this));
    }
  }

  /**
  * (getter/setter) The speed of the simulation, in MS.
  *
  * @type {number}
  * @default 200
  */
  set speed(value) {
    if (value > 0) {
      this._speed = value;
    }
  }
  get speed() {
    return this._speed || 200;
  }

  /**
  * (getter/setter) The time of the last render
  *
  * @type {number}
  * @default 0
  */
  set lastTime(value) {
    if (value > 0) {
      this._lastTime = value;
    }
  }
  get lastTime() {
    return this._lastTime || 0;
  }

  /**
  * (getter/setter) The width of the simulation, in cells.
  *
  * @type {number}
  * @default 10
  */
  set width(value) {
    if (value > 0) {
      this._width = value;
      this.init();
    }
  }
  get width() {
    return this._width || 10;
  }

  /**
  * (getter/setter) The height of the simulation, in cells.
  *
  * @type {number}
  * @default 20
  */
  set height(value) {
    if (value > 0) {
      this._height = value;
      this.init();
    }
  }
  get height() {
    return this._height || 20;
  }

  /**
  * (getter/setter) The playign state.
   * Setting this to true will initiate a Request Animation Frame loop.
  *
  * @type {boolean}
  * @default false
  */
  set playing(value) {
    let _playing = this.playing;
    this._playing = value === true;

    if (_playing === false && value === true) {
      requestAnimationFrame(this.render.bind(this));
    }
  }
  get playing() {
    return this._playing === true;
  }}


/**
 * The View class.
 *
 * This class just takes a Game instance and renders it in HTML (specifically in checkboxed :))
 *
 * @class View
 * @author Liam Egan <liam@wethecollective.com>
 * @version 0.1.0
 * @created July 16, 2018
 */
class View {
  /**
   * The View constructor.
   *
   * @constructor
   * @param {Game} game 				The instance of the Game class to use for this simulation
   */
  constructor(game) {
    this.game = game;

    // This just adds a click listener to the document for event delegation
    document.addEventListener('click', this.onClick.bind(this));
  }

  /**
   * Callback for the click event
   * Finds the class of the clicked element and executes the appropriate actions.
   *
   * @private
   */
  onClick(e) {
    // Toggle Play / Pause based on the button
    if (e.target.className == `${ROOTCLASSNAME}__playpause`) {
      let playing = this.game.togglePlaying();
      if (playing) {
        e.target.innerText = 'Pause';
      } else {
        e.target.innerText = 'Play';
      }

      // Step forward in the simulation by 1 generation
    } else if (e.target.className == `${ROOTCLASSNAME}__step`) {
      this.game.solve();

      // Resets the simulation to its base state
    } else if (e.target.className == `${ROOTCLASSNAME}__reset`) {
      this.game.init();
      this.render();

      // Handle changing the cell status when clicking on a checkbox.
    } else if (e.target.className.indexOf(`${ROOTCLASSNAME}__row__cell`) > -1) {
      let cellDetails = CELLINDEXREGEX.exec(e.target.className);
      let x = Number(cellDetails[1]);
      let y = Number(cellDetails[2]);
      this.game.setItemForIndex(x, y, e.target.checked ? 1 : 0);
    }
  }


  /**
   * Render the simulation
   * This just renders all or the elements.
   *
   * @public
   */
  render() {
    let el = document.querySelector('.' + ROOTCLASSNAME);

    if (el) {
      el.parentNode.removeChild(el);
    }

    el = document.createElement('div');
    el.className = ROOTCLASSNAME;

    let game = document.createElement('div');
    game.className = `${ROOTCLASSNAME}__game`;
    el.appendChild(game);

    let controls = document.createElement('div');
    controls.className = `${ROOTCLASSNAME}__controls`;
    el.appendChild(controls);

    document.body.appendChild(el);

    for (let y = 0; y < this.game.height; y++) {
      let row = document.createElement('div');
      row.className = ROOTCLASSNAME + "__row";
      for (let x = 0; x < this.game.width; x++) {
        let cell = document.createElement('input');
        cell.type = "checkbox";
        cell.className = `${ROOTCLASSNAME}__row__cell cell-${x}-${y}`;
        cell.checked = this.game.getItemForIndex(x, y) === 1;
        row.appendChild(cell);
      }
      game.appendChild(row);
    }

    let playpause = document.createElement('button');
    playpause.className = `${ROOTCLASSNAME}__playpause`;
    playpause.innerText = this.game.playing ? 'Pause' : 'Play';
    controls.appendChild(playpause);

    let step = document.createElement('button');
    step.className = `${ROOTCLASSNAME}__step`;
    step.innerText = 'Step';
    controls.appendChild(step);

    let reset = document.createElement('button');
    reset.className = `${ROOTCLASSNAME}__reset`;
    reset.innerText = 'Reset';
    controls.appendChild(reset);

  }}


// Initialise the Game instance
let game = new Game(30, 30);
game.playing = location.pathname.match(/fullcpgrid/i) != undefined;
// Initialise the view instance
let view = new View(game);

view.render();