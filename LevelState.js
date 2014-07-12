var LevelState = function(){

	this.enemys = [];
	this.map = null;
	this.objects = [];
	
	this.onScreenObjects = [];

	this.objectsToRemove = [];

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

LevelState.prototype.gameObject = function(x, y){
	

}


LevelState.prototype.punchTile = function(x, y){

	if(x > this.map.blocks[0].length-1){
		return;
	}

	if ( this.map.blocks[y][x].breakable ){
		// alert("pow!");
		if(this.map.tiles[y][x]==9){
			this.onScreenObjects.push(new MoneyBag(x, y, true));
			if(this.onScreenObjects.length > 2){
				this.objectsToRemove.push(this.onScreenObjects[0]);
			}
		
		} else if(this.map.tiles[y][x]==8){
			// alert("ring");
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
	var removeEnemys = [];
	// var objectsToRemove = [];
	for(var i = 0; i< enemys.length; i++){
		if( isEnemyOnScreen(level.camera, enemys[i]) ){
			enemys[i].move();
		}	else {
			// removeEnemys.push(enemys[i]);
		}
	}
	for(var i = 0; i < this.onScreenObjects.length; i++){
		this.onScreenObjects[i].timer++;
		if(this.onScreenObjects[i].timer > 150){
			this.objectsToRemove.push(this.onScreenObjects[i]);
		}
	}
	// remove static objects
	for(var i = 0, len = this.objectsToRemove.length; i < len; i++){
		var index = this.onScreenObjects.indexOf(this.objectsToRemove[i]);
		if(index!=-1){
			this.onScreenObjects.splice(index, 1);
			this.objectsToRemove.splice(i, 1);
		}
	}
	// remove enemies
	for(var i = 0, len = removeEnemys.length; i < len; i++){
		var index = enemys.indexOf(removeEnemys[i]);
		if(index!=-1){
			enemys.splice(index, 1);
			removeEnemys.splice(i, 1);
		}
	}


};

// 