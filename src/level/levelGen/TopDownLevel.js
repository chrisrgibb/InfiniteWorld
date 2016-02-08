define(['./tilecreater', './helpers/helpers', './settings/odds'], 
	function (TileCreator, Helper, OddsHelper){

	// main loop
	// travel down map creating platforms

	function mainLoop(){
		var sections =  splitIntoSections();



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


			var sizes = halp.createIndexs(tiles.length, 4, 9, 7);
			var ledges = sizes.map(function(size){
				var x = rand.nextBool() % 2 == 0 ? 0 : 8;	
				var side = odds.next();

				var ledge = {
					x : x,
					y : size.x,
					width : rand.nextInt(5, 8),
					height : 1
				};

				var mapWidth = width;
				if(side === "left"){
					ledge.x = 0;
				}
				if( side === "right"){
					ledge.x = mapWidth - ledge.width;
				}
				if(side === "middle"){
					ledge.x = Math.floor(width / 2) - (Math.floor(ledge.width / 2)); 
				}

				return ledge;
			});

			ledges.forEach(function(l){
				for(var i = 0; i < l.width; i++){
					tiles[l.y][l.x + i] = 2;
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
