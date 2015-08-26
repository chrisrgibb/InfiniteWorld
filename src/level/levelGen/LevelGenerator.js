define(['./createtiles', './noise', '../Map', './settings/themes', '../../game/enemies/enemyfactory', './createsections', './settings/options'],
	function(TilesCreater, Random, Map, themes, Enemyfactory, CreateSections, Options){


	var rand = new Random(3);


	var theme = Options.theme;

	// options
	var difficulty = {
			EASY : 0, 
			HARD : 2
		};
	var heightVariance = 1;
	var gapAtStartOfLevel = 4; 
	var groundLevel = 10;


	var height = 12,
		length = rand.nextInt(40, 80);
	var heights = [];


	// set up of level
	var	chunks = [],
		tilecreater = new TilesCreater(0,length, 0, theme);
		var tiles;
		


	/**
	* calls all the functions to create a new map and returns it
	*/

	function createNewMap(isRandom, seedval){
		heights = [{
			x : gapAtStartOfLevel,
			y : groundLevel
		}];

		CreateSections.reset();
		var seedValue = parseInt(seedval);
			rand = new Random(seedValue);
		var difficulty = rand.nextInt(1, 3),
			levelData = buildMap(theme, rand.nextInt(0, 500000)),
			map = new Map(levelData);
		// create enemies
		// create objects
		if(!map.nodes){
			map.nodes = calcHeights();
		}


		return map;
	}

	function addBlobs(section, tiles){
		tiles.setTile(theme.unbreakable, section.x, height - 3);
		tiles.setTile(theme.breakable, section.x, height - 4);
	}

	function calcHeights(){

		var min = 3;
		var max = 4;
		var nodes = []
		var index = gapAtStartOfLevel;
		// the height is worked out from the ground up
		var maxHeight = 10 - 6;
		var minHeight = 10;

		var stepsHeight = 3;

		var lastNode = {
			x : index,
			y : 10
		};

		while(index < length){

			var newheight = rand.nextInt(0, 2) - 1;

			var nextHeight = lastNode.y + (2 * newheight); 
			if(nextHeight > minHeight){
				nextHeight = minHeight;
			}
			

			var node = {
				x : index,
				y : nextHeight
			};
			lastNode = node;

			nodes.push(node);
			index += rand.nextInt(min, max);
		}
		return nodes;
	}

	function getNewHeight(size){
		var len = heights.length,
			maxHeight = groundLevel - 6,
			minHeight = groundLevel;

		var delta = rand.nextInt(0, 2) - 1;

		var lastHeight = heights[len -1] 
		var nextHeight = lastHeight.y + (2 * delta);
		if(nextHeight > minHeight){
			nextHeight = minHeight;
		}
		var node = {
			x : size + lastHeight.x,
			y : nextHeight
		};
		heights.push(node);

		return node;
	}


	function mainLoop(){
		// get blank map

		// split up into sections

		// figure out odds of section

	}


	function getSections(){
		var lengths = [];
		var index = gapAtStartOfLevel + rand.nextInt(0, 4);

		while(index < length){
			var oneLength = rand.nextInt(4, 9);

			var height = getNewHeight(oneLength);
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
		enemies.push(Enemyfactory.getScorpion(section.x+2, y));
	}
	

	function buildMap(theme, seed){
	
		tiles = tilecreater.getBlankMap(length, height, theme);
		CreateSections.setTileCreater(tilecreater);
		CreateSections.setTheme(theme);
		CreateSections.setSeed(seed)

		var enemies = [];
		// splits level up into sections
		var sections = getSections();

		var len = sections.length;


		for(var i = 0; i < len; i++){
			var section = sections[i];
			var option = rand.nextInt(0, 8);
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

	return {
		createNewMap : createNewMap
	}
});


