var levelGen2 = function() {
	this.height = 12; // how many tiles there are high
	this.noise = new Noise(5);
	this.length = 50;
	this.chunks = [];
};

levelGen2.prototype.createNewMap = function(isRandom, seedValue){
	this.noise = new Noise(seedValue);
	var level = this.buildMap(this.length);
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

	// this.createChunks(tilecreater);
	this.createSection(tilecreater);

	return  {
		tiles : tiles,
		backgroundColor : backgroundColor,
		nodes : [{height : 2, index : 12}],
		length : levelLength,
		chunks : this.chunks
	};
};

levelGen2.prototype.createSection = function(tilecreater){
	var index = 0;
	var sections = [];

	var sectionOne = new Section(index, 25, this.noise);

	sectionOne.createChunks(tilecreater, this.noise);
	this.chunks = sectionOne.chunks;
	this.assignChunks(tilecreater);


};

levelGen2.prototype.createChunks = function(tilecreater){
	

	// split up into chunks
	var index = 0;

	var chunks = [];
	//
	var length = 10;
	var rootChunk = Chunk(index, 0, length, 10);
	var chunk;

	while(index < this.length){
				
		if(chunk== null){
			chunk = rootChunk;
		} else {
			var newLength = this.noise.nextInt(3, 10);
			length = newLength;
			chunk = new Chunk(index, 0, newLength, 10);
		}

		var splitChunk = this.noise.nextBool();
		if(splitChunk){
			this.splitIntoTwo(chunk);
		} 
		else {
			
		}

		chunks.push(chunk);
		index+=length;
	}
	
	this.chunks = chunks;
	
};

/**
*  Gives the chunks random contents
*/
levelGen2.prototype.assignChunks = function(tilecreater){
	var chunks = this.chunks,
		tileNumber = 1,
		chunkManager = new ChunkManager(tilecreater, this.noise);
	// iterate through chunks
	for(var i = 1; i < chunks.length; i++){
		if(chunks[i].children.length > 0){

			var start = chunks[i].x; var end = chunks[i].width + start;

			chunks[i].children.forEach(function(child){

				var x = child.x;
				var y = child.y;
				tilecreater.tiles[y][x] = this.noise.nextInt(8,11);

				chunkManager.randomChunk(start, end, child, tileNumber);
				tileNumber++;

			}, this);
		}
	}
}	


