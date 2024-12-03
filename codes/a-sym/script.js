const canvas = document.createElement('canvas')
const c = canvas.getContext('2d')

canvas.style.filter = `hue-rotate(185deg) brightness(1.4) contrast(1.8)`

document.body.append(canvas)
document.body.style.margin = 0
document.body.style.overflow = 'hidden'

let hw
let hh

function resize() {

  w = innerWidth * 2
  h = innerHeight * 2
  hw = w / 2
  hh = h / 2
  canvas.width = w
  canvas.height = h
  canvas.style.width = innerWidth + 'px'
}
resize()
onresize = resize

function sprite(p) {
  const defaultTransform = {
    x: 0,
    y: 0,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    fill: 'gray',
    stroke: 'black',
    width: 100,
    height: 100,
    center: true
  }

  p = Object.assign(defaultTransform, p)
  p.sx = p.x
  p.sy = p.y
  p?.init?.(p)
  return () => {
    c.save()
    c.translate(p.x, p.y)
    c.rotate(p.rotation)
    c.scale(p.scaleX, p.scaleY)

    if (p.center) c.translate(-p.width / 2, -p.height / 2)

    c.fillStyle = p.fill

    c.strokeStyle = p.stroke
    p.draw(p)
    c.restore()
  }
}

let fx = false
let fxId

let size = Math.min(hh, hw) * .6
let sq = () => sprite({
  x: -size,
  y: hh + hh * .2,
  t: 0,
  width: size,
  height: size,
  phase: 0,
  center: true,
  rot: -Math.PI,
  draw(p) {
    p.x += (hw - p.x) / 12
    p.y += (hh - p.y) / 12
    if (p.phase === 0 && hw - p.x < 1 && hh - p.y < 1) {
      c.fillStyle = 'blue'
      p.phase = 1

      let little = (size / 2)

      for (let i = 0; i < 4; i++) {
        sqs.push(sprite({
          x: p.x - little / 2 + (i % 2) * little,
          y: p.y - little / 2 + ~~((i / 2)) * little,
          rot: [Math.PI / 2, -Math.PI / 2, -Math.PI / 2, Math.PI /
            2
          ][i],
          rotDamp: 8 + 5 * i,
          width: little,
          height: little,
          center: true,
          phase: 0,
          init(t) {
            t.vx = (t.x - p.x) * .05
            t.vy = (t.y - p.y) * .05
          },
          draw(t) {
            t.x += t.vx
            t.y += t.vy
            t.vx *= .9
            t.vy *= .9
            c.fillStyle = 'orange'
            if (t.phase === 0 && Math.abs(t.vx) < .01) {
              c.fillStyle = 'blue'
              t.phase = 1;

              fxId = setTimeout(() => fx = true, 1000)
              sqs.push(sprite({
                x: t.x,
                y: t.y,
                width: little * .9,
                height: little * .9,
                init(z) {
                  z.vx = (z.x - p.x) * .05
                  z.vy = (z.y - p.y) * .05
                },
                draw(z) {
                  z.x += z.vx
                  z.y += z.vy
                  z.vx *= .9
                  z.vy *= .9
                  c.fillStyle = 'black'
                  c.fillRect(0, 0, z.width, z.height)
                }
              }))


            }
            t.rotation += (t.rot - t.rotation) / t.rotDamp

            c.fillRect(0, 0, t.width, t.height)
          }
        }))
      }
    } else {
      c.fillStyle = 'red'
    }
    if (p.phase === 1) {
      setTimeout(() => {
        p.phase = 2
      }, 1000)

    }
    if (p.phase === 2) {
      p.rot = 0
      p.scaleX = .5
      p.scaleY = 2
    }
    p.rotation += (p.rot - p.rotation) / 12

    c.fillRect(0, 0, p.width, p.height)
  }
})



let sqs = [sq()]

document.body.onclick = e => {
  fx = false;
  sqs = []
  setTimeout(() => {
    clearTimeout(fxId)
    c.globalCompositeOperation = 'source-over'
    c.fillStyle = 'black'
    c.fillRect(0, 0, w, h)
    sqs = [sq()]
  }, 100)
}

setInterval(() => {
  c.fillStyle = 'rgba(0, 0, 0, .1)'
  c.fillRect(0, 0, w, h)
  sqs.forEach(sq => sq())

  if (fx) {
    c.fillStyle = 'rgba(0, 155, 55, .1)'
    c.fillRect(0, 0, w, h)
    c.globalAlpha = .99
    c.globalCompositeOperation = 'hard-light'
    c.drawImage(canvas, -10, -10, canvas.width + 20, canvas.height +
      20)
    c.globalAlpha = 1
    c.globalCompositeOperation = 'exclusion'

  }

}, 16)