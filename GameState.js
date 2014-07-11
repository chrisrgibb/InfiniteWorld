var enemys = [];


// x and y in tile coordinates

function initEnemies(){
	enemys.push(new Enemy(4, 3));
	enemys.push(new Enemy(4, 19));

	enemys.push(new Enemy(8, 26));

	enemys.push(new Enemy(4, 34));

	enemys.push(new Enemy(8, 37));
	enemys.push(new Enemy(8, 46));

	enemys.push(new Enemy(8, 50));

	enemys.push(new Scorpion( 4,4) ) ;

}

var GameState = function(){

	this.enemys = [];

};