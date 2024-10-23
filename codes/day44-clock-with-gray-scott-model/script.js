var scene, camera, renderer;
var vertexShaderString, fragmentShaderString;
var character = null;

var width, height, prevTime;
var canvas = document.getElementById('c');

width = window.innerWidth;
height = window.innerHeight;

canvas.width = width;
canvas.height = height;

var yoCanvas = document.createElement("canvas")
yoCanvas.width = width;
yoCanvas.height = height;
var yoCtx    = yoCanvas.getContext('2d');
yoCtx.textBaseline = "bottom";

var canvasTexture;
var isText = false;

// ==================

var mRenderer;
var mScene;
var mCamera;
var mUniforms;
var mColors;
var mColorsNeedUpdate = true;
var mLastTime = 0;

var mTexture1, mTexture2;
var mGSMaterial, mScreenMaterial;
var mScreenQuad;

var mToggled = false;

var mMinusOnes = new THREE.Vector2(-1, -1);


var presets = [

      { // Holes
        feed: 0.039,
        kill: 0.058
    },
  { // Chaos and holes (by clem)
        feed: 0.034,
        kill: 0.056
    },
    { // Default
        //feed: 0.018,
        //kill: 0.051
        feed: 0.037,
        kill: 0.06
    }

]; 
// Configuration.
var count = 0;
var feed = presets[count].feed;
var kill = presets[count].kill;


function init() {


    setCanvasTexture();
    var canvas = document.getElementById("c");
    mRenderer = new THREE.WebGLRenderer({canvas: canvas, preserveDrawingBuffer: true, alpha: true});
  
    setText();

    mScene = new THREE.Scene();
    mCamera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -10000, 10000);
    mCamera.position.z = 100;
    mScene.add(mCamera);

    mUniforms = {
        screenWidth: {type: "f", value: undefined},
        screenHeight: {type: "f", value: undefined},
        tSource: {type: "t", value: undefined},
        canvasSource : {type: "t", value: canvasTexture},
        delta: {type: "f", value: 1.0},
        feed: {type: "f", value: feed},
        kill: {type: "f", value: kill},
        brush: {type: "v2", value: new THREE.Vector2(-10, -10)},
        color1: {type: "v4", value: new THREE.Vector4(0.4, 0.4, 0.9, 0)},
        color2: {type: "v4", value: new THREE.Vector4(0.1, .1, .6, 0.2)},
        color3: {type: "v4", value: new THREE.Vector4(1.0,1.0, 1.0, 0.4)},
        color4: {type: "v4", value: new THREE.Vector4(.4,.4,.4, 0.7)},
        color5: {type: "v4", value: new THREE.Vector4(1.0,1.0,1.0, 0.9)}
    };
    mColors = [mUniforms.color1, mUniforms.color2, mUniforms.color3, mUniforms.color4, mUniforms.color5];

    mGSMaterial = new THREE.ShaderMaterial({
        uniforms: mUniforms,
        vertexShader: [
            "varying vec2 vUv;",
            "void main(){",
            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);}"
        ].join("\n"),
        fragmentShader: [
            "varying vec2 vUv;",
            "uniform float screenWidth;",
            "uniform float screenHeight;",
            "uniform sampler2D tSource;",
            "uniform sampler2D canvasSource;",
            "uniform float delta;",
            "uniform float feed;",
            "uniform float kill;",
            "uniform vec2 brush;",
            "vec2 texel = vec2(1.0/screenWidth, 1.0/screenHeight);",
            "float step_x = 1.0/screenWidth;",
            "float step_y = 1.0/screenHeight;",
            "void main()",
            "{",
            "    if(brush.x < -5.0)",
            "    {",
            "        //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);",
            "        //return;",
            "    }",
            "    ",
            "    ",
            "    vec2 uv = texture2D(tSource, vUv).rg;",
            "    vec2 uv0 = texture2D(tSource, vUv+vec2(-step_x, 0.0)).rg;",
            "    vec2 uv1 = texture2D(tSource, vUv+vec2(step_x, 0.0)).rg;",
            "    vec2 uv2 = texture2D(tSource, vUv+vec2(0.0, -step_y)).rg;",
            "    vec2 uv3 = texture2D(tSource, vUv+vec2(0.0, step_y)).rg;",
            "    ",
            "    vec2 lapl = (uv0 + uv1 + uv2 + uv3 - 4.0*uv);//10485.76;",
            "    float du = /*0.00002*/0.2097*lapl.r - uv.r*uv.g*uv.g + feed*(1.0 - uv.r);",
            "    float dv = /*0.00001*/0.105*lapl.g + uv.r*uv.g*uv.g - (feed+kill)*uv.g;",
            "    vec2 dst = uv + delta*vec2(du, dv);",
            "    ",
            "    if(brush.x > 0.0)",
            "    {",
            "        vec2 diff = (vUv - brush)/texel;",
            "        float dist = dot(diff, diff);",
            "        if(dist < 10.0)",
            "            dst.g = 0.9;",
            "    }",
            "    float canvasValue = texture2D(canvasSource, vUv).g;",
            "    if(canvasValue < 0.1){ dst.g *= .5; }",

            /*
            "    if(vUv.x < 0.2)",
            "    {",
            "        dst.g = 0.0;",
            "    }",
            "    ", */
            "    gl_FragColor = vec4(dst.r, dst.g, 0.0, 0);",
            "}"
        ].join("\n")
    });
    mScreenMaterial = new THREE.ShaderMaterial({
        uniforms: mUniforms,
        vertexShader: [
            "varying vec2 vUv;",
            "void main(){",
            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);}"
        ].join("\n"),
        fragmentShader: [
            "varying vec2 vUv;",
            "uniform vec2 brush;",
            "uniform float screenWidth;",
            "uniform float screenHeight;",
            "uniform sampler2D tSource;",
            "uniform sampler2D canvasSource;",
            "uniform float delta;",
            "uniform float feed;",
            "uniform float kill;",
            "uniform vec4 color1;",
            "uniform vec4 color2;",
            "uniform vec4 color3;",
            "uniform vec4 color4;",
            "uniform vec4 color5;",

            "vec2 texel = vec2(1.0/screenWidth, 1.0/screenHeight);",

            "void main()",
            "{",
            "    float value = texture2D(tSource, vUv).g;",
            "    //int step = int(floor(value));",
            "    //float a = fract(value);",
            "    float a;",
            "    vec3 col;",
            "    ",
            "    if(value <= color1.a)",
            "        col = color1.rgb;",
            "    if(value > color1.a && value <= color2.a)",
            "    {",
            "        a = (value - color1.a)/(color2.a - color1.a);",
            "        col = mix(color1.rgb, color2.rgb, a);",
            "    }",
            "    if(value > color2.a && value <= color3.a)",
            "    {",
            "        a = (value - color2.a)/(color3.a - color2.a);",
            "        col = mix(color2.rgb, color3.rgb, a);",
            "    }",
            "    if(value > color3.a && value <= color4.a)",
            "    {",
            "        a = (value - color3.a)/(color4.a - color3.a);",
            "        col = mix(color3.rgb, color4.rgb, a);",
            "    }",
            "    if(value > color4.a && value <= color5.a)",
            "    {",
            "        a = (value - color4.a)/(color5.a - color4.a);",
            "        col = mix(color4.rgb, color5.rgb, a);",
            "    }",
            "    if(value > color5.a)",
            "        col = color5.rgb;",
            "    ",

            "    gl_FragColor = vec4( col.r, col.g, col.b, 1.0);",
            "}"
        ].join("\n")
    });

    var plane = new THREE.PlaneGeometry(1.0, 1.0);
    mScreenQuad = new THREE.Mesh(plane, mScreenMaterial);
    mScene.add(mScreenQuad);


    mTexture1 = new THREE.WebGLRenderTarget(width / 2, height / 2,
        {minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBFormat,
            type: THREE.FloatType});
    mTexture2 = new THREE.WebGLRenderTarget(width / 2, height / 2,
        {minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBFormat,
            type: THREE.FloatType});
    mTexture1.wrapS = THREE.RepeatWrapping;
    mTexture1.wrapT = THREE.RepeatWrapping;
    mTexture2.wrapS = THREE.RepeatWrapping;
    mTexture2.wrapT = THREE.RepeatWrapping;

    mUniforms.screenWidth.value = width / 2;
    mUniforms.screenHeight.value = height / 2;


    loop(0);

    mUniforms.brush.value = new THREE.Vector2(0.5, 0.5);
    mLastTime = new Date().getTime();

    setTimeout(updateScott, 1000);
    setTimeout(updateClear, 500);
}

function updateClear(){
    isText = true;
}

function updateScott(){


	count = (count + 1) % presets.length;
  console.log(count);

      mUniforms.brush.value = new THREE.Vector2(0.5, 0.5);
	feed = presets[count].feed;
	kill = presets[count].kill;

    /*
	setTimeout(function(){
		mUniforms.brush.value = new THREE.Vector2(0.5, 0.5);
	}, 100);*/

	setTimeout(updateScott, 3000);
}

function setCanvasTexture(){
    canvasTexture = new THREE.Texture(yoCanvas);

    canvasTexture.magFilter = THREE.NearestFilter;
    canvasTexture.needsUpdate = true;
}

var velArr;
var xPosArr;
var totalWidth = 0;

function setText(){


    yoCtx.fillStyle = "#fff";
    yoCtx.fillRect( 0, 0, width, height );
  
    if(!isText) return;

    /*
    yoCtx.fillStyle = "#000000";
    yoCtx.fillRect(width/4, height/4, width/2, height/4);
    */
    var date = new Date();
    var curHour = date.getHours();
  var curHourStr = curHour < 10 ? "0" + curHour : curHour;
    var curMin = date.getMinutes();
  var curMinStr = curMin <10 ? "0" + curMin : curMin;
    var curSec = date.getSeconds();
  var curSecStr = curSec < 10 ? "0" + curSec : curSec;
  var curTime = curHourStr + ":" + curMinStr + ":" + curSecStr;
  
    var textLeft;
    var textTop;
    var xPos, yPos;
    var txt="YO";
    yoCtx.font = "60px Arial";

    var textWidth = yoCtx.measureText(curTime);
    var textExtraWidth = textWidth.width * 2;

    var extraHeight = 150 ;
  
    if(!velArr){
      velArr = [];
      for(var yy = 0; yy < height/extraHeight + 1; yy++){
        velArr[yy] = -Math.random()  - .5;
      }
      
      xPosArr = [];

      
      for(var yy = 0; yy < height/extraHeight + 1; yy++){
        xPosArr[yy] = [];
        for(var xx = 0; xx < width / textExtraWidth + 2; xx++){
          xPos = textExtraWidth * xx + Math.random()*10 - 5 + velArr[yy];
          xPosArr[yy][xx] = xPos;
          
        }
      }
      
      totalWidth += parseInt(width / textExtraWidth + 2) * textExtraWidth;
      console.log(totalWidth);
      
    }

    for(var yy = 0; yy < height/extraHeight + 1; yy++){
        
        for(var xx = 0; xx < width / textExtraWidth + 2; xx++){

            yoCtx.fillStyle = '#000';
            var fonSize = parseInt(75 + 5 *Math.random());
            yoCtx.font = "Bold " + fonSize + "px Arial";
          
            xPosArr[yy][xx] += velArr[yy];
            if(xPosArr[yy][xx] < -textExtraWidth) xPosArr[yy][xx] += totalWidth;

            yPos = extraHeight * yy + 30+ Math.random();

            //var fontNum = parseInt(75 + 10 *Math.random());

            //yoCtx.font = "Bold 80px Arial";
            yoCtx.save();
            yoCtx.translate(xPosArr[yy][xx], yPos);
          

            yoCtx.fillText(curTime,0,0);
            yoCtx.restore();
        }

    }


    if(canvasTexture) canvasTexture.needsUpdate = true;
}

function loop(time) {
    if(isText) setText();

    var dt = (time - mLastTime) / 20.0;
    if (dt > 0.8 || dt <= 0)    dt = 0.8;
    dt = .8;
    mLastTime = time;



    //mUniforms.brush.value = new THREE.Vector2(0.5, 0.5);

    mScreenQuad.material = mGSMaterial;
    mUniforms.delta.value = 1;
    mUniforms.feed.value = feed;
    mUniforms.kill.value = kill;

    for (var i = 0; i < 40; ++i) {

        if (!mToggled) {
            mUniforms.tSource.value = mTexture1;
            mRenderer.render(mScene, mCamera, mTexture2, true);
            mUniforms.tSource.value = mTexture2;
        }
        else {
            mUniforms.tSource.value = mTexture2;
            mRenderer.render(mScene, mCamera, mTexture1, true);
            mUniforms.tSource.value = mTexture1;
        }

        mToggled = !mToggled;
        mUniforms.brush.value = mMinusOnes;
        //mUniforms.brush.value = new THREE.Vector2(0.5, 0.5);
    }

    mScreenQuad.material = mScreenMaterial;

    mRenderer.render(mScene, mCamera);

    requestAnimationFrame(loop);
}


//

init();