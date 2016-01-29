define(['./tilecreater'], 
	function (TileCreator){

	return {
		buildMap : function(theme, seed, options, randomgenerator){
			var rand = randomgenerator;
			var width = 16;
			var height = rand.nextInt(80, 100);
			var tilecreator = new TileCreator(height, width, 0, theme);


			var tiles = tilecreator.getBlankMap(width, height).tiles;

			// create a random tiles for testing
			var n = 10;
			for(var i = 0 ; i < n; i++){
				var x = rand.nextInt(0, width);
				var y = rand.nextInt(0, height);
				tiles[y][x] = 18; 
			}
			// create tile to land on
			tiles[10][2] = 18;

			
			return {
				tiles : tiles,
				backgroundColor : theme.background,
				direction : 1 // 0 for LR, 1 for topdown, 2 for RL, 3 for anything
			};
		}
		
	}

})
