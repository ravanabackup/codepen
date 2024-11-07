console.clear();

// var styleVars = getComputedStyle(document.documentElement),
// 	cubeWidth = styleVars.getPropertyValue('--cube-width'),
// 	cubeHeight = styleVars.getPropertyValue('--cube-height'),
// 	cubeDepth = styleVars.getPropertyValue('--cube-depth'),
// cubeGap = styleVars.getPropertyValue('--cube-gap');

// console.log(cubeWidth);
// console.log(cubeHeight);
// console.log(cubeDepth);


select = e => document.querySelector(e);
selectAll = e => document.querySelectorAll(e);

const cubes = selectAll('.cube');
const cubeYPos = 10;

gsap.set('.container', { autoAlpha: 1 });
gsap.set('.scene', { rotateX: -30 })
// gsap.to('.cubes', { rotateY: 360, ease:"Sine.easeInOut", repeat: -1, yoyo: true, duration: 4 })

gsap.to('.cube', { 
		duration: 4,
		scaleY: 3,
		rotateY: 180,
		y: (i) => {
			return yPos = cubeYPos*i - (cubes.length-1)*cubeYPos;
		},
		ease: "sine.inOut", 
		stagger: {
			each: 0.08,
			yoyo: true,
			repeat: -1,
			from: "start"
		}
});

gsap.to('.cube-ring', { 
		duration: 4, 
		scale: 1.2,
		rotateY: 180,
		ease: "sine.inOut", 
		stagger: {
			each: 0.05,
			yoyo: true,
			repeat: -1,
			repeatDelay: 0,
			ease: "none",
			from: "start"
		}
});

gsap.timeline({ 
	repeat: -1,
	defaults: { 
		duration: 3, 
		stagger: { 
			each: 0.1, 
			from: "end" 
		}, 
		ease: "power2.inOut"
	}})
	.from('.cube-ring__rect-inner', {
		drawSVG: "0% 0%"
	})
	.to('.cube-ring__rect-inner', {
			drawSVG: "100% 100%"
	});