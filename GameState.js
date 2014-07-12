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
	enemys.push(new Enemy(4, 81));

}

var GameState = function(){

	this.enemys = [];
	this.map = null;

};


GameState.prototype.init = function() {
	this.enemys = [];
	this.enemys.push(new Enemy(4, 3));
	this.enemys.push(new Enemy(4, 19));

	this.enemys.push(new Enemy(8, 26));

	this.enemys.push(new Enemy(4, 34));

	this.enemys.push(new Enemy(8, 37));
	this.enemys.push(new Enemy(8, 46));

	this.enemys.push(new Enemy(8, 50));

	this.enemys.push(new Scorpion( 4,4) ) ;
	this.map = new Map();

};

GameState.prototype.draw = function(){


};

GameState.prototype.handlePunch = function(){


}
