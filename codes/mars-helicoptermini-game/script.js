function elem(id){
	return document.getElementById(id);
}

function isOverlapping(a, b){
    const pos1 = a.getBoundingClientRect();
    const pos2 = b.getBoundingClientRect();
    return (pos1.right > pos2.left && 
            pos1.left < pos2.right && 
            pos1.bottom > pos2.top && 
            pos1.top < pos2.bottom)
}

var sector = $('#sector'),
    drone = $('#drone'),
    ingen = $('.ingenuity'),
    landing = $('#landing'),	
	msg = $('#msg'),
	crater = $('#crater'),
	scan = $('#scan'),
	base = $('#base'),
	bat = $('#battery-level'),
	per = $('#battery-percent'),
    wh = sector.width() - drone.width(),
    wv = sector.height() - drone.height(),
    d = {},
    x = 5,
	sx = '0deg',
	sy = '0deg',
	bp = 100,
	level = 1,
	extra = false,
	start = false;

function newh(v,a,b) {
	var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
	return n < 0 ? 0 : n > wh ? wh : n;
}

function newv(v,a,b) {
	var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
	return n < 0 ? 0 : n > wv ? wv : n;
}

var pressedKeys = {};


$(window).keydown(function(e) { d[e.which] = true; pressedKeys[e.keyCode] = true; });
$(window).keyup(function(e) { d[e.which] = false; pressedKeys[e.keyCode] = false; });

setInterval(function() {

	//slant
	if(pressedKeys['37']){ sy = '-3deg'; start=true;  }
	if(pressedKeys['38']){ sx = '3deg'; start=true; }
	if(pressedKeys['39']){ sy = '3deg'; start=true; }
	if(pressedKeys['40']){ sx = '-3deg'; start=true; }
	if(pressedKeys['37'] == false && pressedKeys['38'] == false && 	pressedKeys['39'] == false && pressedKeys['40'] == false) { 
		sx = '0deg';
		sy = '0deg';
	}
	
	//start
	if(start && level == 1 && msg.text()!= 'Lands among nearby rocks' && !drone.hasClass('failed')) {
		msg.text('Lands among nearby rocks').removeClass('start');
		ingen.addClass('flying');
	}
	
	
	//takeoff
	if(pressedKeys['32']) $('.action').addClass('on'); else $('.action').removeClass('on'); 
	if(pressedKeys['37'] || pressedKeys['38'] || pressedKeys['39'] || pressedKeys['40']) $('.move').addClass('on'); else $('.move').removeClass('on'); 
	
	
	//landing
	if(pressedKeys['32'] && isOverlapping(elem('drone'),elem('landing')) && level == 1) {
		drone.addClass('to-land');
		landing.addClass('landed'); 
		level++; 
		setTimeout(function(){ msg.text('Completed!').addClass('ok'); drone.removeClass('to-land'); $('.m-land').addClass('ok'); }, 1250);
	}
	//landing completed
	if(isOverlapping(elem('drone'),elem('landing')) && level == 2) {
		setTimeout(function(){
			if(!landing.hasClass('completed')) landing.addClass('completed'); 
			if(msg.text()!='Take a photo of the big crater' && !drone.hasClass('failed')) msg.text('Take a photo of the big crater').removeClass('ok'); 
		}, 2750);
	}
	
	
	//crater
	if(pressedKeys['32'] && isOverlapping(elem('drone'),elem('crater')) && level == 2) { 
		drone.addClass('photo');
		crater.addClass('photographed'); 
		level++;
		setTimeout(function(){ msg.text('Completed!').addClass('ok'); drone.removeClass('photo'); $('.m-photo').addClass('ok'); }, 1250);
	}
	//crater completed
	if(isOverlapping(elem('drone'),elem('crater')) && level == 3) {
		setTimeout(function(){
			if(!crater.hasClass('completed')) crater.addClass('completed'); 
			if(msg.text()!='Scan the farthest rocks' && !drone.hasClass('failed')) msg.text('Scan the farthest rocks').removeClass('ok'); 
		}, 2750);
	}
	
	
	//scan
	if(pressedKeys['32'] && isOverlapping(elem('drone'),elem('scan')) && level == 3) { 
		drone.addClass('laserscan');
		scan.addClass('scanned'); 
		level++;
		setTimeout(function(){ msg.text('Completed!').addClass('ok'); drone.removeClass('laserscan'); $('.m-scan').addClass('ok'); }, 1000);
	}
	//scan completed
	if(isOverlapping(elem('drone'),elem('scan')) && level == 4) {
		setTimeout(function(){
			if(!scan.hasClass('completed')) scan.addClass('completed'); 
			if(msg.text()!='Return to charging base' && !drone.hasClass('failed')) msg.text('Return to charging base').removeClass('ok'); 
		}, 2500);
	}
	
	
	//base
	if(pressedKeys['32'] && isOverlapping(elem('drone'),elem('base')) && level == 4 && bat.css('width') != '0px') { 
		drone.addClass('off');
		base.addClass('based'); 
		level++;
		setTimeout(function(){ msg.text('Mission Success!').addClass('ok'); }, 1000);
	}
	//base completed
	if(isOverlapping(elem('drone'),elem('base')) && level == 5) {
		setTimeout(function(){
			if(!base.hasClass('completed')) base.addClass('completed'); 
			if(msg.text()!='Game over ?' && !drone.hasClass('failed')) msg.text('Game over ?').removeClass('ok'); 
		}, 3500);
	}
	
	
	//drone position
	if(level < 5){
		if(!drone.hasClass('failed')){
			drone.css({
				left: function(i,v) { return newh(v, 37, 39); },
				top: function(i,v) { return newv(v, 38, 40); },
				transform: "rotateX("+sx+") rotateY("+sy+")"
			});
		}
		bp-=0.05;
		bat.css('width', bp+"%");
		per.text(Math.round(bp)+"%");
		if(bat.css('width') == '0px'){
			if(!drone.hasClass('failed')){ drone.addClass('failed'); }
			if(msg.html()!='<div>Mission Failed!</div><br>You crashed the Mars Helicopter!') { msg.html('<div>Mission Failed!</div><br>You crashed the Mars Helicopter!').addClass('fail').removeClass('start'); }
			$('.reload').addClass('on');
			per.text("0%");
		}
	}
	
	
	//charge battery
	if(level == 5){
		var str = bat.css("width");
		str = str.substring(0, str.length - 2);
		var res = str * 100 / window.innerWidth;  
		res+=0.05;
		res2 = bat.css("width");
		res3 = res2.substring(0, res2.length - 2);
		if(res3 < window.innerWidth) { 
			bat.css('width', res+"%"); 
			if(res<=99)	per.text(Math.round(res)+"%"); 
		}		
		if(res >= 100){ level = 6;}
	}
	
	
	//free fly
	if(level == 6){
		var str = bat.css("width");
		str = str.substring(0, str.length - 2);
		var res = str * 100 / window.innerWidth;  
		if((pressedKeys['32']  || pressedKeys['37'] || pressedKeys['38'] || pressedKeys['39'] || pressedKeys['40']) && res >= 100) { 
			drone.removeClass('off');
			bp=100;
			extra = true;
		}
		if(extra) {
			if(msg.text()!='Free Fly') msg.text('Free Fly').removeClass('ok'); 
			drone.css({
				left: function(i,v) { return newh(v, 37, 39); },
				top: function(i,v) { return newv(v, 38, 40); },
				transform: "rotateX("+sx+") rotateY("+sy+")"
			});
			bp-=0.04;
			bat.css('width', bp+"%");
			per.text(Math.round(bp)+"%");
			if(bat.css('width') == '0px'){
				if(!drone.hasClass('failed')) drone.addClass('failed');
				if(msg.text()!='You crashed the Mars Helicopter!') msg.text('You crashed the Mars Helicopter!').removeClass('ok'); 
				extra = false;
				per.text("0%");
				$('.reload').addClass('on');
			}
		}
	}
	
	wh = sector.width() - drone.width();
	wv = sector.height() - drone.height();
	
}, 20);