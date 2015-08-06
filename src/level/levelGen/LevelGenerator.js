define(['./createtiles', './noise', '../Map'],function(TilesCreater,Noise, Map){

	var theme = {
		groundTile : 18,
		hazard1 : 28,
		hazard2 : 27,
		breakable : 11,
		unbreakable : 20,
		background: "#0000ff"
	};

	// var theme =	 {
	// 		"groundTile" : 13,
	// 		"hazard1" : 23,
	// 		"hazard2" : 22,
	// 		"breakable" : 21,
	// 		"unbreakable" : 20,
	// 		background: "#0000ff"
	// 	};


	var height = 12,
		length = 50,
		chunks = [],
		tilecreater = new TilesCreater(0, 0, theme);

	/**
	* calls all the functions to create a new map and returns it
	*/

	function createNewMap(){
		var seedValue = 4;
		var noise = new Noise(seedValue),
			difficulty = noise.nextInt(1, 3),
			levelData = buildMap(theme),
			map = new Map(levelData);
		// create enemies
		// create objects

		return map;
	}
	

	function buildMap(theme){
		var heights = [];

		var tiles = tilecreater.getBlankMap(length, height, theme);

		return  {
			tiles : tiles,
			backgroundColor : theme.background,
			nodes : this.heights,
			length : this.length,
			sections : this.sections
		};
	}

	return {
		createNewMap : createNewMap
	}
});



