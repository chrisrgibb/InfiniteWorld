var canvas,
	ctx,
	WIDTH,
	HEIGHT,
	player,
	game,
	level,
	map,
	levelState;
	var scale = 2;
	var COUNTER = 0;

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function init(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;
	WIDTH = canvas.width;
	HEIGHT = canvas.height;

	levelState = new LevelState();
	levelState.init();

	ctx.scale(scale, scale);
	player = new Player();
	// level = new LevelRenderer(map, player);


	map = levelState.map;
	level = new LevelRenderer(map, player);

	game = Game();
	player.draw(ctx);
	Game.run();
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

