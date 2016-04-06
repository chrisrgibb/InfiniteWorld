define(function(){

	/*
	*  Compares two ledges to see if they overlap
	*  a - ledge that already exists
	*  b - ledge we are trying to place 
	*  c - optional minimum guaranteed distance between the two ledges
	**/
	function compareTwo(a, b, c) {
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

	function getXDistance(ledge1, ledge2) {
		var x1 = ledge1.side === "left" ? ledge1.width : ledge1.x;
		var x2 = ledge2.side === "left" ? ledge2.width : ledge2.x;
		return x1 - x2;
	}

	function getYDistance(ledge1, ledge2) {
		return ledge1.y - ledge2.y;
	}

	/*
	* loops through all the ledges a orders them relative to the 
	* given ledge.
	* Haven't tested this yet
	**/
	function findNearestLedges(ledge, ledges) {

		var distances = [];
		
		for(var j = 0; j < ledges.length; j++){

			var otherLedge = ledges[j];
			if (otherLedge !== ledge) {
				var dist = distanceBetween(ledge, otherLedge);
				distances.push({
					index : j,
					distance : dist
				});
			} 
		}
		distances.sort(function(a, b){
			if ( a.distance < b.distance ) {
				return -1;
			}
			if( a.distance > b.distance) {
				return 1;
			}
			return 0;
		});
		return distances;
	}

	/*
		find the distance between two ledges. 
	*/
	function distanceBetween (ledge1, ledge2) {
		var xDist = getXDistance(ledge1, ledge2);
		var yDist = getYDistance(ledge1, ledge2);
		return Math.sqrt( Math.pow(xDist, 2) + Math.pow(yDist, 2) );
	}

	/*
	 *  returns the index of the closet ledge to the given ledge
	 *  will return -1 if there is no closest ledge
	*/
	function findClosestIndex(ledge, ledges) {
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
		return closestIndex;
	}

	return {

		getXDistance : getXDistance,

		distanceBetween : distanceBetween,
		
		findClosestIndex : findClosestIndex,

		computeNearest : function (ledges) {
			var somethign = ledges.map(function(ledge, index, ledges) {
				var nearestLedgesList = findNearestLedges(ledge, ledges);
				return nearestLedgesList;
			});
			return somethign;
		},
	
		/*
		* checks the area around the ledge if the ledge is valid to be placed there
		*/
		canPlaceLedge : function (ledge, ledges) {
			var centerOfLedge = {
				x : ledge.x + Math.floor(ledge.width / 2),
				y : ledge.y + Math.floor(ledge.height / 2)
			};	

			return !ledges.some(function(l) {
				return compareTwo(ledge, l);
			});
		}
	};

});