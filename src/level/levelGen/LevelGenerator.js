define(['./createtiles', './noise', '../Map', './settings/themes', '../../game/enemies/enemyfactory', './createsections', './settings/options', './heightcalculator'],
	function(TilesCreater, Random, Map, themes, Enemyfactory, CreateSections, Options, HeightCalculator){


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
		tilecreater = new TilesCreater(0,length, 0, theme);
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

	function addBlobs(section, tiles){
		tiles.setTile(theme.unbreakable, section.x, height - 3);
		tiles.setTile(theme.breakable, section.x, height - 4);
	}

	function mainLoop(){
		// get blank map

		// split up into sections

		// figure out odds of section

	}


	function getSections(){
		var lengths = [];
		var index = Options.gapAtStartOfLevel + rand.nextInt(0, 4);

		while(index < length){
			var oneLength = rand.nextInt(4, 9);

			var height = HeightCalculator.getNewHeight(heights, oneLength, rand);
			heights.push(height);

			lengths.push({
				x : index,
				length : oneLength,
				type : "",
				height : height
			});
			// make sure it doesn't overshoot the length of the level
			if(index + oneLength >  length) {
				oneLength = length - index;
			}
			index += oneLength;
		}

		return lengths;
	}


	function addEnemy(section, enemies, height) {
		var groundLevel = 9;
		var y = height || groundLevel;
		
		// enemies.push(Enemyfactory.getScorpion(section.x+2, y));
		enemies.push(Enemyfactory.getFrog(section.x+2, y));
	}

	function myOptions(){
		// odds 
		var myOdds = {
			0 : 10, // flat
			1 : 2, // gap
			2 : 3, // blob
			3 : 1  // platform
		}

		var odds = calculateOdds(myOdds);
		var vallls = parseInt(getValueFromOdds(Math.random(), odds));
	}
	/* takes in a object literal with a list of key and the ratios of those keys
	* examples   {
					"oil" : 20
					"water" : 10
				}

	  returns an object with random odds that looks like this
		{
			"oil"   : [0,   0.33333],
			"water" : [0.3333333, 1]
		}
	*
	*/ 
	function calculateOdds(config){
		var total = 0;
		var calculatedOdds = {};
		for (var key in config){
			total += config[key];
		}
		var lastValue = 0;
		for(var key in config){
			var value = config[key] / total;
			value += lastValue;
			calculatedOdds[key] = [lastValue, value];
			lastValue = value;
		}
		return calculatedOdds;
	}
	
	/*
	*	
	*
	*/
	function getValueFromOdds(value, odds){
		for(var key in odds){
			var min = odds[key][0],
				max = odds[key][1];
			if(value >= min	&& value < max){
				return key;
			}
		}
		return null;
	}

	/**
	*
	*
	*/
	function buildMap(theme, seed){
	
		tiles = tilecreater.getBlankMap(length, height, theme);
		CreateSections.setTileCreater(tilecreater);
		CreateSections.setTheme(theme);
		CreateSections.setSeed(seed)

		var enemies = [];
		// splits level up into sections
		var sections = getSections();

		var len = sections.length;

		var myOdds = {
			0 : 10, // flat
			1 : 2, // gap
			2 : 3 // blob
		}


		for(var i = 0; i < len; i++){
			var section = sections[i];
			//debugger;
			var odds = calculateOdds(myOdds);
			var vallls = parseInt(getValueFromOdds(rand.nextNumber(0, 1), odds));

			// var option = rand.nextInt(0, 8);
			var option = vallls;

			myOptions();
			// debugger;
			// var option = 8;
			// var gheight = getNewHeight(section.length);
			// heights.push(gheight);
			
			switch(option){
				case 0:
					// flat
					// max length 

					console.log("not gap");
					// decorate(section, tilecreater);
					CreateSections.decorate(section.x, 12, section.length);
					addEnemy(section, enemies);

					section.type = "notgap";	
					break;	
				case 1:
					// gap
					// createGap(section, tilecreater);
					CreateSections.createGap(section.x, 12, section.length);
					section.type = "gap";
					break;
				case 2:
					// 
					console.log("also not");
					addBlobs(section, tilecreater);
					addEnemy(section, enemies);
					section.type = "blobs";
					break;
				case 3:
					// max lenght : 
					CreateSections.createPlatform(section.x , 8, section.length);
					addEnemy(section, enemies, 8 -1);
					break;
				case 4:
					CreateSections.createRandomIsh(section.x, 8, section.length);
					break;
				case 5:
					// simple sections
					// var height = heights[i];
					CreateSections.createSimple(section.x, heights[i], section.length);
					break;
				case 6:
					CreateSections.funkyShape(section.x, 12, section.length)
					// square shape
					break;	

				case 7:
					// CreateSections.apply2dNoise(section.x, 7, section.length);
					break;
				case 8:
					CreateSections.heightMap(section.x, 8, section.length);
					break;
			}
		}
				
		var mapData =  {
			tiles : tiles,
			backgroundColor : theme.background,
			nodes : heights,
			length : length,
			sections : sections,
			enemies : enemies
		};

		return mapData;
	}
	debugger;
	return {
		createNewMap : createNewMap
	}
});


