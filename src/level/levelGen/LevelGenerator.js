define(['./utils/noise', '../Map', './settings/themes','./helpers/createsections', './settings/options', './helpers/heightcalculator', './sidewayslevel', './topdownlevel/topdownlevel'],
	function(Random, Map, themes , CreateSections, Options, HeightCalculator, Sidewayslevel, TopDownLevel){

	/**
	*	MAIN LOOP
	*   calls all the functions to create a new map and returns it
	*
	* 
	*/

	var rand = new Random(3);

	function createNewMap(mapOptions){

		CreateSections.reset();

		// random seed used to calculate everything from
		var seedValue = parseInt(mapOptions.seedvalue),
			rand = new Random(seedValue);
		var start = Date.now();
			// this is where we create the level
		var levelData = buildMap(Options.theme, seedValue, parseInt(localStorage['infinite.alexkidd.direction']) || 0, rand),
			map = new Map(levelData);

		var end = Date.now();
		var seconds = (end - start) / 1000;
		console.log("took " + seconds + " seconds to generate");
		
		return map;
	}

	/**
	*
	*
	*/
	function buildMap(theme, seed, direction, rand) {
		if(direction === Options.direction.vertical){
			return TopDownLevel.buildMap(theme, seed, Options, rand);
		}
		return Sidewayslevel.buildMap(theme, seed, Options, rand);
	}

	return {
		createNewMap : createNewMap
	};
});


