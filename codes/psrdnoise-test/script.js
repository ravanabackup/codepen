import {
  AmbientLight,
  Clock,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer
} from 'https://cdn.skypack.dev/three@0.136'

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js'

// Thanks https://github.com/stegu/psrdnoise !!!
const psrdnoise = `
vec4 permute(vec4 i) {
  vec4 im = mod(i, 289.0);
  return mod(((im*34.0)+10.0)*im, 289.0);
}

float psrdnoise(vec3 x, vec3 period, float alpha, out vec3 gradient)
{
  const mat3 M = mat3(0.0, 1.0, 1.0, 1.0, 0.0, 1.0,  1.0, 1.0, 0.0);
  const mat3 Mi = mat3(-0.5, 0.5, 0.5, 0.5,-0.5, 0.5, 0.5, 0.5,-0.5);
  vec3 uvw = M * x;
  vec3 i0 = floor(uvw), f0 = fract(uvw);
  vec3 g_ = step(f0.xyx, f0.yzz), l_ = 1.0 - g_;
  vec3 g = vec3(l_.z, g_.xy), l = vec3(l_.xy, g_.z);
  vec3 o1 = min( g, l ), o2 = max( g, l );
  vec3 i1 = i0 + o1, i2 = i0 + o2, i3 = i0 + vec3(1.0);
  vec3 v0 = Mi * i0, v1 = Mi * i1, v2 = Mi * i2, v3 = Mi * i3;
  vec3 x0 = x - v0, x1 = x - v1, x2 = x - v2, x3 = x - v3;
  if(any(greaterThan(period, vec3(0.0)))) {
    vec4 vx = vec4(v0.x, v1.x, v2.x, v3.x);
    vec4 vy = vec4(v0.y, v1.y, v2.y, v3.y);
    vec4 vz = vec4(v0.z, v1.z, v2.z, v3.z);
    if(period.x > 0.0) vx = mod(vx, period.x);
    if(period.y > 0.0) vy = mod(vy, period.y);
    if(period.z > 0.0) vz = mod(vz, period.z);
    i0 = floor(M * vec3(vx.x, vy.x, vz.x) + 0.5);
    i1 = floor(M * vec3(vx.y, vy.y, vz.y) + 0.5);
    i2 = floor(M * vec3(vx.z, vy.z, vz.z) + 0.5);
    i3 = floor(M * vec3(vx.w, vy.w, vz.w) + 0.5);
  }
  vec4 hash = permute( permute( permute( 
      vec4(i0.z, i1.z, i2.z, i3.z ))
      + vec4(i0.y, i1.y, i2.y, i3.y ))
      + vec4(i0.x, i1.x, i2.x, i3.x ));
  vec4 theta = hash * 3.883222077;
  vec4 sz = hash * -0.006920415 + 0.996539792;
  vec4 psi = hash * 0.108705628;
  vec4 Ct = cos(theta), St = sin(theta);
  vec4 sz_prime = sqrt( 1.0 - sz*sz );
  vec4 gx, gy, gz;
  if(alpha != 0.0) {
    vec4 px = Ct * sz_prime, py = St * sz_prime, pz = sz;
    vec4 Sp = sin(psi), Cp = cos(psi), Ctp = St*Sp - Ct*Cp;
    vec4 qx = mix( Ctp*St, Sp, sz), qy = mix(-Ctp*Ct, Cp, sz);
    vec4 qz = -(py*Cp + px*Sp);
    vec4 Sa = vec4(sin(alpha)), Ca = vec4(cos(alpha));
    gx = Ca*px + Sa*qx; gy = Ca*py + Sa*qy; gz = Ca*pz + Sa*qz;
  }
  else {
    gx = Ct * sz_prime; gy = St * sz_prime; gz = sz;  
  }
  vec3 g0 = vec3(gx.x, gy.x, gz.x), g1 = vec3(gx.y, gy.y, gz.y);
  vec3 g2 = vec3(gx.z, gy.z, gz.z), g3 = vec3(gx.w, gy.w, gz.w);
  vec4 w = 0.5-vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3));
  w = max(w, 0.0); vec4 w2 = w * w, w3 = w2 * w;
  vec4 gdotx = vec4(dot(g0,x0), dot(g1,x1), dot(g2,x2), dot(g3,x3));
  float n = dot(w3, gdotx);
  vec4 dw = -6.0 * w2 * gdotx;
  vec3 dn0 = w3.x * g0 + dw.x * x0;
  vec3 dn1 = w3.y * g1 + dw.y * x1;
  vec3 dn2 = w3.z * g2 + dw.z * x2;
  vec3 dn3 = w3.w * g3 + dw.w * x3;
  gradient = 39.5 * (dn0 + dn1 + dn2 + dn3);
  return 39.5 * n;
}
`

App()

function App () {
  let renderer, scene, camera, cameraCtrl
  let width, height
  let material

  const clock = new Clock()

  const uniforms = {
    uTime: { value: 0 },
    uCoordScale1: { value: 0.75 },
    uCoordScale2: { value: 4 },
    uCoordScale3: { value: 8 },
    uCoordScale4: { value: 16 },
    uDisplacementScale: { value: 0.1 },
    uBumpScale: { value: 0.025 }
  }

  init()

  function init () {
    renderer = new WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true })

    camera = new PerspectiveCamera(75)
    camera.position.z = 10

    cameraCtrl = new OrbitControls(camera, renderer.domElement)
    cameraCtrl.enableDamping = true
    cameraCtrl.dampingFactor = 0.1

    updateSize()
    window.addEventListener('resize', updateSize)

    initScene()

    const pane = new Tweakpane.Pane()
    pane.addInput(uniforms.uDisplacementScale, 'value', { step: 0.01, min: 0, max: 1, label: 'dispScale' })
    pane.addInput(uniforms.uCoordScale1, 'value', { step: 0.01, min: 0, max: 5, label: 'coordScale' })

    pane.addInput(uniforms.uBumpScale, 'value', { step: 0.005, min: 0, max: 0.1, label: 'bumpScale' })
    pane.addInput(uniforms.uCoordScale2, 'value', { step: 0.2, min: 0, max: 30, label: 'coordScale1' })
    pane.addInput(uniforms.uCoordScale3, 'value', { step: 0.2, min: 0, max: 30, label: 'coordScale2' })
    pane.addInput(uniforms.uCoordScale4, 'value', { step: 0.2, min: 0, max: 30, label: 'coordScale3' })

    requestAnimationFrame(animate)
  }

  function initScene () {
    scene = new Scene()
    scene.add(new AmbientLight(0xcccccc))

    const pointLight = new PointLight(0xff6060)
    pointLight.position.set(30, 20, 10)
    scene.add(pointLight)

    const pointLight1 = new PointLight(0x6090ff)
    pointLight1.position.set(-30, -20, -10)
    scene.add(pointLight1)

    const geometry = new SphereGeometry(5, 256, 256)

    material = new MeshStandardMaterial({
      metalness: 1,
      roughness: 0.5,
      onBeforeCompile: (shader) => {
        shader.uniforms.uTime = uniforms.uTime
        shader.uniforms.uCoordScale1 = uniforms.uCoordScale1
        shader.uniforms.uCoordScale2 = uniforms.uCoordScale2
        shader.uniforms.uCoordScale3 = uniforms.uCoordScale3
        shader.uniforms.uCoordScale4 = uniforms.uCoordScale4
        shader.uniforms.uDisplacementScale = uniforms.uDisplacementScale
        shader.uniforms.uBumpScale = uniforms.uBumpScale
        shader.vertexShader = `
          uniform float uTime;
          uniform float uCoordScale1;
          uniform float uDisplacementScale;
          varying vec3 vPosition;
          ${psrdnoise}
        ` + shader.vertexShader
        shader.vertexShader = shader.vertexShader.replace(
          '#include <begin_vertex>',
          `
            vPosition = position;

            vec3 grad;
            float d = psrdnoise(position * uCoordScale1 + uTime * vec3(0.1, 0.123, 0.134), vec3(240.0), 4.0 * uTime, grad);
            grad *= 2.0;
            vec3 transformed = position + uDisplacementScale * d * normal;

            vec3 N_ = grad - dot(grad, normal) * normal;
            vNormal = normal - uDisplacementScale * N_;
            vNormal = normalize(vNormal);
          `
        )
        shader.fragmentShader = `
          uniform mat4 modelViewMatrix;
          uniform float uTime;
          uniform float uCoordScale2;
          uniform float uCoordScale3;
          uniform float uCoordScale4;
          uniform float uBumpScale;
          varying vec3 vPosition;
          ${psrdnoise}
        ` + shader.fragmentShader
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <normal_fragment_begin>',
          `
            // bump map
            vec3 grad = vec3(0.0);
            vec3 gradtemp = vec3(0.0);
            float bump = psrdnoise(vPosition * uCoordScale2 + uTime * vec3(0.5, 0.7, 0.6), vec3(240.0), 0.0, grad);
            grad *= 10.0;
            bump += 0.5 * psrdnoise(vPosition * uCoordScale3 + 0.02 * grad + uTime * vec3(-0.7, -0.6, 0.5), vec3(240.0), 0.0, gradtemp);
            grad = 10.0 * gradtemp;
            bump += 0.25 * psrdnoise(vPosition * uCoordScale4 + uTime * vec3(-0.6, -0.5, -0.7), vec3(240.0), 0.0, gradtemp);
            grad += 10.0 * gradtemp;

            bump *= 0.2;
            grad *= 0.2;

            // normal
            vec3 normal;
            vec3 N_ = grad - dot(grad, vNormal) * vNormal;
            normal = vNormal - uBumpScale * N_;
            normal = normalize(normal);
            normal = mat3(modelViewMatrix) * normal;
            vec3 geometryNormal = normal;
          `
        )
      }
    })
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)
  }

  function animate () {
    requestAnimationFrame(animate)

    uniforms.uTime.value = clock.getElapsedTime() * 0.5

    if (cameraCtrl) cameraCtrl.update()
    renderer.render(scene, camera)
  }

  function updateSize () {
    width = window.innerWidth
    height = window.innerHeight
    if (renderer && camera) {
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
  }
}