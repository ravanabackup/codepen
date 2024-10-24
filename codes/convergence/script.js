import Color from "https://colorjs.io/dist/color.js";
const query = document.querySelector.bind(document)
const { random: rand, round, floor, abs, min, max, pow, cos, PI: π } = Math
const random = (min, max) => {
  if (max) return min + random() * (max - min)
  return rand()
}

const Settings = {
  get width() { return window.innerWidth },
  get height() { return window.innerHeight },
  fps: 120,
  realm: {
    resolution: 20,
    scale: 10,
    startingHue: 260,
    hueRange: 60
  },
  possibilities: {
    num: 5,
    delayBetween: 1600,
    gradient: [
      new Color('indigo'),
      new Color('orchid'),
    ],
    surfaceStyle(color) {
      return color.mix('#fff1', .5)
    },
    cartoonish: false,
    convergeAt: 12, // times canvas height
    scale: 250,
    horizontalDrift: 3,
    numVoidCracks: [2, 8],
    voidScaleX: 2, // times possibility size
    voidScaleY: .5,
    voidDrift: 3,
    voidStyle(color) {
      return color.mix('#501', .2) 
    },
    voidShade(color) {
      return color.mix('#501', .5) 
    },
    shape: 0, // see Shapes below
    baseThickness: 1/600 // relative to width
  },
  // may slow down rendering
  displacementEffect: false
}

const Shapes = {
  0: 'circle',
  1: 'sun'
}

const arc = (ctx, { x, y, width, startAngle, endAngle }) => {
  ctx.beginPath()
  ctx.arc(x, y, width / 2, startAngle * π/180, endAngle * π/180)
  return {
    fill(style) {
      ctx.fillStyle = style
      ctx.fill()
    },
    stroke(style) {
      ctx.strokeStyle = style
      ctx.stroke()
    }
  }
}

const circle = (ctx, { x, y, width }) => {
  ctx.beginPath()
  ctx.arc(x, y, width / 2, 0, 2 * π)
  return {
    fill(style) {
      ctx.fillStyle = style
      ctx.fill()
    },
    stroke(style) {
      ctx.strokeStyle = style
      ctx.stroke()
    }
  }
}

const square = (ctx, { x, y, width, height }) => {
  ctx.beginPath()
  ctx.rect(x, y, width, height || width)
  return {
    fill(style) {
      ctx.fillStyle = style
      ctx.fill()
    },
    stroke(style) {
      ctx.strokeStyle = style
      ctx.stroke()
    }
  }
}

const rotate = (ctx, { origin, angle }) => {
  ctx.translate(origin.x, origin.y)
  ctx.rotate(angle * π / 180)
  ctx.translate(-origin.x, -origin.y)
}

const drawSun = (ctx, {
  x: _x,
  y: _y,
  width,
  style,
  strokeStyle,
  angle
}) => {
  const origin = { x: _x, y: _y }
  const x = _x - width / 2
  const y = _y - width / 2
  ctx.lineWidth = 1
  ctx.save()
  for (let i = 0; i < 3; i++) {
    const initialAngle = i === 0 ? angle : 0
    rotate(ctx, { angle: initialAngle + 30, origin })
    square(ctx, { x, y, width }).stroke(strokeStyle)
    square(ctx, { x, y, width }).fill(style)
  }
  ctx.restore()
}

const drawCircle = (ctx, { x, y, width, style, strokeStyle, cartoonish }) => {
  circle(ctx, { x, y, width }).fill(style)
  circle(ctx, { x, y, width }).stroke(strokeStyle)
  arc(ctx, {
    x,
    y,
    width: width * .98,
    startAngle: -225,
    endAngle: -45
  }).stroke(style.mix('pink', .25))
  if (cartoonish) {
    arc(ctx, {
      x,
      y,
      width: width * (1.3 + random() * .25),
      startAngle: random() * 360,
      endAngle: random() * 360
    }).stroke(style.mix('white', .3))
  }
}

const drawVoid = (ctx, {
  x,
  y,
  possibilityWidth,
  initialAngle,
  num,
  style,
  shadowStyle,
  scaleX,
  scaleY,
  drift,
  timeline
}) => {
  const origin = { x, y }
  ctx.save()
  rotate(ctx, { angle: initialAngle, origin })
  for (let i = 0; i < num; i++) {
    const angle = 360 / num
    rotate(ctx, { angle, origin })
    let voidWidth = 0
    let voidX = x
    let voidY = y - (possibilityWidth / 2)
    while (voidY < y) {
      voidX += (noise.simplex2(
        voidX / (possibilityWidth * scaleX),
        voidY / (possibilityWidth * scaleY)
      ) * drift)
      voidY += .5 + timeline * 2
      voidWidth += .3 + timeline / 2.5
      const shadowOffset = voidWidth / 10
      circle(ctx, {
        x: voidX - shadowOffset,
        y: voidY,
        width: voidWidth
      }).fill(shadowStyle)
      if (timeline > .3) {
        circle(ctx, {
          x: voidX,
          y: voidY,
          width: voidWidth
        }).fill(style)
      }
    }
  }
  ctx.restore()
}

const interpolateCircular = ({ input, output }) => {
  return output * cos((input) * π - π/2)
}

const grid = (resY, resX) => {
  return Array(resY).fill(Array(resX || resY).fill(true))
}

const setupCanvas = ({ selector, width, height }) => {
  const canvas = query(selector)
  canvas.width = width
  canvas.height = height 
  return {
    canvas,
    ctx: canvas.getContext('2d')
  }
}

const createRealm = (ctx, {
  width,
  height,
  fps,
  resolution,
  scale,
  startingHue,
  hueRange
}) => {
  const cells = grid(resolution)
  const noiseCoords = { x: 0, y: 0 }
  const framesCoveringHueRange = 2000
  const state = {
    hue: startingHue,
    frame: 0
  }
  let loopInterval

  const loop = () => {
    ctx.clearRect(0, 0, width, height)
    cells.forEach((row, y) => {
      row.forEach((cell, x) => {
        const depth = noise.simplex2(
          x / scale + noiseCoords.x,
          y / scale + noiseCoords.y
        )
        const hue = state.hue + 100 * depth
        const alpha = 0.6 + depth
        const color = `hsla(${hue}, 50%, 50%, ${alpha})`
        square(ctx, {
          x: width / resolution * x,
          y: height / resolution * y,
          width: width / resolution,
          height: height / resolution,
        }).fill(color)
        noiseCoords.x -= 1/900000
        noiseCoords.y -= 1/300000
      })
    })
    state.frame++
    state.hue = startingHue + interpolateCircular({
      input: state.frame / framesCoveringHueRange / 2,
      output: hueRange,
    })
  }

  return {
    be() {
      loopInterval = setInterval(loop, 1000/fps)
      return this
    },
    stop() {
      clearInterval(loopInterval)
      return this
    }
  }
}

const createPossibility = (ctx, {
  width,
  height,
  fps,
  gradient: _gradient,
  surfaceStyle,
  cartoonish,
  horizontalDrift,
  convergeAt,
  scale,
  numVoidCracks: _numVoidCracks,
  voidScaleX,
  voidScaleY,
  voidDrift,
  voidStyle,
  voidShade,
  shape,
  baseThickness,
  delay
}) => {
  const [ startColor, endColor ] = _gradient
  const gradient = startColor.range(endColor, {
    space: "lch",
    outputSpace: "srgb"
  })

  const top = 0
  const bottom = height
  const center = width / 2
  const distance = bottom - top
  const padding = width / 10
  const lineWidth = max(1, width * baseThickness)
  const numVoidCracks = () => random(..._numVoidCracks)
  const voidAngle = () => round(random() * 360)

  let state = {
    shape
  }
  let loopInterval = null
  let delayTimeout = null

  const loop = () => {
    const progress = state.y / distance
    const hDiff = center - state.x
    const factor = pow(min(1, progress / convergeAt), π * 1.5)
    const drift = hDiff - (hDiff * factor)
    const size = lineWidth * (progress * (350 * progress/3)) + 1
    const color = gradient(progress)
    switch (Shapes[state.shape]) {
      case 'sun':
        drawSun(ctx, {
          x: center + drift,
          y: state.y,
          width: size,
          style: color,
          strokeStyle: surfaceStyle(color),
          angle: state.frame / 2
        })
        break
      case 'circle':
        drawCircle(ctx, {
          x: center + drift,
          y: state.y,
          width: size,
          strokeStyle: surfaceStyle(color),
          style: color,
          cartoonish
        })
        if (progress < 1.1) {
          const voidTimeline = progress / 1.1
          drawVoid(ctx, {
            x: center + drift,
            y: state.y,
            possibilityWidth: lineWidth * (progress * (350 * progress/3)) + 1,
            num: round(state.numVoidCracks / (voidTimeline < .05 ? 3 : 1)),
            initialAngle: state.voidAngle,
            scaleX: voidScaleX,
            scaleY: voidScaleY,
            drift: voidDrift,
            style: voidStyle(color),
            shadowStyle: voidShade(color),
            timeline: voidTimeline
          })
        }
        break
    }
    if (state.y < bottom + size/2) {
      state.x += noise.simplex2(
        state.x / scale,
        state.y / scale
      ) * horizontalDrift
      state.y += (lineWidth / 2)
      state.frame++
    } else {
      state.frame = 0
      state.y = top + random() * (height / 40)
      state.x = padding + random() * (width - padding * 2)
      state.numVoidCracks = numVoidCracks()
      state.voidAngle = voidAngle()
    }
  }

  const reset = () => {
    noise.seed(random())
    state = {
      x: padding + random() * (width - padding * 2),
      y: top,
      frame: 0,
      shape: state.shape,
      numVoidCracks: numVoidCracks(),
      voidAngle: voidAngle(),
    }
    ctx.clearRect(0, 0, width, height)
  }

  return {
    emerge() {
      reset()
      delayTimeout = setTimeout(() => {
        loopInterval = setInterval(loop, 1000/fps)
      }, delay)
      return this
    },
    nextShape() {
      const nextShape = state.shape + 1
      state.shape = Shapes[nextShape] ? nextShape : 0
      return this
    },
    stop() {
      clearInterval(loopInterval)
      clearTimeout(delayTimeout)
      return this
    }
  }
}

const initRealm = (settings) => {
  const { canvas, ctx } = setupCanvas({
    selector: '#realm-bg',
    width: settings.width,
    height: settings.height,
  })

  const realm = createRealm(ctx, {
    width: settings.width,
    height: settings.height,
    fps: settings.fps,
    ...settings.realm
  })

  return realm.be()
}

const initPossibilities = (settings) => {
  const { canvas, ctx } = setupCanvas({
    selector: '#possibilities',
    width: settings.width,
    height: settings.height,
  })

  const possibilities = []
  for (let i = 0; i < settings.possibilities.num; i++) {
    const possibility = createPossibility(ctx, {
      width: settings.width,
      height: settings.height,
      fps: settings.fps,
      delay: i * settings.possibilities.delayBetween,
      ...settings.possibilities,
    })
    possibilities.push(possibility)
    possibility.emerge()
  }

  return possibilities
}

// Adapted from: https://codepen.io/enxaneta/pen/dVwrVV
const initDisplacementMap = ({ width, height }) => {
  const filterFeImage = query("#f feImage")
  const xlink = "http://www.w3.org/1999/xlink"
  let displacement = 0
  let speed = 0.1

  function getXlinkHref() {
    const xmlns = "http://www.w3.org/2000/svg"
    let xlinkHref =
        `data:image/svg+xml;utf8,%3Csvg version='1.1' xmlns='${xmlns}' xmlns:xlink='${xlink}' width='${width}' height='${height}'><defs%3E%3CradialGradient id='rg' r='1' y="0">`
    for (var i = 0; i < 11; i++) {
      xlinkHref += `%3Cstop 
                offset='${(i - 2) * 10 + displacement}%25' 
                stop%2Dcolor='%23${i % 2 == 0 ? "f00" : "000"}'%3E%3C/stop%3E`
    }


    xlinkHref +=
      `%3C/radialGradient%3E%3C/defs%3E%3Crect width='${width}' height='${height}' fill='url(%23rg)'%3E%3C/rect%3E%3C/svg%3E`

    return xlinkHref
  }

  function animateOffset() {
    let xlinkHref = getXlinkHref()
    filterFeImage.setAttributeNS(xlink, "href", xlinkHref)

    if (displacement <= 20) {
      displacement += speed
    } else {
      displacement = 0
    }

    window.requestAnimationFrame(animateOffset)
  }

  window.requestAnimationFrame(animateOffset)
  document.body.classList.add('with-displacement')
  return filterFeImage
}

const initScene = () => {
  noise.seed(random())

  if (Settings.displacementEffect) {
    initDisplacementMap(Settings)
  }
  
  if (window.navigator.userAgent.includes('Version')) {
    query('body').classList.add('safari')
  }

  return {
    realm: initRealm(Settings),
    possibilities: initPossibilities(Settings)
  }
}

const scene = initScene()

window.addEventListener('click', () => {
  scene.possibilities.forEach(p => {
    p.stop().nextShape().emerge()
  })
})

window.addEventListener('resize', () => {
  scene.realm.stop()
  scene.possibilities.forEach(p => {
    p.stop()
  })
  scene.realm = initRealm(Settings)
  scene.possibilities = initPossibilities(Settings)
})