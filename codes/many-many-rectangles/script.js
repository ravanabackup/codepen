var container,
    renderer,
    scene,
    camera;

var shaderUniforms,
    shaderAttributes;

var time = 0,
    timeStep = (1/120);

var gridSize = 200; // <------------- change this to get more rectangles

var controls;

function initThree() {
    container = document.getElementById('container');
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    scene = new THREE.Scene();

    controls = new THREE.OrbitControls(camera);

    camera.position.z = 100;

    container.appendChild(renderer.domElement);
}

function createObjects() {
    var material = createMaterial(),
        geometry = createGeometry(),
        mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    document.getElementById("info").innerHTML = "";
}

function createMaterial() {
    shaderAttributes = {
        aOffset:{type:"f", value:[]},
        aRotation:{type:"v4", value:[]},
        aPosition:{type:"v3", value:[]},
        aTranslation:{type:"v3", value:[]}
    };

    shaderUniforms = {
        uTime:{type:"f", value:0}
    };

    var material = new THREE.ShaderMaterial({
        attributes:shaderAttributes,
        uniforms:shaderUniforms,
        vertexShader:document.getElementById("vertexShader").textContent,
        fragmentShader:document.getElementById("fragmentShader").textContent,
        transparent:false
    });

    material.side = THREE.DoubleSide;

    return material;
}

function createGeometry() {
    var geometry = new THREE.PlaneGeometry(126, 126, gridSize, gridSize),
//        axis = new THREE.Vector3(0, 1, 0).normalize(),
        maxAngle = Math.PI * 2;

    explode(geometry);

    for (var i = 0; i < geometry.faces.length; i += 2)
    {
        var faceA = geometry.faces[i],
            faceB = geometry.faces[i + 1],
            center = getCenter(geometry, faceA);

        var axis = new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2).normalize();

        var v0 = center.clone().subVectors(geometry.vertices[faceA.a], center),
            v1 = center.clone().subVectors(geometry.vertices[faceA.b], center),
            v2 = center.clone().subVectors(geometry.vertices[faceA.c], center),

            v3 = center.clone().subVectors(geometry.vertices[faceB.a], center),
            v4 = center.clone().subVectors(geometry.vertices[faceB.b], center),
            v5 = center.clone().subVectors(geometry.vertices[faceB.c], center),

            q = new THREE.Vector4(axis.x, axis.y, axis.z, maxAngle),
            delay = (i % gridSize) * 0.01 + Math.random() * 0.5;

        shaderAttributes.aOffset.value[faceA.a] = delay;
        shaderAttributes.aOffset.value[faceA.b] = delay;
        shaderAttributes.aOffset.value[faceA.c] = delay;
        shaderAttributes.aOffset.value[faceB.a] = delay;
        shaderAttributes.aOffset.value[faceB.b] = delay;
        shaderAttributes.aOffset.value[faceB.c] = delay;

        shaderAttributes.aPosition.value[faceA.a] = v0;
        shaderAttributes.aPosition.value[faceA.b] = v1;
        shaderAttributes.aPosition.value[faceA.c] = v2;
        shaderAttributes.aPosition.value[faceB.a] = v3;
        shaderAttributes.aPosition.value[faceB.b] = v4;
        shaderAttributes.aPosition.value[faceB.c] = v5;

        shaderAttributes.aTranslation.value[faceA.a] = center;
        shaderAttributes.aTranslation.value[faceA.b] = center;
        shaderAttributes.aTranslation.value[faceA.c] = center;
        shaderAttributes.aTranslation.value[faceB.a] = center;
        shaderAttributes.aTranslation.value[faceB.b] = center;
        shaderAttributes.aTranslation.value[faceB.c] = center;

        shaderAttributes.aRotation.value[faceA.a] = q;
        shaderAttributes.aRotation.value[faceA.b] = q;
        shaderAttributes.aRotation.value[faceA.c] = q;
        shaderAttributes.aRotation.value[faceB.a] = q;
        shaderAttributes.aRotation.value[faceB.b] = q;
        shaderAttributes.aRotation.value[faceB.c] = q;
    }

    return geometry;
}

function update() {
    shaderUniforms.uTime.value = time;// - Math.floor(time);
    shaderUniforms.uTime.needsUpdate = true;
}

function draw() {
    renderer.render(scene, camera);
}

function loop() {
    update();
    draw();
    time += timeStep;
    requestAnimationFrame(loop);
}

window.onload = function() {
  try { 
    initThree();
    createObjects();

    window.addEventListener('resize', resizeHandler);
    requestAnimationFrame(loop);
  }
  catch(e) {
    document.getElementById("info").innerHTML = "error creating webgl context :(";
  }
};

function resizeHandler() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

///////////////////////
// UTILS
///////////////////////

// from https://github.com/mrdoob/three.js/blob/master/examples/js/modifiers/ExplodeModifier.js
function explode(geometry) {
    var vertices = [];

    for (var i = 0, il = geometry.faces.length; i < il; i ++) {
        var n = vertices.length;
        var face = geometry.faces[i];

        var a = face.a;
        var b = face.b;
        var c = face.c;

        var va = geometry.vertices[a];
        var vb = geometry.vertices[b];
        var vc = geometry.vertices[c];

        vertices.push(va.clone());
        vertices.push(vb.clone());
        vertices.push(vc.clone());

        face.a = n;
        face.b = n + 1;
        face.c = n + 2;
    }

    geometry.vertices = vertices;
    delete geometry.__tmpVertices;
}

function getCenter(geometry, face) {
    var v0 = geometry.vertices[face.a],
        v1 = geometry.vertices[face.b],
        v2 = geometry.vertices[face.c];

    var x = (v0.x + v2.x) * 0.5,
        y = (v0.y + v1.y) * 0.5,
        z = (v0.z + v1.z) * 0.5;

    return new THREE.Vector3(x, y, z);
}