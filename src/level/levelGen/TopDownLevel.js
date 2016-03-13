define(function(require) {	


	var TileCreator = require('./tilecreater');
	var Helper = require('./helpers/helpers');
	var OddsHelper = require('./settings/odds');
	var LedgePeice = require('./peices/ledge');
	var SectionCreator = require('./helpers/sectioncreator2');

	// main loop
	// travel down map creating platforms

	function sortFunc(a, b){
		if (a.y < b.y) {
			return -1;

		} 
		if(a.y > b.y) {
			return 1;
		}
		if (a.x < b.x ) {
			return -1;
		}
		return 1;
	}

	function calculateEmptyness(tiles){
		var emptyCount = 0;
		var fullCount = 0;
		var total = 0;

		for (var i = 0; i < tiles.length; i++) {
			for (var j = 0; j < tiles[0].length; j++) {
				if (tiles[i][j] === 0) {
					emptyCount ++;
				}
				total++;
			}
		}
		return emptyCount / total;
	}

	function distanceBetween(ledge1, ledge2) {
		var xDist = getXDistance(ledge1, ledge2);
		var yDist = getYDistance(ledge1, ledge2);
		return Math.sqrt( Math.pow(xDist, 2) + Math.pow(yDist, 2) );
	}

	function getXDistance(ledge1, ledge2) {
		var x1 = ledge1.side === "left" ? ledge1.width : ledge1.x;
		var x2 = ledge2.side === "left" ? ledge2.width : ledge2.x;
		return x1 - x2;
	}

	function getYDistance(ledge1, ledge2) {
		return ledge1.y - ledge2.y;
	}


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

 		ledges.sort(sortFunc);

 		
		ledges.forEach(function(ledge, i, ledges){
			// get nextClosestLedge
			var closest = 100000000;
			var closestIndex = -1;	
			
			for(var j = 0; j < ledges.length; j++){
				var otherLedge = ledges[j];

				if (ledges[j] !== ledge && otherLedge.y > ledge.y) {
					var dist = distanceBetween(ledge, otherLedge);

					if(dist < closest){
						closest = dist;
						closestIndex = j;
					}
				}
			}
			if (closestIndex > -1) {

				var closestLedge = ledges[closestIndex];
				var distanceX = Math.abs(getXDistance(ledge, closestLedge));
				var distanceY = Math.abs(ledge.y - closestLedge.y);
				if (distanceY > 5) { 
					var y = ledge.y + Math.floor((distanceY / 2));
					var x = ledge.side === "left" ? (ledge.width + Math.floor(distanceX / 2))  : (ledge.x  - Math.floor(distanceX / 2) - Math.floor(ledge.width / 2));
					// var x = Math.floor(distanceX / 2);
					var stump =  LedgePeice.create(x, y, rand.nextInt(3, 5), "middle");
				
					ledges.push(stump);
					ledge.connectingPlatform = stump;
					ledge.partnerLedge = closestLedge;

				}
			}
		});

		mofos = ledges; // global var for testin

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
