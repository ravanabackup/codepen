const { PI, asin, sin, cos, min, max } = Math
const frame = () => new Promise(ok => requestAnimationFrame(ok))
const context = (api, fn) => { api.save(); fn(); api.restore() }
const api = document.querySelector('canvas').getContext('2d')

const R = [ 36, 32, 28, 24, 21, 19, 17, 15, 13, 11 ]
const F = [ 24, 32, 42 ]
const gear = { r: 7, f: 1 }
const offset = { r: 0, f: 0, c: 0 }

document.addEventListener('keydown', e => {
  switch(e.key) {
    case 'ArrowDown':  gear.r = max(gear.r - 1, 0);            break;
    case 'ArrowLeft':  gear.f = max(gear.f - 1, 0);            break;
    case 'ArrowUp':    gear.r = min(gear.r + 1, R.length - 1); break;
    case 'ArrowRight': gear.f = min(gear.f + 1, F.length - 1); break;
  }
})

const sprocket = (api, t) => {
  api.beginPath()
  for (let i = 0; i < t; i++) {
    const φ = 2*PI * i/t, ψ = φ + PI/t
    api.arc(t*cos(φ), t*sin(φ), 2/3*PI, φ + 3/2*PI, φ + 1/2*PI, true)
    api.arc(t*cos(ψ), t*sin(ψ), 1/3*PI, φ + 3/2*PI, φ + 1/2*PI)
  }
  api.moveTo(0, 0)
  api.arc(0, 0, t-2*PI, 0, 2*PI, true)
  api.fill()
}

const loop = async () => {
  for (let Δt = 0, t = 0;; t += Δt = await frame() - t) {
    const { clientWidth: width, clientHeight: height } = api.canvas
    const scale = .005*height
    Object.assign(api.canvas, { width, height })
    
    const cadence = 15 // 40 - 40*cos(PI * t/10e3)
    const speed = 2*PI * cadence * Δt/60e3
    const ratio = F[gear.f] / R[gear.r]
    offset.r -= speed*ratio
    offset.f -= speed
    
    context(api, () => {
      api.setTransform(scale, 0, 0, -scale, .5*width, .5*height)
      api.fillStyle = '#fff'
      api.shadowColor = '#7f7f7f'
      api.shadowBlur = 5*scale

      context(api, () => {
        api.translate(-100, 0)
        api.rotate(offset.r)
        R.slice(0, 1+gear.r).forEach(t => sprocket(api, t))
      })
      
      context(api, () => {
        api.translate(+100, 0)
        api.rotate(offset.f)
        F.slice(0, 1+gear.f).forEach(t => sprocket(api, t))
      })

      context(api, () => {
        const a = asin((F[gear.f] - R[gear.r]) / 200)
        api.shadowBlur = scale
        api.beginPath()
        api.arc(+100, 0, F[gear.f], 0, 1/2*PI+a)
        api.arc(-100, 0, R[gear.r], 1/2*PI+a, 3/2*PI-a)
        api.arc(+100, 0, F[gear.f], 3/2*PI-a, 0)
        api.setLineDash([2*PI])
        api.lineCap = 'round'
        
        api.lineDashOffset = offset.c += speed*F[gear.f]
        api.lineWidth = PI
        api.strokeStyle = '#dfdfdf'
        api.stroke()
        
        api.lineDashOffset = offset.c + 2*PI
        api.lineWidth = 4/3*PI
        api.strokeStyle = '#fff'
        api.stroke()
        
        api.setLineDash([0, 2*PI])
        api.lineWidth = 1/2*PI
        api.stroke()
      })

      context(api, () => {
        api.translate(-100, 0)
        api.rotate(offset.r)
        R.slice(1+gear.r).forEach(t => sprocket(api, t, offset.r))
      })
      
      context(api, () => {
        api.translate(+100, 0)
        api.rotate(offset.f)
        F.slice(1+gear.f).forEach(t => sprocket(api, t, offset.f))
      })
    })
  }
}

loop()