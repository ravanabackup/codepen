let scene;
let camera;
let renderer;
let material;
let material2;

function init() {
  initScene();
  initGeometry();
  requestAnimationFrame(loop);
  window.addEventListener('resize', onResize);
  setTimeout(onResize);
}

function initScene() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x250501, 0, 60);
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 5000);
  camera.position.set(0, 0, -11);
  camera.lookAt(scene.position);
  scene.add(camera);
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    pixelRatio: window.devicePixelRatio });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
}

function initGeometry() {
  const geometry = new THREE.PlaneBufferGeometry(10.0, 10.0);
  material = new THREE.RawShaderMaterial({
    uniforms: {
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      time: { value: performance.now() } },

    vertexShader: `
    #define GLSLIFY 1
    attribute vec3 position;

    void main(void) {
        gl_Position = vec4(position, 1.0);
    }
    `,
    fragmentShader: `
    precision mediump float;
    #define GLSLIFY 1

    #define PI 3.141592653589793

    uniform vec2 resolution;
    uniform float time;

    void main() {
        float scale = sin(time * 0.01);
        vec2 uv = gl_FragCoord.xy / resolution.yy;
        float ratio = resolution.x / resolution.y;
        vec2 x = uv - vec2(.5 * ratio, .5);
        float radius = length(x) * .81;
        float angle = atan(x.y, x.x);

        // Bulge
        if (radius < .1) {
            radius = pow(radius * 10. + .0, 5.) / 10.;
            angle = angle + angle * -radius * 10.;
        } else {
            radius = pow(radius - .1, 2.) + .1;
        }

        // Polar coords
        vec2 polar;
        float inner = .1;
        float outer = 1.;
        polar.x = ( radius - inner) / (outer - inner);
        polar.y = (angle * .25) / (1. * PI) + 1.;

        vec4 col = vec4(polar, 1.2, 1.0);
        vec4 col2 = vec4(polar, 1.2, 1.0);

        for(int i = 0; i <109; i++) {
            col.xyz = vec3(1.04, 1.18, .999) * abs(col.xyz / dot(col.xyz, col.xyz) - vec3(-.001, .98 + sin(-time * .0002 * 100. - 100.) / 100., .0));
            col2.xyz = vec3(1.04, 1.18, .97) * abs(col2.xyz / dot(col2.xyz, col2.xyz) - vec3(0., 1. + sin(-time * .0002 * 100. - 100.) / 100., .0));
        }
        col.r = pow(col.r, 2.5);
        col.r += .3 * col.b;
        col.bgr = col.rgb;
        col.g += .5 * col.r + col.b * 2.;
        if (radius < .1) {
            col.rgb *= 0.;
        }

        col2.g = .2 * col2.r + col2.b * 2.;
        col2.r = pow(col2.r, 2.5);
        col2.r += .3 * col2.b;
        if (radius < .1) {
            col2.gbr = col2.rgb;
        }

        gl_FragColor = vec4(.05 * col + col2);
    }
    `,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    shading: THREE.SmoothShading });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = 10;
  scene.add(mesh);

  const geometry2 = new THREE.SphereBufferGeometry(1, 20, 20);
  material2 = new THREE.RawShaderMaterial({
    uniforms: {
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      time: { value: performance.now() },
      cameraPos: { value: camera.getWorldPosition() },
      cameraDir: { value: camera.getWorldDirection() } },

    vertexShader: `
    #define GLSLIFY 1
    attribute vec3 position;
    attribute vec3 normal;
    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;
    uniform mat3 normalMatrix;
    uniform vec3 cameraDir;

    varying float vFalloff;
    varying vec3 vPos;

    void main(void) {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        float c = -.2;
        float p = 1.4;
        vec3 vNormal = normalize( normalMatrix * normal );
     vec3 vNormel = normalize( normalMatrix * cameraDir );
     vFalloff = 1. - pow( c - dot(vNormal, vNormel), p );
        vPos = position;
    }
    `,
    fragmentShader: `

    precision highp float;
    #define GLSLIFY 1

    #define PI 3.141592

    uniform vec2 resolution;
    uniform float time;

    varying float vFalloff;
    varying vec3 vPos;

    mat3 rotateY(float rad) {
        float c = cos(rad);
        float s = sin(rad);
        return mat3(
            c, 0.0, -s,
            0.0, 1.0, 0.0,
            s, 0.0, c
        );
    }

    //
    // Description : Array and textureless GLSL 2D/3D/4D simplex
    //               noise functions.
    //      Author : Ian McEwan, Ashima Arts.
    //  Maintainer : ijm
    //     Lastmod : 20110822 (ijm)
    //     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
    //               Distributed under the MIT License. See LICENSE file.
    //               https://github.com/ashima/webgl-noise
    //

    vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0; }

    float mod289(float x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0; }

    vec4 permute(vec4 x) {
        return mod289(((x*34.0)+1.0)*x);
    }

    float permute(float x) {
        return mod289(((x*34.0)+1.0)*x);
    }

    vec4 taylorInvSqrt(vec4 r)
    {
    return 1.79284291400159 - 0.85373472095314 * r;
    }

    float taylorInvSqrt(float r)
    {
    return 1.79284291400159 - 0.85373472095314 * r;
    }

    vec4 grad4(float j, vec4 ip)
    {
    const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
    vec4 p,s;

    p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
    p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
    s = vec4(lessThan(p, vec4(0.0)));
    p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;

    return p;
    }

    // (sqrt(5) - 1)/4 = F4, used once below
    #define F4 0.309016994374947451

    float snoise(vec4 v)
    {
    const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4
                            0.276393202250021,  // 2 * G4
                            0.414589803375032,  // 3 * G4
                            -0.447213595499958); // -1 + 4 * G4

    // First corner
    vec4 i  = floor(v + dot(v, vec4(F4)) );
    vec4 x0 = v -   i + dot(i, C.xxxx);

    // Other corners

    // Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
    vec4 i0;
    vec3 isX = step( x0.yzw, x0.xxx );
    vec3 isYZ = step( x0.zww, x0.yyz );
    //  i0.x = dot( isX, vec3( 1.0 ) );
    i0.x = isX.x + isX.y + isX.z;
    i0.yzw = 1.0 - isX;
    //  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
    i0.y += isYZ.x + isYZ.y;
    i0.zw += 1.0 - isYZ.xy;
    i0.z += isYZ.z;
    i0.w += 1.0 - isYZ.z;

    // i0 now contains the unique values 0,1,2,3 in each channel
    vec4 i3 = clamp( i0, 0.0, 1.0 );
    vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
    vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

    //  x0 = x0 - 0.0 + 0.0 * C.xxxx
    //  x1 = x0 - i1  + 1.0 * C.xxxx
    //  x2 = x0 - i2  + 2.0 * C.xxxx
    //  x3 = x0 - i3  + 3.0 * C.xxxx
    //  x4 = x0 - 1.0 + 4.0 * C.xxxx
    vec4 x1 = x0 - i1 + C.xxxx;
    vec4 x2 = x0 - i2 + C.yyyy;
    vec4 x3 = x0 - i3 + C.zzzz;
    vec4 x4 = x0 + C.wwww;

    // Permutations
    i = mod289(i);
    float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
    vec4 j1 = permute( permute( permute( permute (
                i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
                + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
                + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
                + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));

    // Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope
    // 7*7*6 = 294, which is close to the ring size 17*17 = 289.
    vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

    vec4 p0 = grad4(j0,   ip);
    vec4 p1 = grad4(j1.x, ip);
    vec4 p2 = grad4(j1.y, ip);
    vec4 p3 = grad4(j1.z, ip);
    vec4 p4 = grad4(j1.w, ip);

    // Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    p4 *= taylorInvSqrt(dot(p4,p4));

    // Mix contributions from the five corners
    vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
    vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
    m0 = m0 * m0;
    m1 = m1 * m1;
    return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
                    + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;
    }

    void main() {
        vec3 pos = vPos * rotateY(3. * vPos.y);
        gl_FragColor = vec4(vFalloff * 1.);
        gl_FragColor.r *= .9;
        gl_FragColor.g *= 1.4;
        gl_FragColor.b *= vFalloff + .1;
        float n2 = snoise(vec4(pos * 1.4, time * 0.025));
        float n = snoise(vec4(pos * n2 * 35., time * .1));
        gl_FragColor += gl_FragColor * n;
    }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    shading: THREE.SmoothShading });

  const mesh2 = new THREE.Mesh(geometry2, material2);
  scene.add(mesh2);
}

function loop(time) {
  requestAnimationFrame(loop);
  material.uniforms.time.value = time * 0.001;
  material2.uniforms.time.value = time * 0.001;
  renderer.render(scene, camera);
}

function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
}

init();