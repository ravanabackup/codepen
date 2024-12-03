// classic avoid

const canvas = document.createElement('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth * 2
canvas.height = innerHeight * 2
document.body.append(canvas)

canvas.style.width = innerWidth + 'px'
canvas.style.height = innerHeight + 'px'

const r = () => Math.random()

let mx = canvas.width / 2
let my = canvas.height / 2
onpointermove = e => {
  mx = e.clientX * 2
  my = e.clientY * 2
}

function dot() {
  let radius = 100 + Math.random() * 300
  let size = 2 + r() * r() * 60
  let halfSize = size / 2
  let doubleSize = size * 2

  let x = r() * (canvas.width + size) - halfSize
  let y = r() * (canvas.height + size) - halfSize
  let anchorX = x
  let anchorY = y

  let cx = 0
  let cy = 0

  let vy = 1 + r() * (size / 10)

  let mode = 0

  return () => {

    anchorY += vy
    if (anchorY > canvas.height + doubleSize) {
      anchorY = -doubleSize
    }
    const dx = anchorX - mx
    const dy = anchorY - my
    const distance = Math.sqrt(dx * dx + dy * dy);
    const clampedRad = Math.max(0, radius - distance);

    const theta = Math.atan2(dy, dx);
    cx += (clampedRad * Math.cos(theta) - cx)
    cy += (clampedRad * Math.sin(theta) - cy)


    let col = `rgba(255, 255, 255, ${radius / distance * .25})`

    if (r() < 0.0001) {
      mode = 1
      vy *= 4

    }
    if (mode < 200 && mode > 0) {
      if (mode < 4) {
        c.fillStyle = 'rgba(0, 245, 155, 1)'
        c.fillRect(anchorX + cx - size/2, anchorY + cy - size/2, size * 2,
          size * 2)
      }
      col = `rgba(0, 245, 255, 1)`
      mode++
      if (r() < 0.01 || mode > 190) {
        mode = 0
        vy /= 4
      }
    }

    c.fillStyle = col;
    c.fillRect(anchorX + cx, anchorY + cy, size, size)
  }
}

let dots = []
for (let i = 0; i < 1000; i++) {
  dots.push(dot())
}

setInterval(() => {
  c.fillStyle = `rgba(0, 0, 0, .25)`
  c.fillRect(0, 0, canvas.width, canvas.height)
  dots.forEach(d => d())
}, 16)