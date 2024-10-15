/* 
 * SHADER SESSION WITH MARIO CARRILLO
 * NOV 2023
 *
 * Mario Carrillo: 
 * https://twitter.com/marioecg
 * https://www.instagram.com/marioecg/
 *
 * We're curiouslyminded:
 * https://www.curiouslyminded.xyz
 * https://www.twitch.tv/curiouslyminded
 * https://www.youtube.com/curiouslyminded
 *
 */
let renderer;
let composer;

// GLSL Debugger in JS by Sean Zellmer:
// https://twitter.com/lejeunerenard
function shaderErrorView(errors, code) {
  // Alter code to display error
  const codeLines = code.trim().split('\n');
  const maxGutter = Math.floor(Math.log10(codeLines.length));
  const errorLines = codeLines.map(function (line, i) {
    i += 1; // Adjust for 1-indexed errors

    const lineNumWidth = Math.floor(Math.log10(i));
    const gutter = ' '.repeat(maxGutter - lineNumWidth) + i;

    // Error lineNumber is based on non-trimmed code which includes an empty first line
    const lineErrors = errors.filter((error) => error.lineNumber - 1 === i);
    const lineClass = lineErrors.length ? 'error-line' : '';
    let errorMessages = lineErrors.map((e) => '<span class="error">' + e.message + '</span>').join(', ');
    if (errorMessages !== '') errorMessages = ' ' + errorMessages;

    return `<span class="${lineClass}">${gutter}| ${line}${errorMessages}</span>`;
  });

  const container = document.createElement('div');
  container.classList.add('debug-drawer');
  document.body.classList.add('is-debugging');

  const pre = document.createElement('pre');
  const codeContainer = document.createElement('code');
  codeContainer.innerHTML = errorLines.join('\n');

  pre.appendChild(codeContainer);
  container.appendChild(pre);

  return container;
}

function checkForShaderErrors(renderer) {
  var errors = [];
  const currentScript = 'fragmentShader';

  var programs = renderer.info.programs;

  valid = true;
  var parseMessage = /^(?:ERROR|WARNING): \d+:(\d+): (.*)/gm; // Fixed threejs regex by adding `m` flag

  for (var i = 0, n = programs.length; i !== n; ++i) {
    var diagnostics = programs[i].diagnostics;

    if (diagnostics === undefined) continue;
    if (!diagnostics.runnable) valid = false;

    var shaderInfo = diagnostics[currentScript];
    var lineOffset = shaderInfo.prefix.split(/\r\n|\r|\n/).length;

    while (true) {
      var parseResult = parseMessage.exec(shaderInfo.log);
      if (parseResult === null) break;

      errors.push({
        lineNumber: parseResult[1] - lineOffset,
        message: parseResult[2],
      });
    } // messages

    break;
  } // programs

  return errors;
}

function init() {
  const container = document.getElementById('shadercollab');

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  composer = new GlslPipeline(renderer);

  let fragmentShader = resolveLygia(document.getElementById('fragment').textContent);

  composer.load(fragmentShader);

  resize();
  window.addEventListener('resize', resize);
}

function resize() {
  let width = window.innerWidth;
  let height = window.innerHeight;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  composer.setSize(width, height);
}

let runOnce = false;
function render() {
  composer.renderMain();

  if (!runOnce) {
    const errors = checkForShaderErrors(renderer);
    if (errors.length) {
      const overlay = shaderErrorView(errors, document.getElementById('fragment').textContent);
      document.body.appendChild(overlay);
    }
    runOnce = true;
  }

  requestAnimationFrame(render);
}

init();
render();