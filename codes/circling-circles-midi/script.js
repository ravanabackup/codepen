'use strict';

// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser. Use keyboard keys instead.");
}

// add event listeners
document.addEventListener('keydown', keyController);
document.addEventListener('keyup', keyController);

// qwerty keyboard controls.
function keyController(e) {
    if (e.type == "keydown") {
        direction = 1;
    } else if (e.type == "keyup") {
        direction = 0;
    }
}

// midi functions
function onMIDISuccess(midiAccess) {
    var midi = midiAccess;
    var inputs = midi.inputs.values();
    // loop through all inputs
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // listen for midi messages
        input.value.onmidimessage = onMIDIMessage;
    }
}

function onMIDIMessage(event) {
    var data = event.data;
    var type = data[0] & 0xf0;
    var velocity = data[2];

    switch (type) {
        case 144: // noteOn message
        case 128: // noteOff message
            handleMessage(type, velocity);
            break;
    }
}

function handleMessage(type, velocity) {
    if (type == (0x80 & 0xf0) || velocity == 0) {
      direction = 0;
    } else direction = 1;
}

function onMIDIFailure(e) {
    log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}

var N = 10000;
var R = 80;
var PERIOD = 5;
var _Math = Math;
var atan2 = _Math.atan2;
var cos = _Math.cos;
var sin = _Math.sin;
var PI = _Math.PI;

var container = document.querySelector('.container');
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var state = {};

var t_l = 0;
var TTT = 0;
var direction = 0;
function draw(t) {
	t = t / 500;
	var t_d = t - t_l;
	t_l = t;
	TTT += direction ? -t_d * 3 : t_d;
	var w = state.w;
	var h = state.h;
	var oscillators = state.oscillators;

	ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
	ctx.fillRect(-w, -h, w * 2, h * 2);
	ctx.fillStyle = '#fff';
	oscillators.forEach(function (_ref) {
		var x = _ref.x;
		var y = _ref.y;
		var offset = _ref.offset;

		var a = 2 * PI * (TTT + offset) / PERIOD;
		ctx.beginPath();
		ctx.arc(x + cos(a) * R, y + sin(a) * R, 4, 0, 2 * PI);
		ctx.fill();
	});
	requestAnimationFrame(draw);
}

function resize() {
	var w = state.w = window.innerWidth;
	var h = state.h = window.innerHeight;
	canvas.width = w * 2;
	canvas.height = h * 2;
	state.oscillators = Array.from({ length: N }, function (_) {
		var x = (w + R) * (Math.random() * 2 - 1);
		var y = (h + R) * (Math.random() * 2 - 1);
		var offset = PERIOD * (atan2(y, x) / PI + 1);
		return { x: x, y: y, offset: offset };
	});

	ctx.transform(1, 0, 0, -1, w, h);
}

resize();
requestAnimationFrame(draw);

const DEBOUNCE_MS = 200;
window.addEventListener('resize', (() => {
	var debounce;
	var lastTrigger = -DEBOUNCE_MS;
	return () => {
		clearTimeout(debounce);
		const now = Date.now();
		const diff = now - lastTrigger - DEBOUNCE_MS;
		if (diff > 0) {
			resize();
			lastTrigger = now;
		} else {
			debounce = setTimeout(resize, -diff);
		}
	};
})());

container.appendChild(canvas);