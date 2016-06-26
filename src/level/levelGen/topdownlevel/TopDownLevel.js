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
	* @param {array} tiles the 2d array of the level
	* @param {number} start the index to start creating the sides from
	*/
	function CreateSides(tiles, start){
		for(var i = start+1; i< tiles.length; i++){
			tiles[i][0] = 5;
			tiles[i][tiles[0].length - 1] = 5;
		}
	}

	function createBlankMap(mapDetails, theme) {
		var height = mapDetails.topDownOptions.calculatedHeight;
		var width = mapDetails.topDownOptions.width;

		var tilecreator = new TileCreator(height, width, 0, theme);
		var tiles = tilecreator.getBlankMap(width, height).tiles;
		return tiles;
	}

	function versionTwo(rand, tiles, theme, mapDetails) {

		// Place the ledges
		var ledgeplacer = new LedgePlacer(mapDetails);
		var ledges2 = ledgeplacer.makeLedges(tiles,rand, theme, mapDetails);

		CreateSides(tiles, mapDetails.topDownOptions.startAt);

		var enemies = PlaceEnemies.placeEnemies(ledges2, tiles, rand);

		return {
			tiles : tiles,
			backgroundColor : theme.background,
			direction : 1, // 0
			enemies : enemies,
			ledges : ledges2
		};
	}

	module.exports = {

		/**
		 * @param  {object} theme
		 * @param  {number} seed
		 * @param  {object} options
		 * @param  {object} randomgenerator
		 */
		buildMap : function(theme, options, randomgenerator) {

			var rand = randomgenerator;

			var topDownOptions = options.topDownOptions;

			var height = rand.nextInt(topDownOptions.height.min, topDownOptions.height.max);
			topDownOptions.calculatedHeight = height;

			var tiles = createBlankMap(options, theme);
			
			try {
				return versionTwo(rand, tiles, theme, options);
			} catch(e) {
				console.error("error with seed " + seed);
				console.error(e.stack);
				document.getElementById('stacktrace').innerText = e.stack;
			}
		}	
	};
});
