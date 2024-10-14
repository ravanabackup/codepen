/*--------------------
Setup
--------------------*/
const scene = new THREE.Scene()
const camera = new THREE.Camera()
const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const geometry = new THREE.PlaneBufferGeometry(2, 2)
const material = new THREE.MeshBasicMaterial({
  color: 0x00ccff
})


/*--------------------
Material Shader
--------------------*/
const uniforms = {
  uTime: { value: 0 },
  uAspect: { value: window.innerWidth / window.innerHeight }
}
material.onBeforeCompile = s => {
  s.uniforms.uTime = uniforms.uTime
  s.uniforms.uAspect = uniforms.uAspect
  s.vertexShader = `
    varying vec2 vUv;
  ` + s.vertexShader
  s.vertexShader = s.vertexShader.replace(
    `#include <uv_vertex>`,
    `vUv = uv;`
  )
  s.fragmentShader = `
    ${noise}
    uniform float uTime;
    uniform float uAspect;
    varying vec2 vUv;
  ` + s.fragmentShader
  s.fragmentShader = s.fragmentShader.replace(
    `vec4 diffuseColor = vec4( diffuse, opacity );`,
    `
      float steps = 22.;
      vec2 uv = vUv;
      uv.x *= uAspect;
      uv *= 0.6;
      uv.x += sin(uTime);
      uv.y -= uTime;
      float n = snoise(vec3(uv, uTime * 0.8));
      float c = (1.35 + n) * .5;
      c += c / steps;
      c = floor(c * steps) / steps;
      vec4 diffuseColor = vec4(heatmap(c), opacity);
    `
  )
}
const plane = new THREE.Mesh(geometry, material)
scene.add(plane)


/*--------------------
Render
--------------------*/
const clock = new THREE.Clock()
renderer.setAnimationLoop(() => {
  uniforms.uTime.value = clock.getElapsedTime() * 0.125
  renderer.render(scene, camera)
})


/*--------------------
Resize
--------------------*/
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  uniforms.uAspect.value = window.innerWidth / window.innerHeight
})