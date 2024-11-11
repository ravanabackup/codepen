(function(){ 
    
    function doLogic(vars){
        
		// rotate the squares
		var p, d;
		for(var i = 0; i < vars.squares.length; ++i){
			p = Math.atan2(vars.squares[i].x - vars.cx, vars.squares[i].y - vars.cy);
			d = Math.sqrt((vars.squares[i].x - vars.cx)*(vars.squares[i].x - vars.cx)+
						  (vars.squares[i].y - vars.cy)*(vars.squares[i].y - vars.cy));
			vars.squares[i].x = vars.cx + Math.sin(p - 0.01) * d;
			vars.squares[i].y = vars.cy + Math.cos(p - 0.01) * d;
		}
    }
    
    function draw(vars){

        vars.ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		vars.ctx.fillStyle="#f00";
		for(var i = 0; i < vars.squares.length; ++i){
			vars.ctx.fillRect(vars.squares[i].x-25, vars.squares[i].y-25, 50, 50);
		}		
    }
    
    function Vert(x,y){
        this.x = x;
        this.y = y;
    }
	
	function loadScene(vars){
		
		var squareCount=16, radius = 200, x, y, p;
		
		vars.squares = [];
		for(var i = 0;i<squareCount;++i){
			p = Math.PI*2 / squareCount * i;
			x = vars.cx + Math.sin(p) * radius;
			y = vars.cy + Math.cos(p) * radius;
			vars.squares.push( new Vert(x, y) );
		}
	}
	
    function frame(vars) {

        if(vars === undefined){
            var vars={};
            vars.canvas = document.querySelector("#canvas");
            vars.ctx = vars.canvas.getContext("2d");
            vars.canvas.width = document.body.clientWidth;
            vars.canvas.height = document.body.clientHeight;
            window.addEventListener("resize", function(){
                vars.canvas.width = document.body.clientWidth;
                vars.canvas.height = document.body.clientHeight;
                vars.cx=vars.canvas.width/2;
                vars.cy=vars.canvas.height/2;
            }, true);
            vars.frameNo=0;
            vars.cx=vars.canvas.width/2;
            vars.cy=vars.canvas.height/2;
			loadScene(vars);
		}

        doLogic(vars);
        draw(vars);
        vars.frameNo++;
		
        requestAnimationFrame(function() {
          frame(vars);
        });
    }

frame();

})();