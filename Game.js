// main game function
var Game = function(argument) { };

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
}


Game.update = function(){
	if(player){
		player.move();
	}
}
/*
 * Main game loop
 */
Game.run = function(){
	Game.update();
	Game.draw();
	requestAnimationFrame(Game.run);

}