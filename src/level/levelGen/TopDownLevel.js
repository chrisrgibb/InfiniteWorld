define(['./tilecreater', './helpers/helpers', './settings/odds'], 
	function (TileCreator, Helper, OddsHelper){

	// main loop
	// travel down map creating platforms

	function mainLoop(){
		var sections =  splitIntoSections();



	}

	/*
	* abstract idea - take a length and cut it up into pieces,
	* pieces size can be specified - a minimum and maximum size
	* 
	*/
	function splitIntoSections(array, minSize, maxSize){



	}

	function Ledge(config){
		return {
			x : config.x,
			y : config.y,
			width : config.width,
			height :config.height,
			side : config.side
		}
	}

	return {
		buildMap : function(theme, seed, options, randomgenerator){

			var rand = randomgenerator;
			var width = 16;
			var height = rand.nextInt(80, 100);
			var tilecreator = new TileCreator(height, width, 0, theme);

			var odds = new OddsHelper({
				"left" : 4,
				"right" : 4,
				"middle" : 2
			}, rand);
			debugger;

			var tiles = tilecreator.getBlankMap(width, height).tiles;

			// create a random tiles for testing
			var n = 10;
			for(var i = 0 ; i < n; i++){
				var x = rand.nextInt(0, width-1);
				var y = rand.nextInt(0, height-1);
				tiles[y][x] = 18; 
			}
			// create tile to land on
			tiles[10][2] = 18;

			var halp = new Helper.SectionHelper(rand);


			var sizes = halp.createIndexs(tiles.length, 4, 9);
			var ledges = sizes.map(function(size){
				var x = rand.nextBool() % 2 == 0 ? 0 : 8;

				return {
					x : x,
					y : size,
					width : rand.nextInt(5, 8),
					height : 1
				};
			});

			ledges.forEach(function(l){
				for(var i = 0; i < l.width; i++){
					tiles[l.y][l.x + i] = 2;
				}
			});

			return {
				tiles : tiles,
				backgroundColor : theme.background,
				direction : 1 // 0 for LR, 1 for topdown, 2 for RL, 3 for anything
			};
		}
		
	}

})
