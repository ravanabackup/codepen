window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (callback) { window.setTimeout(callback, 1000 / 60); };
})();

if(!window.Float32Array){
    window.Float32Array = Array;
}

var w = 800, // px
    h = 800, //px
    nparts = 10000, //num particles
    s = 20;  //cell size
    c = document.getElementById('canv'),
    c.width = w,
    c.height = h,
  
    srat = 1.0; //sreen ratio


var $= c.getContext('2d'),
    parts = new Float32Array(nparts*4),   
    splash = new Float32Array(w*h/s/s*2),  
    parts_x = w/20,    
    floor = Math.floor;

function Particle(x, y){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
}

for(var i = 0; i < parts.length;){
    parts[i++] = Math.random()*w;
    parts[i++] = Math.random()*h;
    parts[i++] = 0;
    parts[i++] = 0;
}
for(var i = 0; i < splash.length;i++){
    splash[i] = 0;
}

var start = {x:0,y:0}, 
    down = false;
c.onmousedown = function(e){
    start.x = (e.clientX-c.offsetLeft)*srat;
    start.y = e.clientY-c.offsetTop*srat;
    down = true;
}
c.ontouchstart = function(e){
    c.onmousedown(e.touches[0]);
    return false;
}
c.onmouseup = c.ontouchend = function(){
    down = false;
}
c.ontouchmove = function(e){
    c.onmousemove(e.touches[0]);
}

c.onmousemove = function(e){
    var mx = (e.clientX-c.offsetLeft)*srat,  //mouse x
        my = (e.clientY-c.offsetTop)*srat;  //mouse y
    if(!down || mx == start.x && my == start.y) return;
    var sw = (floor(mx/s) +   //swishiness
        floor(my/s)*floor(w/s))*2;
    splash[sw] += (mx-start.x)*0.4;
    splash[sw+1] += (my-start.y)*0.4;
    start.x = mx;
    start.y = my;
};

var go = function(){
//vars x, y, velocity x, velocity y, velocity distance, splash x, splash y, splash distance, splash radius, width
    var x, y, vx, vy, vd=0.95, sx, sy, sw, sd=0.95, sr=0.004,
        w1 = w-1; 
    $.fillStyle = 'hsla(205, 75%, 5%, .6)';  //background color
    $.globalCompositeOperation = 'source-over';
    $.fillRect(0, 0, w, h);
    $.fillStyle = 'hsla(205, 85%, 35%, 1)';  //particle color
    $.globalCompositeOperation = 'lighter';
    for(var i = 0, l = parts.length; i < l;i+=4){
        x = parts[i]
        y = parts[i+1];
        vx = parts[i+2];
        vy = parts[i+3];
        sw = (~~(x/s)+~~(y/s)*parts_x)*2;
        sx = splash[sw];
        sy = splash[sw+1];

        sx = (sx+vx*sr)*sd;
        sy = (sy+vy*sr)*sd;
        vx = (vx+sx)*vd;
        vy = (vy+sy)*vd;
        x += vx;
        y += vy;
        $.fillRect(~~x, ~~y, 2, 2);

        if(x < 0){
            vx *= -1;
            x = 0;
        }
        else if(x > w1){
            x = w1;
            vx *= -1;
        }

        if(y < 0){
            vy *= -1;
            y = 0;
        }
        else if(y > h){
            y = h-1;
            vy *= -1;
        }

        parts[i] = x;
        parts[i+1] = y;
        parts[i+2] = vx;
        parts[i+3] = vy;
        splash[sw] = sx;
        splash[sw+1] = sy;
    }
 
};

var run = function(){
  window.requestAnimFrame(run);
  go();
}
run();