define(['./utils/noise', '../Map', './settings/themes','./helpers/createsections', './settings/options', './helpers/heightcalculator', './sidewayslevel', './topdownlevel'],
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
			rand = new Random(seedValue),
			// this is where we create the level
			levelData = buildMap(Options.theme, rand.nextInt(0, 500000), parseInt(localStorage['infinite.alexkidd.direction']) || 0),
			map = new Map(levelData);
		
		return map;
	}

	/**
	*
	*
	*/
	function buildMap(theme, seed, direction){
		if(direction === Options.direction.vertical){
			return TopDownLevel.buildMap(theme, Options, rand);
		}
		return Sidewayslevel.buildMap(theme, seed, Options, rand);
	}

	return {
		createNewMap : createNewMap
	};
});


