var levelGen2 = function() {
	this.levelHeight = 12; // how many tiles there are high
	this.noise = new Noise();
};

levelGen2.prototype.createNewMap = function(isRandom, seedValue){
	var level = this.buildMap(50);
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
		this.calculateHeight(tiles);

	return  {
		tiles : tiles,
		backgroundColor : backgroundColor,
		nodes : [{height : 2, index : 12}],
		length : levelLength
	};
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



levelGen2.createRandomChunk = function(start, end){


	var startHeight = 10;
	var previousHeight = startHeight;
	debugger;
	// var height = 





};

