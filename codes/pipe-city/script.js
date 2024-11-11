// Global stuff
var requestsPerFrame = 1, // how many animation frames are requested before a render pass is made
    hue_min = -170, // starting hue
    hue_max = 0; // ending hue 

var w, h, bWidth, bHeight, cols, rows; // vars
var body, computeMe, mazeRows; // DOM
var maze, animationFrame, animationFrameCount = 0, currentIndex = 0; // objects/control values

//      L M R
//    U ╔ ╦ ╗
//    M ╠ ╬ ╣
//    D ╚ ╩ ╝
//   VV ║
//   HH ═
//   SP █ (not used due to some browser differences)

// Base object of entities (with easy access names!)
var a = {
    ul: "&#x02554;", um: "&#x02566;", ur: "&#x02557;",
    ml: "&#x02560;", mm: "&#x0256C;", mr: "&#x02563;",
    dl: "&#x0255A;", dm: "&#x02569;", dr: "&#x0255D;",
    vv: "&#x02551;", hh: "&#x02550;"};

var r = [a.ul, a.um, a.ml, a.mm, a.dl, a.dm, a.hh], // Right connectors
    d = [a.ul, a.um, a.ur, a.ml, a.mm, a.mr, a.vv], // Down connectors
    ul = [a.mm, a.mr, a.dm, a.dr], // Both Left and Up connectors
    uo = [a.ml, a.dl, a.vv], // Up but not left connectors
    lo = [a.um, a.ur, a.hh], // Left but not Up conectors
    nn = [a.ul]; // doesnt connect up or left
     
function choosePiece(mazeArray, row, col) {
    var leftPiece = mazeArray[row][col - 1 >= 0 ? col - 1 : col],
        upperPiece = mazeArray[row - 1 >= 0 ? row - 1 : row][col],
        returnPiece;

    // These are a series of bits expressed as ints.  If I added a 3rd switch
    // it would be 4 or 0, and then a 4th switch would be 8 or 0.
    var isR = r.includes(leftPiece) && leftPiece !== undefined ? 1 : 0;
    var isD = d.includes(upperPiece) && upperPiece !== undefined ? 2 : 0;
    switch (isR + isD) {
        case 0:
            returnPiece = nn[randIntBetween(0, nn.length - 1)];
            break;
        case 1:
            returnPiece = lo[randIntBetween(0, lo.length - 1)];
            break;
        case 2:
            returnPiece = uo[randIntBetween(0, uo.length - 1)];
            break;
        case 3:
            returnPiece = ul[randIntBetween(0, ul.length - 1)];
            break;
    }
    return returnPiece;
}

function createMazeDOM(mazeArray, appendTo) {
    mazeArray.forEach(function (row, i) {
        var p = document.createElement('p');
        p.classList.add('maze-row');
        var output = '';
        row.forEach(function (e, j) {
            var span = document.createElement('span');
            span.classList.add('maze-piece');
            span.innerHTML = e;
            span.style.color = hsl2d(i, rows, j, cols);
            p.appendChild(span);
        });
        appendTo.appendChild(p);
    });
}

function hsl2d(x, xMax, y, yMax) {
    var h = Math.floor((y / yMax) * (hue_max - hue_min)) + hue_min;
    var s = 50 + '%';
    var l = Math.pow(x / xMax, 0.85) * 50 + '%';
    // var l = (xMax - x)/xMax * 100 + '%';
    // var l = '100%';
    return 'HSL(' + h + ',' + s + ',' + l + ')';
}

function randIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createMaze(mazeArray) {
    for (var i = 0; i < rows; i++) {
        mazeArray.push([]);
        for (var j = 0; j < cols; j++) {
            mazeArray[i][j] = choosePiece(mazeArray, i, j);
        }
    }
}

function initialize() {
    body = document.getElementsByTagName('body');
    computeMe = document.getElementById('compute-me');
    window.addEventListener('resize', resize, false);
}

function setup() {
    w = computeMe.offsetWidth;
    h = computeMe.offsetHeight;
    bWidth = body[0].offsetWidth;
    bHeight = parseFloat(window.getComputedStyle(body[0], null).getPropertyValue('height'));
    var margin = 2 * parseFloat(window.getComputedStyle(body[0], null).getPropertyValue('margin'));
    cols = Math.floor((bWidth - margin) / w);
    rows = Math.floor((bHeight - margin) / h);
    maze = [];
    createMaze(maze);
    clearMazeDOM();
    createMazeDOM(maze, body[0]);
    mazeRows = document.getElementsByClassName('maze-row');
    currentIndex = cols;
}

function draw() {
    animationFrameCount++;
    if (animationFrameCount === requestsPerFrame) {
        animationFrameCount = 0;
        if (currentIndex == cols) {
            currentIndex = 0; // this is how we get the typewriter effect.  This sets the array cursor to 0...
            maze.splice(0, 1); // ...this deletes the first row of the array (shifting the stack upwards)...
            maze.push([]); // ...and this pushes a new row on the array upon which is the thing being filled out at the bottom of the screen.
        }
        maze[rows - 1][currentIndex] = choosePiece(maze, rows - 1, currentIndex);
        Array.apply(null, mazeRows).forEach(function (row, i) {
            Array.apply(null, row.children).forEach(function (e, j) {
                e.innerHTML = maze[i][j] || '';
                if (maze[i][j] === a.sp) {
                  e.style.color = 'transparent';
                } else {
                  e.style.color = hsl2d(i, rows, j, cols);
                }
            });
        });
        currentIndex++;
    }
    animationFrame = requestAnimationFrame(draw);
}

function clearMazeDOM() {
    var deleteRange = document.getElementsByClassName('maze-row');
    var deleteIndex = deleteRange.length - 1;
    while (deleteRange.length > 0) {
        deleteRange.item(deleteIndex).remove();
        deleteIndex--;
    }
}

function resize() {
    clearMazeDOM();
    if (animationFrame !== undefined) {
        cancelAnimationFrame(animationFrame);
    }
    setup();
    draw();
}

// Do it!
initialize();
setup();
draw();