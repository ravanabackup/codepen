verify=(puz)=>{	
	var t,t2;
	for(var i=0;i<81;++i)if(!puz[i]) return 0;
	for(var i=0;i<9;++i){
		for(var j=0;j<9;++j){
			t=j+i*9;
			for(var k=0;k<9;++k){
				t2=k+i*9;
				if(t!=t2){
					if(puz[t]==puz[t2]) return 0;
				}
			}
			for(var k=0;puz[t]&&k<9;++k){
				t2=j+k*9;
				if(t!=t2){
					if(puz[t]==puz[t2]) return 0;
				}
			}
			for(var k=0;k<3;++k){
				for(var l=0;l<3;++l){
					t2=l+k*9+Math.floor((t%9)/3)*3+Math.floor(t/27)*27;
					if(t!=t2){
						if(puz[t]==puz[t2]) return 0;
					}
				}
			}
		}
	}	
	return 1;
}
generatePuzzle=(x)=>{
	var arrow=document.createElement("span");
	arrow.className="arrow";
	arrow.innerHTML="&nbsp;&rarr;&nbsp;";
	var puzzleDiv=document.createElement("div");
	puzzleDiv.className="puzzleDiv";
	main.appendChild(puzzleDiv);
	var board0=document.createElement("div");
	board0.className="board";
	puzzleDiv.appendChild(board0);
	puzzleDiv.appendChild(arrow);
	var board1=document.createElement("div");
	board1.className="board";
	puzzleDiv.appendChild(board1);
	var arrow=document.createElement("span");
	arrow.className="arrow";
	arrow.innerHTML="&nbsp;&rarr;&nbsp;";
	puzzleDiv.appendChild(arrow);
	var board2=document.createElement("div");
	board2.className="board";
	puzzleDiv.appendChild(board2);
	var clr=document.createElement("div");
	clr.className="clear";
	puzzleDiv.appendChild(clr);
	for(m=0;m<3;++m){
		for(var i=0;i<9;++i){
			var box=document.createElement("div");
			box.className="tile";
			box.style.border="1px solid #acb";
			switch(m){
				case 0:
					box.id="box"+x+"A"+i;
					board0.appendChild(box);
					break;
				case 1:
					box.id="box"+x+"B"+i;
					board1.appendChild(box);
					break;
				case 2:
					box.id="box"+x+"C"+i;
					board2.appendChild(box);
					break;
			}
		}
		var t,t2=0;
		for(k=0;k<9;++k){
			for(i=0;i<3;++i){
				t=i+Math.floor(k/3)*3;
				box=document.querySelector("#box"+x+(m?(m==1?"B":"C"):"A")+t);
				for(var j=0;j<3;++j){
					var tile=document.createElement("div");
					tile.className="tile";
					tile.id="tile"+x+(m?(m==1?"B":"C"):"A")+t2;
					box.appendChild(tile);
					t2++;
				}
			}
		}
	}	
	var v,t,t2;
	do{
		var puzzle=Array(81).fill(0);
		for(var i=0;i<81;++i) puzzle[i]=parseInt(1+Math.random()*9);
		for(var i=0;i<9;++i){
			for(var j=0;j<9;++j){
				t=j+i*9;
				if(puzzle[t]){
					for(var k=0;puzzle[t]&&k<9;++k){
						t2=k+i*9;
						if(t!=t2){
							if(puzzle[t]==puzzle[t2]) puzzle[Math.random()<.5?t:t2]=0;
						}
					}
				}
				if(puzzle[t]){
					for(var k=0;puzzle[t]&&k<9;++k){
						t2=j+k*9;
						if(t!=t2){
							if(puzzle[t]==puzzle[t2]) puzzle[Math.random()<.5?t:t2]=0;
						}
					}
				}
				if(puzzle[t]){
					for(var k=0;puzzle[t]&&k<3;++k){
						for(var l=0;puzzle[t]&&l<3;++l){
							t2=l+k*9+Math.floor((t%9)/3)*3+Math.floor(t/27)*27;
							if(t!=t2){
								if(puzzle[t]==puzzle[t2]) puzzle[Math.random()<.5?t:t2]=0;
							}
						}
					}
				}
			}
		}
		for(var i=0;i<15;++i)puzzle[parseInt(Math.random()*81)]=0;
		var poss=Array(81);
		for(var i=0;i<81;++i) poss[i]=puzzle[i]?[puzzle[i]]:[1,2,3,4,5,6,7,8,9];
		var tPuzzle=JSON.parse(JSON.stringify(puzzle));
		var cycles=0;
		do{
			var stuck=1;
			for(var i=0;i<81;++i){
				if(poss[i].length==1)tPuzzle[i]=poss[i][0];
				if(poss[i].length>1){
					for(var j=0;j<9;++j){
						t=Math.floor(i/9)*9+j;
						if(t!=i){
							v=tPuzzle[t];
							if(v&&poss[i].indexOf(v)!==-1){
								poss[i].remove(v);
								stuck=0;
							}
						}
					}
					for(var j=0;j<9;++j){
						t=i%9+j*9;
						if(t!=i){
							v=tPuzzle[t];
							if(v&&poss[i].indexOf(v)!==-1){
								poss[i].remove(v);
								stuck=0;
							}
						}
					}
					for(var k=0;k<3;++k){
						for(var l=0;l<3;++l){
							t=l+k*9+Math.floor((i%9)/3)*3+Math.floor(i/27)*27;
							if(t!=i){
								v=tPuzzle[t];
								if(v&&poss[i].indexOf(v)!==-1){
									poss[i].remove(v);
									stuck=0;
								}
							}
						}
					}
				}
				if(!poss[i].length) stuck=1;
			}
			if(!cycles){
				tPoss=JSON.parse(JSON.stringify(poss));
			}
			cycles++;
		}while(!stuck);
	}while(!verify(tPuzzle));
	for(var i=0;i<81;++i){
		var v=puzzle[i]?tPuzzle[i]:"";
		var tile=document.querySelector("#tile"+x+"A"+i);
		tile.innerHTML='<span class="text">'+v+"</span>";
		tile=document.querySelector("#tile"+x+"B"+i);
		tile.innerHTML='<span class="text">'+v+"</span>";
		tile.innerHTML+='<span class="poss">'+(puzzle[i]==0?tPoss[i]:"")+'</span>';
		if(!poss[i].length)tile.style.background="#f00";
		tile=document.querySelector("#tile"+x+"C"+i);
		tile.innerHTML='<span class="text'+(puzzle[i]==0?"S":"")+'">'+tPuzzle[i]+"</span>";
	}
}
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
}
generatePuzzle(0);
regen.addEventListener("click",()=>{main.innerHTML="";generatePuzzle(0)});