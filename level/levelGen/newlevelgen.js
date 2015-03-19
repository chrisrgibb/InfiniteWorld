var levelGen2 = function() {
	this.height = 12; // how many tiles there are high
	this.noise = new Noise(5);
	this.length = 50;
	this.chunks = [];
};

levelGen2.prototype.createNewMap = function(isRandom, seedValue){
	this.noise = new Noise(seedValue);
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

	this.createChunks(tilecreater);

	return  {
		tiles : tiles,
		backgroundColor : backgroundColor,
		nodes : [{height : 2, index : 12}],
		length : levelLength,
		chunks : this.chunks
	};
};

levelGen2.prototype.createChunks = function(tilecreater){
	var chunkManager = new ChunkManager(tilecreater, this.noise);

	// split up into chunks
	var index = 0;
	var chunkSize = 5;
	var chunks = [];
	//
	var rootChunk = Chunk(index, 0, chunkSize, 10);
	var chunk;

	while(index < this.length){
		var endOfChunk = 5;
		// debugger;
		var offsetX = index;
		var length = endOfChunk;
		if(chunk== null){
			chunk = rootChunk;
		} else {
			chunk = new Chunk(index, 0, length, 10);
		}

		var splitChunk = this.noise.nextBool();
		if(splitChunk){
			this.splitIntoTwo(chunk);
		} else {
			
		}

		chunks.push(chunk);

		index+=endOfChunk;
	}

	chunkManager.randomShape(chunks[0].x, chunks[0].width);

	var levelGen = this;

	var tileNumber = 1;
	this.chunks = chunks;

	for(var i = 0; i < chunks.length; i++){
		if(chunks[i].children.length > 0){
			var start = chunks[i].x; var end = chunks[i].width + start;
			chunks[i].children.forEach(function(child){
				var x = child.x;
				var y = child.y;
				tilecreater.tiles[y][x] = levelGen.noise.nextInt(8,11);

				chunkManager.randomChunk(start, end, child, tileNumber);
				tileNumber ++;
			});
		}
	}
};

levelGen2.prototype.splitIntoTwo = function(chunk){
	var splithorizontal = this.noise.nextBool();
	if(splithorizontal) {
		var splitPoint = this.noise.nextInt(3, 7);
		var chunkOne = Chunk(chunk.x, chunk.y, chunk.width, splitPoint);
		var chunkTwo = Chunk(chunk.x, splitPoint+1, chunk.width, chunk.height);
		chunk.children.push(chunkOne, chunkTwo); 
	}else {
		var splitPoint = this.noise.nextInt(3, 7);
		var chunkOne = Chunk(chunk.x, chunk.y, chunk.width, splitPoint);
		var chunkTwo = Chunk(chunk.x, splitPoint+1, chunk.width, chunk.height);
		chunk.children.push(chunkOne, chunkTwo); 
	}
	
};


