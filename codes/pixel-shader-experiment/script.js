;(function(window, document, undefined){
    var GL_Utils = {
        initWebGl: function(canvasId, fragmentShaderId, vertexShaderId) {
                GL_Utils.canvas      = document.getElementById( "canvas" ),
                vShaderCode = document.getElementById( fragmentShaderId ).textContent,
                fShaderCode = document.getElementById( vertexShaderId ).textContent;

            gl = GL_Utils.canvas.getContext( 'experimental-webgl' );

            if (!gl) {
                alert("Cannot create webgl context.");
                return;
            }

            GL_Utils.resizeCanvas(); // pas forcément idéal
            return GL_Utils.createProgram( vShaderCode, fShaderCode );
        },

        resizeCanvas: function() {
            if ( GL_Utils.canvas.width != GL_Utils.canvas.clientWidth ||
                GL_Utils.canvas.height != GL_Utils.canvas.clientHeight ) {

                GL_Utils.canvas.width        = GL_Utils.canvas.clientWidth;
                GL_Utils.canvas.height       = GL_Utils.canvas.clientHeight;
                
                params.screenWidth  = GL_Utils.canvas.width;
                params.screenHeight = GL_Utils.canvas.height;

                gl.viewport( 0, 0, GL_Utils.canvas.width, GL_Utils.canvas.height );
            }
        },

        createShader: function( src, type ) {
            var shader = gl.createShader( type );

            gl.shaderSource( shader, src );
            gl.compileShader( shader );

            if ( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) ) {
                alert( ( type == gl.VERTEX_SHADER ? "VERTEX" : "FRAGMENT" ) + " SHADER:\n" + gl.getShaderInfoLog( shader ) );
                return null;
            }

            return shader;
        },

        createProgram: function( vertex, fragment ) {
            var program = gl.createProgram(),
                vs = GL_Utils.createShader( vertex, gl.VERTEX_SHADER ),
                fs = GL_Utils.createShader( '#ifdef GL_ES\nprecision highp float;\n#endif\n\n' + fragment, gl.FRAGMENT_SHADER );

            if ( vs == null || fs == null ) return null;

            gl.attachShader( program, vs );
            gl.attachShader( program, fs );

            gl.deleteShader( vs );
            gl.deleteShader( fs );

            gl.linkProgram( program );

            if ( !gl.getProgramParameter( program, gl.LINK_STATUS ) ) {
                alert( "ERROR:\n" +
                    "VALIDATE_STATUS: " + gl.getProgramParameter( program, gl.VALIDATE_STATUS ) + "\n" +
                    "ERROR: " + gl.getError() + "\n\n" +
                    "- Vertex Shader -\n" + vertex + "\n\n" +
                    "- Fragment Shader -\n" + fragment );

                return null;
            }

            return program;
        },

        render: function() {
            // Render geometry
            var vertex_position; // ?
            gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
            gl.vertexAttribPointer( vertex_position, 2, gl.FLOAT, false, 0, 0 );
            gl.enableVertexAttribArray( vertex_position );
            gl.drawArrays( gl.TRIANGLES, 0, 6 );
            gl.disableVertexAttribArray( vertex_position );
        }

    }

    if (window.GL_Utils) console.error("GL_Utils existe déjà");

    window.GL_Utils = GL_Utils;

})(window, document);



// Main script
var gl, 
    buffer, 
    glProgram,
    varLocations = {},
    params = {  
        start_time  : new Date().getTime(), 
        time        : 0, 
        screenWidth : 0, 
        screenHeight: 0,
        mouse: {},
        clickSign : 1
    };

init();
params.mouse.x = params.screenWidth / 2;
params.mouse.y = params.screenHeight / 2;
animate();

function init() {
    glProgram = GL_Utils.initWebGl('canvas', 'vertexShader', 'fragmentShader');

    buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( [ 
        - 1.0, - 1.0, 
          1.0, - 1.0, 
        - 1.0,   1.0, 
          1.0, - 1.0, 
          1.0,   1.0, 
        - 1.0,   1.0 ] ), gl.STATIC_DRAW );

    getVariablesLocation();
}

function getVariablesLocation() {
    varLocations.time       = gl.getUniformLocation( glProgram, 'time' );
    varLocations.resolution = gl.getUniformLocation( glProgram, 'resolution' );
    varLocations.mouse      = gl.getUniformLocation( glProgram, 'mouse' );
}

function updateVariables() {
    gl.uniform1f( varLocations.time, params.time / 500 );
    gl.uniform2f( varLocations.resolution, params.screenWidth, params.screenHeight );
    gl.uniform2f( varLocations.mouse, params.mouse.x, params.mouse.y );
}

function animate() {
    updateShaders();
    GL_Utils.render();
    requestAnimationFrame( animate );
}

function updateShaders() {
    if ( !glProgram ) return;

    params.time = new Date().getTime() - params.start_time;

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    gl.useProgram( glProgram );

    updateVariables();
}

(function events() {
    window.addEventListener(
        'resize', 
        GL_Utils.resizeCanvas
    );
    window.addEventListener(
        'mousemove', 
        function(event) {
            params.mouse.x = event.clientX;
            params.mouse.y = event.clientY;
        }
    );
})();