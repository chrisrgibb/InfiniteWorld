var Level = function() {
	this.tileMap = [];
	// var map = [
	// 	[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
	// 	[1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
	// 	[0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0],
	// 	[0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
	// 	[0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
	// 	[0,1,0,1,1,0,0,0,1,1,0,0,1,0,0,0],
	// 	[1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1]
	// ];
		var map = [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1],
		[1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1],
		[1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
		[1,1,1,1,0,0,1,1,1,1,1,0,0,0,1,1],
		[1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,1],
		[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1]
	];
	
	var tilesToHighlight = [];
	var tileSize = 16;


	function mapWidth(){
		return map[0].length;
	}
	function mapHeight(){
		return map.length;
	}

	function getTile(x, y){
		if(map[y]===undefined){ // in case block goes out of array bounds
			return 1;
		}
		return map[y][x];

	}

	function draw(){
		
		for(var row = 0; row < map.length; row++ ){
				for(var col = 0; col < map[0].length; col++){
					if(map[row][col]==1){
						ctx.fillStyle = "green";
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
			 addToHighLights : addToHighLights
			};

};
