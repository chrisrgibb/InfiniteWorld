function Section(start, length, noise) {
	this.chunks = [];
	this.start = start;
	this.length = length;
	this.minLength = 2;
	this.maxLength = 3;
	this.noise = noise;
	this.height = 8;
	this.typeOfChunk = "randomChunk";

};

Section.prototype.platform = function(){
	var height = this.height;
	var x = this.start;
	var maxLength = this.maxLength;

	for(var xo = x; xo < x + maxLength; xo++){
		var tileNumber = this.randomTile();
		tilecreater.setTile(tileNumber, xo, height);
	}

};


Section.prototype.gap = function(x, maxLength) {
	// body...
};

