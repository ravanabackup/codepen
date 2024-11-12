const SPEED        = 0.1
const SWIRL        = 0.65
const TURBULENCE   = 50
const LINES        = 240
const SEGMENTS     = 100
const INNER_RADIUS = 50
const OUTER_RADIUS = 300

const sn = new SimplexNoise

const onResize = () => {
  context.save()
  context.fillStyle = '#fff'
  context.fillRect(0, 0, width, height)
  context.restore()
}

const render = time => {
  context.save()
  context.globalCompositeOperation = 'multiply'
  context.fillStyle = '#f7f7f7'
  context.fillRect(0, 0, width, height)
  context.restore()
  
  context.save()
  context.translate(.5*width, .5*height)
  context.scale(1, -1)
  context.beginPath()
  for (let i = 0; i < LINES; i++) {
    const fi = i/LINES

    for (let j = 0; j < SEGMENTS; j++) {
      const fj = j/SEGMENTS

      const t = τ*(SPEED*time + fj)
      const r = lerp(INNER_RADIUS, OUTER_RADIUS, fj)
      const s = TURBULENCE*fj
      
      let x = r*cos(τ*(fi + fj**SWIRL))
      let y = r*sin(τ*(fi + fj**SWIRL))
      x += s*sn.noise2D(10*i + cos(t), 10*0 + sin(t))
      y += s*sn.noise2D(10*i + cos(t), 10*1 + sin(t))

      if (j)
        context.lineTo(x, y)
      else
        context.moveTo(x, y)
    }
  }
  context.globalCompositeOperation = 'lighter'
  context.strokeStyle = '#010101'
  context.stroke()
  context.restore()
}