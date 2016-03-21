define(function(require){
	
	var LedgePeice = require('./ledge');
	var GeneratedLevel = require('./generatedlevel');
	var ledgeHelper = require('./ledgedistancehelper');


	/*
	*  Loop through the level and add ledges to left hand side
	*/
	function addLeftLedges(y, mapDetails, rand, level) {
		var interval = y;
			// create left hand side ledges
		while (interval < mapDetails.height) {
			var distance = interval + rand.nextInt(8, 16);  // y pos for next ledge
			level.add(LedgePeice.create(0, distance, rand.nextInt(5, 8), "left"));
			interval = distance;
		}
	}

	function findClosestIndex(ledge, ledges) {
		var closest = 100000000;
		var closestIndex = -1;	
				
		for(var j = 0; j < ledges.length; j++){
			var otherLedge = ledges[j];

			if (ledges[j] !== ledge && otherLedge.y > ledge.y) {
				var dist = ledgeHelper.distanceBetween(ledge, otherLedge);

				if(dist < closest){
					closest = dist;
					closestIndex = j;
				}
			}
		}
		return closestIndex;
	}

	/*
	*  Loop through the level and add ledges to right hand side
	*/
	function addRightLedges(y, mapDetails, rand, level) {

		function random(a, b){
			return rand.nextInt(a, b);
		}

		var sizes = [5, 6, 6, 7, 5, 12];


 		var interval = y;
 		var rightLedges = [];
 		while (interval < mapDetails.height) {

 			var width = rand.nextInt(5, 8);
 			// var width = sizes[rand.nextInt(0, sizes.length-1)];
 			var x = mapDetails.width - width;

 			var distance = interval + random(8, 16);  // y pos for next ledge
 			var ledge = LedgePeice.create(x, distance, width, "right");

 			var canPlace = ledgeHelper.canPlaceLedge(ledge, level.ledges);
 			// canPlace = true;
 			if (canPlace) {
				level.add(ledge);
 			} else {
 				// console.log("")
 			}
			interval = distance;
 		}
	}



	var SectionCreator = function (tiles) {
		this.tiles = tiles;
	};

	SectionCreator.prototype = {

		/**
		*  takes a 1d array and applies it to the map
		*
		*/
		applyArray : function(array, destX, destY){
			// var num = array.length;
			for(var i = 0; i < array.row.length; i++){
				if(array.y >= this.tiles.length){
					return;
				}
				var a = array.row[i];

				this.tiles[array.y][array.x + i] = a;
			}	
		},

		/**
		* Takes a piece {
		*   	x : 0,
				y : 0,
				rows : {
					row : [0,0,0],
					x : 0,
					y :0 
				}
	 	*  	}
		*
		**/
		apply : function(piece){
			var destX = piece.x;
			var destY = piece.y;
			var arrays = piece.rows;
	
			arrays.forEach(function(array, i, arrays){
				this.applyArray(array, destX, destY);

			}, this);

		},

		/**
		*
		*
		*
		*/
		makeHeaps : function(rand, tiles, mapDetails) {
			var level = new GeneratedLevel();


			var count = 0;
			var ledges = [];
			// create start ledge
			var x = 0, y = mapDetails.startAt, width = rand.nextInt(4, 8), side = 'left';

			var firstLedge = LedgePeice.create(0, mapDetails.startAt, width, side);
			level.add(firstLedge);

	 		addLeftLedges(y, mapDetails, rand, level);

	 		addRightLedges(0, mapDetails, rand, level);
	
	 		// create middle Ledges 

	 		level.sort();

	 		// add a bridging ledge in between two ledges
			level.ledges.forEach(function(ledge, i, ledges){
	
				var closestIndex = findClosestIndex(ledge, ledges);

				if (closestIndex > -1) {

					var closestLedge = ledges[closestIndex];
					var distanceX = Math.abs(ledgeHelper.getXDistance(ledge, closestLedge));
					var distanceY = Math.abs(ledge.y - closestLedge.y);
					
					if (distanceY > 5) { 
						// debugger;
						var y = ledge.y + Math.floor((distanceY / 2));
						var x = ledge.side === "left" ? (ledge.width + Math.floor(distanceX / 2) )  : (ledge.x  - Math.floor(distanceX / 2) - Math.floor(ledge.width / 2));

						var stump =  LedgePeice.create(x, y, rand.nextInt(3, 5), "middle");
					
						ledges.push(stump);
						ledge.connectingPlatform = stump;
						ledge.partnerLedge = closestLedge;
					}
				}
			});
			level.sort();

			mofos = level.ledges; // global var for testin
			level.nearestLedges = ledgeHelper.computeNearest(level.ledges);

			return {
				ledges : level.ledges
			};
		}
	};
	return SectionCreator;

});