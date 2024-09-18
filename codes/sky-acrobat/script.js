let editMode = false // set to false to hide the code editor on load
let resolution = 1  // set to .5 to start with half resolution on load

/*********
 * made by Matthias Hurrle (@atzedent)
 * 
 * A simple fragment shader editor with live preview.
 * Updates the shader code on every edit with a debounce time of 1 second.
 * Supports high DPI displays.
 * Shader errors are displayed in the editor and the line is highlighted.
 * Supports tab indentation (for single line only and not with selections).
 * Strores the shader code in local storage.
 * Revert to the default shader code with the reset button in the top right corner (most right).
 * Change the resolution with the button in the top right corner. 1 = 1x, 2 = 1/2x. 
 * Toggle the code editor with the button in the top right corner.
 * Default shader code is in the HTML.
 */

let gl

function compile(shader, source) {
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    document.dispatchEvent(new CustomEvent('shader-error', { detail: gl.getShaderInfoLog(shader) }))
  }
}

let program, vs, fs

function deleteShader() {
  gl.detachShader(program, vs)
  gl.detachShader(program, fs)
  gl.deleteShader(vs)
  gl.deleteShader(fs)
  gl.deleteProgram(program)
}

function setup() {
  vs = gl.createShader(gl.VERTEX_SHADER)
  fs = gl.createShader(gl.FRAGMENT_SHADER)

  compile(vs, vertexShader.textContent)
  compile(fs, codeEditor.value)

  program = gl.createProgram()

  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program))
  }
}

let vertices, buffer

function init() {
  vertices = [-1, 1, -1, -1, 1, 1, 1, -1,]

  buffer = gl.createBuffer()

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

  const position = gl.getAttribLocation(program, "position")

  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  program.resolution = gl.getUniformLocation(program, "resolution")
  program.time = gl.getUniformLocation(program, "time")
  program.touch = gl.getUniformLocation(program, "touch")
  program.pointerCount = gl.getUniformLocation(program, "pointerCount")
}

let dpr = Math.max(1, resolution * window.devicePixelRatio)

const mouse = {
  x: 0,
  y: 0,
  touches: new Set(),
  update: function (x, y, pointerId) {
    const editor = document.getElementById('codeEditor')
    // prevent touch events from updating mouse position when editor is visible
    if (!editor.classList.contains('hidden')) return
    this.x = x * dpr
    this.y = (innerHeight - y) * dpr
    this.touches.add(pointerId)
  },
  remove: function (pointerId) { this.touches.delete(pointerId) }
}

let frm
function loop(now) {
  if (program) {
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.uniform2f(program.resolution, canvas.width, canvas.height)
    gl.uniform1f(program.time, now * 1e-3)
    gl.uniform2f(program.touch, mouse.x, mouse.y)
    gl.uniform1i(program.pointerCount, mouse.touches.size)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
  frm = requestAnimationFrame(loop)
}

function start() {
  setup()
  init()
  resize()
  loop(0)
}

const storagekey = `fragmentSource${btoa(window.location)}`

function renderThis() {
  console.log('rendering...')

  error.innerHTML = ''
  indicator.style.visibility = 'hidden'

  error.blur()
  localStorage.setItem(storagekey, codeEditor.value)

  deleteShader()
  cancelAnimationFrame(frm)

  start()

  return { timer: null }
}

function render() {
  const delay = 1000 // 1 second default debounce time

  if (renderThis.timer) {
    clearTimeout(renderThis.timer)
  }
  renderThis.timer = setTimeout(renderThis, delay)
}

function handleKeydown(event) {
  if (event.key === "Tab") {
    event.preventDefault()

    const editor = this
    const start = editor.selectionStart
    const end = editor.selectionEnd

    editor.value = editor.value.substring(0, start) + "\t" + editor.value.substring(end)
    editor.selectionStart = editor.selectionEnd = start + 1
  }
}

function resize() {
  const { innerWidth: width, innerHeight: height } = window

  canvas.width = width * dpr
  canvas.height = height * dpr

  gl.viewport(0, 0, width * dpr, height * dpr)
}

function setError(message) {
  error.innerHTML = message

  const match = message.match(/ERROR: \d+:(\d+):/)
  const lineNumber = match ? parseInt(match[1]) : 0
  const overlay = document.createElement('pre')

  overlay.classList.add('overlay')
  overlay.textContent = '\n'.repeat(lineNumber)

  document.body.appendChild(overlay)

  const offsetTop = parseInt(getComputedStyle(overlay).height)

  indicator.style.setProperty('--top', offsetTop + 'px')
  indicator.style.visibility = 'visible'

  document.body.removeChild(overlay)
}

function toggleView() {
  for (const el of [indicator, codeEditor, error]) {
    el.classList.toggle('hidden')
  }
}

function reset() {
  codeEditor.value = fragmentShader.textContent
  render()
}

function toggleResolution() {
  resolution = btnToggleResolution.checked ? .5 : 1
  dpr = Math.max(1, resolution * window.devicePixelRatio)
  resize()
}

window.onload = function () {
  gl = canvas.getContext("webgl2")

  if (!editMode) { btnToggleView.checked = true; toggleView() }
  if (resolution === .5) { btnToggleResolution.checked = true; toggleResolution() }
  codeEditor.value = localStorage.getItem(storagekey) || fragmentShader.textContent

  codeEditor.addEventListener('keydown', handleKeydown)
  document.addEventListener('shader-error', e => setError(e.detail))
  codeEditor.addEventListener('scroll', () => indicator.style.setProperty('--scroll-top', codeEditor.scrollTop + 'px'))

  start()
}

window.onresize = resize
window.addEventListener("pointerdown", e => mouse.update(e.clientX, e.clientY, e.pointerId))
window.addEventListener("pointerup", e => mouse.remove(e.pointerId))
window.addEventListener("pointermove", e => {
  if (mouse.touches.has(e.pointerId))
    mouse.update(e.clientX, e.clientY, e.pointerId)
})