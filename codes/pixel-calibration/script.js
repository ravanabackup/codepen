/*
  this pen was inspired by Jason Brown and Robert Lemon
  Please check out their pens (loktar has an amazing tetris pen)
  https://codepen.io/loktar00/
  https://codepen.io/rlemon/
*/

var df = document.createDocumentFragment();
var container = document.getElementById('container');
for (var i = 0; i < 900; i++) {
    var x = i % 30;
    var y = ~~ (i / 30);
    var elm = document.createElement('div');
    elm.className = 'box';
    elm.style.top = (y * 10) + 'px';
    elm.style.left = (x * 10) + 'px';
    //elm.style.backgroundColor = color(i%15);
    df.appendChild(elm);
}
container.appendChild(df);
var cycle = 0;
var r = 0;
var g = 0;
var b = 0;
var children = container.children;
run();

function run() {
    requestAnimationFrame(run);
    for (var i = 0, l = children.length; i < l; i++) {
        var top = parseFloat(children[i].style.top);
        var left = parseFloat(children[i].style.left);
        children[i].style.top = top + Math.cos(cycle + (i % 30)) + 'px';
        children[i].style.left = left + Math.sin(cycle + ~~ (i / 30)) + 'px';
        children[i].style.backgroundColor = color(i/cycle, g, b);
        var w = Math.random() * (10 - 2) + 2;
        var h = Math.random() * (10 - 2) + 2;
        children[i].style.width = w+'px';
        children[i].style.height = h+'px';
        if(cycle > 2 * Math.PI){
            cycle = 0;
            g = Math.random() * (10 - 1) + 1;
            b = Math.random() * (10 - 1) + 1;
            stop = true;
        }
        else cycle += 1e-4;
    }
}
function color(i, g, b) {
    var r = Math.floor( Math.sin(i) * 127 + 128 );
    var g = Math.floor( Math.sin(i + g) * 127 + 128 );
    var b = Math.floor( Math.sin(i + b) * 127 + 128 );
    return 'rgb(' + r + ', ' + g + ',' + b + ')';
}