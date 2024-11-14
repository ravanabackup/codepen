console.clear();
var doc = document;

var shape = doc.querySelector('.shape');
var shapeW = 90; // bad way
var shapeVOffset = shapeW / 2.5;
var shapeH = shapeW - shapeVOffset; // bad way
var shapeCounter = 0;

var pattern = doc.querySelector('.pattern');
var pattVbox = pattern.getAttribute('viewBox').split(' ');
var pattVboxHor = pattVbox[2];
var pattVboxVert = pattVbox[3];
var gFilled = doc.querySelector('.shapes-filled');
var gStroked = doc.querySelector('.shapes-stroked');

var tilesHor = pattVboxHor / shapeW;
var tilesVert = pattVboxVert / shapeH + 1;
var tilesMax = tilesHor * tilesVert;

var colorStep = 360 / tilesMax;

var duration = 3;

var text = doc.querySelector('.text');

fillPattern();
setTime(); 

function getRandColor() {
    var colorPos = Math.random() * 360;
    var colorS = Math.random() * 30 + 70 + '%';
    var colorB = Math.random() * 40 + 20 + '%';
    var colorVal = [ Math.floor(colorPos * colorStep), colorS, colorB].join(','); 
    var color = 'hsl(' + colorVal +')';
    return color;
}

var myInt = setInterval(setTime, 1000);

function setTime() {
    var myDate = new Date();
    var hours = myDate.getHours();
    var mins = myDate.getMinutes();
    var secs = myDate.getSeconds();
    
    var time = [hours, mins, secs];
    for( var i = 0; i < time.length; i++ ){
        time[i] = time[i] < 10 ? '0' + time[i] : time[i];        
    }
    
    time = time.join(':');
    text.textContent = time;
}

function Shape( x, y, hasAnim ) {
    hasAnim = hasAnim === undefined ? true : hasAnim;

    var newShape = shape.cloneNode();   
    var translateVal = [ shapeW * x, shapeH * y].join(' ');
    var tranform = 'translate(' + translateVal + ')'; 
    newShape.setAttribute('transform', tranform);
    
    if ( hasAnim ) {
        var color = getRandColor();
        newShape.setAttribute('fill', color);
        var newShapeAnim = new Animation( newShape );
    }
    
    shapeCounter++;
    return newShape;
}

function fillPattern(){
    for (var y = 0; y < tilesVert; y++) {
        for (var x = 0; x < tilesHor; x++ ) {
            var newShape = new Shape( x, y );
            var newItem = gFilled.appendChild(newShape);  
            
            var newShapeStroked = new Shape( x, y, false );
            var newItemStroked = gStroked.appendChild(newShapeStroked);  
            
            // console.log( gFilled );
        }
    }
    console.dir( pattern );
    // out(newItem);
}

// -----------------------------------------



function Animation( elem ) {
    
    var initFill = elem.getAttribute('fill');

    var to1 = {
        fill: getRandColor(),
        ease: Power0.easeIn
    };
    var to2 = {
        fill: getRandColor(),
        ease: Power0.easeOut
    };
    
    var to3 = {
        fill: getRandColor(),
        ease: Power0.easeIn,
        onComplete: forward
    };

    var myTween = new TimelineLite();
    forward();

    function forward() {
        myTween.to(elem, duration, to1);
        myTween.to(elem, duration, to2);
        myTween.to(elem, duration, to3);
    }
}

// -----------------------------------------

function out ( content ) {
    console.dir( content );
}