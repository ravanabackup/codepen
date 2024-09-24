var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d'),
    
    cen = {
      x: w/2,
      y: h/2
    },
    tileSize = 10,
    waveWaitTime = 60,
    waveKillTime = 300,
    waveTileTime = 4,
    lastWaveTime = 0,
    frame = waveWaitTime,
    waves = [0],
    waveLengths = [1];

function drawTile(x, y, wave){
  ctx.fillStyle = 'hsl(hue, 80%, 50%)'.replace('hue', (2*frame + wave + (Math.random()*90)|0)%360);
  ctx.fillRect(cen.x + x*tileSize, cen.y + y*tileSize, tileSize, tileSize);
}

function anim(){
  window.requestAnimationFrame(anim);
  
  ++frame;
  
  ctx.fillStyle = 'rgba(0, 0, 0, .04)';
  ctx.fillRect(0, 0, w, h);
  
  if(frame - lastWaveTime >= waveWaitTime){
    waves.push(frame);
    waveLengths.push(0);
    lastWaveTime = frame;
  }
  
  for(var i = 0; i < waves.length; ++i){
    var wave = waves[i];
    if(frame % waveTileTime === 0){
      var len = ++waveLengths[i];
      
      for(var j = 0; j < len; ++j){
        drawTile(-len + j + 1, -j, wave)
        drawTile(len - j - 1, j, wave);
        drawTile(-len + j + 1, j, wave);
        drawTile(len - j - 1, -j, wave);
      }
    }
    
    if(frame - wave >= waveKillTime){
    	waves.splice(i, 1);
      waveLengths.splice(i, 1);
      --i;
    }
  }
}
anim();