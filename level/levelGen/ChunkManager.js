var ChunkManager = function(tiles, noise){

	this.tiles = tiles;
	this.noise = noise;
	this.groundHeight = 10;



};

ChunkManager.prototype.getGroundHeight = function(){
	return this.groundHeight;	
};

ChunkManager.prototype.chunkone = function(start, end){
	var platforms = this.noise.nextInt(0,6);


};

ChunkManager.prototype.randomChunk = function(start, end,child, tileNumber){
	var type = this.noise.nextInt(0, 100);
	if(type < 25){
		this.platform(start, end, child, tileNumber);
	// }
	// else if(type < 50) {
		// this.randomShape(start, end);
	} else {
		this.gap(start, end, child, tileNumber);
	} 

};

ChunkManager.prototype.platform = function(start, end,chunk, tilenumber){
	var tile = tilenumber || 11;
	 var y = chunk.y;
	
	for(var x = start; x< end; x++){
		this.tiles.setTile(tile, x, y);
	}
};

ChunkManager.prototype.gap = function(start, end, chunk, tilenumber){
	var width = this.noise.nextInt(start, end);
	var hazardTile = 22;
	for(var y = this.groundHeight; y < this.groundHeight+2; y++){
		for(var x = start; x < width; x++){
			this.tiles.setTile(hazardTile, x, y);
		}
	}
};

ChunkManager.prototype.randomShape = function(start, end){
	var offsetX = start;
	var yOffset = this.noise.nextInt(0,6);

	for(var x = 0; x < end; x++){
		var y = shapeFunction(x, yOffset);
		this.tiles.setTile(11, x + offsetX, y);
	}

};

ChunkManager.prototype.box = function(start, end){
	var sizes = 5;

	var width = this.noise.nextInt(1, 2);
	var height = 4;

	for (var x = 0; x < width; x++){
		for(var y = 0; y < height; y++){
			var y1 = this.groundHeight - y - 1;
			this.tiles.setTile(11, x+start, y1);
		}
	}

};