let w = window.innerWidth + 5;
let h = window.innerHeight + 6;
let TOTAL_MARBLES = Math.floor(w / 10);

//matter js engine
let Engine = Matter.Engine,
	Render = Matter.Render,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Body = Matter.Body,
	Composite = Matter.Composite,
  Composites = Matter.Composites,
	Constraint = Matter.Constraint,
	MouseConstraint = Matter.MouseConstraint,
	Mouse = Matter.Mouse,
  Vector = Matter.Vector;

let engine = Engine.create();

let render = Render.create({
		element: document.body,
		engine: engine,
		options: {
			width: w,
			height: h,
			wireframes: false,
			background: "radial-gradient(#123456, #000, #000)"
		}
	});

let balls = [];
let catapults = [];
let risers = [];
let allMarbles = [];

//Random Number generator
function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createMarbleBackground(num,radius) {
	// empty out array
	let baseEncodedSvgArray = [];
	for (let i = 0; i < num; i++) {
		let uniqueID = random(0, 10000);
		let svg = `
      <svg height="${(radius*2)}px" width="${(radius*2)}px" style="overflow:hidden; border-radius:50%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:rgb(100,100,100);stop-opacity:0.5" />
      <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:1" />
    </radialGradient>
  </defs>
  <filter id="filter${uniqueID}">
    <feTurbulence baseFrequency="${
					random(1, 10000) / 100000
				}" numOctaves="${random(1, 9)}" seed="${random(1, 10000)}"/>
    <feColorMatrix values="		
    ${random(-10, 20) / 10}	${random(-10, 20) / 10} ${random(-10, 20) / 10} ${
			random(-10, 20) / 10
		} ${random(-20, 20) / 10} 		
    ${random(-10, 20) / 10} ${random(-10, 20) / 10} ${random(-10, 20) / 10} ${
			random(-10, 20) / 10
		} ${random(-20, 20) / 10}		
    ${random(-10, 20) / 10} ${random(-10, 20) / 10} ${random(-10, 20) / 10} ${
			random(10, 20) / 10
		} ${random(-20, 20) / 10}			
    ${random(-20, 20) / 10}	${random(-20, 20) / 10}	${random(-20, 20) / 10}	${
			random(-20, 20) / 10
		}	${random(-20, 20) / 10}			
    "/>
    </filter>
    <circle class="whiteBG" cx="50%" cy="50%" r="100%" fill="rgb(${random(
					0,
					255
				)},${random(0, 255)},${random(0, 255)})" />
    <circle class="patternFill" cx="50%" cy="50%" r="100%"  filter="url(#filter${uniqueID})"/>
		<text class='tee' text-anchor='middle' x="50%" y="75%">O</text>
</svg>
    `;
		let frag = document.createRange().createContextualFragment(svg);
		// pass node into serializer
		let s = new XMLSerializer().serializeToString(frag);
		// create base-encoded svg
		let marble = "data:image/svg+xml;base64," + window.btoa(s);
		// push marbles into array
		baseEncodedSvgArray.push(marble);
	}
	// gimme dat array
	return baseEncodedSvgArray;
}

function createGumballWorld() {
	w = window.innerWidth + 5;
	h = window.innerHeight + 6;

	//matter js engine
	Engine = Matter.Engine;
	Render = Matter.Render;
	World = Matter.World;
	Bodies = Matter.Bodies;
	Body = Matter.Body;
	Composite = Matter.Composite;
  Composites = Matter.Composites;
  Constraint = Matter.Constraint;
	MouseConstraint = Matter.MouseConstraint;
	Mouse = Matter.Mouse;
	Vector = Matter.Vector;
	
	engine = Engine.create();

	render = Render.create({
		element: document.body,
		engine: engine,
		options: {
			width: w,
			height: h,
			wireframes: false,
			background: "radial-gradient(#123456, #000, #000)"
		}
	});

	
	let options3 = {
		friction: 0,
		restitution: 0.95,
		isStatic: true,
		render: {fillStyle: '#123456', strokeStyle: '#123456', lineWidth: 0}
	};
	//Extra thick so the frame rate doesn't allow it to escape
	var topWall = Bodies.rectangle(w / 2, -220, w, 400, { isStatic: true });
	var leftWall = Bodies.rectangle(-200, h / 2, 400, h, { isStatic: true });
	var rightWall = Bodies.rectangle(w + 200, h / 2, 400, h, { isStatic: true });
	var bottomWall = Bodies.rectangle(w / 2, (h + 180), (w - 100), 400, options3);

	// add mouse control
	var mouse = Mouse.create(render.canvas),
		mouseConstraint = MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false
				}
			}
		});

  catapults = [];

	let spinOpts = {render: {fillStyle: '#456789', strokeStyle: '#456789', lineWidth: 0}}
	let spinOpts2 = {render: {fillStyle: '#123456', strokeStyle: '#123456', lineWidth: 0}}
	catapults[0] = Bodies.rectangle(w/2, h/2, 50, 10, spinOpts);
	catapults[1] = Bodies.rectangle((w/2), (h - 50), 50, 10, spinOpts);
	catapults[2] = Bodies.rectangle((w/2) + 120, (h - 50), 50, 10, spinOpts);
	catapults[3] = Bodies.rectangle((w/2) - 120, (h - 50), 50, 10, spinOpts);
	catapults[4] = Bodies.rectangle((w/2) + 60, (h - 50), 50, 10, spinOpts);
	catapults[5] = Bodies.rectangle((w/2) - 60, (h - 50), 50, 10, spinOpts);
	catapults[6] = Bodies.rectangle((w/2) + 180, (h - 50), 50, 10, spinOpts);
	catapults[7] = Bodies.rectangle((w/2) - 180, (h - 50), 50, 10, spinOpts);
	
	for (let i=0;i<catapults.length; i++){
    World.add(engine.world, [
        catapults[i],
        Constraint.create({ 
            bodyA: catapults[i],
            pointB: Vector.clone(catapults[i].position),
            stiffness: 1,
            length: 0
        })
    ]);
	}
	
	risers = [];
	risers[0] = Bodies.rectangle(25, (h-5), 50, 10, { isStatic: true, render: {fillStyle: '#846A13', strokeStyle: '#846A13', lineWidth: 0} });
	World.add(engine.world, risers[0]);
	risers[1] = Bodies.rectangle(w - 25, (h-5), 50, 10, { isStatic: true, render: {fillStyle: '#846A13', strokeStyle: '#846A13', lineWidth: 0} });
	World.add(engine.world, risers[1]);
	
	let angledPlatform = [];
	let options = {
		friction: 0,
		restitution: 0.95,
		angle: 19.45,
		isStatic: true,
		render: {fillStyle: '#123456', strokeStyle: '#123456', lineWidth: 0}
	};
	let options2 = {
		friction: 0,
		restitution: 0.95,
		angle: -19.45,
		isStatic: true,
		render: {fillStyle: '#123456', strokeStyle: '#123456', lineWidth: 0}
	}
	
	//x = half length + 50
	let platW = (w/3);
	angledPlatform[0] = Bodies.rectangle((platW/2 + 50), 150, platW, 5, options);
	angledPlatform[1] = Bodies.rectangle(w - (platW/2 + 50), 150, platW, 5, options2);
	World.add(engine.world, [angledPlatform[0], angledPlatform[1]]);
	
	World.add(engine.world, mouseConstraint);

	//Adds the walls to the world
	World.add(engine.world, [topWall, rightWall, leftWall, bottomWall]);

	Engine.run(engine);
	Render.run(render);
}

function spinEm() {
	//positive multiplier spins right, negative spins left
	let mult = 1;
	if(random(0,1) == 0){mult = -1}
	Body.setAngularVelocity(catapults[0], Math.PI / (10 * mult));
	Body.setAngularVelocity(catapults[1], Math.PI / (5 * mult));
	Body.setAngularVelocity(catapults[2], Math.PI / (5 * mult));
	Body.setAngularVelocity(catapults[3], Math.PI / (5 * mult));
	Body.setAngularVelocity(catapults[4], Math.PI / (5 * mult));
	Body.setAngularVelocity(catapults[5], Math.PI / (5 * mult));
	Body.setAngularVelocity(catapults[6], Math.PI / (5 * mult));
	Body.setAngularVelocity(catapults[7], Math.PI / (5 * mult));
}

function trackEm(){
	let indexesToRemove = [];
	for (let i = 0; i<allMarbles.length; i++){
		
		//if you're below the map... ya gone!
		if (allMarbles[i].position.y > h) {
			World.remove(engine.world, allMarbles[i]);
			indexesToRemove.push(i);
		}
		//second loop
	for (let i = 0; i<indexesToRemove.length; i++){
		allMarbles.splice(indexesToRemove[0], 1);
	}
		
		//if you're to the left or right... up ya go!
		if (allMarbles[i].position.x > (w-47) || allMarbles[i].position.x < (47)) {
			Body.setVelocity(allMarbles[i], { x: 0, y: -5 });
			// Body.setAngularVelocity(allMarbles[i], Math.PI / 5);
		}
		//if you're back at the top... nudge ya back in play!
		if (allMarbles[i].position.x > (w-47) && allMarbles[i].position.y < (0)) {
			Body.setVelocity(allMarbles[i], { x: -5, y: 0 });
		}
	if (allMarbles[i].position.x < (47) && allMarbles[i].position.y < (0)) {
			Body.setVelocity(allMarbles[i], { x: 5, y: 0 });
		}
		
	}
	
}

function newMarble(size){
	let colors = createMarbleBackground(1, size);
	let newBody = Bodies.circle(
			//position at mouse
			w/2 + random(-w/2, w/2),
			10,
			size,
			{
				friction: 0,
				render: {
					sprite: {
						texture: 'https://assets.codepen.io/2045658/hourglass.png',
						xScale: .05,
						yScale: .05
					}
				}
			}
		);
	World.add(engine.world, newBody);
	allMarbles.push(newBody);
}


$(document).on("click", function (event) {
	var colors = createMarbleBackground(1, 10);
	var newBody = Bodies.circle(
			//position at mouse
			event.pageX,
			event.pageY,
			10,
			{
				render: {
					sprite: {
						texture: 'https://assets.codepen.io/2045658/hourglass.png',
						xScale: .05,
						yScale: .05
					}
				}
			}
		);
	World.add(engine.world, newBody);
	allMarbles.push(newBody);
});

let spin = setInterval(function () {
	spinEm();
}, 300);

let track = setInterval(function () {
	trackEm();
}, 30);


	
window.addEventListener("resize", function () {
	resetAndRender();
});

function resetAndRender(){
	balls = [];
	catapults = [];
	risers = [];
	allMarbles = [];
	render.canvas.remove();
	render.canvas = null;
	render.context = null;
	render.textures = {};
	document.body.innerHTML = "";
	createGumballWorld();
	
	for(let i =0; i< TOTAL_MARBLES; i++){
		newMarble(11);
	}
}

resetAndRender();