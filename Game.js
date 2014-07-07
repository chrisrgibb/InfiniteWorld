// main game function
var Game = function(argument) { };

Game.fps = 50;
Game.then = Date.now(); // for fps

/**
	Main draw function
**/
Game.draw = function(){
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0 , WIDTH, HEIGHT);

	if(level){
		level.draw();
	}
	if(player){
		player.draw(ctx); 
	}
	// Game.drawFPS();
}


Game.update = function(){
	if(player){
		player.move();
	} 	
	// for()
	// enemys[0].move();

}
/*
 * Main game loop
 */
Game.run = function(){
	Game.update();
	Game.draw();
	requestAnimationFrame(Game.run);
	var now = Date.now();
	var elapsed = ( now - Game.then) / 1000;
	Game.then = Date.now();
	var fps = 1 / elapsed;
	// Game.drawFPS(fps);

}

Game.drawFPS = function(text) {
	ctx.fillStyle = "yellow";
	ctx.font = "bold 18px sans-serif";
	ctx.fillText(text, 20, 20);
	// body...
};

var debugStuff = [];
