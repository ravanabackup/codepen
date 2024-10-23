window.onload = loadScene;

var canvas, gl,
    ratio,
    vertices,
    velocities,
    freqArr,
    cw,
    ch,
    colorLoc,
    thetaArr,
    velThetaArr,
    velRadArr0,
    velRadArr1,
    boldRateArr,
    drawType,
    numLines = 10000;
var target = [];
var randomTargetXArr = [], randomTargetYArr = [];
drawType = 2;


/**
 * Initialises WebGL and creates the 3D scene.
 */
function loadScene() {
    //    Get the canvas element
    canvas = document.getElementById("c");
    //    Get the WebGL context
    gl = canvas.getContext("experimental-webgl");
    //    Check whether the WebGL context is available or not
    //    if it's not available exit
    if (!gl) {
        alert("There's no WebGL context available.");
        return;
    }
    //    Set the viewport to the canvas width and height
    cw = window.innerWidth;
    ch = window.innerHeight;
    canvas.width = cw;
    canvas.height = ch;
    gl.viewport(0, 0, canvas.width, canvas.height);

    //    Load the vertex shader that's defined in a separate script
    //    block at the top of this page.
    //    More info about shaders: http://en.wikipedia.org/wiki/Shader_Model
    //    More info about GLSL: http://en.wikipedia.org/wiki/GLSL
    //    More info about vertex shaders: http://en.wikipedia.org/wiki/Vertex_shader

    //    Grab the script element
    var vertexShaderScript = document.getElementById("shader-vs");
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderScript.text);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        alert("Couldn't compile the vertex shader");
        gl.deleteShader(vertexShader);
        return;
    }

    //    Load the fragment shader that's defined in a separate script
    //    More info about fragment shaders: http://en.wikipedia.org/wiki/Fragment_shader
    var fragmentShaderScript = document.getElementById("shader-fs");
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderScript.text);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        alert("Couldn't compile the fragment shader");
        gl.deleteShader(fragmentShader);
        return;
    }

    //    Create a shader program.
    gl.program = gl.createProgram();
    gl.attachShader(gl.program, vertexShader);
    gl.attachShader(gl.program, fragmentShader);
    gl.linkProgram(gl.program);
    if (!gl.getProgramParameter(gl.program, gl.LINK_STATUS)) {
        alert("Unable to initialise shaders");
        gl.deleteProgram(gl.program);
        gl.deleteProgram(vertexShader);
        gl.deleteProgram(fragmentShader);
        return;
    }
    gl.useProgram(gl.program);
    var vertexPosition = gl.getAttribLocation(gl.program, "a_position");
    gl.enableVertexAttribArray(vertexPosition);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);


    gl.enable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    var vertexBuffer = gl.createBuffer();
    //    Bind the buffer object to the ARRAY_BUFFER target.
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    //    Specify the vertex positions (x, y, z)

    // ------------------

    setup();

    // ------------------


    vertices = new Float32Array(vertices);
    velocities = new Float32Array(velocities);

    /*
    thetaArr = new Float32Array(thetaArr);
    velThetaArr = new Float32Array(velThetaArr);
    velRadArr = new Float32Array(velRadArr);*/


    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    var vertexPosAttribLocation = gl.getAttribLocation(gl.program, "a_position");
    gl.vertexAttribPointer(vertexPosAttribLocation, 2.0, gl.FLOAT, false, 0, 0);
    var resolutionLocation = gl.getUniformLocation( gl.program, "u_resolution" );
    gl.uniform2f( resolutionLocation, window.innerWidth, window.innerHeight );

    animate();
    //setTimeout(timer, 1500);
}
var count = 0;
var cn = 0;

function animate() {
    requestAnimationFrame(animate);
    drawScene();
}


function drawScene() {
    draw();

    gl.lineWidth(1);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //gl.drawArrays( gl.LINES_STRIP, 0, numLines );
    gl.drawArrays(gl.LINES, 0, numLines);
    //gl.drawArrays( gl.QUAD_STRIP, 0, numLines );

    gl.flush();
}

// ===================================

function setup() {

    vertices = [];
    velThetaArr = [];

    velRadArr0 = [];
    velRadArr1 = [];

    ratio = cw / ch;
    velocities = [];
    thetaArr = [];
    freqArr = [];
    boldRateArr = [];

    // -------------------------------
  var windowRad = Math.min(window.innerWidth, window.innerHeight)/2;

    for (var ii = 0; ii < numLines; ii++) {
        var rad  = (windowRad * (.95 * Math.random()) );
        var rad2 = (200 + 40 * Math.random());
        var theta = Math.random() * Math.PI * 2;
        var velTheta = (Math.random() * .2 + .8) * Math.PI * 2 / 200;
        var freq = Math.random() * 0.12 + 0.03;
        var boldRate = Math.random() * .04 + .01;
        var randomPosX = (Math.random() * 2  - 1) * window.innerWidth / window.innerHeight;
        var randomPosY = Math.random() * 2 - 1;

        vertices.push(rad * Math.cos(theta), rad * Math.sin(theta));
        vertices.push(rad * Math.cos(theta), rad * Math.sin(theta));

        thetaArr.push(theta);
        velThetaArr.push(velTheta);

        velRadArr0.push(rad);
        velRadArr1.push(rad2);

        freqArr.push(freq);
        boldRateArr.push(boldRate);


        randomTargetXArr.push(randomPosX);
        randomTargetYArr.push(randomPosY);
    }

    freqArr = new Float32Array(freqArr);

}

// -------------------------------


// ===================================
// -------------------------------

function draw() {



    cn += .1;

    var i, n = vertices.length, p, bp;
    var px, py;
    var p2X, p2Y;
    var pTheta;
    var rad;
    var num;

    for (i = 0; i < numLines * 2; i += 2) {
        bp = i * 2;
        //vertices[bp] = vertices[bp + 2];
        //vertices[bp + 1] = vertices[bp + 3];

        num = parseInt(i / 2);
        pTheta = thetaArr[num];

        pTheta = pTheta + velThetaArr[num];
        thetaArr[num] = pTheta;

        rad = velRadArr0[num];

        px = rad * Math.cos(pTheta);
        py = rad * Math.sin(pTheta);

        vertices[bp + 2] = px;
        vertices[bp + 3] = py;

        //rad = velRadArr1[num];
        //px = rad * Math.cos(pTheta + Math.PI);
        //py = rad * Math.sin(pTheta + Math.PI);

        //vertices[bp] = px;
        //vertices[bp + 1] = px;




        /*
        count += .3;
        bp = i * 3;
        // copy old positions

        vertices[bp] = vertices[bp + 3];
        vertices[bp + 1] = vertices[bp + 4];

        num = parseInt(i / 2);
        pTheta = thetaArr[num];

        rad = velRadArr[num];// + Math.cos(pTheta + i * freqArr[i]) *  boldRateArr[num];

        pTheta = pTheta + velThetaArr[num];
        thetaArr[num] = pTheta;

        px = vertices[bp + 3];
        px = rad * Math.cos(pTheta) * 0.1 + px;
        vertices[bp + 3] = px;


        //py = (Math.sin(cn) + 1) * .2 * (Math.random() * .5 - .25);
        py = vertices[bp + 4];

        py = py + rad * Math.sin(pTheta) * 0.1;
        //p *= ( Math.random() -.5);
        vertices[bp + 4] = py;*/
    }
}

// -------------------------------


function timer() {
    drawType = (drawType + 1) % 3;

    setTimeout(timer, 1500);
}