var LevelRenderer = function(mapp, player, levelState) {
	this.screenWidth = 16 * 16;// in pixels
	this.screenHeight = 12 * 16;


	var camera = new Camera();
	this.player = player;
	// height of screen = 12 * 16

	// draws the level and stores the level


	// this is really a level renderer
	var tileSheet = new TileSheet();
	var objectSheet = new ObjectSheet();
	var levelState = levelState;
	var map = mapp;
	
	var tilesToHighlight = []; // for debuggin
	var tileSize = 16;

	var animationCounter = 0;


	function mapWidth(){
		return map.getWidth();
	}

	function mapHeight(){
		return map.getHeight();
	}

	function getTile(x, y){
		if(y > map.getHeight()-1){
			return 1;
		}
		else 
			return map.getTile(x, y);
	}

	function draw(){
		camera.update();
		/**
			main drawing function
		*/
		var startTileX = camera.x / 16 | 0;
		var startTileY = camera.y / 16 | 0;

		if(startTileY < 0 ){
			startTileY = 0;
		}else if(startTileY > 0 ){
			// console.log("over 0 = " +  startTileY);
		}

		ctx.fillStyle = levelState.backgroundColor; //"#0000ff";
		ctx.fillRect(0, 0 , WIDTH, HEIGHT);

		// DRAW TILES
		for(var row = startTileY; row < map.getHeight(); row++ ){
			for(var col = startTileX; col < map.getWidth(); col++){

				var y = ( row * tileSize ) - camera.y ; ///16 |0;
				var x = (col * tileSize) - camera.x;

				var tile = map.getBlock(col, row);
				
			 	// ctx.fillRect(x, y, tileSize, tileSize);
			 	if(tile.animated){
			 		if(COUNTER % 23 ==0){
			 			animationCounter++;
			 			if(animationCounter > 3){
							animationCounter = 0 ;
						}
			 		}
			 		var val = tile.image;
			 		tileSheet.drawTile(val + animationCounter , x , y);

			 	}else {				
					var val = tile.image;
					if(val > 0){
						tileSheet.drawTile(val, x, y);
					}
				}
				
			}
		}



		var gameObjects = levelState.objects;
		for(var i = 0; i < gameObjects.length; i++){
			if(isOnScreen(this.camera, gameObjects[i] )) {
				gameObjects[i].draw(camera);
			}
		}

		gameObjects = levelState.onScreenObjects;
		for(var i = 0; i< gameObjects.length; i++){
			if(isOnScreen(this.camera, gameObjects[i] )) {
				gameObjects[i].draw(camera);
			}
		}

		// highLightTiles();
		var enemys = levelState.enemys;
		for(var i = 0; i< enemys.length; i++){
			if( isOnScreen(this.camera, enemys[i]) ){
				enemys[i].draw(camera);
			}
		}

		if(!levelState.shockWave.dead){
			levelState.shockWave.draw(camera);
		}else{
			// comment
		}
		level.objectSheet.drawTile(12, 18* 16 , 5* 16);
	}

	function renderEnemies(){


		
	}


	function addToHighLights(x, y, col){
		var tempTile = [x, y, col];
		tilesToHighlight.push(tempTile);
	}
	// draws tiles different colors

	function getMap(){
		return map;
	}

	function highLightTiles(){
		ctx.fillStyle = "red";
		for(var i =0; i< tilesToHighlight.length; i++){
			var color = tilesToHighlight[i][2];
			var col = tilesToHighlight[i][0];
			var row = tilesToHighlight[i][1];
			ctx.fillStyle = color;

			var y = ( row * tileSize ) - camera.y;
			var x = (col * tileSize) - camera.x;

			ctx.fillRect(x, y, tileSize, tileSize);
		}
		tilesToHighlight = [];
	}



	return { draw : draw,
			 getTile : getTile,
			 mapWidth : mapWidth
			 ,mapHeight : mapHeight,
			 addToHighLights : addToHighLights,
			 getMap : getMap,
			 screenHeight : this.screenHeight,
			 screenWidth  : this.screenWidth,
			 camera : camera,
			 tileSheet : tileSheet,
			 objectSheet : objectSheet
			};

};
