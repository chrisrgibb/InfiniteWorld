var levelGen2 = function() {
	this.height = 12; // how many tiles there are high
	this.noise = new Noise(5);
	this.length = 50;
	this.chunks = [];
	this.tilecreater = new TilesCreater();
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

	this.createSection(this.tilecreater);

	return  {
		tiles : tiles,
		backgroundColor : backgroundColor,
		nodes : this.getHeight(levelLength),
		length : levelLength,
		chunks : this.chunks
	};
};

levelGen2.prototype.getHeight = function(length){
	var startHeight = 10;
	var iterations = 5;
	var heights = [{x : 0, y : startHeight }];
	var variation = 5;

	var iterSize = this.length / iterations | 0;

	for(var i = 1; i< iterations; i++){
		var dx = heights[i-1].x + iterSize;
		var height = this.noise.nextInt(0, variation);
		console.log(height);
		heights.push({x : dx, y : height } );
	}

	return heights;
};


levelGen2.prototype.createSection = function(tilecreater){


	var index = 0;
	var sections = [];

	var section1 = new Section(index, 10, this.noise);
	var section2 = new Section(index, 25, this.noise);
	

	this.platform(10, 4, tilecreater);
	// section1.platform()
	this.box(24, 4);

	this.randomShape( 20, 5, tilecreater);
	this.randomShape2( 30, 5, tilecreater);
};



levelGen2.prototype.platform = function(x, maxLength, tilecreater){

	var height = this.noise.nextInt(6, 8);

	for(var xo = x; xo < x + maxLength; xo++){
		var tileNumber = this.randomTile();
		tilecreater.setTile(tileNumber, xo, height);
	}
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
	// if(odds >  8) {
		return 9;
	// }
}

levelGen2.prototype.box = function(x, maxLength){
	var isRandom = this.noise.nextBool(),
		width, height;
	if(isRandom){
		width = this.noise.nextInt(1, 3);
		height = this.noise.nextInt(2, 4);
		
		this.tilecreater.setTile(11, x + width, this.height - height);

	}

}

levelGen2.prototype.randomShape2 = function(x, maxLength, tilecreater){
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

levelGen2.prototype.randomShape = function(x, maxLength, tilecreater){
	var directions = {
		"up" : 0,
		"right" : 1,
		"down" : 2
	};
	var start = x;
	var y = 6;
	var dir = directions.right;
	var point = {x : x, y : y};

	tilecreater.setTile(11, point.x, point.y);

	for(var i = 0; i < maxLength; i++){

		dir = this.noise.nextInt(0, 2);
		if(dir===directions.up){
			point.y--;
		}
		if(dir===directions.right){
			point.x++;
		}
		if(dir===directions.down){
			point.y++;
		}
		tilecreater.setTile(11, point.x, point.y);
	}
};




