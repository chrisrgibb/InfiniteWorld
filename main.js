// global variables whoop
var canvas,
	ctx,
	WIDTH,
	HEIGHT,
	player,
	game,
	camera,
	levelRenderer,
	objectRenderer,
	map,
	levelState,
	debug,
	scale = 2,
	COUNTER = 0,
	CONSTANTS = {};

var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function init(){
	camera = new Camera();
	debug = new Debugger();

	initCanvas();

	player = new Player();

	// set up levelRenderers
	levelState = new levelState();
	levelState.init();
	map = levelState.map;
	levelRenderer = new levelRenderer(player, camera, levelState.map,  levelState);
	objectRenderer = new ObjectRenderer(camera, player, levelState);

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


