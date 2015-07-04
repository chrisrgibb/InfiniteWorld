var levelGen2 = function() {
	this.height = 12; // how many tiles there are high
	// this.noise = new Noise(5);
	this.length = 50;
	this.chunks = [];
	this.tilecreater = new TilesCreater();
	
};

/**
* calls all the functions to create a new map and returns it
*/
levelGen2.prototype.createNewMap = function(isRandom, seedValue){
	this.noise = new Noise(seedValue);
	this.difficulty = this.noise.nextInt(1, 3);
	var levelData = this.buildMap();
	var map = new Map(levelData);
	
	map.objects.push(new RiceBall(levelData.length-3, 8));
	return map;
};

/**
* 
*/
levelGen2.prototype.buildMap = function() {
	debugger;
	
	var backgroundColor = "#005200";

	this.heights = [];
	this.createSection(this.tilecreater);
	this.getHeights();
	var tiles = this.tilecreater.getBlankMap(this.length, this.height);
	this.applySections();

	return  {
		tiles : tiles,
		backgroundColor : backgroundColor,
		nodes : this.heights,
		length : this.length,
		sections : this.sections
	};
};

levelGen2.prototype.createSection = function(tilecreater){


	var index = 0;
	var firstSectionSize = 10
	var sections = [];
	levelInfo = {};
	levelInfo['sections'] = [];


	var firstSection = new Section(0, firstSectionSize, this.noise, tilecreater, 10, this.difficulty);
	sections.push(firstSection);
	index += firstSectionSize;

	while(index < this.length){
		var newsize = this.noise.nextInt(5, 10);
		
		var section = new Section(index, newsize, this.noise, tilecreater, 6, this.difficulty)
		
		section.height = this.noise.nextInt(5, 10);

		levelInfo['sections'].push(section);

		sections.push(section);

		index += newsize;
	}
	this.length = index;

	this.sections = sections;
};

levelGen2.prototype.firstSection = function(){




}


levelGen2.prototype.applySections = function(){

	var odds = new Odds({
		"createPlatforms" : 10,
		"randomShape" :  10,
		"gap" : 10,
		"createBox" : 10
	}, this.noise);


	this.sections.forEach(function(section, index, sections){
		if(index > 0 && index < sections.length -1){
			// get method
			var func = odds.calc(); 
			// call method
			section[func]();
			console.log(index + " : "  + func );
			section.doBlocks();

		}
	});
}

levelGen2.prototype.getHeights = function(){
	this.sections.forEach(function(section){
		this.heights.push({
			x : section.x,
			y : section.height
		});
	}, this);
}




