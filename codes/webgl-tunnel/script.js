const regl = createREGL({
  container: document.querySelector("#display"),
  pixelRatio: Math.min(2, globalThis.devicePixelRatio),
  extensions: ["ANGLE_instanced_arrays"]
});
const { mat4 } = glMatrix;

const c = document.querySelector("#display");
const mouse = { x: c.offsetWidth / 2, y: c.offsetHeight / 2 };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

const depth = 12
const step = 1;
const length = Math.floor(depth / step);
const tubeOffsets = [];
const tubeVfxOffsets = [];
const tubeIndexes = [];

for (let i = 0; i < length; i++) {
  tubeOffsets.push([Math.sin(i) * 0.2, 0, step * i - 10]);
  tubeIndexes.push([i]);
}

const offsetBuffer = regl.buffer(tubeOffsets);

const drawPlane = regl({
  vert: `
      precision mediump float;
      
      attribute vec2 position;
      attribute vec3 offset; // Смещение инстансов
      attribute float instanceId; // instanceId
      
      uniform mat4 projection, view, model;
      uniform float time;
      
      varying vec2 uv;
      varying float vInstanceId;
      varying vec4 vWorldPosition;
  
      void main() {
        vec3 pos = vec3(position, 0.0) + offset;
        uv = 0.5 * (position + 1.0);
        vec4 worldPosition = model * vec4(pos, 1.0);
        
        vInstanceId = instanceId;
        vWorldPosition = worldPosition;
        
        gl_Position = projection * view * worldPosition;
      }
    `,

  frag: `
      precision mediump float;
      
      varying vec2 uv;
      varying float vInstanceId;
      varying vec4 vWorldPosition;
      
      uniform vec4 fogColor;
      uniform float time;
      
      float ripple(vec4 p, float rad, float freq, float amp, float time) {
        return 
          sin((rad) * freq) * amp
          + sin(p.x * freq) * amp 
          + sin(p.y * freq) * amp
          + sin((p.z * 0.01) * freq) * amp
          + sin(time * 0.01) * amp
          ;
      }
      
      float angle(vec2 p1, vec2 p2) {
        vec2 d = vec2(
          p2.x - p1.x,
          p2.y - p1.y
        );
        
        return atan(d.y, d.x);
      }

      void main() {
        float dist = distance(uv, vec2(0.5));
        float radians = angle(uv, vec2(0.5));
        float fogFactor = smoothstep(-1.1, 3.0, vWorldPosition.z);
        vec3 diffuse = vec3(0.0, 1.0, 1.0);
        
        // float inner = 0.37;
        float inner = 0.3 + ripple(
          vWorldPosition,
          radians,
          30.0, 0.05, time * 0.001
        );
        float outer = inner + 0.05;
        
        float circleO = dist > inner && dist < outer ? 1.0 : 0.0;
        float lightDiff = fogFactor * 0.07;
        float light = smoothstep(inner - lightDiff, inner, dist) - smoothstep(outer, outer + lightDiff, dist);
        
        gl_FragColor = vec4(
          mix(fogColor.rgb, diffuse, fogFactor) * (circleO + light),
          circleO + light
        );
      }
    `,

  attributes: {
    position: [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, -1],
      [1, 1],
      [-1, 1]
    ],
    offset: {
      buffer: regl.prop("offset"),
      divisor: 1
    },
    instanceId: {
      buffer: regl.prop("instancesBuffer"),
      divisor: 1
    }
  },

  uniforms: {
    projection: ({ viewportWidth, viewportHeight }) =>
      mat4.perspective(
        [],
        Math.PI / 4,
        viewportWidth / viewportHeight,
        0.01,
        100
      ),
    view: () => mat4.lookAt([], [0, 0, 3], [0, 0, 0], [0, 1, 0]),

    model: ({}, props) => {
      const model = mat4.identity([]);
      return model;
    },
    time: regl.prop("time"),
    fogColor: regl.prop("fogColor")
  },
  blend: {
    enable: true,
    func: {
      srcRGB: "src alpha",
      srcAlpha: "src alpha",
      dstRGB: "one minus src alpha",
      dstAlpha: "one minus src alpha"
    }
  },
  count: 6,
  instances: regl.prop("instancesCount")

  // primitive: 'lines'
});

let prevTime = performance.now() / 1000;

const sortedOffsets = new Array(length);

regl.frame(() => {
  const fogColor = [0, 0, 0.09, 1];

  regl.clear({
    color: fogColor,
    depth: 1
  });

  const time = performance.now() / 1000;
  const delta = time - prevTime;

  for (let i = 0; i < length; i++) {
    let z = tubeOffsets[i][2] + delta;
    if (z > 3) {
      z = -depth + 3.5;
    }

    tubeOffsets[i][0] = Math.cos(z * 0.7 + time) * 0.2;
    tubeOffsets[i][1] = Math.sin(z * 0.7 + time) * 0.2;
    tubeOffsets[i][2] = z;

    // Копируем значения для сортировки
    sortedOffsets[i] = [...tubeOffsets[i]];
  }

  sortedOffsets.sort((a, b) => a[2] - b[2]);

  offsetBuffer.subdata(sortedOffsets);

  drawPlane({
    offset: offsetBuffer,
    instancesBuffer: tubeIndexes,
    instancesCount: length,
    time: performance.now(),
    fogColor
  });

  prevTime = time;
});