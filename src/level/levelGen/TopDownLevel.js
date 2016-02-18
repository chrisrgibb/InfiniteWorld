define(function(require) {	

		var TileCreator = require('./tilecreater');
		var Helper = require('./helpers/helpers');
		var OddsHelper = require('./settings/odds');
		var LedgePeice = require('./peices/ledge');
		var SectionCreator = require('./helpers/sectioncreator2');

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
		};
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

			var rand = randomgenerator;
			var width = 16;
			var height = rand.nextInt(80, 100);
			var tilecreator = new TileCreator(height, width, 0, theme);
			var tiles = tilecreator.getBlankMap(width, height).tiles;
			var sectioncreator = new SectionCreator(tiles);


			var halp = new Helper.SectionHelper(rand);
			
			// creates random Intervals
			
			var ledges = halp
				.createIndexs(tiles.length, 4, 9, 7)
				.map(function(size){
					var lego = LedgePeice.create({
						rand : rand,
						mapWidth : width,
						y : size.x
					});
					// lego.y = size.x;
					return lego;
			});
			

			ledges.forEach(sectioncreator.apply, sectioncreator);

			ledges.forEach(function(l){
				
			})

			CreateSides(tiles, ledges[0].y);

			return {
				tiles : tiles,
				backgroundColor : theme.background,
				direction : 1 // 0 for LR, 1 for topdown, 2 for RL, 3 for anything
			};
		}	
	};
});
