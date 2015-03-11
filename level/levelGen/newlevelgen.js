var levelGen2 = function() {
	this.levelHeight = 12; // how many tiles there are high
	this.noise = new Noise(5);
};

levelGen2.prototype.createNewMap = function(isRandom, seedValue){
	var lengthOfMap = 50;
	var level = this.buildMap(lengthOfMap);
	var map = new Map(level);
	
	map.objects.push(new RiceBall(level.length-3, 8));
	return map;
}

/**
*
*/
levelGen2.prototype.buildMap = function(levelLength) {
	var tilecreater = new TilesCreater();

	var tiles = tilecreater.blankArray(levelLength, this.levelHeight).createGround(tiles, 0, levelLength).tiles,
		backgroundColor = "#005200";

	this.drawShape(tiles);
	this.createChunk(tiles);

	return  {
		tiles : tiles,
		backgroundColor : backgroundColor,
		nodes : [{height : 2, index : 12}],
		length : levelLength
	};
};


levelGen2.prototype.createChunk = function(tiles){
	var noise = this.noise;
	var startX = 10;
	var endX = 30;
	var height = this.createHeight(startX, endX);
	var gradient1 = height[1][0] / height[1][1]; 

	var x1 = noise.nextInt(startX + 3);
	var y1 =  (gradient1 * x1) | 0;
	var y2 = y1 + noise.nextInt(0, 3) | 0;
	var x2 = x1 + noise.nextInt(4); 

	var line = Line(x1, y1, x2, y2);
	this.applyShape(tiles, line, startX);
};

levelGen2.prototype.applyShape = function(tiles, shape, startX, endX){
	for(var i = 0; i < shape.length; i++) {
		var x = shape[i][0];
		var y = shape[i][1];
		tiles[y][x] = 11;
	}
}

levelGen2.prototype.createHeight = function(startX, endX){
	var groundLevel = 10;
	var midPoint = endX - startX;
	var height = this.noise.nextInt(6, groundLevel);
	var heights = [[startX, groundLevel],[midPoint, height], [endX, groundLevel] ];

	return heights;
};

levelGen2.prototype.calculateHeight = function(tiles){
	var length = tiles[0].length;
	var difficulty = 2;
	var heightVariance = difficulty * 1; 
	// first we will start off by calculating the height that can differ by only 2 points
	var startOfCalculation = 10; // start the random height generation from this point.
	var floorTile = 10;


	for(var i = 0; i < heightVariance; i++){
		var index = this.noise.nextNumber(startOfCalculation, length);
		var randomHeight = this.noise.nextNumber(0, floorTile);
		var gradient = (floorTile - randomHeight) / (length /2);

		for(var j = startOfCalculation; j < length; j++ ){
			
			var thing = gradient * (j - startOfCalculation);
			// debugger;

		}
	}
}

levelGen2.prototype.drawShape = function(tiles){
	var shape = new Shape(),
		noise = this.noise;
	//	shape.drawLine(4, 4, 6, 4, tiles);
	var startX = 8;
	var y = noise.nextInt(0, 13);
	var y2 = noise.nextInt()
	var higher = noise.nextInt(0, 1);
	
	shape.drawLine(2, 2, 3, 3, tiles);
	
}
