define(function(require) {	


	var TileCreator = require('./tilecreater');
	var Helper = require('./helpers/helpers');
	var OddsHelper = require('./settings/odds');
	var LedgePeice = require('./peices/ledge');
	var SectionCreator = require('./helpers/sectioncreator2');

	// main loop
	// travel down map creating platforms

	function CreateLedges(rand, tiles, mapDetails){
		
		var count = 0;
		var ledges = [];
		// create start ledge
		var x = 0, y = mapDetails.startAt, width = rand.nextInt(4, 8), side = 'left';

		var firstLedge = LedgePeice.create(0, mapDetails.startAt, width, side);
		ledges.push(firstLedge);

		var interval = y;
		// create left hand side ledges
		while (interval < mapDetails.height) {
			var distance = interval + rand.nextInt(8, 16);  // y pos for next ledge
			ledges.push(LedgePeice.create(0, distance, rand.nextInt(5, 8), "left"));
			interval = distance;
 		}

 		// create right hand side ledges
 		interval = 0;
 		var rightLedges = [];
 		while (interval < mapDetails.height) {

 			var width = rand.nextInt(5, 8);
 			var x = mapDetails.width - width;

 			var distance = interval + rand.nextInt(8, 16);  // y pos for next ledge
 			var ledge = LedgePeice.create(x, distance, width, "right");

 			rightLedges.push(ledge)
			ledges.push(ledge);
			interval = distance;
 		}

 		// create middle Ledges 

 		
		ledges.forEach(function(ledge, i, ledges){
			// get nextClosestLedge
			var closest = 100000000;
			var closestIndex = -1;
			for(var j = 0; j < ledges.length; j++){
				if (ledges[j] !== ledge && ledges[j].y > ledge.y) {
					var distanceX = Math.abs(ledge.x - ledges[j].x);
					var distanceY = Math.abs(ledge.y - ledges[j].y);
					var manhatten = distanceX + distanceY;
					if(manhatten < closest){
						closest = manhatten;
						closestIndex = j;
					}
				}
			}
			var closestLedge = ledges[closestIndex];
			var y = ledge.y + Math.floor((closestLedge.y / 2));
			var x = ledge.x + Math.floor(closestLedge.x / 2);
			var stump =  LedgePeice.create(x, y, 3, "middle");
			ledges.push(stump);
			ledge.connectingPlatform = stump;
			// debugger;

		});

		mofos = ledges;

		return {
			ledges : ledges
		};
	}

	/**
		Loop down from top
		create path

		1 option : create a bunch of random ledges and then try to fit them into the space

	*/


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

	
			var ledges = CreateLedges(rand, tiles, mapDetails);
			ledges.ledges.forEach(sectioncreator.apply, sectioncreator);
			

			CreateSides(tiles, mapDetails.startAt);

			return {
				tiles : tiles,
				backgroundColor : theme.background,
				direction : 1 // 0 for LR, 1 for topdown, 2 for RL, 3 for anything
			};
		}	
	};
});
