define(function(require){ 
	var createLedge = require('./ledge').create;
	var applyLedge = require('./utils').applyLedge;

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


	function tryPlaceLedge(ledge) {
		var x = 0;
		// clone ledge
		//try find place to put it


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

			var numLedges = mapDetails.numberOfPlatforms || 40;

			var ledges = [];



			// var m = createLedge(6, 13, 2, "middle");
			// var p = createLedge(1, 10, 4, "left"); // 5, 10 
			// var q = createLedge(10, 9, 6, "right"); // 7, 9

			// applyLedge(m, tiles);
			// applyLedge(p, tiles);
			// applyLedge(q, tiles);


			var s = createLedge(10, 20, 5, "right" );
			var z = createLedge(2, 15, 8, "middle" );

			applyLedge(s, tiles);
			applyLedge(z, tiles);

			ledges = createRandomLedges(mapDetails, rand);

			var le = this.placeLedges(ledges, tiles, numLedges, rand);

			return [];//[m, p, q];	
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
						throw Error("ledge " + placedLedges.indexOf(ledge) + "cannot be null") ;
					}


					if (ledge.side === 'middle') {
						x = 3 + rand.nextInt(0, 4);
					} else if( ledge.side === 'right') {
						x = 10;
					}
					var y = rand.nextInt(10, 70);

					ledge.v1.x += x;
					ledge.v2.x += x;
					ledge.v3.x += x;
					ledge.v1.y += y;
					ledge.v2.y += y;
					ledge.v3.y += y;

					ledge.x = ledge.v1.x;
					ledge.y = ledge.v2.y;

					applyLedge(ledge, tiles);
					
					placedLedges.push(ledge);
				} 
				
				// make sure it isn't too close to another ledge or touching
				
			}
			return placedLedges;	
		}
	};
	
});