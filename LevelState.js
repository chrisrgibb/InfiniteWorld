var LevelState = function(){

	this.enemys = [];
	this.map = null;
	this.objects = [];

};

LevelState.prototype.init = function() {
	this.enemys = [];
	this.map = new Map();
	this.enemys.push(new Enemy(4, 3));
	this.enemys.push(new Enemy(4, 19));

	this.enemys.push(new Enemy(8, 26));

	this.enemys.push(new Enemy(4, 34));

	this.enemys.push(new Enemy(8, 37));
	this.enemys.push(new Enemy(8, 46));

	this.enemys.push(new Enemy(8, 50));

	this.enemys.push(new Scorpion( 4,4) ) ;


	this.objects = [
					new MoneyBag(7, 45), 
				    new MoneyBag(2, 48),
				    new MoneyBag(8, 62),
				    new MoneyBag(2, 78),
				    new MoneyBag(2, 79)
				    ];

};

LevelState.prototype.punchTile = function(x, y){

	if(x > this.map.blocks[0].length-1){
		return;
	}

	if ( this.map.blocks[y][x].breakable ){
		// alert("pow!");
		if(this.map.tiles[y][x]==9){
			this.objects.push(new MoneyBag(x, y))
		}
		this.map.blocks[y][x] = new Block(x, y, false, null );	
		this.map.tiles[y][x] =0;	
	}

	if(this.map.tiles[y][x]==2){
		this.map.tiles[y][x] =0;
	}
}


LevelState.prototype.update = function(){
	var enemys = this.enemys;
	for(var i = 0; i< enemys.length; i++){
		if( isEnemyOnScreen(level.camera, enemys[i]) ){
			enemys[i].move();
		}
	}


};

LevelState.prototype.draw = function(){
	var enemys = this.enemys;
	for(var i = 0; i< enemys.length; i++){
		if( isEnemyOnScreen(level.camera, enemys[i]) ){
			// enemys[i].move();
			enemys[i].draw(level.camera);
		}
	}
	var gameObjects = this.objects;
	for(var i = 0; i < gameObjects.length; i++){
		if(isEnemyOnScreen(level.camera, gameObjects[i] )) {
			gameObjects[i].draw(level.camera);
		}
	}
}
