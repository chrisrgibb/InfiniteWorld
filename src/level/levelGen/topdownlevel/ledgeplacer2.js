define(function(require){ 
	var createLedge = require('./ledge2').create;
	var applyLedge = require('./utils').applyLedge;

	function addLeftLedges(y, mapDetails, rand, level) {
		var interval = y;
		var previousLedge = null;
		var ledges = [];
			// create left hand side ledges

		while (interval < mapDetails.height - 20) {
			var distance = interval + rand.nextInt(8, 14);  // y pos for next ledge

			var ledge = createLedge(0, distance, rand.nextInt(5, 8), "left");

			interval = distance;
			if(ledge.v3.y < mapDetails.height) {
				previousLedge = ledge;
				ledges.push(ledge);
			}			
		}
		return ledges;
	}
	// x, width = rand.nextInt

	function addRightLedges(y, mapDetails, rand, level) {
		var interval = y;
 		var rightLedges = [];
 		while (interval < mapDetails.height) {
 			var width = rand.nextInt(5, 8);
 			var x = mapDetails.width - width;

 			var distance = interval + rand.nextInt(8, 16);  // y pos for next ledge

 			var ledge = createLedge(x, distance, width, "right");
 			if(ledge.v3.y < mapDetails.height){
				rightLedges.push(ledge);
 			}
 			interval = distance;
 		}
 		return rightLedges;
	}

	// need to create random ledges that aren't coupled to an x and y position, that we can specify later
	function createRandomLedges(mapDetails, rand, N){
		var ledges = {
			'left' : [],
			'right' : [],
			'middle' :[]
		};
		var interval = mapDetails.startY;
		N = N || 30;

		var sides = ['left', 'right', 'middle'];
		var index = 0;

		while (index < N) {
			var side = sides[rand.nextInt(3)];
			var width = rand.nextInt(3, 8);
			var ledge = createLedge(0, 0, width, side);
			ledges[side].push(ledge);
			index++;			
			// width is random, side is random
		}
		return ledges;
	}

	function createLedgesv1(applyLedge, mapDetails, rand, tiles) {
		var ledges = addLeftLedges(10, mapDetails, rand);
		var rightLedges = addRightLedges(10, mapDetails, rand);

		rightLedges.forEach(function(l) {
			applyLedge(l, tiles);
		});

		ledges.forEach(function(l) {
			applyLedge(l, tiles);
		});

		return ledges.concat(rightLedges);
	}

	return {
		makeLedges : function(tiles, rand, theme, mapDetails){
			// make start ledge
			// 3 = 1
			// 4 = 1
			// 5 = 2
			// 6 = 2
			// 7 = 3
			// 8 = 3

			var ledges = [];



			var m = createLedge(6, 13, 2, "middle");
			var p = createLedge(1, 10, 4, "left"); // 5, 10 
			var q = createLedge(10, 9, 6, "right"); // 7, 9

			applyLedge(m, tiles);
			applyLedge(p, tiles);
			applyLedge(q, tiles);


			// var s = createLedge(7, 20, 7, "middle" );
			// var z = createLedge(2, 15, 8, "middle" );

			// applyLedge(s, tiles);
			// applyLedge(z, tiles);

			var ledges = createRandomLedges(mapDetails, rand);

			var le = this.placeLedges(ledges, tiles, 3, rand);

			return [];	
		},

		placeLedges : function(ledges, tiles, n, rand) {

			var placedLedges = [];
			var sides = ['left', 'right', 'middle'];

			function getRandomLedge(rand) {
				var side = sides[rand.nextInt(3)];
				var index = rand.nextInt(0, ledges[side].length-1);
				var ledgeToPlace = ledges[side][index];
				return ledgeToPlace;
			}

			for(var i = 0; i < n; i++){
				// choose side to place (left, right, or middle)
				var ledge = getRandomLedge(rand);
				// make sure it hasn't been placed yet
				if(placedLedges.indexOf(ledge) === -1){
					// try place it
					var x = 0;
					if(ledge == null) {
						debugger;
					}
					if (ledge.side === 'middle') {
						x = 3 + rand.nextInt(0, 4);
					} else if( ledge.side === 'right') {
						x = 9;
					}
					var y = rand.nextInt(10, 70);

					ledge.v1.x += x;
					ledge.v2.x += x;
					ledge.v3.x += x;
					ledge.v1.y += y;
					ledge.v2.y += y;
					ledge.v3.y += y;

					applyLedge(ledge, tiles);
					
					placedLedges.push(ledge);
				} 
				
				// make sure it isn't too close to another ledge or touching
				
			}
			return placedLedges;	
		}
	};
	
});