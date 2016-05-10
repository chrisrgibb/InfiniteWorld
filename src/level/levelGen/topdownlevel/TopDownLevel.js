define(function(require) {	

	var TileCreator = require('../helpers/tilecreater');
	var LedgePlacer = require('./ledgeplacer');
	var LedgePlacer2 = require('./ledgeplacer2');
	var LedgePeice = require('./ledge');
	var PlaceBoxes = require('./placeboxes');
	var EnemyFactory = require('../../../game/enemies/enemyfactory');
	var PlaceEnemies = require('./placeenemies');

	// main loop
	// travel down map creating platforms

	
	function CreateSides(tiles, start){
		for(var i = start+1; i< tiles.length; i++){
			tiles[i][0] = 5;
			tiles[i][tiles[0].length - 1] = 5;
		}
	}

	function createBlankMap(mapDetails, theme) {
		var tilecreator = new TileCreator(mapDetails.height, mapDetails.width, 0, theme);
		var tiles = tilecreator.getBlankMap(mapDetails.width, mapDetails.height).tiles;
		return tiles;
	}


	function versionOne(rand, tiles, theme, mapDetails) {
		// Place the ledges
		var ledgeplacer = new LedgePlacer(tiles); 
		var ledges = ledgeplacer.makeHeaps(rand, tiles, mapDetails).ledges;
		ledges.forEach(ledgeplacer.apply, ledgeplacer);

		PlaceBoxes.placeBoxes(ledges, tiles, rand);
			
		var enemies = PlaceEnemies.placeEnemies(ledges, tiles, rand);

		return {
			tiles : tiles,
			backgroundColor : theme.background,
			direction : 1, // 0 for LR, 1 for topdown, 2 for RL, 3 for anything
			enemies: enemies
		};
	}

	function versionTwo(rand, tiles, theme, mapDetails) {
		// Place the ledges
		var ledges2 = LedgePlacer2.makeLedges(tiles,rand);


		
		return {
			tiles : tiles,
			backgroundColor : theme.background,
			direction : 1 // 0
		}
	}

	return {
		buildMap : function(theme, options, randomgenerator){

			var rand = randomgenerator;

			var mapDetails = {
				startAt : 7,
				width : 16,
				height :rand.nextInt(80, 100)
			};

			var tiles = createBlankMap(mapDetails, theme);
			
			CreateSides(tiles, mapDetails.startAt);
			return versionTwo(rand, tiles, theme, mapDetails);

			return versionOne(rand, tiles, theme, mapDetails);

		}	
	};
});
