var levelRenderer = function(mapp, player, levelState) {
	this.screenWidth = 16 * 16;// in pixels
	this.screenHeight = 12 * 16;

	CONSTANTS.tileSize = 16;
	CONSTANTS.screenWidth = screenWidth = CONSTANTS.tileSize * 16;
	CONSTANTS.screenHeight = screenHeight = CONSTANTS.tileSize * 12;

	var camera = new Camera();
	this.player = player;
	// height of screen = 12 * 16

	// draws the levelRenderer and stores the levelRenderer


	// this is really a levelRenderer renderer
	var tileSheet = new TileSheet();
	var objectSheet = new ObjectSheet();
	var map = mapp;
	
	var tilesToHighlight = []; // for debuggin
	var tileSize = 16;

	var animationCounter = 0;


	function getTile(x, y){
		if(y > map.getHeight()-1){
			return 1;
		} 
		return map.getTile(x, y);
	}

	function draw(){
		camera.update();
		/**
			main drawing function
		*/
		var startTileX = Math.floor(camera.x / 16);
		var startTileY = Math.floor(camera.y / 16);
		// var endTileX = startTileX + 16;
		var endTileX = map.getWidth()==16 ? 16 : (startTileX + 18);
		var endTileY = map.getHeight()==12 ? 12 : (startTileY + 18);

		if(startTileY < 0 ){
			startTileY = 0;
		}
		if(endTileX > map.getWidth()){
			endTileX = map.getWidth();
		}
		else if(endTileY > map.getHeight() ){
			endTileY = map.getHeight();
		} 


		ctx.fillStyle = levelState.backgroundColor; //"#0000ff";
		ctx.fillRect(0, 0 , WIDTH, HEIGHT);

		// DRAW TILES
	
		for(var row = startTileY; row < endTileY; row++ ){
			for(var col = startTileX; col < endTileX; col++){
				var y = ( row * tileSize ) - camera.y ; ///16 |0;
				var x = (col * tileSize) - camera.x;

				var tile = map.getBlock(col, row);

				if(!tile){
					alert("bugger");
					debugger;
				}
				
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
		// draw objects
		levelState.objects.forEach(function(element){
			drawIfOnScreen(element, camera);
		});
		levelState.onScreenObjects.forEach(function(element){
			drawIfOnScreen(element, camera);
		})
		// draw enemies
		levelState.enemys.forEach(function(element){
			drawIfOnScreen(element, camera);
		});

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



	return { 
		mapWidth : function(){
			return map.getWidth();
		},
		mapHeight : function(){
			return map.getHeight();
		},
		getMap : function(){
			return map;
		},
		draw : draw,
		getTile : getTile,
		addToHighLights : addToHighLights,
		screenHeight : CONSTANTS.screenHeight,
		screenWidth  : CONSTANTS.screenWidth,
		camera : camera,
		tileSheet : tileSheet,
		objectSheet : objectSheet
		};

};
