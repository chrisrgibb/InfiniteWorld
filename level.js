var LevelRenderer = function(mapp, player) {
	this.screenWidth = 16 * 16;// in pixels
	this.screenHeight = 20 * 16;
	this.tileMap = [];
	var camera = new Camera();
	this.player = player;
	var oldTile;

	// draws the level and stores the level


	// this is really a level renderer

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
		// if(map[y]===undefined){ // in case block goes out of array bounds
		// 	return 1;
		// }
		if(y > map.getHeight()-1){
			return 1;
		}
		else return map.getTile(x, y);
	}

	function draw(){
		var startTileX;
		var startTileY = camera.y / 16 | 0 ;
		if(startTileY < 0 ){
			startTileY = 0;
		}else if(startTileY > 0 ){
			console.log("over 0 = " +  startTileY);
		}

		if(startTileY!=oldTile){
			oldTile = startTileY;
		}

		// console.log(oldTile);

		for(var row = startTileY; row < map.getHeight(); row++ ){
			for(var col = 0; col < map.getWidth(); col++){
				// if(map[row][col]==1){
				var y = ( row * tileSize ) - camera.y ; ///16 |0;


				if(map.getTile( col, row)==1){
					ctx.fillStyle = "green";
					// ctx.fillRect(col * tileSize, (row * tileSize), tileSize, tileSize);
					ctx.fillRect(col * tileSize, y, tileSize, tileSize);
				} else if(map.getTile(col, row) == 2){
					ctx.fillStyle = "yellow";
					ctx.fillRect(col * tileSize, y, tileSize, tileSize);
				} else {

				}
			}
		}
		highLightTiles();
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
			ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
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
			 camera : camera
			};

};
