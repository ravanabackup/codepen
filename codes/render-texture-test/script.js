var _stage;
var _target;
var _renderer;
var _graphics;
var _renderTexture;
var _renderTexture2;
var _outputSprite;
var _container;

var _sw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var _sh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var _sMax = Math.max(_sw, _sh);

// Animatiton vars - 
var _gStepX = 0;
var _gStepXAdd = (Math.random() - 0.5) / 10;
var _gStepY = 1;
var _gStepYAdd = (Math.random() - 0.5) / 10;
        
var _lineColour = Math.random()*0xFFFFFF<<0;
var _fillColour = Math.random()*0xFFFFFF<<0;
var _ballSize = (Math.random() * 30)  + 10;
var _ballAlpha = Math.random();

var _stageRotation = (Math.random() - 0.5) / 50000;
var _spriteRotation = (Math.random() - 0.5) / 50000;

var _stageSize1 = Math.random();
var _stageSize2 = Math.random() / 3;

init();

function init(){
  // setup -
  _stage = new PIXI.Stage(); 
  _stage.pivot.x = _stage.position.x = _sw/2;
  _stage.pivot.y = _stage.position.y = _sh/2;
  _renderer = new PIXI.CanvasRenderer(_sMax, _sMax, null, true);
    // PIXI.autoDetectRenderer(_sMax, _sMax, null, true);  
  _renderer.clearBeforeRender = false;
  _renderer.view.style.display = "block";
  document.getElementById("canvas-holder").appendChild(_renderer.view);
  
  // ball - 
  _graphics = new PIXI.Graphics();	
	_graphics.beginFill(_fillColour);
	_graphics.lineStyle(5, _lineColour, 1);	
	_graphics.drawCircle(0, 0, _ballSize);
	_graphics.endFill();
  _graphics.alpha = _ballAlpha;
  
  _container = new PIXI.Container();
  _container.position.x = _sw/2;
  _container.position.y = _sh/2;
  
  // Add ball - 
  _container.addChild(_graphics);
 
  // create two render textures... these dynamic textures will be used to draw the scene into itself
  _renderTexture = new PIXI.RenderTexture(_renderer, _sw, _sh);
  _renderTexture2 = new PIXI.RenderTexture(_renderer, _sw, _sh);
  
  // create a new sprite that uses the render texture we created above
  var currentTexture = _renderTexture;
  _outputSprite = new PIXI.Sprite(currentTexture);

  // align the sprite
  _outputSprite.position.x = _sw/2;
  _outputSprite.position.y = _sh/2;
  _outputSprite.anchor.set(0.5);

  // add to stage
  _stage.addChild(_outputSprite);
  _stage.addChild(_container);
   
   // Animate
  animate();
}

function animate(){  
 
  // move the ball - 
  _graphics.position.x = Math.sin(_gStepX) * _sw / 3;
  _gStepX += _gStepXAdd;
  _graphics.position.y = Math.sin(_gStepY) * _sh / 3;
  _gStepY += _gStepYAdd;
  
  // swap the buffers ...
  var temp = _renderTexture;
  _renderTexture = _renderTexture2; 
  _renderTexture2 = temp;

   _outputSprite.scale.x+=0.00001;
   _outputSprite.scale.y+=0.00001;

   console.log(_outputSprite.scale.x);
  
   if(_outputSprite.scale.x > 1.01){
     _outputSprite.scale.x = _outputSprite.scale.y = 1;
   }

  
  // set the new texture
  _outputSprite.texture = _renderTexture;
  _outputSprite.rotation+=_spriteRotation;
          
  _stage.rotation+=_stageRotation; 
  
  // render the stage to the texture
  // the 'true' clears the texture before t  he content is rendered
  _renderTexture2.render(_stage, null, false); 

  // and finally render the stage
  _renderer.render(_stage);
  // keep rendering - 
	requestAnimationFrame(animate);
}