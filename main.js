// global variables whoop
// var canvas,
var WIDTH,
	HEIGHT,
	// game,
	debug,
	scale = 2,
	COUNTER = 0,
	CONSTANTS = {},
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


document.getElementById('scale-button').addEventListener('click', function(){
	if(scale==2){
		scale = 0.5;
		ctx.scale(scale, scale);
		this.innerHTML = "1x";
	}else {
		scale = 2;
		ctx.scale(scale, scale);
		this.innerHTML = "2x";
	}
});

function scaleCtx(size){
	if(size==2){
		ctx.scale(2, 2);
		return 2;
	}else{
		ctx.scale(0.5, 0.5);
		return 1;
	}
}


