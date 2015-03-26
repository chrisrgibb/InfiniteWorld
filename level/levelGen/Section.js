function Section(start, length, noise, tilecreater, height) {
	this.chunks = [];
	this.start = start;
	this.x = start;
	this.length = length;
	this.width = length;
	this.minLength = 2;
	this.maxLength = 3;
	this.noise = noise;
	this.height = height;
	this.typeOfChunk = "randomChunk";
	this.tilecreater = tilecreater;

};

Section.prototype.createChunks = function(){
	var chunkSizes = 5;
	var index = this.start;
	var end = this.start+ this.length;
	while(index < end){
		var odds = this.noise.nextInt(0, 10);

		if(odds < 5){
			// this.platform(null, index, chunkSizes);
		} else {
			this.randomShape(index, chunkSizes, this.tilecreater );
		}
		index += chunkSizes;
	}

};




Section.prototype.randomShape = function(x, maxLength, tilecreater){
	var start = x;
	var y = 6;
	var point = {x : x, y : y};
	var dx = 1;
	var dy = 0;

	tilecreater.setTile(11, point.x, point.y);

	for(var i = 0; i < maxLength; i++){
		var changeDir = this.noise.nextBool();
		if(changeDir) {
			dx = this.noise.nextInt(0, 1);
			dy = this.noise.nextInt(-1, 1);
		}

		point.x += dx;
		point.y += dy;

		tilecreater.setTile(11, point.x, point.y);
	}
}




Section.prototype.platform = function(tilecreater, start, length){
	tilecreater = this.tilecreater;
	var height = this.height;
	var x =  start || this.start;
	var maxLength = length || this.maxLength;

	for(var xo = x; xo < x + maxLength; xo++){
		var tileNumber = this.randomTile();
		tilecreater.setTile(tileNumber, xo, height);
	}
};

Section.prototype.box = function(x, maxLength){



};


Section.prototype.gap = function(x, maxLength) {
	// body...
};


Section.prototype.randomTile = function(){
	var odds = this.noise.nextInt(0, 10);
	if(odds < 6){
		return 11;
	}
	if(odds < 7){
		return 12;
	} 
	if(odds < 8) {
		return 10;
	}
	// if(odds >  8) {
		return 9;
	// }
}
