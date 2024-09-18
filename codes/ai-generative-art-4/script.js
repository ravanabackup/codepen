// script.js

// Basic setup
const container = document.getElementById('container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Add fog effect
scene.fog = new THREE.FogExp2(0x000000, 0.002);

// Create stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const starCount = 30000;  // Increased to 3x

const starVertices = [];
for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Add light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

// Load spaceship model
const loader = new THREE.GLTFLoader();
let spaceship;
loader.load('https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf', function(gltf) {
    spaceship = gltf.scene;
    spaceship.scale.set(5, 5, 5); // Adjust the scale of the model
    spaceship.position.set(0, 0, -10);
    scene.add(spaceship);
    moveSpaceship();
}, undefined, function(error) {
    console.error(error);
});

// Function to move spaceship with GSAP
function moveSpaceship() {
    if (spaceship) {
        const duration = Math.random() * 2 + 2; // Random duration between 2 and 4 seconds
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        const z = (Math.random() - 0.5) * 100;

        gsap.to(spaceship.position, {
            x: x,
            y: y,
            z: z,
            duration: duration,
            ease: "power1.inOut",
            onComplete: moveSpaceship
        });
    }
}

// Warp speed effect
function animateStars() {
    starGeometry.attributes.position.array.forEach((v, index) => {
        if (index % 3 === 2) { // z coordinate
            v += 1;
            if (v > 1000) v -= 2000;
            starGeometry.attributes.position.array[index] = v;
        }
    });
    starGeometry.attributes.position.needsUpdate = true;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    animateStars();

    // Rotate camera
    const time = performance.now() * 0.0001; // slower rotation
    camera.position.x = Math.sin(time) * 30;
    camera.position.y = Math.sin(time * 0.7) * 30;
    camera.position.z = Math.cos(time) * 30;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Adjust camera and renderer on window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

camera.position.z = 50;
animate();