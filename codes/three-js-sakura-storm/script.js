// examples
// https://threejs.org/examples/?q=particle#webgl_points_billboards

let camera
let scene
let renderer
let material
let mouseX = 0
let mouseY = 0
let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2
let particles
let time = 0
const size = 2000

init()
animate()

function init () {
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 5, 2000)
  camera.position.z = 500

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x666, 0.001)

  const geometry = new THREE.BufferGeometry()
  const vertices = []

  for ( let i = 0; i < 100000; i ++ ) {
    const x = Math.random() * size - size / 2
    const y = Math.random() * size - size / 2
    const z = Math.random() * size - size / 2

    vertices.push(x, y, z)
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

  material = new THREE.PointsMaterial({
    size: 2,
    color: 0xef93b6,
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)

  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  document.body.style.touchAction = 'none'
  document.body.addEventListener('pointermove', onPointerMove)
  window.addEventListener('resize', onWindowResize)
}

function onWindowResize () {
  windowHalfX = window.innerWidth / 2
  windowHalfY = window.innerHeight / 2

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function onPointerMove (event) {
  mouseX = event.clientX - windowHalfX 
  mouseY = event.clientY - windowHalfY
}

function animate () {
  requestAnimationFrame(animate)
  render()
}

function render () {
  // camera.position.x += (mouseX * 2 - camera.position.x) * 0.02
  // camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02
  // scene.rotation.x += 0.001
  scene.rotation.y += 0.002
  camera.lookAt(scene.position)
  renderer.render(scene, camera)
  
  time += 0.02
  
  for (let i = 0; i < particles.geometry.attributes.position.count * 3; i+=3) {
    particles.geometry.attributes.position.array[i] -= Math.sin(time + i)
    particles.geometry.attributes.position.array[i+1] -= 1
    if (particles.geometry.attributes.position.array[i+1] < -size / 2) particles.geometry.attributes.position.array[i+1] = size / 2
  }
  
  particles.geometry.attributes.position.needsUpdate = true
}