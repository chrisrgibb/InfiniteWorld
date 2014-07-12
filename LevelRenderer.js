var LevelRenderer = function(mapp, player) {
	this.screenWidth = 16 * 16;// in pixels
	this.screenHeight = 12 * 16;


	var camera = new Camera();
	this.player = player;
	// height of screen = 12 * 16

	// draws the level and stores the level


	// this is really a level renderer
	var tileSheet = new TileSheet();
	var map = mapp;

	// 2 = starblock
	
	var tilesToHighlight = [];
	var tileSize = 16;


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

		
		for(var row = startTileY; row < map.getHeight(); row++ ){
			for(var col = startTileX; col < map.getWidth(); col++){


				var y = ( row * tileSize ) - camera.y ; ///16 |0;
				var x = (col * tileSize) - camera.x;
				ctx.fillStyle = "#0000ff";
			 	ctx.fillRect(x, y, tileSize, tileSize);
			
				var val = map.getTile(col, row);
				if(val > 0){
					tileSheet.drawTile(val, x, y);
				} 
					
			}
		}
		var gameObjects = levelState.objects;
		for(var i = 0; i < gameObjects.length; i++){
			if(isEnemyOnScreen(this.camera, gameObjects[i] )) {
				gameObjects[i].draw(camera);
			}
		}

		gameObjects = levelState.onScreenObjects;
		for(var i = 0; i< gameObjects.length; i++){
			if(isEnemyOnScreen(this.camera, gameObjects[i] )) {
				gameObjects[i].draw(camera);
			}
		}

		// highLightTiles();
		var enemys = levelState.enemys;
		for(var i = 0; i< enemys.length; i++){
			if( isEnemyOnScreen(this.camera, enemys[i]) ){
				enemys[i].draw(camera);
			}
		}
		camera.update();
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
			 tileSheet : tileSheet
			};

};
