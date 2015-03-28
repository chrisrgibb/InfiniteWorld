function Section(start, width, noise, tilecreater, height) {
	this.chunks = [];
	this.x = start;
	this.width = width;
	this.noise = noise;
	this.height = height;
	this.typeOfChunk = "randomChunk";
	this.tilecreater = tilecreater;
	this.blocks = [];
	this.groundLevel = 10;

};




Section.prototype.createChunks = function(type){
	if(type==null){
		this.createPlatforms();
		this.gap(this.x, 10);
	} else if( type == "gap"){
		this.gap(this.x, 5);
	} 
	
};

Section.prototype.createPlatforms = function(){
	// setup 
	var i = this.x,
		end = this.x + this.width,
		currentHeight = 7,
		noise = this.noise,
		gapBetween = 3;//noise.nextInt(0,3);

	this.getOdds();

	// this.platform(i, 4, currentHeight);
	while(i < end){
		var width = noise.nextInt(1, 4);
		var gap = noise.nextInt(1, gapBetween);
		this.platform(i, width, currentHeight);
		i = i + width + gap;
		currentHeight -= 2;
	}
}

Section.prototype.createBox = function(){
	this.box(this.x, 2, 4);
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


Section.prototype.box = function(x, length, height){
	var startY = this.groundLevel - height;

	var box = new Box(x, startY, 2, height);
	box.create(this.tilecreater);

};


Section.prototype.gap = function(x, maxLength) {
	// difficulty - how long and blocks
	// does it have feelers coming out of gap
	// 
	var easy = true;
	var noise = this.noise, tilecreater = this.tilecreater;

	var length = easy ? noise.nextInt(1, 3) : noise.nextInt(4, 8);

	var groundLevel = this.groundLevel; 
	var levelHeight = 12;
	var topTile = 28;
	var bottomTile = 27;


	for(var y = groundLevel; y < levelHeight; y++){
		// do the top layer first
		var hazardTile = groundLevel === y ? topTile : bottomTile;

		for(var xx = x; xx < x +length; xx++){
			tilecreater.setTile(hazardTile, xx, y);
		}
	}

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
					 9  : 2,   // star (money)
					 10  : 1,  // skulls ( jitters)
					 11 : 10,  // breakable
					 12  : 1   // unbreakable
					  };
	var calculatedOdds = {};

  	var total = 0;
  	// add up odds
	for(var key in odds){
		var val = odds[key]
		total += val;
		odds[key] = total;
	}
	var chance = this.noise.nextInt(1,14);
	for(var key in odds){
		var val = odds[key];
		if(val >= chance){
			// remove the choice from the array of odds
			odds[key]--;
			this.blocks.push(key);
			return;
		}
	}
}


Section.prototype.randomTile = function(){
	var odds = this.noise.nextInt(0, 7);
	if(odds < 6){
		return 11; // breakable
	}
	if(odds < 7){
		return 9; // star
	}
}
