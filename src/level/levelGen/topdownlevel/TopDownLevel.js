define(function(require, exports, module) {	

	var TileCreator = require('../helpers/tilecreater');
	var LedgePlacer = require('./ledgeplacer');
	var PlaceBoxes = require('./placeboxes');
	var PlaceEnemies = require('./placeenemies');

	// main loop
	// travel down map creating platforms

	var settings = {
		numberOfPlatforms : 12
	};


	/**
	* creates the sides of a topdown level
	* @param {tiles} the 2d array of the level
	* @param {number} the index to start creating the sides from
	*/
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
		var ledgeplacer = new LedgePlacer(mapDetails);

		var ledges2 = ledgeplacer.makeLedges(tiles,rand, theme, mapDetails);

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

	var topDownLevel = function (params) {
		
	}


	module.exports = {

		/**
		 * @param  {object} theme
		 * @param  {number} seed
		 * @param  {object} options
		 * @param  {object} randomgenerator
		 */
		buildMap : function(theme, seed, options, randomgenerator) {

			var rand = randomgenerator;

			var mapDetails = {
				startAt : 7,
				startY : 7,
				width : 16,
				height : rand.nextInt(80, 100)
			};

			var tiles = createBlankMap(mapDetails, theme);
			
			try {
				return versionTwo(rand, tiles, theme, mapDetails);
			} catch(e) {
				console.error("error with seed " + seed);
				console.error(e.stack);
				document.getElementById('stacktrace').innerText = e.stack;
			}
		}	
	};
});
