var levelRenderer = function(mapp, player, levelState) {
	this.screenWidth = 16 * 16;// in pixels
	this.screenHeight = 12 * 16;

	CONSTANTS.tileSize = 16;
	CONSTANTS.screenWidth = tileSize * 16;
	CONSTANTS.screenHeight = tileSize * 12;

	var camera = new Camera();
	this.player = player;
	// height of screen = 12 * 16

	// draws the levelRenderer and stores the levelRenderer


	// this is really a levelRenderer renderer
	var tileSheet = new TileSheet();
	var objectSheet = new ObjectSheet();
	// var levelState = levelState;
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
			 		if(COUNTER % 23 ===0){
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
				if (debug.drawGrid) {
					ctx.strokeStyle = "yellow";
					ctx.beginPath();
					ctx.moveTo(x, 0);
					ctx.lineTo(x, 320);
					ctx.stroke();
				}

			}
		}

		var gameObjects = levelState.objects;
		for(var i = 0; i < gameObjects.length; i++){
			drawIfOnScreen(gameObjects[i], camera);
		}

		gameObjects = levelState.onScreenObjects;
		for(i = 0; i< gameObjects.length; i++){
			drawIfOnScreen(gameObjects[i], camera);
		}

		// highLightTiles();
		var enemys = levelState.enemys;
		for(i = 0; i< enemys.length; i++){	
			drawIfOnScreen(enemys[i], camera);
		}

		if(!levelState.shockWave.dead){
			levelState.shockWave.draw(camera);
		}
		levelRenderer.objectSheet.drawTile(12, 18* 16 , 5* 16);
	}

	function drawIfOnScreen(obj, camera){
		if(isOnScreen(camera, obj)){
			obj.draw(camera);
		}
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
			var col = tilesToHighlight[i][0];
			var row = tilesToHighlight[i][1];
			ctx.fillStyle = tilesToHighlight[i][2];

			var y = ( row * tileSize ) - camera.y;
			var x = (col * tileSize) - camera.x;

			ctx.fillRect(x, y, tileSize, tileSize);
		}
		tilesToHighlight = [];
	}



	return { draw : draw,
			 getTile : getTile,
			 mapWidth : mapWidth,
			 mapHeight : mapHeight,
			 addToHighLights : addToHighLights,
			 getMap : getMap,
			 screenHeight : this.screenHeight,
			 screenWidth  : this.screenWidth,
			 camera : camera,
			 tileSheet : tileSheet,
			 objectSheet : objectSheet
			};

};
