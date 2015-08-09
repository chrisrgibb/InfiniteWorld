define(['./createtiles', './noise', '../Map', './settings/levelsettings'],
	function(TilesCreater,Random, Map, themes){


	var rand = new Random(3);

	var themeoption = rand.nextInt(0, 4);

	var theme = themes[0];


	var height = 12,
		length = 50,
		chunks = [],
		tilecreater = new TilesCreater(0, 0, theme);

		var tiles;

	/**
	* calls all the functions to create a new map and returns it
	*/

	function createNewMap(isRandom, seedval){
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

	function createGap(section, tiles){

		for(var y = height -2; y < height; y++){
			console.log(y);
			var tile = y === height -2 ? theme.hazard1 : theme.hazard2;
			for(var x = section.x; x < section.x + section.length; x++){

				tiles.setTile(tile, x, y);
			}
		}
	}

	function getSections(){
		var lengths = [];
		var gapAtStartOfLevel = 16;
		var index = gapAtStartOfLevel + 0;

		while(index < length){
			var oneLength = rand.nextInt(4, 9);
			lengths.push({
				x : index,
				length : oneLength
			});
			if(index + oneLength >  length) {
				oneLength = length - index;
			}
			index += oneLength;
		}

		return lengths;
	}

	function decorate(section, tilecreater){
		var decorDeets = theme.decorationRules();
		if(section.length > 4){
			var startHeight = height + decorDeets.heightOffset,
				groundLevel = height - 2,
				width = 4; // 4 tiles
		
			for(var y = 0; y < decorDeets.height; y++){
				for(var x = 0; x < decorDeets.width; x++){

					var yy = y + startHeight, 
						xx = x + section.x;

					var tile = (decorDeets.tileNumber + y) * 16 + x;
					console.log(tile)
					tilecreater.setTile(tile, xx, yy);
				}
			}
		}
	}
	

	function buildMap(theme){
		var heights = [];

		tiles = tilecreater.getBlankMap(length, height, theme);

		var enemies = [];
		var lengths = getSections();

		var len = lengths.length;


		for(var i = 0; i < len; i++){
			var section = lengths[i];
			var option = rand.nextInt(0, 3);
			// debugger;
			switch(option){
				case 0:
					// flat
					console.log("not gap");
					decorate(section, tilecreater);
					break;	
				case 1:
					// gap
					createGap(section, tilecreater);
					break;
				case 2:
					// 
					console.log("also not");
					addBlobs(section, tilecreater);
					break;
			}

		}
		
		// addBlobs(tilecreater);
		
		

		var mapData =  {
			tiles : tiles,
			backgroundColor : theme.background,
			nodes : this.heights,
			length : this.length,
			sections : this.sections
		};

		return mapData;
	}

	return {
		createNewMap : createNewMap
	}
});


