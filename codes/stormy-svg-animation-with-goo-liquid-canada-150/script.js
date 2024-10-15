var waveGroup = document.getElementsByClassName("waveGroup");
var wave1 = document.getElementsByClassName("wave1");
var wave2 = document.getElementsByClassName("wave2");

var wheel = document.getElementsByClassName("wheel");
var boatgroup = document.getElementsByClassName("boatgroup");
var boat = document.getElementsByClassName("boat");

var characters = document.getElementsByClassName("characters");
var blink = document.getElementsByClassName("blink");
var OlderEyebrow = document.getElementsByClassName("OlderEyebrow");
var YoungerEyebrows = document.getElementsByClassName("YoungerEyebrows");
var mouth = document.getElementsByClassName("mouth");


var liquidBall = document.getElementsByClassName("liquidBall");
var gooPiece = document.getElementsByClassName("gooPiece");

var splashBlock = document.getElementsByClassName("splashBlock");
var waveSplashRight = document.getElementsByClassName("waveSplashRight");
var waveSplashLeft = document.getElementsByClassName("waveSplashLeft");

var liquidHair = document.getElementsByClassName("liquidHair");
var liquidHairgoo = document.getElementsByClassName("liquidHairgoo");
var liquidHairMain = document.getElementsByClassName("liquidHairMain");

var boatSplash = document.getElementsByClassName("boatSplash");
var boatSplashRight = document.getElementsByClassName("boatSplashRight");
var boatSplashLeft = document.getElementsByClassName("boatSplashLeft");



/* WAVE ANIMATION */
var tlwave1 = new TimelineMax({repeat:-1, yoyo:true});
tlwave1.fromTo(wave1, 3.5, {y:0}, {
  y:180,
  ease: "linear"
})
var tlwave2 = new TimelineMax({repeat:-1, yoyo:true});
tlwave2.fromTo(wave2, 2.5, {y:0}, {
  y:-50,
  ease: "easeInOut",
}, .3)

var tlwaveGroup = new TimelineMax({repeat:-1});
tlwaveGroup.set(waveGroup, {
   transformOrigin:"50% 100%",
   rotation:-4,
})
tlwaveGroup.to(waveGroup, 5.5, {
  rotation:4, 
  ease: "easeInOut",
}),
tlwaveGroup.to(waveGroup, 5.5, {
  rotation:-4, 
  ease: "easeInOut",
})




/* BOAT ANIMATION */
var tlboat = new TimelineMax({
  repeat:-1,
});
tlboat.set(boat, {
   transformOrigin:"50% 100%",
   rotation:-3,
})
tlboat.to(boat, 3, {
  rotation:3, 
  ease: CustomEase.create("custom", "M0,0 C0,0 0.287,0.187 0.5,0.4 0.65,0.55 0.744,0.745 0.754,0.75 0.778,0.775 0.819,0.885 0.824,0.916 0.844,0.978 0.914,0.861 0.915,0.844 0.92,0.855 1,1 1,1"),
}, 0.1),
tlboat.to(boat, 3, {
  rotation:-3, 
  ease: CustomEase.create("custom", "M0,0 C0,0 0.287,0.187 0.5,0.4 0.65,0.55 0.744,0.745 0.754,0.75 0.778,0.775 0.819,0.885 0.824,0.916 0.844,0.978 0.914,0.861 0.915,0.844 0.92,0.855 1,1 1,1"),
})


/* Boat Up and Down Motion */
var tlboatgroup = new TimelineMax({
  repeat:-1,
  yoyo:true
});
tlboatgroup.staggerFromTo(boatgroup, 3, {
  y:115,
  ease:CustomEase.create("custom", "M0,0 C0.242,0.208 0.64,0.372 0.738,0.662 0.83,0.934 0.838,0.968 1,1"),
}, {
  y:-70,
  ease:CustomEase.create("custom", "M0,0 C0.242,0.208 0.64,0.372 0.738,0.662 0.83,0.934 0.838,0.968 1,1"),
})




/* CHARACTER ANIMATION */
/* Characters moving with the boat*/
var tlcharacters = new TimelineMax({repeat:-1});
tlcharacters.set(characters, {
   transformOrigin:"50% 100%",
   rotation:-4,
})
tlcharacters.to(characters, 3, {
  rotation:4, 
  ease: "easeInOut",
}, 0.1),
tlcharacters.to(characters, 3, {
  rotation:-4, 
  ease: "easeInOut",
})

/* Eyes blinking */
var tlblink = new TimelineMax({repeat:-1});
tlblink.set(blink, {
  transformOrigin: "50% 50%", 
  rotation:15,
  scaleY:1.25,
})
tlblink.to(blink, .12, {scaleY:0, opacity:0}, 3)
tlblink.to(blink, .1, {scaleY:1, opacity:1})

/* Eyebrow */
var tlEyebrows = new TimelineMax({
  repeat:-1,
  delay:1,
  repeatDelay:1,
  yoyo:true
});
tlEyebrows.to(OlderEyebrow, .5, {
  transformOrigin:"50% 0%",
  rotation:5,
  y:-15, x:10
}, 1.5)

var tlYEyebrows = new TimelineMax({
  repeat:-1,
  delay:2,
  repeatDelay:1,
  yoyo:true
});
tlYEyebrows.to(YoungerEyebrows, 1, {
  transformOrigin:"50% 0%",
  rotation:5,
  y:12
}, 1)

var tlMouth = new TimelineMax({
  repeat:-1, 
  yoyo:true,
  delay:2,
  repeatDelay:1
});
tlMouth.to(mouth, 1, {
  transformOrigin:"50% 0%",
  scaleY:.7
}, 1)

/* Liquid Hair */
var tlLiquidHair = new TimelineMax({
  repeat:-1,
  repeatDelay:.5,
});
tlLiquidHair.set(liquidHairgoo, {transformOrigin:"50% 50%"})
tlLiquidHair.staggerFromTo(liquidHairgoo, 2, {
  x:0, y:0
}, {
  x:-300, y:150
}, .8)
tlLiquidHair.staggerFromTo(liquidHairgoo, 1, {}, { 
  scaleX:0, scaleY:0
}, 1, "-=1.5")

var tlLiquidHairMain = new TimelineMax();
tlLiquidHairMain.fromTo(liquidHairMain, 2, {
  transformOrigin: "50% 0%",
  scaleY:1
}, {
  scaleY:.9,
  rotation:3,
  repeat:-1,
  yoyo:true,
  ease:"linear"
})


/* LIQUID ANIMATION*/
/***** Main goos */
/* Moving goo rectangles up and down, larger then smaller*/
var tlgooPiece = new TimelineMax({repeat:-1, yoyo:true});
tlgooPiece.set(gooPiece, {
  transformOrigin:"50% 100%", scaleY:.5})
tlgooPiece.staggerFromTo(gooPiece, 1.5, {
  scaleY:.5, 
  ease: Power2.easeIn,
}, {
  scaleY:1,
  ease: Power2.easeInOut,
}, .035)

/* Jumping round circles */
var tlliquidBalls = new TimelineMax({repeat:-1});
tlliquidBalls.set(liquidBall, {transformOrigin:"50% 50%"})
tlliquidBalls.staggerFromTo(liquidBall, .7, {
  x:0, y:100,
  scaleX:1.2, scaleY:1.2
}, {
  x:0, y:-400, scaleY:1.4
}, .05)
tlliquidBalls.staggerFromTo(liquidBall, .8, {}, { 
  scaleX:0, scaleY:0
}, .1, "-=.8")


/***** Unique goos */
/* Moving wave splashes up and down as the boat moves */
var tlSplash = new TimelineMax({
  repeat:-1, 
  yoyo:true,
  delay:2
});
tlSplash.set(waveSplashLeft, {
  transformOrigin: "50% 100%",
  rotation:-10
})
tlSplash.set(waveSplashRight, {
  transformOrigin: "50% 100%",
  rotation:10
})
tlSplash.set(splashBlock, {transformOrigin: "50% 100%"})
tlSplash.fromTo(splashBlock, 1, {
  scaleY: .5,
  scaleX:.8,
  y:250,
  opacity:0.5
}, {
  scaleY:1.5,
  scaleX:1.2,
  y:0,
  opacity:1
}, 2)



var tlBoatSplash = new TimelineMax({
  repeat:-1,
  yoyo:true,
  delay:2.2
});
tlBoatSplash.set(boatSplashRight, {
  transformOrigin: "50% 100%",
  rotation:-168,
  x:-100, y:-380,
})
tlBoatSplash.set(boatSplashLeft, {
  transformOrigin: "50% 100%",
  rotation:170,
  x:-100, y:-400
})
tlBoatSplash.fromTo(boatSplash, 1, {
  opacity:0.2,
  scaleY:0,
  scaleX:.9
}, {
  opacity:1,
  scaleY:1,
  scaleX:1
}, 2)