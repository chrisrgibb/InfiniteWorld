function Section(start, length, noise) {
	this.chunks = [];
	this.start = start;
	this.length = length;
	this.minLength = 2;
	this.maxLength = 3;
	this.noise = noise;
	this.height = 8;

};



Section.prototype.createChunks = function(tileCreater, noise) {
	var index = this.start;
	var currentChunk;
	var chunk;
	// var length = 

	while(index < this.length){
		// if(chunk == null){
		// 	chunk = rootChunk;
		// } else {
		var newChunkLength = noise.nextInt(this.minLength, this.maxLength);
		chunk = new Chunk(index, 0, newChunkLength, 10);

		var splitChunk = noise.nextBool();
		if(splitChunk){
			this.split(chunk, noise);
		} 
		
		index += newChunkLength;
		this.chunks.push(chunk);
	}
};

Section.prototype.getSplitPoint = function(){
	var randomSplitPoint = false;
	if(randomSplitPoint){
		return this.noise.nextInt(3, 7);
	} else {
		var point = this.height;
		this.height -=2;
		return point;
	}

};

Section.prototype.split = function(chunk, noise){
	
	var splitPoint = this.getSplitPoint();
	var chunkOne = Chunk(chunk.x, chunk.y, chunk.width, splitPoint);
	var chunkTwo = Chunk(chunk.x, splitPoint+1, chunk.width, chunk.height);
	chunk.children.push(chunkOne, chunkTwo); 
}

