var levelState = function(){

	this.enemys = [];
	this.map = null;
	this.objects = [];
	
	this.onScreenObjects = [];
	this.onScreenEnemies = [];

	this.objectsToRemove = [];

	this.currentItem = 0;

	// this.backgroundColor = "#0000ff";
	this.backgroundColor = "#005200";

	this.shockWave = new ShockWave();

	this.playerOnGhost =true;

};

levelState.prototype.init = function() {
	this.enemys = [];
	// this.map = new Map("tiles");
	// this.map = new Map();
	var lg = new levelGenerator();

	this.map = lg.createNewMap(true);

	this.enemys = this.map.enemys;
	this.objects = this.map.objects;
	this.backgroundColor = this.map.backgroundColor;

};

// If player moves into the tile that the gameobject is in
levelState.prototype.gameObject = function(x, y){

	var levelState = this;

	var searchObjects = function(element, index){
		var obx = element.x / 16 | 0;
		var oby = element.y / 16 | 0;
		if(x==obx && y==oby){
			element.process(player);
			if(element.remove){
				levelState.objectsToRemove.push(element);
			}
		}
	};

	this.onScreenObjects.forEach(searchObjects);
	this.objects.forEach(searchObjects);
};


levelState.prototype.punchTile = function(x, y){

	if(x > this.map.blocks[0].length-1){
		return;
	}
	var punchedTile = this.map.blocks[y][x],
		levelstate = this;

	function manageQuestionTile(){
		switch(levelstate.currentItem){
			case 0 : 
				levelstate.onScreenObjects.push(new Ring(x, y, true));
				levelstate.currentItem++;
				break;
			case 1 : 
				// this.enemys.push(new Ghost(x , y));
				levelstate.onScreenObjects.push(new Ghost(x, y, true));
				levelstate.currentItem++;
				break;
			case 2 :
				levelstate.onScreenObjects.push(new Life(x, y, true));
				levelstate.currentItem = 0;
				break;
		}
		if(levelstate.onScreenObjects.length > 2){
			levelstate.objectsToRemove.push(levelstate.onScreenObjects[0]);
		}
	}



	if (punchedTile.breakable ){
		if (punchedTile.image===9) { 
			// star block
			getNewOnScreenObject();
		} else if (punchedTile.image===8){ 
			// question block
			manageQuestionTile();
		} else if (punchedTile.image===10) { 
			// jitters block
			player.jittersTime = 15;

		}
		// create new empty space block
		this.map.blocks[y][x] = new Block(x, y, false, 0, 0 );	 
		this.map.tiles[y][x] =0;	
	}

	function getNewOnScreenObject(){
		levelstate.onScreenObjects.push(new MoneyBag(x, y, true));
		if(levelstate.onScreenObjects.length > 2){
			levelstate.objectsToRemove.push(levelstate.onScreenObjects[0]);
		}
	}


	if(this.map.tiles[y][x]===2){
		this.map.tiles[y][x] =0;
	}
};

levelState.prototype.fireShockwave = function(player){
	if(player.dir==1 ){
		this.shockWave.launch(player.x + (20), player.y, player.dir);
	}else {
		this.shockWave.launch(player.x + (8 * player.dir), player.y, player.dir);
	}
};


/**
*/
levelState.prototype.walkedOverBadStuff = function(x, y){
	if(x > this.map.blocks[0].length-1 || y > this.map.blocks.length-1){
		return;
	}
	if(this.map.blocks[y][x].image == 7 ){

		if(!this.playerOnGhost){
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
};





levelState.prototype.updateShockwave = function(){
	if(!this.shockWave.dead){
		this.shockWave.update();

		var x = levelState.shockWave.x / 16 | 0;
		var y = levelState.shockWave.y / 16 | 0;
		
		// if x is not off screen
		if(x > (map.getWidth()-1 ) || levelState.shockWave.x < 0 || !isOnScreen(levelRenderer.camera, this.shockWave) ) {
			levelState.shockWave.dead = true;
			player.shockwaveOnscreen = false;
			return; 
		}
		var block = map.getBlock(x,y);

		if(x < levelRenderer.camera.x + (levelRenderer.screenWidth / 16 | 0)  && map.getBlock(x, y).breakable){
			// connects with breakable block
			this.punchTile(x, y);
		} else if(x < levelRenderer.camera.x + (levelRenderer.screenWidth / 16 | 0)  && map.getBlock(x, y).isSolid){
			// hits a solidblock
			levelState.shockWave.dead = true;
			player.shockwaveOnscreen = false;
		}

	}
};




levelState.prototype.update = function(){
	// remove everything
	var enemys = this.enemys;
	var removeEnemys = [];
	var countage = 0;
 	/* Move stuff 
 	 *
 	 */
	for(var i = 0; i< enemys.length; i++){
		if( isOnScreen(levelRenderer.camera, enemys[i]) ){
			enemys[i].move();
			countage++;
			debug.setText(countage);
		}	else if(enemys[i].y < levelRenderer.camera.y + 16) {
			removeEnemys.push(enemys[i]);
		}
	}

	// increment timer on all onscreen objects (ring, money, life)
	for(i = 0; i < this.onScreenObjects.length; i++){
		// this.onScreenObjects[i].timer++;
		this.onScreenObjects[i].update();
		if(this.onScreenObjects[i].remove){
			this.objectsToRemove.push(this.onScreenObjects[i]);	// tag for removal
		}
	}
	this.updateShockwave();
	/* rEMove stuff 
 	 *
 	 */

	// remove static objects
	for(i = 0, len = this.objectsToRemove.length; i < len; i++){
		removeObject(this.onScreenObjects, this.objectsToRemove[i], this.objectsToRemove, i);
		removeObject(this.objects, this.objectsToRemove[i], this.objectsToRemove, i);
	}
	// remove enemies
	for(i = 0, len = removeEnemys.length; i < len; i++){
		removeObject(enemys, removeEnemys[i], removeEnemys, i);
	}
	
	/*
	*	
	*/

	function removeObject(fromArray, obj, toArray, i){
		var index = fromArray.indexOf(obj);
		if(index!=-1){
			fromArray.splice(index, 1);
			toArray.splice(i, 1);
		}
	}
};