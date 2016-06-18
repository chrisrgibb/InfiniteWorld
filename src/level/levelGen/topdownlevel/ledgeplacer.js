define(function(require, exports, module){ 
	"use strict";
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
		N = N || 90;

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
	/**
	 * Places a ledge at the given x, y position
	 * @param {Ledge} ledge
	 * @param {number} x
	 * @param {number} y
	 * @return {Ledge} ledge
	 */
	function setCoordinates(ledge, x, y) {
		ledge.v1.x += x;
		ledge.v2.x += x;
		ledge.v3.x += x;
		ledge.v1.y += y;
		ledge.v2.y += y;
		ledge.v3.y += y;

		ledge.x = ledge.v1.x;
		ledge.y = ledge.v2.y;

		return ledge;
	}

	function compareTwo(a, b, c) {
		if(a == null) {
			throw new Error('a cannot be null');
		}
		if(b == null)	{
			throw new Error('b cannot be null');
		}
		if (c == null) {
			c = 0;
		}
		var buffer = c;

		if (a.width + a.x < b.x - buffer) return false;
		if (a.x > b.width + b.x + buffer ) return false;
		if (a.y + a.height + buffer < b.y - buffer) return false;
		if (a.y > b.height + b.y + buffer) return false; 
		return true; // boxes overlap
	}
	/**
	 * clones a ledge
	 * @param {object} ledge
	 * @return {object} clonedLedge
	 */
	function cloneLedge(ledge){
		return JSON.parse(JSON.stringify(ledge));
	}
	/**
	 * returns true if the given ledge overlaps with one of the ledges in the array
	 * @param  {array} ledges
	 * @param  {object} ledge
	 * @param  {number} buffer
	 */
	function checkForCollish(ledges, ledge, buffer){
		return ledges.some(function(e){
			return compareTwo(ledge, e, buffer);
		});
	}

	/**
	 * finds a random position and checks to see if that position overlaps with any other
	 * ledges. It adds the ledge to the list of ledges if there is no collisions
	 * 
	 * @param {Ledge} ledge
	 * @param {array} ledges
	 * @param {object} randomNumberGenerator
	 */
	function tryPlaceLedge(ledge, ledges, rand) {
		var x = 0;
		var y = 0;
	
		var foundPlace = false;
		var newledge;
		var maxAttempts = 10;
		var count = 0;

		while(!foundPlace){
			count++;
			// clone ledge
			newledge = cloneLedge(ledge);
			//try find place to put it
			if (ledge.side === 'middle') {
				x = 3 + rand.nextInt(0, 4);
			} else if( ledge.side === 'right') {
				x = 10;
			}
			y = rand.nextInt(10, 70);

			setCoordinates(newledge, x, y);
			// make sure theres no collisions

			var isColish = checkForCollish(ledges, newledge, 1);
			if(!isColish) {
				// applyLedge(newledge, tiles);
				ledges.push(newledge);
				foundPlace = true;
			}
			if(count > maxAttempts) {
				foundPlace = true;
			}
		}
		
	}

	module.exports = {
		/**
		 * @param {array} tiles
		 * @param {object} rand
		 * @param {object} theme
		 * @param {object} mapDetails
		 */
		makeLedges : function(tiles, rand, theme, mapDetails){

			var numLedges = mapDetails.numberOfPlatforms || 90;

			var ledges = [];



			// var m = createLedge(6, 13, 2, "middle");
			// var p = createLedge(1, 10, 4, "left"); // 5, 10 
			// var q = createLedge(10, 9, 6, "right"); // 7, 9

			// applyLedge(m, tiles);
			// applyLedge(p, tiles);
			// applyLedge(q, tiles);


			// var s = createLedge(10, 20, 5, "right" );
			// var z = createLedge(2, 15, 8, "middle" );

			// var p = createLedge(10, 24, 4, "right");

			// var res = compareTwo(z, p);
			// console.log(res)


			// applyLedge(s, tiles);
			// applyLedge(z, tiles);
			// applyLedge(p, tiles);



			ledges = createRandomLedges(mapDetails, rand);
			var le = this.placeLedges(ledges, tiles, numLedges, rand);

			return [];//[m, p, q];	
		},
		/**
		 * @param {object} ledges
		 * @param {array} tiles
		 * @param {number} n - number of ledges to create
		 * @param {object} rand - random number generator
		 */
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
				console.log(i);
				// choose side to place (left, right, or middle)
				var ledge = getRandomLedge(rand);
				// make sure it hasn't been placed yet
				if(placedLedges.indexOf(ledge) === -1){
					// try place it
					var x = 0;
					if(ledge == null) {
						throw Error("ledge " + placedLedges.indexOf(ledge) + "cannot be null") ;
					}
					
					tryPlaceLedge(ledge, placedLedges, rand);
				}
				// make sure it isn't too close to another ledge or touching
				
			}
			placedLedges.forEach(function(l){
				applyLedge(l, tiles);
			});

			return placedLedges;	
		}
	};
	
});