define(function(require, exports, module) {

	module.exports = {
		/**
		 * Hello
		 */
		applyLedge : function(ledge, tiles) {
			//http://www.sunshine2k.de/coding/java/TriangleRasterization/TriangleRasterization.html
			var slope1 = (ledge.v3.x - ledge.v1.x) / (ledge.v3.y - ledge.v1.y);
			var slope2 = (ledge.v3.x - ledge.v2.x) / (ledge.v3.y - ledge.v2.y);
			
			var x1 = ledge.v3.x;
			var x2 = ledge.v3.x;
			for(var y = ledge.v3.y; y > ledge.v2 .y; y--) {
				x1 -= slope1;
				x2 -= slope2;

				// is it the top of the ledge? then draw a green block
				var isTop = y == ledge.v2.y+1;
				var start = Math.round(x1);
				var end = Math.round(x2);

				for (var x = start; x < end; x++) {
					tiles[y][x] = isTop ? 2 : 5;
				}
				if(slope1 !== 0) {
					// add a sloped piece on the left
					tiles[y][start] = isTop ? 1 : 4;
				}
				if(slope2 !== 0) {
					// add a sloped piece on the right;
					tiles[y][end] = isTop? 3 : 6;
					
					// make sure the slope is smooth and we don't get two edge peices on top of each other
					if(tiles[y+1][end] === tiles[y][end]) {
						tiles[y][end] = isTop ? 2 : 5;
					}

				}
			}
		},

		getDirection : function(ledge) {
			if(ledge.v1.x < ledge.v3.x && 
			   ledge.v2.x > ledge.v3.x) {
				return "middle";
			}
			if(ledge.v1.x === ledge.v3.x) {
				return "left";
			}
			if(ledge.v3.x == ledge.v2.x) {
				return "right";
			}
		},
		
		getBoundingBox : function(ledge) {
			var minx, miny, maxx, maxy;

			for(var i = 0; i < ledge.length; i++) {
				var point = ledge[i];
				var x = point.x;
				var y = point.y;
				minx = (minx == null) ? x : Math.min(minx, x);
				miny = (miny == null) ? y : Math.min(miny, y);
				maxx = (maxx == null) ? x : Math.max(maxx, x);
				maxy = (maxy == null) ? y : Math.max(maxy, y);
			}	
			return {
				minx : minx,
				miny : miny,
				maxx : maxx,
				maxy : maxy
			};
		},

		/*
		* takes two arrays of 3 x,y coords representing a triangle
		* and returns the two closest points in those triangles and the distances between them
		*  
		*/
		distanceBetween : function(ledge1, ledge2) {
			// get closest points
			var closest1, closest2;
			var closestDistance;

			for(var i = 0; i < ledge1.length; i++) {
				for(var j = 0; j < ledge2.length; j++) {
					var p1 = ledge1[i];
					var p2 = ledge2[j];
					var distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
					if(closestDistance == null) {
						closestDistance = distance;
					} else if(distance < closestDistance) {
						closest1 = p1;
						closest2 = p2;
						closestDistance = distance;
					}
				}
			}
			return {
				p1 : closest1,
				p2 : closest2,
				distance : closestDistance
			};
		}
	};

});