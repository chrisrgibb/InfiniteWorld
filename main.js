// global variables whoop
// var canvas,
var WIDTH,
	HEIGHT,
	debug,
	COUNTER = 0,
	CONSTANTS = {
		scale : 2
	},
	haveScaled = false;

var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function init(){


	// camera = new Camera();
	debug = new Debugger();

	Game.init();

	if(!Game.running){
		Game.run();
	}

}

window.addEventListener("load", init);

var rangeSlider = document.getElementById('range');
rangeSlider.addEventListener('change', function(){
	init(rangeSlider.value);
});

