// https://github.com/klevron/threejs-toys
import { noisyLinesBackground } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js'

const bg = noisyLinesBackground({
  el: document.getElementById('app'),
  colors: [143811, 10932726],
  minStroke: 0.5,
  maxStroke: 2,
  timeCoef: 0.0002,
  coordScale: 2,
  displacementScale: 0.02
})

document.body.addEventListener('click', () => {
  bg.config.colors = [Math.random() * 0xffffff, Math.random() * 0xffffff, Math.random() * 0xffffff]
  bg.config.minStroke = Math.random() * 2
  bg.config.maxStroke = bg.config.minStroke + Math.random() * 5
  bg.drawTexture()

  bg.config.timeCoef = 0.000025 + Math.random() * 0.001
  bg.uniforms.uCoordScale.value = 0.5 + Math.random() * 4.5
  bg.uniforms.uDisplacementScale.value = 0.00025 + Math.random() * 0.01
})