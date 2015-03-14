var levelGen2 = function() {
	this.height = 12; // how many tiles there are high
	this.noise = new Noise(5);
	this.length = 50;
};

levelGen2.prototype.createNewMap = function(isRandom, seedValue){
	var lengthOfMap = this.length;
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

	var tiles = tilecreater.getBlankMap(levelLength, this.height);

	var backgroundColor = "#005200";

	var rootChunk = Chunk(0, 0, 20, 12);

	var f = this.createChunk(rootChunk);

	var plat = this.randomPlatform();

	var thresh = 0.5;

	for(var i = 0; i < plat.length; i++){
		tiles[6][i] = plat[i] > thresh ? 11 : 0;
	}

	for(var x = 4; x < 8; x++){
		var y = shapeFunction(x,0);
		console.log(y);
		tilecreater.setTile(11, x, y);
	}

	


	return  {
		tiles : tiles,
		backgroundColor : backgroundColor,
		nodes : [{height : 2, index : 12}],
		length : levelLength
	};
};

levelGen2.prototype.createChunkNode = function(chunk){
	var minChunkSize = 5;
	// var chunkSize = this.noise.nextInt(minChunkSize, minChunkSize*2);
	if(chunk.width <= minChunkSize || chunk.height <= minChunkSize){
		return chunk;
	}
	var newChunkSize = chunk.width / 2;
	var child = this.createChunk(Chunk(0, 0, newChunkSize, newChunkSize));
	//chunk.children.push(child);
	//chunk.children.push(this.createChunk(Chunk(0, 0, newChunkSize, newChunkSize)));
	//chunk.children.push(this.createChunk(Chunk(0, 0, newChunkSize, newChunkSize)));
	return child;
};

levelGen2.prototype.createChunk = function(chunk){
	var child1 = this.createChunkNode(chunk);
	chunk.children.push(child1);
	return chunk;
};

levelGen2.prototype.randomPlatform = function(){
	var array = [];

	for (var i = 0 ; i < 10; i++){
		array.push(Math.random());
	}
	return array;
}

