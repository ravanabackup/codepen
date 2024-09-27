const colors = ["#004FFF", "#902D41", "#7d8187", "#1e1f23", "#5f6a89"];
const backgroundColor = "#31AFD4";
const width = window.innerWidth;
const height = window.innerHeight;
const totalFrames = 1000;
let frameCount = 0;
let recording = false;
let recordingStarted = false;
let frameDelta = 0;

let s;
let time = getRandomArbitrary(-50, 50);
let startTime = Date.now();

function setup() {
  canvas = createCanvas(width, height, WEBGL);
  noiseSeed(20);
  rectMode(CENTER);
  noStroke();
  
  let vert = document.getElementById('vertShader').innerText;
  let frag = document.getElementById('fragShader').innerText;
  s = createShader(vert, frag);
}

function draw() {
  frameCount += 1;
  frameDelta = (2 * Math.PI * (frameCount % totalFrames)) / totalFrames;

  background(0);
  shader(s);

  
  let dark = ['#00032d', '#f70000', '#ffa800', '#fc4c35', '#79ffce', '#0808c6'];

	s.setUniform('uResolution',[width,height]);
	s.setUniform('uTime',millis()/100);
  //s.setUniform('uTime', time);
  s.setUniform('uAmplitude',100.0);
  s.setUniform('uLowGpu',false);
  s.setUniform('uVeryLowGpu',false);

  s.setUniform('uSpeedColor',20.0);
  s.setUniform('uSpeedBlob',20.0);
  s.setUniform('uOpacity',1.0);
  s.setUniform('uStep',[0.63, .71]);
  s.setUniform('uColor1',hex2rgb(dark[0]));
  s.setUniform('uColor2',hex2rgb(dark[1]));
  s.setUniform('uColor3',hex2rgb(dark[2]));
  s.setUniform('uColor4',hex2rgb(dark[3]));
  s.setUniform('uColor5',hex2rgb(dark[4]));
  s.setUniform('uColor6',hex2rgb(dark[5]));
  s.setUniform('fresnelBias',0.0);
  s.setUniform('fresnelPower',0.68);
  s.setUniform('fresnelScale',4.68);
  s.setUniform('fresnelIntesity',0.2);
  
  rect(0,0,width,height);
  
  //checkForRecording();
}

const hex2rgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    
    return [ r / 255, g / 255, b / 255 ];
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};