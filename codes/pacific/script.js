const { sin, cos, tan, PI: π, abs } = Math

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
  bgStyle: 'rgb(4, 7, 60)',
  pathStopTime: 60 * 1000,
  sourceStyle: 'transparent',
  increaseSourceCount() {
    return this.sourceCount += 0.0001
  },
  resetSourceCount() {
    this.sourceCount = 15800
  },
  get sourceXMin() {
    return 0.5 + (tan(this.increaseSourceCount())) * 0.001
  },
  get sourceXMax() {
    return 0.5 + (tan(this.increaseSourceCount()) + 0.01) * 0.1
  },
  get sourceYMin() {
    return 0.5 + (cos(this.increaseSourceCount())) * 0.18
  },
  get sourceYMax() {
    return 0.5 + (cos(this.increaseSourceCount()) + 0.01) * 0.2
  },
  sourceSize: 2,
  pathSize: 1.2,
  speedFactor: 1,
  get pathSpeed() {
    this.speedFactor *= 1.1
    if (this.speedFactor > 5) {
      this.speedFactor = 1
    }
    return random(5) / (this.speedFactor * random())
  },
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
      const isUp = this.endY < 0.5
      let alpha = isUp ? 0.05 : 0.02
      const verticalMove = abs(this.endY - this.startY)
      const horizontalMove = abs(this.endX - this.startX)
      if (verticalMove > 0.35 || horizontalMove > 0.35) {
        if (random() >= .75) {
          return `rgba(200, 150, 250, ${alpha})`
        }
        if (random() >= .66) {
          return `rgba(250, 200, 255, ${alpha})`
        }
        if (random() >= .5) {
          return `rgba(225, 120, 200, ${alpha})`
        }
        return `rgba(255, 127, 255, ${alpha})`
      }
      if (verticalMove > 0.3 || horizontalMove > 0.3) {
        if (random() >= .75) {
          return `rgba(255, 15, 50, ${alpha})`
        }
        if (random() >= .66) {
          return `rgba(255, 20, 55, ${alpha})`
        }
        if (random() >= .5) {
          return `rgba(255, 120, 200, ${alpha})`
        }
        return `rgba(255, 10, 15, ${alpha})`
      }
      if (verticalMove > 0.2 || horizontalMove > 0.2) {
        if (random() >= .75) {
          return `rgba(250, 200, 80, ${alpha})`
        }
        if (random() >= .66) {
          return `rgba(255, 127, 50, ${alpha})`
        }
        if (random() >= .5) {
          return `rgba(200, 120, 25, ${alpha})`
        }
        return `rgba(255, 255, 0, ${alpha})`
      }
      if (verticalMove > 0.05 || horizontalMove > 0.05) {
        if (random() >= .75) {
          return `rgba(250, 90, 50, ${alpha})`
        }
        if (random() >= .66) {
          return `rgba(250, 140, 90, ${alpha})`
        }
        if (random() >= .5) {
          return `rgba(250, 140, 120, ${alpha})`
        }
        return `rgba(80, 255, 90, ${alpha})`
      }
      if (verticalMove > 0.01 || horizontalMove > 0.01) {
        alpha = isUp ? alpha + 0.1 : alpha
        if (random() >= .75) {
          return `rgba(255, 90, 60, ${alpha})`
        }
        if (random() >= .66) {
          return `rgba(230, 180, 60, ${alpha})`
        }
        if (random() >= .5) {
          return `rgba(255, 200, 120, ${alpha})`
        }
        return `rgba(127, 255, 90, ${alpha})`
      }
      alpha = isUp ? alpha + 0.15 : alpha
      if (random() >= .75) {
        return `rgba(255, 150, 0, ${alpha})`
      }
      if (random() >= .66) {
        return `rgba(255, 0, 0, ${alpha})`
      }
      if (random() >= .5) {
        return `rgba(225, 180, 20, ${alpha})`
      }
      return `rgba(255, 50, 0, ${alpha})`
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

const createWaves = (amount) => {
  return array(amount, i => {
    let r1 = random()
    r1 = r1 >= .3 ? random() : r1
    r1 = r1 >= .5 ? random() : r1
    r1 = r1 >= .7 ? random() : r1
    const r2 = random()
    const style = `--i: ${i}; --r1: ${r1}; --r2: ${r2}`
    return `
      <span class="wave" style="${style}"></span>`
  }).join('')
}

const init = (ctx) => {
  ctx.fillStyle = Settings.bgStyle
  ctx.fillRect(0, 0, Settings.width, Settings.height)
  waves.innerHTML = createWaves(1000)
  State.init()
  canvas.classList.toggle('reset')
  setTimeout(() => {
    canvas.classList.toggle('reset')
  }, 1000 / 60)
}

const canvas = document.querySelector('canvas')
const waves = document.querySelector('.waves')
canvas.width = Settings.width
canvas.height = Settings.height
const ctx = canvas.getContext('2d')
init(ctx)
draw(ctx)

canvas.addEventListener('click', () => init(ctx))