// global variables whoop
var canvas,
	ctx,
	WIDTH,
	HEIGHT,
	game,
	camera,
	levelRenderer,
	objectRenderer,
	map,
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


	camera = new Camera();
	debug = new Debugger();

	initCanvas();

	var player = Game.player = new Player();


	// set up levelRenderers
	var seedValue = rangeSlider.value;


	var levelState = Game.levelState = new LevelState();
	levelState.init(seedValue);
	map = levelState.map;
	levelRenderer = new LevelRenderer(player, camera, levelState.map,  levelState);
	objectRenderer = new ObjectRenderer(camera, player, levelState);

	if(!Game.running){
	// game = Game();
		Game.run();
	}

	function initCanvas(){
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		ctx.imageSmoothingEnabled = false;
		WIDTH = canvas.width;
		HEIGHT = canvas.height;
		// TODO use function below to scale
		if(!haveScaled){
			ctx.scale(scale, scale);
			haveScaled =true;
		}	
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


