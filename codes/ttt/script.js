document.body.style.margin = 0
document.body.style.background = 'black'

let rotX = 0, rotY = 0,
    perspective = 500,
    depth,
    currX, currY;
// learned something like this at Andries Odendaal's www.wireframe.co.za
function point3d(x, y, z) {
    let cosX = Math.cos(rotX),
        cosY = Math.cos(rotY),
        sinX = Math.sin(rotX),
        sinY = Math.sin(rotY),
        posX, posY, posZ;
 
    posZ = z * cosX - x * sinX,
    posX = z * sinX + x * cosX,
    posY = y * cosY - posZ * sinY,
    posZ = y * sinY + posZ * cosY
 
    depth = 1 / (posZ / perspective + 1)
    currX = posX * depth
    currY = posY * depth
 
    return [ currX, currY, depth ]
}

const canvas = document.createElement('canvas')
const c = canvas.getContext('2d')

canvas.style.filter = 'blur(4px) contrast(2) brightness(2)'

function size() {
  const width = innerWidth
  const height = innerHeight
  const ratio = window.devicePixelRatio
  canvas.width = Math.round(width * ratio)
  canvas.height = Math.round(height * ratio)
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'
}
size()

document.body.appendChild(canvas);
c.fillStyle = 'black'
c.fillRect(0, 0, canvas.width, canvas.height)

function blade({ x = 0, y = 0, z = 0 }) {
  let life = 100
  let time = 0
  let t = Math.random() * 7
  let V = Math.random() * 2 - 1
  let vx = Math.cos(t) * V
  let vy = Math.sin(t) * V
  let vz = Math.random() * 5 - 2.5
  let size = 20
  let cl = ~~(Math.random() * Math.random() * 255)
  let a = Math.random() * Math.random();
  return () => {
    x += vx
    y += vy
    z += vz
    let [ px, py, depth ] = point3d(x, y, z)
    c.fillStyle = `rgba(${cl}, ${cl}, ${cl}, ${a})`
    
    let currSize = size * depth
    c.fillRect(px, py, currSize, currSize);
  }
}

let blades = []
let NUM = 1000;
for (let i = 0; i < NUM; i++) {
  blades.push(blade({}))
}

setInterval(() => {
  rotY += .005
  rotX += .005
  c.save()
  c.translate(canvas.width / 2, canvas.height / 2)
  blades.forEach(b => b())
  c.restore()
}, 16)