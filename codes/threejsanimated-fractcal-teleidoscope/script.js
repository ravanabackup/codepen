let scene, camera, renderer, material, mesh;
let startTime;
let isTransitioning = false;
let lastRandomizeTime = 0;
let countdownDisplay;
let settingsToggle = document.getElementById('settingsToggle');
let settingsContent = document.getElementById('settingsContent');
settingsContent.style.display = 'none';

function init() {
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas')});
    
    material = new THREE.ShaderMaterial({
        uniforms: {
            iTime: { value: 0 },
            iResolution: { value: new THREE.Vector3() },
            power: { value: 5.0 },
            rotationSpeed: { value: 0.2 },
            phaseShiftSpeed: { value: 0.1 },
            iterations: { value: 4 },
            sunColor: { value: new THREE.Color(0xFF0000) },
            skyColor: { value: new THREE.Color(0x0000FF) },
            fractalColor: { value: new THREE.Color(0xFFFFFF) },
            teleidoscopeEnabled: { value: false },
            teleidoscopeSides: { value: 6 },
            teleidoscopeSpinSpeed: { value: 0 },
            teleidoscopeZoom: { value: 1.0 },
            randomizeEnabled: { value: false },
            randomizeDuration: { value: 30 },
            randomizeTransition: { value: 3 },
            randomizeProgress: { value: 0 },
            targetPower: { value: 8.0 },
            targetRotationSpeed: { value: 0.2 },
            targetPhaseShiftSpeed: { value: 0.1 },
            targetIterations: { value: 7 },
            targetSunColor: { value: new THREE.Color(0xFFD54F) },
            targetSkyColor: { value: new THREE.Color(0x99CCFF) },
            targetFractalColor: { value: new THREE.Color(0xE6CCB2) },
            targetTeleidoscopeSides: { value: 6 },
            targetTeleidoscopeSpinSpeed: { value: 0 },
            targetTeleidoscopeZoom: { value: 1.0 }
        },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });
    
    mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);
    
    startTime = Date.now();
    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);
    
    countdownDisplay = document.getElementById('countdownValue');
    setupSettings();
    animate();
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    material.uniforms.iResolution.value.set(width, height, 1);
}

function animate() {
    requestAnimationFrame(animate);
    const currentTime = Date.now();
    const deltaTime = (currentTime - startTime) * 0.001;
    material.uniforms.iTime.value = deltaTime;

    const transitioningValues = document.getElementById('transitioningValues');
    if (isTransitioning) {
        transitioningValues.style.display = 'block';
        updateTransitionedValues();
    } else {
        transitioningValues.style.display = 'none';
    }

    if (material.uniforms.randomizeEnabled.value) {
        const randomizeDuration = material.uniforms.randomizeDuration.value;
        const timeUntilNextChange = randomizeDuration - (deltaTime - lastRandomizeTime);
        
        if (timeUntilNextChange <= 0) {
            randomizeSettings();
            lastRandomizeTime = deltaTime;
            isTransitioning = true;
            material.uniforms.randomizeProgress.value = 0;
        } else {
            countdownDisplay.textContent = timeUntilNextChange.toFixed(1);
        }

        if (isTransitioning) {
            const transitionDuration = material.uniforms.randomizeTransition.value;
            material.uniforms.randomizeProgress.value += deltaTime / transitionDuration;
            if (material.uniforms.randomizeProgress.value >= 1) {
                isTransitioning = false;
                material.uniforms.randomizeProgress.value = 1;
            }
            updateTransitionedValues();
        }
    }

    renderer.render(scene, camera);
}

function randomizeSettings() {
    material.uniforms.targetPower.value = Math.random() * 15 + 1;
    material.uniforms.targetRotationSpeed.value = Math.random();
    material.uniforms.targetPhaseShiftSpeed.value = Math.random() * 0.5;
    material.uniforms.targetIterations.value = Math.floor(Math.random() * 14) + 1;
    material.uniforms.targetSunColor.value.setHSL(Math.random(), 0.5, 0.5);
    material.uniforms.targetSkyColor.value.setHSL(Math.random(), 0.5, 0.5);
    material.uniforms.targetFractalColor.value.setHSL(Math.random(), 0.5, 0.5);
    material.uniforms.targetTeleidoscopeSides.value = Math.floor(Math.random() * 21) + 3;
    material.uniforms.targetTeleidoscopeSpinSpeed.value = Math.random() * 2 - 1;
    material.uniforms.targetTeleidoscopeZoom.value = Math.random() * 4.9 + 0.1;
}

function updateTransitionedValues() {
    const t = material.uniforms.randomizeProgress.value;
    
    function updateValue(uniform, target, element, decimals = 2) {
        const value = lerp(uniform.value, target.value, t);
        uniform.value = value;
        document.getElementById(element).textContent = value.toFixed(decimals);
    }
    
    updateValue(material.uniforms.power, material.uniforms.targetPower, 'currentPower');
    updateValue(material.uniforms.rotationSpeed, material.uniforms.targetRotationSpeed, 'currentRotationSpeed');
    updateValue(material.uniforms.phaseShiftSpeed, material.uniforms.targetPhaseShiftSpeed, 'currentPhaseShiftSpeed');
    
    const iterations = Math.round(lerp(material.uniforms.iterations.value, material.uniforms.targetIterations.value, t));
    material.uniforms.iterations.value = iterations;
    document.getElementById('currentIterations').textContent = iterations;
    
    function updateColor(uniform, target, element) {
        uniform.value.lerp(target.value, t);
        document.getElementById(element).textContent = '#' + uniform.value.getHexString();
    }
    
    updateColor(material.uniforms.sunColor, material.uniforms.targetSunColor, 'currentSunColor');
    updateColor(material.uniforms.skyColor, material.uniforms.targetSkyColor, 'currentSkyColor');
    updateColor(material.uniforms.fractalColor, material.uniforms.targetFractalColor, 'currentFractalColor');
    
    const sides = Math.round(lerp(material.uniforms.teleidoscopeSides.value, material.uniforms.targetTeleidoscopeSides.value, t));
    material.uniforms.teleidoscopeSides.value = sides;
    document.getElementById('currentTeleidoscopeSides').textContent = sides;
    
    updateValue(material.uniforms.teleidoscopeSpinSpeed, material.uniforms.targetTeleidoscopeSpinSpeed, 'currentTeleidoscopeSpinSpeed');
    updateValue(material.uniforms.teleidoscopeZoom, material.uniforms.targetTeleidoscopeZoom, 'currentTeleidoscopeZoom');
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function setupSettings() {  
    settingsToggle.addEventListener('click', () => {
        settingsContent.style.display = settingsContent.style.display === 'none' ? 'block' : 'none';
    });

    setupSlider('powerSlider', 'powerValue', (value) => {
        material.uniforms.power.value = value;
    });

    setupSlider('iterationsSlider', 'iterationsValue', (value) => {
        material.uniforms.iterations.value = value;
    });

    setupSlider('rotationSpeedSlider', 'rotationSpeedValue', (value) => {
        material.uniforms.rotationSpeed.value = value;
    });

    setupSlider('phaseShiftSpeedSlider', 'phaseShiftSpeedValue', (value) => {
        material.uniforms.phaseShiftSpeed.value = value;
    });

    setupColorPicker('sunColor', (value) => {
        material.uniforms.sunColor.value.setHex(parseInt(value.slice(1), 16));
    });

    setupColorPicker('skyColor', (value) => {
        material.uniforms.skyColor.value.setHex(parseInt(value.slice(1), 16));
    });

    setupColorPicker('fractalColor', (value) => {
        material.uniforms.fractalColor.value.setHex(parseInt(value.slice(1), 16));
    });

    const teleidoscopeToggle = document.getElementById('teleidoscopeToggle');
    teleidoscopeToggle.addEventListener('change', (event) => {
        material.uniforms.teleidoscopeEnabled.value = event.target.checked;
    });

    setupSlider('teleidoscopeSidesSlider', 'teleidoscopeSidesValue', (value) => {
        material.uniforms.teleidoscopeSides.value = value;
    });

    setupSlider('teleidoscopeSpinSpeedSlider', 'teleidoscopeSpinSpeedValue', (value) => {
        material.uniforms.teleidoscopeSpinSpeed.value = value;
    });

    setupSlider('teleidoscopeZoomSlider', 'teleidoscopeZoomValue', (value) => {
        material.uniforms.teleidoscopeZoom.value = value;
    });

    const randomizeToggle = document.getElementById('randomizeToggle');
    randomizeToggle.addEventListener('change', (event) => {
        material.uniforms.randomizeEnabled.value = event.target.checked;
        if (event.target.checked) {
            lastRandomizeTime = material.uniforms.iTime.value;
        }
    });

    setupSlider('randomizeDurationSlider', 'randomizeDurationValue', (value) => {
        material.uniforms.randomizeDuration.value = value;
    });

    setupSlider('randomizeTransitionSlider', 'randomizeTransitionValue', (value) => {
        material.uniforms.randomizeTransition.value = value;
    });
}

function setupSlider(sliderId, valueId, callback) {
    const slider = document.getElementById(sliderId);
    const valueDisplay = document.getElementById(valueId);

    slider.addEventListener('input', () => {
        const value = parseFloat(slider.value);
        valueDisplay.textContent = value.toFixed(2);
        callback(value);
    });
}

function setupColorPicker(id, callback) {
    const colorPicker = document.getElementById(id);
    colorPicker.addEventListener('input', (event) => {
        callback(event.target.value);
    });
}

init();

// Fullscreen toggle functionality
const fullscreenToggle = document.getElementById('fullscreen-toggle');

fullscreenToggle.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
});

document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) {
    fullscreenToggle.textContent = 'Exit Fullscreen';
  } else {
    fullscreenToggle.textContent = 'Toggle Fullscreen';
  }
});