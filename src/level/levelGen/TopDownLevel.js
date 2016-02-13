define(['./tilecreater', './helpers/helpers', './settings/odds', './peices/ledge'], 
	function (TileCreator, Helper, OddsHelper, LedgePeice){

	// main loop
	// travel down map creating platforms

	function mainLoop(){
		var sections =  splitIntoSections();



	}

	function createLedges(size){


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

	function CreateSides(tiles, start){
		// var 
		// debugger;
		for(var i = start+1; i< tiles.length; i++){
				tiles[i][0] = 5;
				tiles[i][tiles[0].length -1] = 5;
		}
	}



	return {
		buildMap : function(theme, options, randomgenerator){

			function createRandomTilesForTesting (rand, tiles) {
				// create a random tiles for testing
				var n = 10;
				for(var i = 0 ; i < n; i++){
					var x = rand.nextInt(0, width-1);
					var y = rand.nextInt(0, height-1);
					tiles[y][x] = 18; 
				}
				// create tile to land on
				tiles[10][2] = 18;
			}

			var rand = randomgenerator;
			var width = 16;
			var height = rand.nextInt(80, 100);
			var tilecreator = new TileCreator(height, width, 0, theme);
			var tiles = tilecreator.getBlankMap(width, height).tiles;


			createRandomTilesForTesting(rand, tiles);

			var halp = new Helper.SectionHelper(rand);

			
			var sizes = halp.createIndexs(tiles.length, 4, 9, 7);
			


			var ledges = halp
				.createIndexs(tiles.length, 4, 9, 7)
				.map(function(size){
					var lego = LedgePeice.create({
						rand : rand,
						mapWidth : width
					});
					lego.y = size.x;
					return lego;
			});

			ledges.forEach(function(l){
				if(l.side === "right"){
					for(var i = 0; i < l.width; i++){
						tiles[l.y][l.x + i] = 2;// assign 
					}
				} else {
					// this is the new way applying anythign
					for(var i = 0; i < l.width; i++){
						tiles[l.y][l.x+i] = l.array[0][i];
					}
				}
	
			});

			CreateSides(tiles, ledges[0].y);

			return {
				tiles : tiles,
				backgroundColor : theme.background,
				direction : 1 // 0 for LR, 1 for topdown, 2 for RL, 3 for anything
			};
		}
		
	}

})
