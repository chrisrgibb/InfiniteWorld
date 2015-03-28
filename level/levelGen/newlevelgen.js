var levelGen2 = function() {
	this.height = 12; // how many tiles there are high
	this.noise = new Noise(5);
	this.length = 50;
	this.chunks = [];
	this.tilecreater = new TilesCreater();
	this.difficulty = 1;
};

/**
* calls all the functions to create a new map and returns it
*/
levelGen2.prototype.createNewMap = function(isRandom, seedValue){
	this.noise = new Noise(seedValue);
	var level = this.buildMap(this.length);
	var map = new Map(level);
	
	map.objects.push(new RiceBall(level.length-3, 8));
	return map;
};

/**
* 
*/
levelGen2.prototype.buildMap = function(levelLength) {
	var tiles = this.tilecreater.getBlankMap(levelLength, this.height);
	var backgroundColor = "#005200";

	this.heights = [];
	this.createSection(this.tilecreater);
	this.getHeights();

	return  {
		tiles : tiles,
		backgroundColor : backgroundColor,
		nodes : this.heights,
		length : levelLength,
		sections : this.sections
	};
};


levelGen2.prototype.applySections = function(){

	this.sections.forEach(function(section){


	});
}


levelGen2.prototype.randomTile = function(){
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
	return 9;
}



levelGen2.prototype.getHeights = function(){
	this.sections.forEach(function(section){
		this.heights.push({
			x : section.x,
			y : section.height
		});
	}, this);
}




