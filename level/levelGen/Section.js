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


Section.prototype.gap = function(x, maxLength) {
	// body...
};

