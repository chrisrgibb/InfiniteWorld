var levelGen2 = function() {
	this.height = 12; // how many tiles there are high
	this.noise = new Noise(5);
	this.length = 50;
};

levelGen2.prototype.createNewMap = function(isRandom, seedValue){
	var lengthOfMap = this.length;
	var level = this.buildMap(lengthOfMap);
	var map = new Map(level);
	
	map.objects.push(new RiceBall(level.length-3, 8));
	return map;
}

/**
*
*/
levelGen2.prototype.buildMap = function(levelLength) {
	var tilecreater = new TilesCreater();

	var tiles = tilecreater.getBlankMap(levelLength, this.height);

	var backgroundColor = "#005200";

	var plat = this.randomPlatform();

	var thresh = 0.5;


	for(var x = 4; x < 8; x++){
		var y = shapeFunction(x,8);
		console.log(y);
		tilecreater.setTile(11, x, y);
	}

	return  {
		tiles : tiles,
		backgroundColor : backgroundColor,
		nodes : [{height : 2, index : 12}],
		length : levelLength
	};
};


levelGen2.prototype.randomPlatform = function(){
	var array = [];

	for (var i = 0 ; i < 10; i++){
		array.push(Math.random());
	}
	return array;
}

