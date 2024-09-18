import * as THREE from "three";

console.clear();

class SpotGrid extends THREE.Mesh{
  constructor(){
    
    let dims = [5, 4];
    let g = new THREE.CylinderGeometry(1, 1, 20, 4, 1, true).rotateY(-Math.PI * 0.25).translate(0, 10, 0).rotateX(-Math.PI * 0.5).scale(dims[0], dims[1] * 0.75, 1);
    
    
    let dimLen = ((dims[0] + dims[1]) * 2);

    g.setAttribute('uv', new THREE.Float32BufferAttribute(
      [
        [0, 1], [dims[0], 1], [dims[0] + dims[1], 1], [dims[0] * 2 + dims[1], 1], [(dims[0] + dims[1]) * 2, 1],
        [0, 0], [dims[0], 0], [dims[0] + dims[1], 0], [dims[0] * 2 + dims[1], 0], [(dims[0] + dims[1]) * 2, 0]
      ].map(p=> {return [1. - (p[0] / dimLen), p[1]]}).flat(), 
      2
      )
    );
    
    let m = new THREE.MeshBasicMaterial({
      color: "white", 
      //wireframe: true,
      side: THREE.BackSide,
      map: (() => {
        let c = document.createElement("canvas");
        c.width = c.height = 2048;
        let ctx = c.getContext("2d");
        
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, c.width, c.height);
        
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 5;
        for(let i = 0; i < 100; i++){
          ctx.save();
          ctx.translate(Math.random() * 1024 * (Math.sign(Math.random() - 0.5)) + 1024, Math.random() * 1024 * (Math.sign(Math.random() - 0.5)) + 1024);
          ctx.rotate(Math.random() * Math.PI * 2);
          ctx.beginPath();
          switch(THREE.MathUtils.randInt(0, 2)){
            case 0:
              ctx.moveTo(Math.random() * 2048, Math.random() * 2048);
              ctx.lineTo(Math.random() * 2048, Math.random() * 2048);
            case 1:
              ctx.arc(Math.random() * 2048, Math.random() * 2048, Math.random() * 1024, 0, Math.PI * 2);
            case 2:
              let w = Math.random() * 1024 * 0.5;
              let h = Math.random() * 1024 * 0.5;
              let cX = Math.random() * 1024;
              let cY = Math.random() * 1024;
              ctx.moveTo(cX - w, cY - h);
              ctx.lineTo(cX + w, cY - h);
              ctx.lineTo(cX + w, cY + h);
              ctx.lineTo(cX - w, cY + h);
              ctx.closePath();
          }
          ctx.stroke();
          ctx.restore();
        }
        
        let tex = new THREE.CanvasTexture(c);
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        tex.colorSpace = "srgb";
        return tex;
      })(),
      onBeforeCompile: shader => {
        shader.uniforms.time = gu.time;
        shader.fragmentShader = `
          uniform float time;
          
          // https://madebyevan.com/shaders/grid/
          float grid(vec2 uv){
              vec2 coord = uv;
              vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord) / 2.;
              float line = min(grid.x, grid.y);
                    line = 1.0 - min(line, 1.0);
              return line;
          }
          
          ${shader.fragmentShader}
        `.replace(
          `#include <color_fragment>`,
          `#include <color_fragment>
          
          float t = time * (1. / 20.);
          vec2 baseUv = vMapUv;
               baseUv.y -= t;
          
          float halfAmount = ${(dims[0] + dims[1])}.;
          
          vec2 uvRow = baseUv * vec2(halfAmount * 2., 20.);
          vec2 cID = floor(uvRow);
          vec2 cUV = fract(uvRow);
          
          vec2 uvHalfRow = baseUv * vec2(2., 20.);
          vec2 hrID = floor(uvHalfRow);
          
          vec2 uvUnitRow = baseUv * vec2(1., 20.);
          vec2 urID = floor(uvUnitRow);
          
          float randHalfRow = rand(mod(hrID, vec2(halfAmount * 2., 500.)));
          float randUnitRow = rand(mod(urID, vec2(halfAmount * 2., 500.)));
          
          float randIdx = floor(randHalfRow * halfAmount);
          
          float divisor = 16.;
          vec2 picStep = 1. / vec2(divisor);
          vec2 picUv = (floor(vec2(randHalfRow, randUnitRow) * divisor) + cUV) * picStep;
          vec3 picCol = texture(map, picUv).rgb;
          
          vec3 col = cID.x == (randIdx + (halfAmount * hrID.x)) ? picCol : vec3(1);
          
          float gridLine = grid(uvRow);
          diffuseColor.rgb = mix(col, vec3(0), gridLine);
          `
        );
        console.log(shader.fragmentShader);
      }
    });
    
    super(g, m);
  }
}

let scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xffffff, 1, 19);
scene.background = new THREE.Color(0xffffff);
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
camera.position.set(0, 0, 0).setLength(10);
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", (event) => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

let gu = {
  time: {
    value: 0
  }
}

let spotGrid = new SpotGrid();
scene.add(spotGrid);

let clock = new THREE.Clock();
let t = 0;
let tMin = 1 / 60;

renderer.setAnimationLoop(() => {
  let dt = Math.min(tMin, clock.getDelta());
  t += dt;
  gu.time.value = t;
  renderer.render(scene, camera);
});