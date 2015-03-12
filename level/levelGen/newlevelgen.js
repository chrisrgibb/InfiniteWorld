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

	var tiles = tilecreater.getBlankMap(levelLength, this.levelHeight);

	var backgroundColor = "#005200";

	this.createChunk(tiles);

	return  {
		tiles : tiles,
		backgroundColor : backgroundColor,
		nodes : [{height : 2, index : 12}],
		length : levelLength
	};
};


levelGen2.prototype.createChunk = function(tiles, chunk){
	if(chunk == null){
		// create new chunk		
	} else {
		// create two new chunks
	}
	



};

