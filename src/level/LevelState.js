define(['../game/objects/shockWave', './MapCreater', '../game/player/player', 
		 './Block', '../game/enemies/ghost', 
		  '../graphics/animationgenerator', '../game/gameobjects', './levelGen/levelGenerator'], 
		function( ShockWave, MapCreater, Player,  Block, Ghost, animationgen, GameObjects, LevelGen){


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

	var LevelState = function(){

		this.map = null;

		this.player = Player;
		this.player.levelState = this;
		this.enemys = [];
		this.objects = [];
		
		this.onScreenObjects = [];
		this.onScreenEnemies = [];
		this.objectsToRemove = [];

		this.animations = [];

		this.animationgen = animationgen;

		this.currentItem = 0;

		// this.backgroundColor = "#0000ff";
		this.backgroundColor = "#005200";

		this.shockWave = new ShockWave();

		this.playerOnGhost = true;
	};

	LevelState.prototype.init = function(seedValue) {
		this.enemys = [];
		seedValue = seedValue || 6;

		var isRandom = true;
		if(isRandom){
			/* 
				Create Random Level
			*/
			this.map = LevelGen.createNewMap(isRandom, seedValue);
		} else {
			this.map = new MapCreater().createMap();
		}

		this.enemys = this.map.enemys;
		this.objects = this.map.objects;
		this.backgroundColor = this.map.backgroundColor;
	};

	// LevelState.prototype.newLevel = function(){


	// };

	LevelState.prototype.respawn = function(){
		// debugger;/
		var tileSize = 16;
		var leftX = Game.camera.x;
		var col = leftX / tileSize;
		var middleOfScreen = CONSTANTS.screenHeight / 2;
		var width = CONSTANTS.screenWidth / tileSize;
		var height = CONSTANTS.screenHeight / tileSize;
		var startY = Math.floor(Game.camera.y / tileSize) + 3,
			startX = Math.floor(Game.camera.x / tileSize);

		for(var y = startY; y < startY + height; y++){
			for ( var x = startX; x < startX + width; x++){
				var tile = this.map.blocks[y][x];
				if(tile.isSolid===1){
					var block1 = this.map.blocks[y-1][x];
					var block2 = this.map.blocks[y-2][x];
					if(block1.isSolid!==1 && block2.isSolid!==1){
						return { x : x, y : y};
					}
				}
			}
		}
		alert("should have restarted by now...");
	};

	// If player moves into the tile that the gameobject is in
	LevelState.prototype.checkForCollisions = function(x, y){

		var levelState = this;

		var searchObjects = function(element, index){
			var obx = element.x / 16 | 0;
			var oby = element.y / 16 | 0;
			if(x==obx && y==oby){
				element.process(levelState.player);
				if(element.remove){
					levelState.objectsToRemove.push(element);
				}
			}
		};

		this.onScreenObjects.forEach(searchObjects);
		this.objects.forEach(searchObjects);
	};


	LevelState.prototype.punchTile = function(x, y){

		if(x > this.map.blocks[0].length-1){
			return;
		}
		var punchedTile = this.map.blocks[y][x],
			levelstate = this;

		var handleQuestionTile = function (){

			var options = {
				0 : function(){
					levelstate.onScreenObjects.push(GameObjects.ring(x, y, true));
					levelstate.currentItem++;
				},
				1 : function(){
					levelstate.onScreenObjects.push(new Ghost(x, y, true));
					levelstate.currentItem++;
				},
				2 : function(){
					levelstate.onScreenObjects.push(GameObjects.life(x, y, true));
					levelstate.currentItem = 0;
				}
			}

			options[levelstate.currentItem]();

			if(levelstate.onScreenObjects.length > 2){
				levelstate.objectsToRemove.push(levelstate.onScreenObjects[0]);
			}
		};

		var getNewOnScreenObject = function (){

			levelstate.onScreenObjects.push(GameObjects.moneybag(x, y, true));

			if(levelstate.onScreenObjects.length > 2){
				levelstate.objectsToRemove.push(levelstate.onScreenObjects[0]);
			}
		};

		if (punchedTile.breakable ){
			if (punchedTile.image === Block.star) { 
				// star block
				getNewOnScreenObject();
			} else if (punchedTile.image === Block.question){ 
				// question block
				handleQuestionTile();
			} else if (punchedTile.image === Block.yellowskull) { 
				// jitters block
				this.player.jittersTime = 15;
			}
			// create new empty space block
			this.map.blocks[y][x] = new Block(x, y, false, 0, 0 );	 
			this.map.tiles[y][x] = 0;	

			// add explosion animation to levelstate
			this.animations.push(animationgen.getAnimation(x * 16, y * 16));
		}

		if(this.map.tiles[y][x]===2){
			this.map.tiles[y][x] = 0;
		}
	};

	LevelState.prototype.fireShockwave = function(player){
		if(player.dir==1 ){
			this.shockWave.launch(player.x + (20), player.y, player.dir);
		}else {
			this.shockWave.launch(player.x + (8 * player.dir), player.y, player.dir);
		}
	};


	/**
	*/
	LevelState.prototype.walkedOverBadStuff = function(x, y){
		if(x > this.map.blocks[0].length-1 || y > this.map.blocks.length-1){
			return;
		}
		if(this.map.blocks[y][x].image == 7 ){ // skullblock

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





	LevelState.prototype.updateShockwave = function(){
		var levelState = this,
		camera = Game.camera,
		map = levelState.map;
		if(!this.shockWave.dead){
			this.shockWave.update();

			var x = levelState.shockWave.x / 16 | 0;
			var y = levelState.shockWave.y / 16 | 0;
			
			// if x is not off screen
			if(x > (map.getWidth()-1 ) || levelState.shockWave.x < 0 || !isOnScreen(camera, this.shockWave) ) {
				levelState.shockWave.dead = true;
				this.player.shockwaveOnscreen = false;
				return; 
			}
			var block = map.getBlock(x,y);

			if(x < camera.x + (CONSTANTS.screenWidth / 16 | 0)  && map.getBlock(x, y).breakable){
				// connects with breakable block
				this.punchTile(x, y);
			} else if(x < camera.x + (CONSTANTS.screenWidth / 16 | 0)  && map.getBlock(x, y).isSolid){
				// hits a solidblock
				levelState.shockWave.dead = true;
				this.player.shockwaveOnscreen = false;
			}

		}
	};


	LevelState.prototype.updateEnemies = function(){



	};

	LevelState.prototype.update = function(){
		// remove everything
		var enemys = this.enemys;
		var removeEnemys = [];
		var countage = 0;
		var Game = window.Game;
		// var levelRenderer = Game.levelRenderer;
		var camera = Game.camera;
		var levelState = this;
	 	/* Move stuff 
	 	 *
	 	 */


		for(var i = 0; i< enemys.length; i++){
			if( isOnScreen(camera, enemys[i]) ){

				enemys[i].move(this);
				countage++;
				debug.setText(countage);
				collideWithPlayer(enemys[i], this.player);

			}	else if(enemys[i].y < camera.y + 16) {
				// enemy is offscreen
				removeEnemys.push(enemys[i]);
			}
		}

		function collideWithPlayer(obj, player){
			// TODO implement
			var width = obj.width / 2;
			var height = obj.height / 2;
			var x1 = obj.x - width;
			var	x2 = obj.x + width;

			var y1 = obj.y - height;
			var y2 = obj.y + height;

			var playerx1 = player.x - player.width / 2;
			var	playerx2 = player.x + player.width / 2;
			// Check for collision with enemys;
			if(player.x > x1 && player.x < x2 
				&& player.y > y1 && player.y < y2){
				debug.debugText2 = "Colideddd";
				player.setDead();
			} else {
				debug.debugText2 = "";
			}
			// check if player has punched enemy
			if (player.punchTime > 0 && 
				(player.punchX > x1 && player.punchX < x2))  {
				if(player.y > y1 && player.y < y2){
					removeEnemys.push(obj);
					var cloud = animationgen.getCloud(obj.x, obj.y);
					levelState.animations.push(cloud);
				}
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


		for(i = 0; i < this.animations.length; i++){
			this.animations[i].move();
			if(this.animations[i].remove){
				this.objectsToRemove.push(this.animations[i]);
			}

		}

		this.updateShockwave();
		/* rEMove stuff 
	 	 *
	 	 */

		// remove static objects
		for(i = 0, len = this.objectsToRemove.length; i < len; i++){
			// TODO this might be a bit silly
			removeObject(this.onScreenObjects, this.objectsToRemove[i], this.objectsToRemove, i);
			removeObject(this.objects, this.objectsToRemove[i], this.objectsToRemove, i);
			removeObject(this.animations, this.objectsToRemove[i], this.objectsToRemove, i);
		}
		// remove enemies
		for(i = 0, len = removeEnemys.length; i < len; i++){
			removeObject(enemys, removeEnemys[i], removeEnemys, i);
		}
		
	};

	var ls = new LevelState();

	return ls;
});
