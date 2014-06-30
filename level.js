var Level = function() {
	this.tileMap = [];

	// draws the level and stores the level


	// this is really a level renderer


	// var map = [
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1],
	// 	[1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1],
	// 	[1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
	// 	[1,1,1,1,0,0,1,1,1,1,1,0,0,0,1,1],
	// 	[1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,1],
	// 	[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
	// 	[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
	// 	[1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
	// 	[1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
	// 	[1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
	// 	[1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
	// 	[1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
	// 	[1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1]
	// ];
	var map = new Map();

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
		// return map[y][x];
	}

	function draw(){
		for(var row = 0; row < map.getHeight(); row++ ){
				for(var col = 0; col < map.getWidth(); col++){
					// if(map[row][col]==1){
				if(map.getTile(col, row)==1){
					ctx.fillStyle = "green";
					ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
				} else if(map.getTile(col, row) == 2){
					ctx.fillStyle = "yellow";
					ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
				}	
			}
		}
		highLightTiles();
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
			 getMap : getMap
			};

};
