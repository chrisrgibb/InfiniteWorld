define(function(require) {	

	var TileCreator = require('../helpers/tilecreater');
	var SectionCreator = require('./ledgehelper');
	var LedgePeice = require('./ledge');
	var PlaceBoxes = require('./placeboxes');

	// main loop
	// travel down map creating platforms

	
	function CreateSides(tiles, start){
		for(var i = start+1; i< tiles.length; i++){
			tiles[i][0] = 5;
			tiles[i][tiles[0].length - 1] = 5;
		}
	}

	return {
		buildMap : function(theme, options, randomgenerator){

			var rand = randomgenerator;

			var mapDetails = {
				startAt : 7,
				width : 16,
				height :rand.nextInt(80, 100)
			}

			var tilecreator = new TileCreator(mapDetails.height, mapDetails.width, 0, theme);
			var tiles = tilecreator.getBlankMap(mapDetails.width, mapDetails.height).tiles;
			
			var sectioncreator = new SectionCreator(tiles);

	
			// var ledges = CreateLedges(rand, tiles, mapDetails);
			var ledges = sectioncreator.makeHeaps(rand, tiles, mapDetails);
			ledges.ledges.forEach(sectioncreator.apply, sectioncreator);
			PlaceBoxes.placeBoxes(ledges.ledges, tiles, rand);
			
			CreateSides(tiles, mapDetails.startAt);

			return {
				tiles : tiles,
				backgroundColor : theme.background,
				direction : 1 // 0 for LR, 1 for topdown, 2 for RL, 3 for anything
			};
		}	
	};
});
