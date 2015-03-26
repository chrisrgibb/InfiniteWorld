function Section(start, width, noise, tilecreater, height) {
	this.chunks = [];
	this.x = start;
	this.width = width;
	this.noise = noise;
	this.height = height;
	this.typeOfChunk = "randomChunk";
	this.tilecreater = tilecreater;

};

Section.prototype.createChunks = function(){
	this.createPlatforms();

	// var chunkSizes = 5;
	// var index = this.x;
	// var end = this.x + this.width;
	// while(index < end){
	// 	var odds = this.noise.nextInt(0, 10);

	// 	if(odds < 5){
	// 		// this.platform(null, index, chunkSizes);
	// 		this.createPlatforms();
	// 	} else {
	// 		// this.randomShape(index, chunkSizes, this.tilecreater );
	// 	}
	// 	index += chunkSizes;
	// }

};

Section.prototype.createPlatforms = function(){
	var i = this.x;
	var end = this.x + this.width;
	var currentHeight = 7;
	var noise = this.noise;
	var gapBetween = 3;

	this.getOdds();

	// this.platform(i, 4, currentHeight);

	while(i < end){
		var width = noise.nextInt(2, 5);
		var gap = noise.nextInt(1, gapBetween);
		this.platform(i, width, currentHeight);
		i = i + width + gap;
		currentHeight -= 2;
	}


}




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




Section.prototype.platform = function(x, width, height){
	var maxLength = length || this.maxLength;

	// var randomTile
	var otherTile = this.noise.nextBool();

	var odds = {

	}

	for(var xo = x; xo < x + width; xo++){
		var tileNumber = this.randomTile();
		this.tilecreater.setTile(tileNumber, xo, height);
	}
};


Section.prototype.box = function(x, maxLength){



};


Section.prototype.gap = function(x, maxLength) {
	// body...
};

/**
** {Map}
*/
Section.prototype.getOdds = function(odds){
	/**
	** Odds is a map of the probabilites of a number you want
	{ probability : value}

	*/
	odds = odds || { 
					 2  : 9,   // star (money)
					 1  : 10,  // skulls ( jitters)
					 10 : 11,  // breakable
					 1  : 12   // unbreakable
					  };

	


}


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
