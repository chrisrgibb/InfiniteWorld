var canvas,
	ctx,
	WIDTH,
	HEIGHT,
	player,
	game,
	level,
	map,
	levelState,
	debug;
	var scale = 2;
	var COUNTER = 0;

var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function init(){
	debug = new Debugger();

	initCanvas();

	player = new Player();

	// set up levels
	levelState = new LevelState();
	levelState.init();
	map = levelState.map;
	level = new LevelRenderer(levelState.map, player, levelState);

	game = Game();
	Game.run();

	function initCanvas(){
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		ctx.imageSmoothingEnabled = false;
		WIDTH = canvas.width;
		HEIGHT = canvas.height;
		ctx.scale(scale, scale);	
	}
}

window.addEventListener("load", init);

document.getElementById('scale-button').addEventListener('click', function(){
	if(scale==2){
		scale = .5;
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
		ctx.scale(.5, .5);
		return 1;
	}
}

var something = (function(){
 var g = 5;
 this.h = 6;
 return g;
})();

