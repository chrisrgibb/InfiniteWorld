	// main game function
var Game = function(argument) { };

Game.fps = 50; // 50 is fps
Game.then = Date.now(); // for fps


/**
	Main draw function
**/
Game.draw = function(){
	this.levelRenderer.draw();
	this.objectRenderer.draw();
	this.player.draw(this.player.ctx, this.levelRenderer.camera);
	// debug.render(ctx);
	// Game.drawDebugGrid(ctx, this.levelRenderer.camera);
};

Game.init = function(ctx){

	var seedValue = rangeSlider.value;

	this.levelState = new LevelState(this.player);

	this.levelState.init(seedValue);
	this.levelRenderer = new LevelRenderer(this.player, camera, this.levelState, ctx);
	this.objectRenderer = new ObjectRenderer(camera, this.player, this.levelState, ctx);


};

// Game.levelState =


Game.update = function(){
	COUNTER++;
	if(COUNTER>23){
		COUNTER=0;
	}
	this.levelState.update();
	this.player.move();
};
/*
 * Main game loop
 */

 var requestId ;

Game.run = function(){
	Game.update();
	Game.draw();
	requestAnimationFrame(Game.run);
	Game.calcFPS();
	Game.running = true;
};

Game.calcFPS = function(){
	var now = Date.now();
	var elapsed = ( now - Game.then) / 1000;
	var otherone = 1000 / (now - Game.then);

	Game.then = Date.now();
	var fps = 1 / elapsed;
	// Game.drawFPS(fps);
};

Game.drawDebugGrid = function(ctx, camera){
	if(debug.drawGrid){
		var y , x, tilesize = CONSTANTS.tileSize;
		for(y = 0; y < map.getHeight(); y++ ){
			for(x = 0; x < map.getWidth(); x++ ){
				if(x%5 === 0){
					ctx.font = "bold 8px sans-serif";
					ctx.fillText(x, 5 + x * tilesize, 10);
				}
			}
		}
	}
};

Game.drawFPS = function(text) {
	ctx.fillStyle = "yellow";
	ctx.font = "bold 18px sans-serif";
	ctx.fillText(text, 20, 20);
};

var debugStuff = [];
