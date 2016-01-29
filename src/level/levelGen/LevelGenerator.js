define(['./tilecreater', './noise', '../Map', './settings/themes', '../../game/enemies/enemyfactory', './createsections', './settings/options', './heightcalculator', './sidewayslevel'],
	function(TilesCreater, Random, Map, themes, Enemyfactory, CreateSections, Options, HeightCalculator, Sidewayslevel){


	var rand = new Random(3);

	var theme = Options.theme;
	// options
	var difficulty = Options.difficulty;
	var groundLevel = 10;


	var height = Options.height,
		length = rand.nextInt(40, 80);
	var heights = [];


	// set up of level
	var	chunks = [],
		tilecreater = new TilesCreater(height,length, 0, theme);
		var tiles;
		


	/**
	*	MAIN LOOP
	*   calls all the functions to create a new map and returns it
	*
	* 
	*/

	function createNewMap(isRandom, seedval){
		heights = [{
			x : Options.gapAtStartOfLevel,
			y : groundLevel
		}];

		CreateSections.reset();

		// random seed used to calculate everything from
		var seedValue = parseInt(seedval),
			rand = new Random(seedValue),
			difficulty = rand.nextInt(1, 3),
			// this is where we create the level
			levelData = buildMap(Options.theme, rand.nextInt(0, 500000)),
			map = new Map(levelData);
		

		// create enemies
		// create objects

		return map;
	}

	/**
	*
	*
	*/
	function buildMap(theme, seed){
		var ma = Sidewayslevel.buildMap(theme, seed, Options, rand);
		return ma;
	}

	return {
		createNewMap : createNewMap
	}
});


