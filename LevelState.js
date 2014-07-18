var LevelState = function(){

	this.enemys = [];
	this.map = null;
	this.objects = [];
	
	this.onScreenObjects = [];
	this.onScreenEnemies = [];

	this.objectsToRemove = [];
	this.permanentItems = [];

	this.currentItem = 0;

	this.backgroundColor = "#0000ff";

	this.shockWave = new ShockWave();

	this.playerOnGhost =true;

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
				    new MoneyBag(2, 79),
				    new MoneyBag(11, 6)
				    ];

};

// If player moves into the tile that the gameobject is in
LevelState.prototype.gameObject = function(x, y){

	for(var i = 0; i < this.onScreenObjects.length; i++){
		var objectInquestion = this.onScreenObjects[i]; // gross variable name


		var obx = this.onScreenObjects[i].x / 16 | 0;
		var oby = this.onScreenObjects[i].y / 16 | 0;
		if(x===obx && y ===oby){
			console.log("picked up object at " + x + " ,  " + y   );
			
			//
			objectInquestion.process(player);
			if(objectInquestion.remove){
				console.log("REMOVE");
				this.objectsToRemove.push(this.onScreenObjects[i]);
			}
		}
	}

	for(var i = 0; i < this.objects.length; i++){
		var obx = this.objects[i].x / 16 | 0;
		var oby = this.objects[i].y / 16 | 0;
		if(x===obx && y ===oby){
			console.log("picked up object at " + x + " ,  " + y   );
			this.objectsToRemove.push(this.objects[i]);
			
			this.objects[i].process(player);

		}
	}
}


LevelState.prototype.punchTile = function(x, y){

	if(x > this.map.blocks[0].length-1){
		return;
	}

	if ( this.map.blocks[y][x].breakable ){
		// alert("pow!");
		if(this.map.tiles[y][x]==9){ // star block
			this.onScreenObjects.push(new MoneyBag(x, y, true));
			if(this.onScreenObjects.length > 2){
				this.objectsToRemove.push(this.onScreenObjects[0]);
			}
		
		} else if(this.map.tiles[y][x]==8){ // question block
			// ring o
			switch(this.currentItem){
				case 0 : 
					this.onScreenObjects.push(new Ring(x, y, true));
					this.currentItem++;
					break;
				case 1 : 
					// this.enemys.push(new Ghost(x , y));
					this.onScreenObjects.push(new Ghost(x, y, true));
					this.currentItem++;
					break;
				case 2 :
					this.onScreenObjects.push(new Life(x, y, true));
					this.currentItem = 0;
					break
			}
			
			if(this.onScreenObjects.length > 2){
				this.objectsToRemove.push(this.onScreenObjects[0]);
			}
		}
		// create new empty space block
		this.map.blocks[y][x] = new Block(x, y, false, 0, 0 );	 
		this.map.tiles[y][x] =0;	
	}

	if(this.map.tiles[y][x]==2){
		this.map.tiles[y][x] =0;
	}


}

LevelState.prototype.useBracelet = function(player){
	// this.onScreenObjects.push(new ShockWave(player.x, player.y, player.dir) );
	if(player.dir==1 ){
		this.shockWave.launch(player.x + (20), player.y, player.dir);

	}else {
		this.shockWave.launch(player.x + (8 * player.dir), player.y, player.dir);
	}


}

LevelState.prototype.walkedOverBadStuff = function(x, y){
	if(x > this.map.blocks[0].length-1 || y > this.map.blocks.length-1){
		return;
	}
	if(this.map.blocks[y][x].image == 7 ){

		if(!this.playerOnGhost){
			// alert("pinkies");
			this.onScreenObjects.push(new Ghost(x, y, true));
			this.currentItem++;
			this.playerOnGhost = true;

			// to ensure only two items on screen
			if(this.onScreenObjects.length > 2){
				this.objectsToRemove.push(this.onScreenObjects[0]);
			}
		}
	} else {
		this.playerOnGhost = false;
	}


}

LevelState.prototype.updateShockwave = function(){
	if(!levelState.shockWave.dead){
		levelState.shockWave.update();


		// if(levelState.shockWave.)

		var x = levelState.shockWave.x / 16 | 0;
		var y = levelState.shockWave.y / 16 | 0;
		
		// if x is not off screen
		if(x > (map.getWidth()-1 ) || levelState.shockWave.x < 0 ) {
			levelState.shockWave.dead = true;
			player.braceletActivated = false;
			return; 
		}
		var block = map.getBlock(x,y);

		if(x < level.camera.x + (level.screenWidth / 16 | 0)  && map.getBlock(x, y).breakable){
			// connects with breakable block
			this.punchTile(x, y);
		} else if(x < level.camera.x + (level.screenWidth / 16 | 0)  && map.getBlock(x, y).isSolid){
			// hits a solidblock
			levelState.shockWave.dead = true;
			player.braceletActivated = false;
		}

	}
}



LevelState.prototype.update = function(){

	


	// remove everything
	var enemys = this.enemys;
	var removeEnemys = [];
	// var objectsToRemove = [];
	var countage = 0;


	// enemy logic
	// search through enemys for next one to appear
	// add to on screen enemies.
	// if its off screen remove it.
	// requires 3 lists!!!!


	for(var i = 0; i< enemys.length; i++){

		// // GOING to use this later???z`
		// if( enemys[i].x > level.camera.x + level.screenWidth 
		// 	|| enemys[i].y > level.camera.y + level.screenHeight){
		// 	// console.log("offscreen");
		// 	countage++;
		// 	currentDebugText = countage + " " + this.enemys.length + " " + this.onScreenEnemies.length;
		// } else {
		// 	var index = this.onScreenEnemies.indexOf(enemys[i]);
		// 	if(index==-1) {
		// 		this.onScreenEnemies.push(enemys[i]);
		// 		var gggg = 0;
		// 	}
		// }


		if( isEnemyOnScreen(level.camera, enemys[i]) ){
			enemys[i].move();
			countage++;
			currentDebugText = countage;
		}	else if(enemys[i].y < level.camera.y+16) {

			removeEnemys.push(enemys[i]);
		}
	}

	// console.log("offscreen " + countage);

	// increment timer on all onscreen objects (ring, money, life)
	for(var i = 0; i < this.onScreenObjects.length; i++){
		// this.onScreenObjects[i].timer++;
		this.onScreenObjects[i].update();
		if(this.onScreenObjects[i].remove){
			// tag for removal
			this.objectsToRemove.push(this.onScreenObjects[i]);
		}
	}

	this.updateShockwave();


	// remove static objects
	for(var i = 0, len = this.objectsToRemove.length; i < len; i++){

		var index = this.onScreenObjects.indexOf(this.objectsToRemove[i]);

		if(index!=-1){
			this.onScreenObjects.splice(index, 1);
			this.objectsToRemove.splice(i, 1);
		}
		var index = this.objects.indexOf(this.objectsToRemove[i]);
		if( index != -1){
			this.objects.splice(index, 1);
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