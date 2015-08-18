define(['./createtiles', './noise', '../Map', './settings/levelsettings', '../../game/enemies/enemyfactory', './createsections'],
	function(TilesCreater, Random, Map, themes, Enemyfactory, CreateSections){


	var rand = new Random(3);



	var themeoption = rand.nextInt(0, 4);
	var theme = themes[0];

	// options
	var difficulty = {
			EASY : 0, 
			HARD : 2
		};
	var heightVariance = 1;


	var height = 12,
		length = rand.nextInt(40, 80);


	// set up of level
	var	chunks = [],
		tilecreater = new TilesCreater(0,length, 0, theme);
		var tiles;
		


	/**
	* calls all the functions to create a new map and returns it
	*/

	function createNewMap(isRandom, seedval){
		CreateSections.reset();
		var seedValue = parseInt(seedval);
			rand = new Random(seedValue);
		var difficulty = rand.nextInt(1, 3),
			levelData = buildMap(theme),
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
		var gapAtStartOfLevel = 4;
		var index = gapAtStartOfLevel + rand.nextInt(0, 4);

		while(index < length){
			var oneLength = rand.nextInt(4, 9);
			lengths.push({
				x : index,
				length : oneLength,
				type : ""
			});
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
	

	function buildMap(theme){
		var heights = [];

		tiles = tilecreater.getBlankMap(length, height, theme);
		CreateSections.setTileCreater(tilecreater);
		CreateSections.setTheme(theme);


		var enemies = [];
		// splits level up into sections
		var sections = getSections();

		var len = sections.length;


		for(var i = 0; i < len; i++){
			var section = sections[i];
			var option = rand.nextInt(0, 6);
			// debugger;
			
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
					CreateSections.createSimple(section.x, 8, section.length);
					break;
				case 6:
					CreateSections.funkyShape(section.x, 12, section.length)
					// square shape
					break;	
			}
		}
				
		var mapData =  {
			tiles : tiles,
			backgroundColor : theme.background,
			nodes : this.heights,
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


