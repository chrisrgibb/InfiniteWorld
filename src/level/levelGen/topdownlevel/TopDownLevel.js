define(function(require) {	

	var TileCreator = require('../helpers/tilecreater');
	var LedgePlacer2 = require('./ledgeplacer2');
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

	function versionTwo(rand, tiles, theme, mapDetails) {
		// Place the ledges
		var ledges2 = LedgePlacer2.makeLedges(tiles,rand, theme, mapDetails);

		CreateSides(tiles, mapDetails.startAt);

		var enemies = PlaceEnemies.placeEnemies(ledges2, tiles, rand);

		return {
			tiles : tiles,
			backgroundColor : theme.background,
			direction : 1, // 0
			enemies : enemies,
			ledges : ledges2
		};
	}

	return {
		buildMap : function(theme, seed, options, randomgenerator){

			var rand = randomgenerator;

			var mapDetails = {
				startAt : 7,
				width : 16,
				height :rand.nextInt(80, 100)
			};

			var tiles = createBlankMap(mapDetails, theme);
			
			try {
				return versionTwo(rand, tiles, theme, mapDetails);
			} catch(e) {
				console.error("error with seed " + seed);
				console.error(e.stack);
				document.getElementById('stacktrace').innerText = e.stack;
				// debugger;
			}
			

		}	
	};
});
