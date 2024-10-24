var albertCanvas = document.getElementById("albert"),
    ctx = albertCanvas.getContext("2d"),
    cw = albertCanvas.getAttribute("width"),
    ch = albertCanvas.getAttribute("height"),
    px = 8,
    startCoords = [
      (cw / 2) - (px / 2),
      (ch / 2) - (px / 2)
    ],
    fillPerMS = 5,
    resetTime = 30000,
    colors = [
      "#eee", "#aaa", "#555", "#333",
      "#f33", "#f63", "#f93", "#fc3",
      "#ff3"
    ],
    background = "#051313"

console.log(ctx)

function init() {
  ctx.fillStyle = background
  ctx.fillRect(0, 0, cw, ch)
  
  fill(startCoords)
  spread(startCoords)
  
  setTimeout(init, resetTime)
}

function fill (coords) {
  ctx.fillStyle = colors[rd(colors.length)]

  ctx.fillRect(
    coords[0],
    coords[1],
    px, px)
  
}

function spread(coords) {
  var newCoords = [
    rand(coords[0]),
    rand(coords[1])
  ]
  fill(newCoords)
  setTimeout(function(){
    spread(newCoords)
  }, fillPerMS)
}

function rand(x) {
  return rd() ?
    (rd() ? x - px : x) :
    (rd() ? x + px : x)
}

function rd(l) {
  return Math.round(Math.random() * (l || 1))
}



init()