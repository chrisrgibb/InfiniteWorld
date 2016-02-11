define(['./tilecreater', './utils/noise', '../Map', './settings/themes', '../../game/enemies/enemyfactory', './helpers/createsections', './settings/options', './helpers/heightcalculator', './sidewayslevel', './topdownlevel'],
	function(TilesCreater, Random, Map, themes, Enemyfactory, CreateSections, Options, HeightCalculator, Sidewayslevel, TopDownLevel){


	var rand = new Random(3);

	var theme = Options.theme;
	// options
	var groundLevel = 10;

	var length = rand.nextInt(40, 80);
	var heights = [];


	// set up of level
	var	tilecreater = new TilesCreater(Options.height,length, 0, theme);
		


	/**
	*	MAIN LOOP
	*   calls all the functions to create a new map and returns it
	*
	* 
	*/

	function createNewMap(mapOptions){

		heights = [{
			x : Options.gapAtStartOfLevel,
			y : groundLevel
		}];

		CreateSections.reset();

		// random seed used to calculate everything from
		var seedValue = parseInt(mapOptions.seedvalue),
			rand = new Random(seedValue),
			// this is where we create the level
			levelData = buildMap(Options.theme, rand.nextInt(0, 500000), parseInt(localStorage['infinite.alexkidd.direction']) || 0),
			map = new Map(levelData);
		

		// create enemies
		// create objects

		return map;
	}

	/**
	*
	*
	*/
	function buildMap(theme, seed, direction){
		if(direction === Options.direction.vertical){
			return TopDownLevel.buildMap(theme, seed, Options, rand);
		}
		return Sidewayslevel.buildMap(theme, seed, Options, rand);
	}

	return {
		createNewMap : createNewMap
	}
});


