// data

const axes = ['x', 'y', 'z']

const config = {
  boundsSize: 20,
  hiddenPosition: -120,
}

// utils

gsap.registerEase('custom', (v) => (Math.abs(Math.sin(Math.PI * v * 0.5)) ** 0.5) * 0.5)

const randomColor = () => {
  return `hsl(${Math.random() * 360}, 100%, 50%)`
}

const weightedRandom = (min, max, step, ease) => {
  let value = gsap.parseEase(ease)(Math.random())

  value = gsap.utils.interpolate(min, max, value)

  if (step) {
    value = gsap.utils.snap(step, value)
  }

  return value
}

// animation

const randomPosition = () => weightedRandom(config.boundsSize * -0.5, config.boundsSize * 0.5, 1, 'custom')

const show = (mainAxis) => {
  let otherAxes

  switch (mainAxis) {
    case 'x':
      otherAxes = ['y', 'z']
      break
    case 'y':
      otherAxes = ['x', 'z']
      break
    case 'z':
      otherAxes = ['x', 'y']
      break
  }

  return (box, tl) => {
    const startTime = weightedRandom(0, 1.0, null, 'expo.out') ** 2
    const axis1Index = Math.random() > 0.5 ? 0 : 1
    const axis2Index = axis1Index === 0 ? 1 : 0
    const axis1 = otherAxes[axis1Index]
    const axis2 = otherAxes[axis2Index]

    tl.set(box.scale, {
      [mainAxis]: weightedRandom(8, 64, 1, 'expo.in'),
      [axis1]: gsap.utils.random(2, 8, 1),
      [axis2]: 1
    }, 0)
    tl.set(box.position, {
      [mainAxis]: -config.hiddenPosition,
      [axis1]: randomPosition(),
      [axis2]: randomPosition()
    }, 0)

    tl.to(box.position, {
      duration: weightedRandom(0.5, 1, null, 'expo.inOut'),
      ease: gsap.utils.random([
        'expo.out',
        'power2.out',
        'power3.out',
        'power4.out'
      ]),
      [mainAxis]: 0,
    }, startTime)
  }
}

const boxShowTransitions = {
  x: show('x'),
  y: show('y'),
  z: show('z')
}

class App {
  constructor() {
    this.initTHREE()
    this.createScene()
  }

  initTHREE () {
    this.container = document.querySelector('.container')
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      pixelRatio: window.devicePixelRatio
    })
    this.renderer.setClearColor('#ffffff')
    this.container.appendChild(this.renderer.domElement)

    this.scene = new THREE.Scene()

    this.camera = new THREE.OrthographicCamera()
    this.camera.near = 0
    this.camera.far = 10000
    this.camera.position.set(100, 100, 100)
    this.camera.lookAt(this.scene.position)

    this.resize()
  }

  createScene () {
    this.createLights()
    this.createBoxes()
  }

  createLights () {
    this.mainLight = new THREE.DirectionalLight()
    this.mainLight.position.set(1, 0.5, 0.25)

    this.scene.add(this.mainLight)
  }

  createBoxes () {
    this.boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
    this.boxMaterial = new THREE.MeshStandardMaterial({
      metalness: 0,
      roughness: 1,
      color: 0xffffff
    })
    this.boxes = []

    for (let i = 0; i < 64; i++) {
      const box = new THREE.Mesh(this.boxGeometry, this.boxMaterial)

      this.boxes.push(box)
      this.scene.add(box)
    }
  }

  showBoxes = () => {
    if (this.transition) {
      this.transition.kill()
    }

    this.transition = gsap.timeline({
      onUpdate: this.render,
      onStart: () => {
        this.boxMaterial.color.set(randomColor())
      }
    })

    this.boxes.forEach((box) => {
      const axis = gsap.utils.random(axes)

      boxShowTransitions[axis](box, this.transition)
    })
  }

  render = () => {
    this.renderer.render(this.scene, this.camera)
  }

  resize = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    const orthoWidth = 100
    const orthoHeight = orthoWidth * (h / w)

    this.renderer.setSize(w, h)
    this.camera.left = -orthoWidth * 0.5
    this.camera.right = orthoWidth * 0.5
    this.camera.top = orthoHeight * 0.5
    this.camera.bottom = -orthoHeight * 0.5
    this.camera.updateProjectionMatrix()

    this.render()
  }
}

const app = new App()
app.showBoxes()

window.addEventListener('click', app.showBoxes)
window.addEventListener('resize', app.resize)