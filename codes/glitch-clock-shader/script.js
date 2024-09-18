import { EffectComposer } from "https://unpkg.com/three@0.120.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://unpkg.com/three@0.120.0/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "https://unpkg.com/three@0.120.0/examples/jsm/postprocessing/ShaderPass.js";
import { FilmPass } from "https://unpkg.com/three@0.120.0/examples/jsm/postprocessing/FilmPass.js";


const vert = `
      varying vec2 vUv;
      void main() {
        vec3 pos = position;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
      }
`;
const frag = `
 uniform float time;
      uniform float progress;
      uniform float intensity;
      uniform float width;
      uniform float scaleX;
      uniform float scaleY;
      uniform float transition;
      uniform float radius;
      uniform float swipe;
      uniform sampler2D texture1;
      uniform sampler2D texture2;
      uniform sampler2D displacement;
      uniform vec4 resolution;
      varying vec2 vUv;
      mat2 getRotM(float angle) {
          float s = sin(angle);
          float c = cos(angle);
          return mat2(c, -s, s, c);
      }
      const float PI = 3.1415;
      const float angle1 = PI *-0.25;
      const float angle2 = PI *0.75;
      const float angle = 1.55;

      void main()	{
      	vec2 newUV = (vUv + vec2(0.0))*resolution.wz + vec2(0.0);
      	vec4 disp = texture2D(displacement, vUv);
       vec2 dispVec = vec2(disp.r, disp.g);


      	vec2 distortedPosition1 = vUv + getRotM(angle1) * dispVec * 1.40 * progress*-0.3;
       vec4 t1 = texture2D(texture1, distortedPosition1);
      	vec2 distortedPosition1g = vUv + getRotM(angle1) * dispVec * 1.40 * progress*0.4;
       vec4 t1g = texture2D(texture1, distortedPosition1g);
       vec2 distortedPosition1r = vUv + getRotM(angle1) * dispVec * 1.40 * progress*1.2;
       vec4 t1r = texture2D(texture1, distortedPosition1r);



      	vec2 distortedPosition2 = vUv + getRotM(angle2) * dispVec * 1.40 * (1.0 - progress)*-0.3;
       vec4 t2 = texture2D(texture2, distortedPosition2);
       vec2 distortedPosition2g = vUv + getRotM(angle2) * dispVec * 1.40 * (1.0 - progress)*0.4;
       vec4 t2g = texture2D(texture2, distortedPosition2g);
       vec2 distortedPosition2r = vUv + getRotM(angle2) * dispVec * 1.40 * (1.0 - progress)*1.2;
       vec4 t2r = texture2D(texture2, distortedPosition2r);


      	gl_FragColor = mix(vec4(t1r.r,t1g.g,t1.b,t1g.a), vec4(t2r.r,t2g.g,t2.b,t2g.a), progress);
      }
`;

const frag2 = `

//https://simonharris.co/making-a-noise-film-grain-post-processing-effect-from-scratch-in-threejs/

  uniform float amount;
  uniform sampler2D tDiffuse;
  varying vec2 vUv;

  float random( vec2 p )
  {
    vec2 K1 = vec2(
      23.14069263277926, // e^pi (Gelfond's constant)
      2.665144142690225 // 2^sqrt(2) (Gelfondâ€“Schneider constant)
    );
    return fract( cos( dot(p,K1) ) * 12345.6789 );
  }

  void main() {

    vec4 color = texture2D( tDiffuse, vUv );
    vec2 uvRandom = vUv;
    uvRandom.y *= random(vec2(uvRandom.y,amount));
    color.rgb += random(uvRandom)*0.15;
    gl_FragColor = vec4( color  );
  }

`;

var counter = 0.0;
var myEffect = {
  uniforms: {
    tDiffuse: { value: null },
    amount: { value: counter },
  },
  vertexShader: vert,
  fragmentShader: frag2,
};

var scene,
  camera,
  renderer,
  width = window.innerWidth,
  height = window.innerHeight,
  material = [],
  composer,
  customPass,
  plane = [];
var state = {
  sec: {
    0: null,
    1: null,
  },
  min: {
    0: null,
    1: null,
  },
  hrs: {
    0: null,
    1: null,
  },
};
var numImages = [
  "https://raw.githubusercontent.com/pizza3/asset/master/numbers/zero.jpg",
  "https://raw.githubusercontent.com/pizza3/asset/master/numbers/one.jpg",
  "https://raw.githubusercontent.com/pizza3/asset/master/numbers/two.jpg",
  "https://raw.githubusercontent.com/pizza3/asset/master/numbers/three.jpg",
  "https://raw.githubusercontent.com/pizza3/asset/master/numbers/four.jpg",
  "https://raw.githubusercontent.com/pizza3/asset/master/numbers/five.jpg",
  "https://raw.githubusercontent.com/pizza3/asset/master/numbers/six.jpg",
  "https://raw.githubusercontent.com/pizza3/asset/master/numbers/seven.jpg",
  "https://raw.githubusercontent.com/pizza3/asset/master/numbers/eight.jpg",
  "https://raw.githubusercontent.com/pizza3/asset/master/numbers/nine.jpg",
  "https://raw.githubusercontent.com/pizza3/asset/master/curt.jpg",
];

var textures = [];
var current = [1, 1, 1, 1, 1, 1];

const createScene = function () {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  renderer = new THREE.WebGLRenderer();
  renderer.antialias = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.interpolateneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.getElementById("world").appendChild(renderer.domElement);

  composer = new EffectComposer(renderer);

  const renderScene = new RenderPass(scene, camera);
  composer.addPass(renderScene);

  // const filmPass = new FilmPass(
  //   0.05,
  //   0.5,
  //   908,
  //   false // grayscale
  // );
  // filmPass.renderToScreen = true;
  // composer.addPass(filmPass);

  customPass = new ShaderPass(myEffect);
  customPass.renderToScreen = true;
  console.log(customPass);
  composer.addPass(customPass);
};

const addPlane = function (x = 0.2, type, tens = false) {
  var number = getDigit(type);
  var currentNumber = number[1];
  var nextNumber = number[1] + 1 > 9 ? 0 : number[1] + 1;

  if (tens) {
    currentNumber = number[0];
    if (type === "hrs") {
      if (number[0] === 2 && number[1] === 3) {
        nextNumber = 0;
      } else {
        nextNumber = number[0] + 1 > 9 ? 0 : number[0] + 1;
      }
    } else {
      nextNumber = number[0] + 1 > 5 ? 0 : number[0] + 1;
    }
  } else {
    if (type === "hrs") {
      if (number[0] === 2 && number[1] === 3) {
        nextNumber = 0;
      }
    }
  }

  state[type][1] = number[0];
  state[type][0] = number[1];

  var uniforms = {
    time: { value: 1.0 },
    progress: { type: "f", value: 0 },
    resolution: { value: new THREE.Vector2(400, 400) },
    intensity: { value: 1.0, type: "f" },
    texture1: {
      type: "f",
      value: textures[currentNumber],
    },
    texture2: {
      type: "f",
      value: textures[nextNumber],
    },
    displacement: { type: "f", value: textures[10] },
    width: { value: 0.5, type: "f", min: 0, max: 10 },
    scaleX: { value: 40, type: "f", min: 0.1, max: 60 },
    scaleY: { value: 40, type: "f", min: 0.1, max: 60 },
  };
  var geometry = new THREE.PlaneGeometry(2, 2, 10, 10);
  material.push(
    new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vert,
      fragmentShader: frag,
    })
  );
  plane.push(new THREE.Mesh(geometry, material[material.length - 1]));
  plane[plane.length - 1].position.set(x, 0, 0);
  scene.add(plane[plane.length - 1]);
};

var getDigit = function (type) {
  var oncedigit, tensdigit;
  if (type === "sec") {
    var second = new Date().getSeconds();
    oncedigit =
      second.toString()[1] !== undefined
        ? second.toString()[1]
        : second.toString()[0];
    tensdigit = second.toString()[1] !== undefined ? second.toString()[0] : 0;
    return { 0: Number(tensdigit), 1: Number(oncedigit) };
  } else if (type === "min") {
    var minutes = new Date().getMinutes();
    oncedigit =
      minutes.toString()[1] !== undefined
        ? minutes.toString()[1]
        : minutes.toString()[0];
    tensdigit = minutes.toString()[1] !== undefined ? minutes.toString()[0] : 0;
    return { 0: Number(tensdigit), 1: Number(oncedigit) };
  } else {
    var hours = new Date().getHours();
    oncedigit =
      hours.toString()[1] !== undefined
        ? hours.toString()[1]
        : hours.toString()[0];
    tensdigit = hours.toString()[1] !== undefined ? hours.toString()[0] : 0;
    return { 0: Number(tensdigit), 1: Number(oncedigit) };
  }
};
let then = 0;

const animate = function (now) {
  now *= 0.001; // convert to seconds
  const deltaTime = now - then;
  then = now;

  requestAnimationFrame(animate);
  var second = getDigit("sec");
  var minute = getDigit("min");
  var hours = getDigit();
  // update sec
  if (state.sec[0] !== second[1]) {
    if (state.sec[1] !== second[0]) {
      next(1, 0, second[1], second[0], true);
      state.sec[1] = second[0];
    } else {
      next(1, 0, second[1], second[0]);
    }
    state.sec[0] = second[1];
  }
  // update min
  if (state.min[0] !== minute[1]) {
    if (state.min[1] !== minute[0]) {
      next(3, 2, minute[1], minute[0], true);
      state.min[1] = minute[0];
    } else {
      next(3, 2, minute[1], minute[0]);
    }
    state.min[0] = minute[1];
  }
  // update hrs
  if (state.hrs[0] !== hours[1]) {
    if (state.hrs[1] !== hours[0]) {
      next(5, 4, hours[1], hours[0], true, true);
      state.hrs[1] = hours[0];
    } else {
      next(5, 4, hours[1], hours[0], false, true);
    }
    state.hrs[0] = hours[1];
  }
  counter += 0.01;
  customPass.uniforms["amount"].value = counter;

  composer.render(deltaTime);
};

const init = function () {
  setTextures(() => {
    createScene();
    addPlane(2.25, "sec", true);
    addPlane(3.75, "sec");
    addPlane(-0.75, "min", true);
    addPlane(0.75, "min");
    addPlane(-3.75, "hrs", true);
    addPlane(-2.25, "hrs");
    handleResize();
    animate();
  });
};
const setTextures = function (cb) {
  const promises = [];
  numImages.forEach((url, i) => {
    let promise = new Promise((resolve) => {
      textures[i] = new THREE.TextureLoader().load(url, resolve);
    });
    promises.push(promise);
  });
  Promise.all(promises).then(() => {
    cb();
  });
};

const handleResize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  console.log(window.innerWidth / 100);
  if (window.innerWidth < 900) {
    camera.position.z = 13.4 - window.innerWidth / 100;
  } else {
    camera.position.z = 5;
  }
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const next = function (
  once,
  tens,
  onceIndex,
  tensIndex,
  updateTens = false,
  isHours = false
) {
  var duration = 0.9;
  var tl = new TimelineMax({});
  var forceUpdateHour = false;
  tl.to(
    material[once].uniforms.progress,
    duration,
    {
      value: current[once],
      ease: Expo.easeInOut,
      delay: 0,
      yoyo: true,
      onComplete: () => {
        var tex = textures[onceIndex + 1 > 9 ? 0 : onceIndex + 1];
        if (onceIndex === 2 && tensIndex === 3) {
          tex = textures[0];
        }
        if (isHours && onceIndex + 1 > 5 && tensIndex === 2) {
          tex = textures[0];
          forceUpdateHour = true;
        }
        if (current[once] === 1) {
          material[once].uniforms["texture1"].value = tex;
        } else {
          material[once].uniforms["texture2"].value = tex;
        }
        current[once] = current[once] === 1 ? 0 : 1;
      },
    },
    0
  );
  if (updateTens || forceUpdateHour) {
    tl.to(
      material[tens].uniforms.progress,
      duration,
      {
        value: current[tens],
        ease: Expo.easeInOut,
        delay: 0,
        yoyo: true,
        onComplete: () => {
          var tex = textures[tensIndex + 1 > 5 ? 0 : tensIndex + 1];
          if (isHours) {
            if (onceIndex === 2 && tensIndex === 3) {
              tex = textures[0];
            }
          }
          if (current[tens] === 1) {
            material[tens].uniforms["texture1"].value = tex;
          } else {
            material[tens].uniforms["texture2"].value = tex;
          }
          current[tens] = current[tens] === 1 ? 0 : 1;
        },
      },
      0
    );
  }
};

init();
window.addEventListener("resize", handleResize, false);