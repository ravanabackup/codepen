function main() {
  const canvas = document.getElementById('custom-background');
  const gl = canvas.getContext('webgl');

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]),
  gl.STATIC_DRAW);


  const vertexShader = gl.createShader(gl.VERTEX_SHADER);

  gl.shaderSource(vertexShader, `
        precision highp float;

        attribute vec2 a_position;

        void main() {
            gl_Position = vec4(a_position, 0, 1);
        }
    `);

  gl.compileShader(vertexShader);

  console.log(gl.getShaderInfoLog(vertexShader));

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(fragmentShader, `
        precision highp float;

        uniform float u_time;
        uniform float u_canvas_width;
        uniform float u_canvas_height;

        float rand(vec2 seed);
        float noise(vec2 position);

        void main() {
            float ratio = u_canvas_width / u_canvas_height;
            float size = max(u_canvas_width, u_canvas_height);
            vec2 xy = vec2(
                gl_FragCoord.x / u_canvas_width * ratio,
                gl_FragCoord.y / u_canvas_height
            );

            /* These "completely random" values make the pattern */
            float value = 0.5
                + 0.4 * noise(2.0 * xy)
                + 0.2 * noise(7.0 * xy)
                + 0.1 * noise(13.0 * xy)
                + 0.05 * noise(27.0 * xy);

            float color = 0.1;
            float test = sin(200.0 * value + u_time);
            float threshold = 0.85;
            float amplitude = 3.0;

            if (test > threshold) {
                color += amplitude * sin(test - threshold);
            }

            gl_FragColor = vec4(vec3(color), 1.0);
        }

        float rand(vec2 seed) {
            return fract(sin(dot(seed, vec2(12.9898,78.233))) * 43758.5453123);
        }

        float noise(vec2 position) {
            vec2 block_position = floor(position);

            /* top left, top right, bottom left, bottom right */
            float tl = rand(block_position);
            float tr = rand(block_position + vec2(1.0, 0.0));
            float bl = rand(block_position + vec2(0.0, 1.0));
            float br = rand(block_position + vec2(1.0, 1.0));

            vec2 computed_value = smoothstep(0.0, 1.0, fract(position));

            return mix(tl, tr, computed_value.x)
                + (bl  - tl)  * computed_value.y * (1.0 - computed_value.x)
                + (br - tr) * computed_value.x * computed_value.y
                - 0.5;
        }
    `);

  gl.compileShader(fragmentShader);

  console.log(gl.getShaderInfoLog(fragmentShader));

  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const vertexPositionAttr = gl.getAttribLocation(program, 'a_position');

  gl.enableVertexAttribArray(vertexPositionAttr);
  gl.vertexAttribPointer(vertexPositionAttr, 2, gl.FLOAT, false, 0, 0);

  gl.useProgram(program);

  function updateCanvasSize() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.uniform1f(
    gl.getUniformLocation(program, 'u_canvas_width'),
    canvas.width);


    gl.uniform1f(
    gl.getUniformLocation(program, 'u_canvas_height'),
    canvas.height);

  }

  updateCanvasSize();

  window.addEventListener('resize', updateCanvasSize);

  function draw(timeStamp) {
    gl.uniform1f(
    gl.getUniformLocation(program, 'u_time'),
    timeStamp / 1000.0);


    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

document.addEventListener('DOMContentLoaded', main);