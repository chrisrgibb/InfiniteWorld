// main game function
var Game = function(argument) { };

Game.fps = 50; // 50 is fps 
Game.then = Date.now(); // for fps


/**
	Main draw function
**/
Game.draw = function(){
	if(level){
		level.draw();
	}
	player.draw(ctx, level.camera); 
	debug.render(ctx);
};


Game.update = function(){
	COUNTER++;
	if(COUNTER>23){
		COUNTER=0;
	}
	levelState.update();
	if(player){
		player.move();
	} 	
};
/*
 * Main game loop
 */
Game.run = function(){
	Game.update();
	Game.draw();
	requestAnimationFrame(Game.run);
	Game.calcFPS();

};

Game.calcFPS = function(){
	var now = Date.now();
	var elapsed = ( now - Game.then) / 1000;
	var otherone = 1000 / (now - Game.then);

	Game.then = Date.now();
	var fps = 1 / elapsed;
	// Game.drawFPS(fps);
};

Game.drawFPS = function(text) {
	ctx.fillStyle = "yellow";
	ctx.font = "bold 18px sans-serif";
	ctx.fillText(text, 20, 20);
};

var debugStuff = [];
