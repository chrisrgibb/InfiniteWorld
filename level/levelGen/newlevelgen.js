var levelGen2 = function() {
	this.height = 12; // how many tiles there are high
	this.noise = new Noise(5);
	this.length = 50;
	this.chunks = [];
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
	var tilecreater = new TilesCreater();
	var tiles = tilecreater.getBlankMap(levelLength, this.height);
	this.tilecreater = tilecreater;
	var backgroundColor = "#005200";

	this.createSection(tilecreater);

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
	return [{x : 0, y : startHeight },{x : length, y : startHeight -6 } ];
};

levelGen2.prototype.createSection = function(tilecreater){
	var index = 0;
	var sections = [];

	var section1 = new Section(index, 10, this.noise);
	var section2 = new Section(index, 25, this.noise);
	section2.type = "gap";
	
	this.platform(10, 4, tilecreater);
	this.box(24, 4);

	this.randomShape( 20, 5, tilecreater);
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
		debugger;
		this.tilecreater.setTile(11, x + width, this.height - height);

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
	var point = [x, y];
	tilecreater.setTile(11, point[0], point[1]);

	for(var i = 0; i < maxLength; i++){
		dir = this.noise.nextInt(0, 2);
		if(dir===directions.up){
			point[1]--;
		}
		if(dir===directions.right){
			point[0]++;
		}
		if(dir===directions.down){
			point[1]++;
		}
		tilecreater.setTile(11, point[0], point[1]);
	}
}




