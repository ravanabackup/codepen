function fillFn(draw) {
  const gradient = draw.gradient('linear', function(stop) {
    stop.at(0, "midnightblue");
    stop.at(0.31, "red");
    stop.at(0.311, "darkred");
    stop.at(0.312, "yellow");
    stop.at(0.316, "orange");
    stop.at(0.34, "firebrick");
    stop.at(0.5, "purple");
    stop.at(0.9, "lavender");
  });
  gradient.from(0,0).to(0,1);
  return gradient;
}


function build({fillFn}) {
  const {width, height} = elBg.getBoundingClientRect();
  const draw = SVG("elBg").size(width, height);
  const rect = draw.rect("100%", "100%").attr("fill",fillFn(draw))
   
  rect.filter(function (add) {
    
    add.attr({primitiveUnits:"userSpaceOnUse"});
    
    const mapSea = add.turbulence("0.005 0.25", 1, 3, "noStitch", "fractalNoise");
    const dmapSea = add.displacementMap(add.source, mapSea, 500, "R", "R").size("100%","70%").move(0,"30%");
    const compSea = add.composite(dmapSea.gaussianBlur(2), dmapSea, "arithmetic").attr({ k1:0, k2:0.2, k3:0.2, k4:0 });
    
    const mapSky = add.turbulence("0.004 0.025", 3, 8, "noStitch", "fractalNoise");
    const dmapSky = add.displacementMap(add.source, mapSky, 50, "R", "G").size("100%","30%").move(0,0);
    const compSky = add.composite(dmapSky.gaussianBlur(1), dmapSky, "arithmetic").attr({ k1:0, k2:0.2, k3:0.2, k4:0 });
  
    add.merge(add.source, compSea, compSky);
    
    dmapSea.animate(2000, "-", 0).attr("scale", 860).loop(Infinity,true);
  });
}

window.addEventListener("resize", e => {
  elBg.innerHTML="";
  build({fillFn});
});

build({fillFn});