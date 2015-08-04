define(['./createtiles', './noise', '../Map'],function(TilesCreater,Noise, Map){

	var height = 12,
		length = 50,
		chunks = [],
		tilecreater = new TilesCreater();


	/**
	* calls all the functions to create a new map and returns it
	*/

	function createNewMap(){
		var seedValue = 4;
		var noise = new Noise(seedValue),
			difficulty = noise.nextInt(1, 3),
			levelData = buildMap(),
			map = new Map(levelData);
		// create enemies
		// create objects

		return map;
	}
	

	function buildMap(){
		var backgroundColor = "#005200";
		var heights = [];

		var tiles = tilecreater.getBlankMap(length, height);


		return  {
			tiles : tiles,
			backgroundColor : backgroundColor,
			nodes : this.heights,
			length : this.length,
			sections : this.sections
		};
	}

	return {
		createNewMap : createNewMap
	}
});



