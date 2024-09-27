function radiansToDegrees (_val) {  
  return _val * (Math.PI/180);
}

var bezier = MorphSVGPlugin.pathDataToBezier('M16,132.5v-46C16,47.7,47.7,16,86.5,16h0c38.8,0,70.5,31.7,70.5,70.5v106', {
  offsetX: 0,
  offsetY: 0
}), numShapes = 100, colorArray = ["#EF5350", "#EC407A","#AB47BC","#7E57C2","#5C6BC0","#42A5F5","#29B6F6","#26C6DA","#26A69A","#66BB6A","#9CCC65","#D4E157","#FFEE58","#FFCA28","#FFA726","#FF7043","#8D6E63","#BDBDBD","#78909C"
        ] 


let illo = new Zdog.Illustration({
  element: '.zdog-canvas',
	dragRotate: true,
  zoom: 1
});

function render () {
	illo.updateRenderGraph();
}
var mainTl = new TimelineMax({ onUpdate: render});

var mainAnchor = new Zdog.Anchor({
  addTo: illo,
  translate: {y: 0, z: 0 }
});

function createShapes(){

	for(var i = 0; i < numShapes; i++) {
		let anchor = new Zdog.Anchor({
			addTo: mainAnchor,
		translate: { z: - ( i * 5) }
});
		let pentagon = new Zdog.Polygon({
			addTo: anchor,
			radius: i * 10,
			opacity: 1 - (1 / i),
			sides: 5,
			stroke: 30,
			color: colorArray[ i % colorArray.length],
		});		
	//console.log(pentagon)
		
	let tl = new TimelineMax()
	tl.to(pentagon.translate, 1, {
		x: 130,
		yoyo: true,
		repeat: -1,
		ease: Sine.easeInOut
	})
.fromTo(pentagon.translate, 3, {
		y: -100
	}, {
		y: 200,
		yoyo: true,
		repeat: -1,
		ease: Power2.easeInOut
	}, 0)
.to(pentagon.rotate, 1.2, {
		z: radiansToDegrees(1.2 * i),
		yoyo: true,
		repeat: -1,
		ease: Sine.easeInOut
	}, 0)
		mainTl.add(tl, i/40)
	}
mainTl.seek(2000)
}
createShapes()
//TweenMax.globalTimeScale(0.25)