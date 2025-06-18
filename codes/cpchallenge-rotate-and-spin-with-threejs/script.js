let scene, camera, renderer, uniforms, material, mesh;
let playing = true;
let speed = 1;
let fluidity = 0.5;
let iterations = 3;
let zoom = 2.5;
let rotationSpeed = 0.1;
let glowIntensity = 1;
let colorSpeed = 1;
let seed;

function init() {
	scene = new THREE.Scene();
	camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
	camera.position.z = 1;

	renderer = new THREE.WebGLRenderer({
		canvas: document.getElementById("canvas")
	});
	renderer.setSize(window.innerWidth, window.innerHeight);

	randomizeSeed();

	uniforms = {
		time: { value: 0 },
		resolution: { value: new THREE.Vector2() },
		fluidity: { value: fluidity },
		iterations: { value: iterations },
		zoom: { value: zoom },
		rotationSpeed: { value: rotationSpeed },
		glowIntensity: { value: glowIntensity },
		colorSpeed: { value: colorSpeed },
		seed: { value: seed }
	};

	const shaderMaterial = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `,
		fragmentShader: `
      uniform float time;
      uniform vec2 resolution;
      uniform float fluidity;
      uniform int iterations;
      uniform float zoom;
      uniform float rotationSpeed;
      uniform float glowIntensity;
      uniform float colorSpeed;
      uniform vec4 seed;

      vec4 quat_mul(vec4 a, vec4 b) {
        return vec4(
          a.w * b.xyz + b.w * a.xyz + cross(a.xyz, b.xyz),
          a.w * b.w - dot(a.xyz, b.xyz)
        );
      }

      vec3 rotate4D(vec3 p, float t) {
        vec4 q = vec4(sin(t) * vec3(1.0, 0.5, 0.25), cos(t));
        vec4 qInv = vec4(-q.xyz, q.w);
        return quat_mul(q, quat_mul(vec4(p, 0.0), qInv)).xyz;
      }

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float fluidMandelbulb(vec3 p) {
        vec3 z = p;
        float dr = 1.0;
        float r = 0.0;
        float power = 8.0 + 4.0 * sin(time * 0.1 + seed.x);

        for (int i = 0; i < 100; i++) {
          if (i >= iterations) break;
          r = length(z);

          if (r > 2.0) break;

          float theta = acos(z.z / r) * power;
          float phi = atan(z.y, z.x) * power;
          float zr = pow(r, power);

          dr = pow(r, power - 1.0) * power * dr + 1.0;
          
          vec3 distortion = vec3(
            noise(z.xy * 2.0 + seed.yz + time * 0.1),
            noise(z.yz * 2.0 + seed.zw + time * 0.15),
            noise(z.zx * 2.0 + seed.wx + time * 0.2)
          ) * fluidity;

          z = zr * vec3(sin(theta) * cos(phi), sin(theta) * sin(phi), cos(theta)) + distortion;
          z += p;
        }

        return 0.5 * log(r) * r / dr;
      }

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
        vec3 dir = normalize(vec3(uv, 1.0));
        vec3 eye = vec3(0.0, 0.0, -zoom);
        
        float rotationOffset = noise(vec2(seed.x, seed.y) + time * 0.1) * 6.28;
        eye = rotate4D(eye, time * rotationSpeed + rotationOffset);
        dir = rotate4D(dir, time * rotationSpeed + rotationOffset);

        float t = 0.0;
        float d = 0.0;
        vec3 p;

        for (int i = 0; i < 100; i++) {
          p = eye + dir * t;
          d = fluidMandelbulb(p);
          if (abs(d) < 0.0001 || t > 10.0) break;
          t += d;
        }

        vec3 color = vec3(0.0);
        if (t < 10.0) {
          vec3 normal = normalize(vec3(
            fluidMandelbulb(p + vec3(0.0001, 0.0, 0.0)) - fluidMandelbulb(p - vec3(0.0001, 0.0, 0.0)),
            fluidMandelbulb(p + vec3(0.0, 0.0001, 0.0)) - fluidMandelbulb(p - vec3(0.0, 0.0001, 0.0)),
            fluidMandelbulb(p + vec3(0.0, 0.0, 0.0001)) - fluidMandelbulb(p - vec3(0.0, 0.0, 0.0001))
          ));

          vec3 light = normalize(vec3(1.0, 1.0, -1.0));
          float diff = max(dot(normal, light), 0.0);
          vec3 ref = reflect(dir, normal);
          float spec = pow(max(dot(ref, light), 0.0), 32.0);

          vec3 fluidColor = hsv2rgb(vec3(
            fract(time * colorSpeed * 0.1 + length(p) * 0.1 + seed.z),
            0.8 + 0.2 * sin(time * 0.3 + p.y * 2.0 + seed.w),
            0.7 + 0.3 * cos(time * 0.4 + p.z * 2.0 + seed.x)
          ));

          color = vec3(0.01, 0.01, 0.013) * t;
          color += fluidColor * diff * 0.7;
          color += vec3(1.0, 0.9, 0.8) * spec * 0.5;

          color += fluidColor * glowIntensity * (1.0 - t / 10.0);

          color = mix(color, vec3(0.0, 0.05, 0.1), 1.0 - exp(-0.1 * t));
        }

        gl_FragColor = vec4(color, 1.0);
      }
    `
	});

	mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), shaderMaterial);
	scene.add(mesh);

	window.addEventListener("resize", onWindowResize, false);
	onWindowResize();

	document.getElementById("play").addEventListener("click", togglePlay);
	document.getElementById("randomize").addEventListener("click", randomizeAll);
	document.getElementById("speed").addEventListener("input", changeSpeed);
	document.getElementById("fluidity").addEventListener("input", changeFluidity);
	document
		.getElementById("iterations")
		.addEventListener("input", changeIterations);
	document.getElementById("zoom").addEventListener("input", changeZoom);
	document
		.getElementById("rotationSpeed")
		.addEventListener("input", changeRotationSpeed);
	document
		.getElementById("glowIntensity")
		.addEventListener("input", changeGlowIntensity);
	document
		.getElementById("colorSpeed")
		.addEventListener("input", changeColorSpeed);

	const toggleControls = document.getElementById("toggleControls");
	const controls = document.getElementById("controls");
	toggleControls.addEventListener("click", () => {
		controls.classList.toggle("extended");
		toggleControls.textContent = controls.classList.contains("extended")
			? "✕"
			: "☰";
	});
}

function onWindowResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	uniforms.resolution.value.x = renderer.domElement.width;
	uniforms.resolution.value.y = renderer.domElement.height;
}

function togglePlay() {
	playing = !playing;
}

function changeSpeed() {
	speed = parseFloat(document.getElementById("speed").value);
	document.getElementById("speedValue").textContent = speed.toFixed(1) + "x";
}

function changeFluidity() {
	fluidity = parseFloat(document.getElementById("fluidity").value);
	uniforms.fluidity.value = fluidity;
	document.getElementById("fluidityValue").textContent = fluidity.toFixed(2);
}

function changeIterations() {
	iterations = parseInt(document.getElementById("iterations").value);
	uniforms.iterations.value = iterations;
	document.getElementById("iterationsValue").textContent = iterations;
}

function changeZoom() {
	zoom = parseFloat(document.getElementById("zoom").value);
	uniforms.zoom.value = zoom;
	document.getElementById("zoomValue").textContent = zoom.toFixed(1);
}

function changeRotationSpeed() {
	rotationSpeed = parseFloat(document.getElementById("rotationSpeed").value);
	uniforms.rotationSpeed.value = rotationSpeed;
	document.getElementById(
		"rotationSpeedValue"
	).textContent = rotationSpeed.toFixed(2);
}

function changeGlowIntensity() {
	glowIntensity = parseFloat(document.getElementById("glowIntensity").value);
	uniforms.glowIntensity.value = glowIntensity;
	document.getElementById(
		"glowIntensityValue"
	).textContent = glowIntensity.toFixed(1);
}

function changeColorSpeed() {
	colorSpeed = parseFloat(document.getElementById("colorSpeed").value);
	uniforms.colorSpeed.value = colorSpeed;
	document.getElementById("colorSpeedValue").textContent = colorSpeed.toFixed(1);
}

function randomizeSeed() {
	seed = new THREE.Vector4(
		Math.random(),
		Math.random(),
		Math.random(),
		Math.random()
	);
	if (uniforms) {
		uniforms.seed.value = seed;
	}
}

function randomizeAll() {
	randomizeSeed();
	document.getElementById("fluidity").value = Math.random();
	document.getElementById("iterations").value =
		Math.floor(Math.random() * 13) + 2;
	document.getElementById("zoom").value = Math.random() * 4.5 + 0.5;
	document.getElementById("rotationSpeed").value = Math.random() * 0.5;
	document.getElementById("glowIntensity").value = Math.random() * 2;
	document.getElementById("colorSpeed").value = Math.random() * 1.9 + 0.1;

	changeFluidity();
	changeIterations();
	changeZoom();
	changeRotationSpeed();
	changeGlowIntensity();
	changeColorSpeed();
}

function animate(timestamp) {
	requestAnimationFrame(animate);
	if (playing) {
		uniforms.time.value += 0.01 * speed;
	}
	renderer.render(scene, camera);
}

init();
//randomizeAll(); // Randomize on start
animate();

// Fullscreen toggle functionality
const fullscreenBtn = document.getElementById("fullscreenBtn");
fullscreenBtn.addEventListener("click", toggleFullScreen);

function toggleFullScreen() {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}
}