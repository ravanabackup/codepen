const { sin, cos, min, max, PI: π } = Math

const noop =_=>_

const random = (max = 1, min = 0) => {
  return min + (Math.random() * (max - min))
}

const maybeNegative = (number) => {
  return random() >= .5 ? number : -number
}

const array = (length, mapper = noop) => {
  return [...Array(length).keys()].map(mapper)
}

const Settings = {
  width: 1200,
  height: 1200,
  bgStyle: '#000',
  pathStopTime: 80 * 1000,
  get sourceStyle() {
    return 'transparent'
    if (random() >= .75) {
      return 'black'
    }
    if (random() >= .66) {
      return 'red'
    }
    if (random() >= .5) {
      return 'yellow'
    }
    return 'mediumspringgreen'
  },
  increaseSourceCount() {
    return this.sourceCount += 0.0001
  },
  resetSourceCount() {
    this.sourceCount = 15800
  },
  get sourceXMin() {
    return 0.5 + (sin(this.increaseSourceCount())) * 0.2
  },
  get sourceXMax() {
    return 0.5 + (sin(this.increaseSourceCount()) + 0.01) * 0.2
  },
  get sourceYMin() {
    return 0.5 + (cos(this.increaseSourceCount())) * 0.2
  },
  get sourceYMax() {
    return 0.5 + (cos(this.increaseSourceCount()) + 0.01) * 0.2
  },
  sourceCount: 15800,
  sourceSize: 2,
  pathSize: 1.2,
  pathSpeed: 1,
}

const createPath = ({ x, y, angle, thickness, speed }) => {
  return {
    startX: x,
    startY: y,
    endX: x,
    endY: y,
    angle,
    thickness,
    style() {
      if (this.angle > (π * 3.14159)) {
        if (random() >= .75) {
          return 'rgba(255, 100, 90, 0.05)'
        }
        if (random() >= .66) {
          return 'rgba(255, 200, 90, 0.05)'
        }
        if (random() >= .5) {
          return 'rgba(255, 240, 120, 0.05)'
        }
        return 'rgba(0, 255, 90, 0.05)'
      }
      return 'rgba(255, 50, 0, 0.01)'
    },
    forward() {
      this.endX += ((sin(angle) * speed) / Settings.width)
      this.endY += ((cos(angle) * speed) / Settings.height)
    }
  }
}

const State = {
  init() {
    Settings.resetSourceCount()
    this.sources = array(Settings.sourceCount, i => [
      random(Settings.sourceXMax, Settings.sourceXMin),
      random(Settings.sourceYMax, Settings.sourceYMin)
    ])
    this.paths = this.sources.map(([x, y]) => {
      return createPath({
        x,
        y,
        angle: random(π * 4),
        thickness: Settings.pathSize,
        speed: Settings.pathSpeed
      })
    })
    this.start = Date.now()
  }
}

const draw = (ctx) => {
  State.sources.forEach(([x, y]) => {
    ctx.fillStyle = Settings.sourceStyle
    ctx.fillRect(
      x * Settings.width,
      y * Settings.height,
      Settings.sourceSize,
      Settings.sourceSize
    )
  })
  State.paths.forEach((path, i) => {
    if (Date.now() - State.start >= Settings.pathStopTime) {
      return
    }
    ctx.fillStyle = path.style()
    ctx.fillRect(
      path.endX * Settings.width,
      path.endY * Settings.height,
      path.thickness,
      path.thickness
    )
    path.forward()
  })
  return requestAnimationFrame(() => {
    draw(ctx)
  })
}

const init = (ctx) => {
  ctx.fillStyle = Settings.bgStyle
  ctx.fillRect(0, 0, Settings.width, Settings.height)
  State.init()
  canvas.classList.toggle('reset')
  setTimeout(() => {
    canvas.classList.toggle('reset')
  }, 1000 / 60)
}

const canvas = document.querySelector('canvas')
canvas.width = Settings.width
canvas.height = Settings.height
const ctx = canvas.getContext('2d')
init(ctx)
draw(ctx)

canvas.addEventListener('click', () => init(ctx))