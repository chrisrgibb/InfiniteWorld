define(['./TileSheet', './Camera', '../game/player', '../level/levelState'],function(TileSheet, camera, player, levelState){

	var LevelRenderer = function() {

var ctx = document.getElementById('canvas').getContext('2d');
		CONSTANTS.tileSize = 16;
		CONSTANTS.screenWidth = screenWidth = CONSTANTS.tileSize * 16;
		CONSTANTS.screenHeight = screenHeight = CONSTANTS.tileSize * 12;

		var tileSheet = new TileSheet(),
			tilesToHighlight = [], // for debugging
			tileSize = 16,
			animationCounter = 0,
			map = levelState.map;
		

		function draw(){
			camera.update();
			var map = levelState.map;
			/**
				main drawing function
			*/
			var startTileX = Math.floor(camera.x / 16);
			var startTileY = Math.floor(camera.y / 16);
			var endTileX = map.getWidth()==16 ? 16 : (startTileX + 18);
			var endTileY = map.getHeight()==12 ? 12 : (startTileY + 13);

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
			ctx.fillRect(0, 0 , CONSTANTS.WIDTH, CONSTANTS.HEIGHT);

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
				 		tileSheet.drawTile(val + animationCounter , x , y, ctx);

				 	}else {				
						var val = tile.image;
						if(val > 0){
							tileSheet.drawTile(val, x, y, ctx);
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
				var x = ( col * tileSize ) - camera.x;

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
				addToHighLights : addToHighLights,
				// screenHeight : CONSTANTS.screenHeight,
				// screenWidth  : CONSTANTS.screenWidth,
				camera : camera,
				tileSheet : tileSheet
			};
	};


	return new LevelRenderer();

});
