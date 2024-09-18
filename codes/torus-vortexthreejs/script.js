const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000);
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
camera.position.z = 15;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.TorusGeometry(11, 8, 80, 100);
const material = new THREE.ShaderMaterial({
    color: 0x0033bb,
    uniforms: {
        time: { value: 0.0 }
    },
    vertexShader: `
        varying vec2 vUv;
        uniform float time;

        mat2 getRotationMatrix(float angle) {
            float cosA = cos(angle);
            float sinA = sin(angle);
            return mat2(cosA, -sinA, sinA, cosA);
        }

        void main() {
            vUv = uv;
            // Aplica la rotación a las coordenadas UV
            float angle = time * 0.0005; // Ajusta la velocidad de rotación
            vUv = getRotationMatrix(angle) * (vUv - 0.5) + 0.5;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec2 vUv;
        uniform float time;
        void main() {
            float lines = abs(sin((vUv.y - time) * 84.80)); // Ajusta la velocidad con el valor de multiplicación
            vec3 color = mix(vec3(1.0), vec3(0.0), step(0.2, lines));
            gl_FragColor = vec4(color, 1.0);
        }
    `,
    side: THREE.DoubleSide,
    wireframe: false
});

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

torus.rotation.x = 55;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.minPolarAngle = Math.PI / 2.5;
controls.maxPolarAngle = Math.PI / -2.8;
controls.minDistance = 15;
controls.maxDistance = 15.02;

function animate () {
    requestAnimationFrame(animate);

    material.uniforms.time.value += 0.0005;
    controls.update();
    renderer.render(scene, camera);
}
animate();

renderer.render(scene, camera);

window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
});